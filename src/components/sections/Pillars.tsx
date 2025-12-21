import { Link } from 'react-router-dom'
import { FileCode, Cpu, Puzzle, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const pillars = [
  {
    name: 'Design Ontology Language',
    shortName: 'DOL',
    description: 'A specification language for systems that know what they should be. Write specs first. Generate tests. Implement with confidence.',
    href: '/dol',
    icon: FileCode,
    color: 'from-univrs-primary-500 to-univrs-primary-700',
    features: ['Genes & Traits', 'Constraints', 'Systems', 'Exegesis'],
  },
  {
    name: 'LLVM Translation Tools',
    shortName: 'LLVM',
    description: 'Bridge high-level intent to low-level execution. Analyze, translate, and optimize code across languages and platforms.',
    href: '/llvm',
    icon: Cpu,
    color: 'from-univrs-secondary-500 to-univrs-secondary-700',
    features: ['MCP Server', 'Claude Flow', 'Multi-language', 'Optimization'],
  },
  {
    name: 'Skills Framework',
    shortName: 'Skills',
    description: 'Composable capabilities for AI agents and systems. Discover, use, and create modular capability modules.',
    href: '/skills',
    icon: Puzzle,
    color: 'from-purple-500 to-pink-600',
    features: ['SKILL.md Spec', 'Catalog', 'Composable', 'AI-Ready'],
  },
]

export default function Pillars() {
  return (
    <section className="py-24 bg-univrs-bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-univrs-text-primary mb-4">
            Three Pillars of Univrs
          </h2>
          <p className="text-lg text-univrs-text-secondary max-w-2xl mx-auto">
            A complete ecosystem for building intelligent, specification-driven systems.
          </p>
        </div>

        {/* Pillar cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar) => (
            <Link
              key={pillar.shortName}
              to={pillar.href}
              className="group card hover:scale-[1.02] transition-all duration-300"
            >
              {/* Icon */}
              <div className={cn(
                'w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-6',
                pillar.color
              )}>
                <pillar.icon className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-univrs-text-primary mb-2 group-hover:text-univrs-primary-400 transition-colors">
                {pillar.name}
              </h3>
              <p className="text-univrs-text-muted mb-6">
                {pillar.description}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-6">
                {pillar.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-2 py-1 text-xs rounded-md bg-univrs-bg-tertiary text-univrs-text-secondary"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* Link */}
              <div className="flex items-center text-univrs-primary-400 text-sm font-medium">
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
