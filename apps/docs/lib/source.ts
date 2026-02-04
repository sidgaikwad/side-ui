import { loader, Source } from 'fumadocs-core/source';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content/docs');

interface PageData {
  title: string;
  description?: string;
  full?: boolean;
}

interface MetaData {
  title: string;
  pages: string[];
}

function readMetaFile(filePath: string): MetaData | null {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch {
    return null;
  }
}

function getMdxFiles(dir: string, basePath: string = ''): Source<{ metaData: MetaData; pageData: PageData }>['files'] {
  const files: Source<{ metaData: MetaData; pageData: PageData }>['files'] = [];
  
  if (!fs.existsSync(dir)) {
    return files;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = basePath ? `${basePath}/${entry.name}` : entry.name;
    
    if (entry.isDirectory()) {
      // Check for meta.json in directory
      const metaPath = path.join(fullPath, 'meta.json');
      const metaData = readMetaFile(metaPath);
      if (metaData) {
        files.push({
          type: 'meta',
          path: `${relativePath}/meta.json`,
          data: metaData,
        });
      }
      
      // Recursively get files from subdirectory
      files.push(...getMdxFiles(fullPath, relativePath));
    } else if (entry.name.endsWith('.mdx') || entry.name.endsWith('.md')) {
      try {
        const content = fs.readFileSync(fullPath, 'utf-8');
        const { data: frontmatter } = matter(content);
        
        files.push({
          type: 'page',
          path: relativePath,
          data: {
            title: frontmatter.title || 'Untitled',
            description: frontmatter.description,
            full: frontmatter.full,
          },
        });
      } catch (error) {
        console.error(`Error reading file ${fullPath}:`, error);
      }
    } else if (entry.name === 'meta.json' && !basePath) {
      // Root meta.json
      const metaData = readMetaFile(fullPath);
      if (metaData) {
        files.push({
          type: 'meta',
          path: 'meta.json',
          data: metaData,
        });
      }
    }
  }
  
  return files;
}

function createSource(): Source<{ metaData: MetaData; pageData: PageData }> {
  return {
    files: getMdxFiles(contentDir),
  };
}

export const source = loader({
  baseUrl: '/docs',
  source: createSource(),
});

// Helper function to get raw MDX content for a page
export function getPageContent(slugs: string[] | undefined): string | null {
  const slug = slugs?.join('/') || 'index';
  const possiblePaths = [
    path.join(contentDir, `${slug}.mdx`),
    path.join(contentDir, `${slug}.md`),
    path.join(contentDir, slug, 'index.mdx'),
    path.join(contentDir, slug, 'index.md'),
  ];
  
  for (const filePath of possiblePaths) {
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, 'utf-8');
    }
  }
  
  return null;
}
