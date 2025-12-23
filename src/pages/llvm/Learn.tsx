import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { BookOpen, ChevronRight, Play, CheckCircle } from 'lucide-react'

export default function LLVMLearn() {
  return (
    <>
      <Helmet>
        <title>Learn LLVM Tools | Univrs Learn</title>
        <meta name="description" content="Quick start guide and tutorials for the LLVM Translation MCP Server." />
      </Helmet>

      {/* Hero */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm mb-6" style={{ color: 'var(--soft-gray)' }}>
            <Link to="/llvm" className="hover:text-univrs-secondary-400 transition-colors">LLVM</Link>
            <ChevronRight className="w-4 h-4" />
            <span style={{ color: 'var(--text-primary)' }}>Learn</span>
          </div>
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-10 h-10" style={{ color: 'var(--glow-gold)' }} />
            <h1 className="text-3xl sm:text-4xl font-light" style={{ color: 'var(--text-primary)' }}>
              Quick Start
            </h1>
          </div>
          <p className="text-xl max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
            Get up and running with LLVM Translation in 5 minutes.
          </p>
        </div>
      </section>

      {/* Prerequisites */}
      <section className="py-12" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-light mb-6" style={{ color: 'var(--text-primary)' }}>Prerequisites</h2>
          <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)' }}>
            <pre className="p-6 text-sm font-mono overflow-x-auto" style={{ color: 'var(--glow-gold)' }}>
{`# Verify Julia is installed
julia --version

# Verify Rust is installed
rustc --version

# Optional: Verify Zig (for testing translated code)
zig version`}
            </pre>
          </div>
        </div>
      </section>

      {/* Build */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-light mb-6" style={{ color: 'var(--text-primary)' }}>Build the Server</h2>
          <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
            <pre className="p-6 text-sm font-mono overflow-x-auto" style={{ color: 'var(--glow-gold)' }}>
{`cd llvm-translation-mcp
cargo build --release`}
            </pre>
          </div>
          <p className="mt-4 text-sm" style={{ color: 'var(--soft-gray)' }}>
            Creates the binary at <code>target/release/llvm-mcp-server</code>
          </p>
        </div>
      </section>

      {/* Run Example */}
      <section className="py-16" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-light mb-6" style={{ color: 'var(--text-primary)' }}>Run Example Translation</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <Play className="w-5 h-5" style={{ color: 'var(--glow-gold)' }} />
                <h3 className="font-normal" style={{ color: 'var(--text-primary)' }}>Option A: Demo Client</h3>
              </div>
              <div className="rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                <pre className="p-4 text-sm font-mono overflow-x-auto" style={{ color: 'var(--glow-gold)' }}>
{`chmod +x demo_client.py
python3 demo_client.py`}
                </pre>
              </div>
              <p className="mt-3 text-sm" style={{ color: 'var(--soft-gray)' }}>
                Starts server, extracts LLVM IR, translates to Zig and Rust
              </p>
            </div>
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <Play className="w-5 h-5" style={{ color: 'var(--glow-gold)' }} />
                <h3 className="font-normal" style={{ color: 'var(--text-primary)' }}>Option B: Manual Testing</h3>
              </div>
              <div className="rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                <pre className="p-4 text-sm font-mono overflow-x-auto" style={{ color: 'var(--glow-gold)' }}>
{`# Terminal 1
cargo run --bin llvm-mcp-server

# Terminal 2
julia examples/optimizer.jl`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Claude Desktop Integration */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-light mb-6" style={{ color: 'var(--text-primary)' }}>Claude Desktop Integration</h2>
          <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
            Add to your Claude Desktop config:
          </p>
          <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
            <div className="px-4 py-2" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <span className="text-xs font-mono" style={{ color: 'var(--soft-gray)' }}>claude_desktop_config.json</span>
            </div>
            <pre className="p-6 text-sm font-mono overflow-x-auto" style={{ color: 'var(--glow-gold)' }}>
{`{
  "mcpServers": {
    "llvm-translation": {
      "command": "/path/to/llvm-mcp-server",
      "args": ["--julia-path", "/usr/local/bin/julia"]
    }
  }
}`}
            </pre>
          </div>
          <div className="mt-4 grid sm:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2" style={{ color: 'var(--soft-gray)' }}>
              <CheckCircle className="w-4 h-4" style={{ color: 'var(--glow-cyan)' }} />
              <span>macOS: ~/Library/Application Support/Claude/</span>
            </div>
            <div className="flex items-center gap-2" style={{ color: 'var(--soft-gray)' }}>
              <CheckCircle className="w-4 h-4" style={{ color: 'var(--glow-cyan)' }} />
              <span>Windows: %APPDATA%\Claude\</span>
            </div>
            <div className="flex items-center gap-2" style={{ color: 'var(--soft-gray)' }}>
              <CheckCircle className="w-4 h-4" style={{ color: 'var(--glow-cyan)' }} />
              <span>Linux: ~/.config/Claude/</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Reference */}
      <section className="py-16" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-light mb-6" style={{ color: 'var(--text-primary)' }}>Quick Reference</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <th className="py-3 px-4" style={{ color: 'var(--text-primary)' }}>Command</th>
                  <th className="py-3 px-4" style={{ color: 'var(--text-primary)' }}>Purpose</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['cargo build --release', 'Build optimized binary'],
                  ['cargo run', 'Run in development mode'],
                  ['python3 demo_client.py', 'Run demo'],
                  ['julia examples/optimizer.jl', 'Test Julia original'],
                  ['zig build-exe examples/optimizer.zig', 'Compile Zig translation'],
                  ['rustc examples/optimizer.rs', 'Compile Rust translation'],
                ].map(([cmd, purpose]) => (
                  <tr key={cmd} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td className="py-3 px-4">
                      <code style={{ color: 'var(--glow-gold)' }}>{cmd}</code>
                    </td>
                    <td className="py-3 px-4" style={{ color: 'var(--text-secondary)' }}>{purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  )
}
