import { ExternalLink, Github } from 'lucide-react'

const repos = [
  {
    name: 'metadol',
    description: 'Design Ontology Language compiler and stdlib',
    href: 'https://github.com/univrs/metadol',
    language: 'Rust',
  },
  {
    name: 'llvm-translation-mcp',
    description: 'LLVM translation tools with MCP server',
    href: 'https://github.com/univrs/llvm-translation-mcp',
    language: 'TypeScript',
  },
  {
    name: 'univrs-skills',
    description: 'Skills framework and catalog',
    href: 'https://github.com/univrs/univrs-skills',
    language: 'TypeScript',
  },
  {
    name: 'univrs-network',
    description: 'Decentralized network dashboard',
    href: 'https://github.com/univrs/univrs-network',
    language: 'TypeScript',
  },
  {
    name: 'RustOrchestration',
    description: 'Multi-agent orchestration framework',
    href: 'https://github.com/univrs/RustOrchestration',
    language: 'Rust',
  },
]

const languageColors: Record<string, string> = {
  Rust: 'bg-orange-500',
  TypeScript: 'bg-blue-500',
}

export default function Ecosystem() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-univrs-text-primary mb-4">
            The Ecosystem
          </h2>
          <p className="text-lg text-univrs-text-secondary max-w-2xl mx-auto">
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
                  <Github className="w-5 h-5 text-univrs-text-muted" />
                  <span className="font-mono text-sm text-univrs-primary-400 group-hover:text-univrs-primary-300 transition-colors">
                    {repo.name}
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-univrs-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-univrs-text-secondary text-sm mb-4">
                {repo.description}
              </p>
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${languageColors[repo.language]}`} />
                <span className="text-xs text-univrs-text-muted">{repo.language}</span>
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
            className="inline-flex items-center gap-2 text-univrs-primary-400 hover:text-univrs-primary-300 transition-colors"
          >
            View all repositories
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
