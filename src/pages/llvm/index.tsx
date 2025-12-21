import { Routes, Route, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Cpu, Wrench, BookOpen, Code2, ArrowRight } from 'lucide-react'
import LLVMLearn from './Learn'
import LLVMTools from './Tools'
import LLVMExamples from './Examples'

const sections = [
  {
    name: 'Tutorials',
    description: 'Step-by-step guides for common tasks',
    href: '/llvm/learn',
    icon: BookOpen,
  },
  {
    name: 'Tools',
    description: 'MCP server and translation tools',
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

function LLVMOverview() {
  return (
    <>
      <Helmet>
        <title>LLVM Translation Tools | Univrs Learn</title>
        <meta name="description" content="Learn the LLVM Translation Tools - bridge high-level intent to low-level execution." />
      </Helmet>

      {/* Hero */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, var(--glow-gold), var(--glow-gold-dim))' }}
              >
                <Cpu className="w-6 h-6" style={{ color: 'var(--void)' }} />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
                LLVM Translation Tools
              </h1>
            </div>
            <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>
              Bridge high-level intent to low-level execution.
            </p>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-16" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>Capabilities</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'MCP Server', desc: 'Model Context Protocol for AI integration' },
              { name: 'Julia → Zig', desc: 'Full support with optimizer patterns' },
              { name: 'Julia → Rust', desc: 'Idiomatic Rust with ownership' },
              { name: 'LLVM IR', desc: 'Direct access to intermediate representation' },
            ].map((cap) => (
              <div key={cap.name} className="card">
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--glow-gold)' }}>{cap.name}</h3>
                <p className="text-sm" style={{ color: 'var(--soft-gray)' }}>{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>Quick Start</h2>
          <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
            <div className="px-4 py-2 flex items-center gap-2" style={{ backgroundColor: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-subtle)' }}>
              <span className="text-xs font-mono" style={{ color: 'var(--soft-gray)' }}>terminal</span>
            </div>
            <pre className="p-6 text-sm font-mono overflow-x-auto" style={{ color: 'var(--glow-gold)' }}>
{`# Build the server
cargo build --release

# Run the demo
python3 demo_client.py

# Or use with Claude Desktop
cargo run --bin llvm-mcp-server`}
            </pre>
          </div>
        </div>
      </section>

      {/* Navigation sections */}
      <section className="py-16" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>Explore LLVM Tools</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {sections.map((section) => (
              <Link
                key={section.name}
                to={section.href}
                className="card group"
              >
                <section.icon className="w-8 h-8 mb-4" style={{ color: 'var(--glow-gold)' }} />
                <h3 className="text-lg font-semibold mb-2 group-hover:opacity-80 transition-opacity" style={{ color: 'var(--text-primary)' }}>
                  {section.name}
                </h3>
                <p className="text-sm mb-4" style={{ color: 'var(--soft-gray)' }}>{section.description}</p>
                <div className="flex items-center text-sm" style={{ color: 'var(--glow-gold)' }}>
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

export default function LLVMIndex() {
  return (
    <Routes>
      <Route index element={<LLVMOverview />} />
      <Route path="learn" element={<LLVMLearn />} />
      <Route path="tools" element={<LLVMTools />} />
      <Route path="examples" element={<LLVMExamples />} />
    </Routes>
  )
}
