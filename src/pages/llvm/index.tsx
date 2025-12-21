import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Cpu, Wrench, BookOpen, Code2, ArrowRight } from 'lucide-react'

const sections = [
  {
    name: 'Tutorials',
    description: 'Step-by-step guides for common tasks',
    href: '/llvm/learn',
    icon: BookOpen,
  },
  {
    name: 'Tools',
    description: 'MCP server, Claude Flow, and more',
    href: '/llvm/tools',
    icon: Wrench,
  },
  {
    name: 'Examples',
    description: 'Real-world translation examples',
    href: '/llvm/examples',
    icon: Code2,
  },
]

export default function LLVMIndex() {
  return (
    <>
      <Helmet>
        <title>LLVM Translation Tools | Univrs Learn</title>
        <meta name="description" content="Learn the LLVM Translation Tools - bridge high-level intent to low-level execution with powerful code analysis and translation." />
      </Helmet>

      {/* Hero */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-univrs-secondary-500 to-univrs-secondary-700 flex items-center justify-center">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-univrs-text-primary">
                LLVM Translation Tools
              </h1>
            </div>
            <p className="text-xl text-univrs-text-secondary mb-8">
              Bridge high-level intent to low-level execution. Analyze, translate,
              and optimize code across languages and platforms.
            </p>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-16 bg-univrs-bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-univrs-text-primary mb-8">Capabilities</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'MCP Server', desc: 'Model Context Protocol for AI integration' },
              { name: 'Claude Flow', desc: 'Multi-agent orchestration framework' },
              { name: 'Cross-language', desc: 'Translate between programming languages' },
              { name: 'Optimization', desc: 'LLVM-powered code optimization' },
            ].map((cap) => (
              <div key={cap.name} className="card">
                <h3 className="text-lg font-semibold text-univrs-secondary-400 mb-2">{cap.name}</h3>
                <p className="text-sm text-univrs-text-muted">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-univrs-text-primary mb-8">Quick Start</h2>
          <div className="bg-univrs-bg-secondary rounded-xl border border-white/5 overflow-hidden">
            <div className="px-4 py-2 bg-univrs-bg-tertiary border-b border-white/5 flex items-center gap-2">
              <span className="text-xs text-univrs-text-muted font-mono">terminal</span>
            </div>
            <pre className="p-6 text-sm font-mono text-univrs-secondary-400 overflow-x-auto">
{`# Install the MCP server
npm install -g llvm-translation-mcp

# Start the server
llvm-mcp start

# Or use with Claude Flow
npx claude-flow@alpha start --mcp llvm-translation

# Analyze code
llvm-mcp analyze ./src --output report.json`}
            </pre>
          </div>
        </div>
      </section>

      {/* Navigation sections */}
      <section className="py-16 bg-univrs-bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-univrs-text-primary mb-8">Explore LLVM Tools</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {sections.map((section) => (
              <Link
                key={section.name}
                to={section.href}
                className="card group"
              >
                <section.icon className="w-8 h-8 text-univrs-secondary-400 mb-4" />
                <h3 className="text-lg font-semibold text-univrs-text-primary mb-2 group-hover:text-univrs-secondary-400 transition-colors">
                  {section.name}
                </h3>
                <p className="text-sm text-univrs-text-muted mb-4">{section.description}</p>
                <div className="flex items-center text-sm text-univrs-secondary-400">
                  Explore
                  <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
