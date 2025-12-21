import { Link } from 'react-router-dom'
import { FileCode, Cpu, Puzzle, ArrowRight } from 'lucide-react'

const pillars = [
  {
    name: 'Design Ontology Language',
    shortName: 'DOL',
    description: 'A specification language for systems that know what they should be. Write specs first. Generate tests. Implement with confidence.',
    href: '/dol',
    icon: FileCode,
    gradient: 'linear-gradient(135deg, var(--glow-cyan), #00b8a0)',
    features: ['Genes & Traits', 'Constraints', 'Systems', 'Exegesis'],
  },
  {
    name: 'LLVM Translation Tools',
    shortName: 'LLVM',
    description: 'Bridge high-level intent to low-level execution. Analyze, translate, and optimize code across languages and platforms.',
    href: '/llvm',
    icon: Cpu,
    gradient: 'linear-gradient(135deg, var(--glow-gold), #e6a800)',
    features: ['MCP Server', 'Claude Flow', 'Multi-language', 'Optimization'],
  },
  {
    name: 'Skills Framework',
    shortName: 'Skills',
    description: 'Composable capabilities for AI agents and systems. Discover, use, and create modular capability modules.',
    href: '/skills',
    icon: Puzzle,
    gradient: 'linear-gradient(135deg, var(--spore-purple), #9d5cf9)',
    features: ['SKILL.md Spec', 'Catalog', 'Composable', 'AI-Ready'],
  },
]

export default function Pillars() {
  return (
    <section
      className="py-24"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Three Pillars of Univrs
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            A complete ecosystem for building intelligent, specification-driven systems.
          </p>
        </div>

        {/* Pillar cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar) => (
            <Link
              key={pillar.shortName}
              to={pillar.href}
              className="group card"
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{ background: pillar.gradient }}
              >
                <pillar.icon className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <h3
                className="text-xl font-semibold mb-2 transition-colors"
                style={{ color: 'var(--text-primary)' }}
              >
                {pillar.name}
              </h3>
              <p
                className="mb-6"
                style={{ color: 'var(--soft-gray)' }}
              >
                {pillar.description}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-6">
                {pillar.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-2 py-1 text-xs rounded-md"
                    style={{
                      backgroundColor: 'var(--forest-floor)',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* Link */}
              <div
                className="flex items-center text-sm font-medium"
                style={{ color: 'var(--glow-cyan)' }}
              >
                Learn more
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
