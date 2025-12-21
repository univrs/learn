import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Wrench, ChevronRight, Zap, Code, FileCode, BarChart } from 'lucide-react'

const tools = [
  {
    name: 'translate_julia_to_zig',
    description: 'Translate Julia code to Zig with optimizer patterns',
    icon: Code,
    params: ['julia_code', 'function_name (optional)', 'optimize'],
  },
  {
    name: 'translate_julia_to_rust',
    description: 'Translate Julia code to idiomatic Rust with ownership patterns',
    icon: Code,
    params: ['julia_code', 'optimize'],
  },
  {
    name: 'extract_llvm_ir',
    description: 'Get LLVM IR for inspection and learning',
    icon: FileCode,
    params: ['julia_code'],
  },
  {
    name: 'analyze_translation',
    description: 'Get translation recommendations and compatibility checks',
    icon: BarChart,
    params: ['julia_code', 'target_language'],
  },
]

export default function LLVMTools() {
  return (
    <>
      <Helmet>
        <title>LLVM Tools | Univrs Learn</title>
        <meta name="description" content="MCP server tools for code translation using LLVM IR." />
      </Helmet>

      {/* Hero */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm mb-6" style={{ color: 'var(--soft-gray)' }}>
            <Link to="/llvm" className="hover:text-univrs-secondary-400 transition-colors">LLVM</Link>
            <ChevronRight className="w-4 h-4" />
            <span style={{ color: 'var(--text-primary)' }}>Tools</span>
          </div>
          <div className="flex items-center gap-3 mb-6">
            <Wrench className="w-10 h-10" style={{ color: 'var(--glow-gold)' }} />
            <h1 className="text-3xl sm:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
              MCP Tools
            </h1>
          </div>
          <p className="text-xl max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
            Model Context Protocol tools for code translation.
          </p>
        </div>
      </section>

      {/* Architecture */}
      <section className="py-12" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Translation Flow</h2>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-mono">
            {['Julia Code', 'LLVM IR', 'Analysis', 'Code Gen', 'Zig/Rust'].map((step, i) => (
              <div key={step} className="flex items-center gap-4">
                <div className="px-4 py-2 rounded-lg" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--glow-gold)' }}>
                  {step}
                </div>
                {i < 4 && <Zap className="w-4 h-4" style={{ color: 'var(--border-subtle)' }} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Tools */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>Available Tools</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {tools.map((tool) => (
              <div key={tool.name} className="card">
                <div className="flex items-start gap-4">
                  <tool.icon className="w-6 h-6 flex-shrink-0" style={{ color: 'var(--glow-gold)' }} />
                  <div>
                    <h3 className="font-mono font-semibold mb-2" style={{ color: 'var(--glow-gold)' }}>
                      {tool.name}
                    </h3>
                    <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
                      {tool.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {tool.params.map((param) => (
                        <code
                          key={param}
                          className="text-xs px-2 py-1 rounded"
                          style={{ backgroundColor: 'var(--border-subtle)', color: 'var(--soft-gray)' }}
                        >
                          {param}
                        </code>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example Request */}
      <section className="py-16" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Example Request</h2>
          <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)' }}>
            <div className="px-4 py-2" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <span className="text-xs font-mono" style={{ color: 'var(--soft-gray)' }}>JSON-RPC</span>
            </div>
            <pre className="p-6 text-sm font-mono overflow-x-auto" style={{ color: 'var(--glow-gold)' }}>
{`{
  "name": "translate_julia_to_zig",
  "arguments": {
    "julia_code": "function add(a::Int, b::Int)\\n  a + b\\nend",
    "optimize": true
  }
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Capabilities</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              'Type mapping (i64, f64, ptr, arrays)',
              'Pattern recognition (loops, SIMD)',
              'Memory operations',
              'Control flow analysis',
            ].map((cap) => (
              <div key={cap} className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{cap}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
