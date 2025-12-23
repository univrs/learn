import { ExternalLink, Github } from 'lucide-react'

const repos = [
  {
    name: 'metadol',
    description: 'Design Ontology Language compiler and stdlib',
    href: 'https://github.com/univrs/metadol',
    language: 'Rust',
    color: '#f97316',
  },
  {
    name: 'llvm-translation-mcp',
    description: 'LLVM translation tools with MCP server',
    href: 'https://github.com/univrs/llvm-translation-mcp',
    language: 'TypeScript',
    color: '#3b82f6',
  },
  {
    name: 'univrs-skills',
    description: 'Skills framework and catalog',
    href: 'https://github.com/univrs/univrs-skills',
    language: 'TypeScript',
    color: '#3b82f6',
  },
  {
    name: 'univrs-network',
    description: 'Decentralized network dashboard',
    href: 'https://github.com/univrs/univrs-network',
    language: 'TypeScript',
    color: '#3b82f6',
  },
  {
    name: 'RustOrchestration',
    description: 'Multi-agent orchestration framework',
    href: 'https://github.com/univrs/RustOrchestration',
    language: 'Rust',
    color: '#f97316',
  },
]

export default function Ecosystem() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl font-light mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            The Ecosystem
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Open-source tools that work together to create intelligent, self-aware systems.
          </p>
        </div>

        {/* Repos grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo) => (
            <a
              key={repo.name}
              href={repo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="card group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Github
                    className="w-5 h-5"
                    style={{ color: 'var(--soft-gray)' }}
                  />
                  <span
                    className="font-mono text-sm transition-colors"
                    style={{ color: 'var(--glow-cyan)' }}
                  >
                    {repo.name}
                  </span>
                </div>
                <ExternalLink
                  className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: 'var(--soft-gray)' }}
                />
              </div>
              <p
                className="text-sm mb-4"
                style={{ color: 'var(--text-secondary)' }}
              >
                {repo.description}
              </p>
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: repo.color }}
                />
                <span
                  className="text-xs"
                  style={{ color: 'var(--soft-gray)' }}
                >
                  {repo.language}
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* View all link */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/univrs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition-colors"
            style={{ color: 'var(--glow-cyan)' }}
          >
            View all repositories
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
