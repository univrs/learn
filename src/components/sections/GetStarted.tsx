import { Link } from 'react-router-dom'
import { Terminal, ArrowRight } from 'lucide-react'

const steps = [
  {
    title: 'Learn DOL',
    description: 'Start with the Design Ontology Language to define your system specifications.',
    href: '/dol/learn',
    code: `# Define a system gene
gene Position {
  x: Float
  y: Float
  z: Float
}`,
  },
  {
    title: 'Use LLVM Tools',
    description: 'Leverage the LLVM translation tools for code analysis and optimization.',
    href: '/llvm',
    code: `# Start the MCP server
npx llvm-translation-mcp

# Or use with Claude Flow
claude-flow start`,
  },
  {
    title: 'Create Skills',
    description: 'Build composable capabilities using the Skills framework.',
    href: '/skills/create',
    code: `# SKILL.md structure
name: my-skill
version: 1.0.0
capabilities:
  - code-analysis
  - optimization`,
  },
]

export default function GetStarted() {
  return (
    <section className="py-24 bg-univrs-bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-univrs-text-primary mb-4">
            Quick Start
          </h2>
          <p className="text-lg text-univrs-text-secondary max-w-2xl mx-auto">
            Get up and running with Univrs meta-tools in minutes.
          </p>
        </div>

        {/* Steps */}
        <div className="grid lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="card">
              {/* Step number */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-univrs-primary-500/20 text-univrs-primary-400 flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold text-univrs-text-primary">
                  {step.title}
                </h3>
              </div>

              <p className="text-univrs-text-muted text-sm mb-6">
                {step.description}
              </p>

              {/* Code block */}
              <div className="bg-univrs-bg-primary rounded-lg border border-white/5 p-4 mb-6">
                <div className="flex items-center gap-2 text-univrs-text-muted text-xs mb-3">
                  <Terminal className="w-3 h-3" />
                  <span>Example</span>
                </div>
                <pre className="text-xs text-univrs-secondary-400 font-mono overflow-x-auto">
                  {step.code}
                </pre>
              </div>

              {/* Link */}
              <Link
                to={step.href}
                className="inline-flex items-center text-sm text-univrs-primary-400 hover:text-univrs-primary-300 transition-colors"
              >
                Learn more
                <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
