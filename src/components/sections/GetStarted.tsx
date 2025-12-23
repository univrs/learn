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
    <section
      className="py-24"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl font-light mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Quick Start
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Get up and running with Univrs meta-tools in minutes.
          </p>
        </div>

        {/* Steps */}
        <div className="grid lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="card">
              {/* Step number */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-light"
                  style={{
                    backgroundColor: 'var(--glow-cyan-dim)',
                    color: 'var(--glow-cyan)'
                  }}
                >
                  {index + 1}
                </div>
                <h3
                  className="text-lg font-normal"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {step.title}
                </h3>
              </div>

              <p
                className="text-sm mb-6"
                style={{ color: 'var(--soft-gray)' }}
              >
                {step.description}
              </p>

              {/* Code block */}
              <div
                className="rounded-lg p-4 mb-6"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div
                  className="flex items-center gap-2 text-xs mb-3"
                  style={{ color: 'var(--soft-gray)' }}
                >
                  <Terminal className="w-3 h-3" />
                  <span>Example</span>
                </div>
                <pre
                  className="text-xs font-mono overflow-x-auto"
                  style={{ color: 'var(--spore-purple)' }}
                >
                  {step.code}
                </pre>
              </div>

              {/* Link */}
              <Link
                to={step.href}
                className="inline-flex items-center text-sm transition-colors"
                style={{ color: 'var(--glow-cyan)' }}
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
