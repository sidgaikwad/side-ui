import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { source } from '@/lib/source';
import { BookOpen, Code, Palette, Terminal } from 'lucide-react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{
        title: (
          <span className="font-mono font-bold">siddcn</span>
        ),
      }}
      sidebar={{
        defaultOpenLevel: 2,
        collapsible: true,
      }}
      links={[
        {
          text: 'GitHub',
          url: 'https://github.com/sidgaikwad/siddcn',
          external: true,
        },
      ]}
    >
      {children}
    </DocsLayout>
  );
}
