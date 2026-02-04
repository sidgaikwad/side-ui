import { CodeBlock } from "@/components/CodeBlock";

export default function SSHSetupPage() {
  return (
    <article className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold text-terminal-cyan">SSH Setup</h1>

      <p className="lead text-xl text-terminal-text/80">
        Learn how to set up the SSH server to browse components remotely.
      </p>

      <h2 className="text-2xl font-semibold text-terminal-text">
        Quick Connect
      </h2>

      <p className="text-terminal-text/70">
        If you have the SSH server running, you can connect with:
      </p>

      <CodeBlock
        code={`ssh localhost -p 2222`}
        language="bash"
        filename="Terminal"
      />

      <h2 className="text-2xl font-semibold text-terminal-text">
        Running the SSH Server
      </h2>

      <p className="text-terminal-text/70">
        Siddcn includes a built-in SSH server for remote component browsing:
      </p>

      <CodeBlock
        code={`# Start the SSH server
npm run server

# Or with custom port
PORT=3000 npm run server`}
        language="bash"
        filename="Terminal"
      />

      <h2 className="text-2xl font-semibold text-terminal-text">
        SSH Server Configuration
      </h2>

      <p className="text-terminal-text/70">
        The SSH server can be configured with environment variables:
      </p>

      <div className="not-prose my-6">
        <table className="w-full">
          <thead>
            <tr className="border-b border-terminal-cyan/30">
              <th className="px-4 py-2 text-left text-terminal-cyan">Variable</th>
              <th className="px-4 py-2 text-left text-terminal-cyan">Default</th>
              <th className="px-4 py-2 text-left text-terminal-cyan">Description</th>
            </tr>
          </thead>
          <tbody className="text-terminal-text/70">
            <tr className="border-b border-terminal-cyan/10">
              <td className="px-4 py-2 font-mono text-terminal-green">PORT</td>
              <td className="px-4 py-2">2222</td>
              <td className="px-4 py-2">SSH server port</td>
            </tr>
            <tr className="border-b border-terminal-cyan/10">
              <td className="px-4 py-2 font-mono text-terminal-green">HOST</td>
              <td className="px-4 py-2">0.0.0.0</td>
              <td className="px-4 py-2">Server bind address</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono text-terminal-green">HOST_KEY</td>
              <td className="px-4 py-2">./host.key</td>
              <td className="px-4 py-2">Path to SSH host key</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-semibold text-terminal-text">
        Generating Host Keys
      </h2>

      <p className="text-terminal-text/70">
        If you do not have SSH host keys, generate them:
      </p>

      <CodeBlock
        code={`# Generate RSA key pair
ssh-keygen -t rsa -b 4096 -f host.key -N ""

# This creates:
# - host.key (private key)
# - host.key.pub (public key)`}
        language="bash"
        filename="Terminal"
      />

      <h2 className="text-2xl font-semibold text-terminal-text">
        Server Architecture
      </h2>

      <p className="text-terminal-text/70">
        The SSH server uses the ssh2 library and renders the React Ink
        application for each connected client:
      </p>

      <CodeBlock
        code={`import { Server } from 'ssh2';
import { render } from 'ink';
import { App } from './App';

const server = new Server({
  hostKeys: [fs.readFileSync('./host.key')]
}, (client) => {
  client.on('session', (accept) => {
    const session = accept();
    session.on('pty', (accept) => accept());
    session.on('shell', (accept) => {
      const stream = accept();
      render(<App />, {
        stdout: stream,
        stdin: stream
      });
    });
  });
});

server.listen(2222);`}
        language="tsx"
        filename="server.ts"
      />

      <h2 className="text-2xl font-semibold text-terminal-text">
        Security Considerations
      </h2>

      <div className="not-prose my-6 rounded-lg border border-terminal-yellow/30 bg-terminal-yellow/10 p-4">
        <h3 className="mb-2 font-semibold text-terminal-yellow">Warning</h3>
        <p className="text-sm text-terminal-text/70">
          The default SSH server accepts all connections without authentication.
          This is suitable for development and demo purposes only. For production
          use, implement proper authentication.
        </p>
      </div>

      <h2 className="text-2xl font-semibold text-terminal-text">
        Deploying to Production
      </h2>

      <p className="text-terminal-text/70">
        For production deployments, consider:
      </p>

      <ul className="space-y-2 text-terminal-text/70">
        <li>Using a reverse proxy (nginx, Caddy) for SSL termination</li>
        <li>Implementing proper user authentication</li>
        <li>Running the server in a container (Docker)</li>
        <li>Using process managers (PM2, systemd)</li>
      </ul>

      <CodeBlock
        code={`# Example Docker deployment
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 2222
CMD ["npm", "run", "server"]`}
        language="dockerfile"
        filename="Dockerfile"
      />
    </article>
  );
}
