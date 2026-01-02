import { Helmet } from 'react-helmet-async'
import { CheckCircle2, Circle, Rocket, Cpu, Sprout } from 'lucide-react'
import MilestoneTracker from '../components/MilestoneTracker'

interface Milestone {
  name: string
  status: 'complete' | 'in-progress' | 'planned'
  metric?: string
}

const year1Milestones: Milestone[] = [
  { name: 'DOL 2.0 Specification', status: 'complete' },
  { name: 'Lexer + Parser', status: 'complete', metric: '157 tests' },
  { name: 'Type Checker', status: 'complete', metric: '87 tests' },
  { name: 'Effect Inference', status: 'complete', metric: '24 tests' },
  { name: 'Rust Codegen', status: 'complete', metric: '24 tests' },
  { name: 'Self-Hosting (v0.2.3)', status: 'complete', metric: '1532 tests' },
  { name: 'DOL v0.6.0 + WASM Pipeline', status: 'complete', metric: 'HIR + MLIR + WASM' },
]

const year2Milestones: Milestone[] = [
  { name: 'VUDO VM Sandbox', status: 'complete', metric: '158 tests' },
  { name: 'Spirit Runtime', status: 'complete', metric: '50 tests' },
  { name: 'Spirit Registry', status: 'complete', metric: 'QueryBuilder API' },
  { name: 'Linker Integration', status: 'complete', metric: '15 host functions' },
  { name: 'vudo CLI', status: 'complete', metric: '15 commands + REPL' },
]

const year25Milestones: Milestone[] = [
  { name: 'MLIR Dialect Definition', status: 'planned' },
  { name: 'HIR → MLIR Lowering', status: 'planned' },
  { name: 'MLIR → WASM Emission', status: 'planned' },
  { name: 'VUDO VM Integration', status: 'planned' },
  { name: 'MCP Server for AI Integration', status: 'planned' },
]

const year3Milestones: Milestone[] = [
  { name: 'Full Bootstrap (DOL→DOL→WASM)', status: 'planned' },
  { name: 'Spirit Runtime in WASM', status: 'planned' },
  { name: 'Mycelial Credits System', status: 'planned' },
  { name: 'Spirit Marketplace', status: 'planned' },
  { name: 'Imaginarium Platform', status: 'planned' },
]

function MilestoneItem({ milestone }: { milestone: Milestone }) {
  const statusColors = {
    complete: 'text-univrs-primary-400',
    'in-progress': 'text-yellow-400',
    planned: 'text-univrs-text-muted',
  }

  const StatusIcon = milestone.status === 'complete' ? CheckCircle2 : Circle

  return (
    <div className="flex items-start gap-3 py-2">
      <StatusIcon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${statusColors[milestone.status]}`} />
      <div className="flex-1">
        <div className="flex items-baseline justify-between gap-4">
          <span className={milestone.status === 'complete' ? 'text-univrs-text-primary' : 'text-univrs-text-secondary'}>
            {milestone.name}
          </span>
          {milestone.metric && (
            <span className="text-sm text-univrs-text-muted whitespace-nowrap">
              {milestone.metric}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Roadmap() {
  return (
    <>
      <Helmet>
        <title>Roadmap | Univrs Learn</title>
        <meta name="description" content="VUDO OS 3-Year Roadmap: From language specification to self-aware computing platform." />
      </Helmet>

      {/* Hero */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-univrs-text-primary mb-6">
              VUDO OS <span className="gradient-text">3-Year Roadmap</span>
            </h1>
            <p className="text-xl sm:text-2xl text-univrs-text-secondary mb-4">
              Building the future of ontology-first development
            </p>
            <p className="text-lg text-univrs-text-muted">
              From specification language to self-aware computing platform. A systematic journey
              toward machine intelligence that understands its own structure.
            </p>
          </div>
        </div>
      </section>

      {/* Year 1: Genesis */}
      <section className="py-16 bg-univrs-bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-univrs-primary-400 to-univrs-secondary-400 flex items-center justify-center">
                    <Rocket className="w-6 h-6 text-univrs-bg-primary" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-light text-univrs-text-primary">Year 1</h2>
                    <p className="text-sm text-univrs-text-muted">2024-2025</p>
                  </div>
                </div>
                <h3 className="text-2xl font-light text-univrs-primary-400 mb-2">Genesis</h3>
                <p className="text-univrs-text-secondary italic mb-6">
                  "The language that writes itself"
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-univrs-primary-400/10 border border-univrs-primary-400/30">
                  <CheckCircle2 className="w-3 h-3 text-univrs-primary-400" />
                  <span className="text-sm text-univrs-primary-400 font-medium">COMPLETE</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="card">
                <div className="space-y-1">
                  {year1Milestones.map((milestone, idx) => (
                    <MilestoneItem key={idx} milestone={milestone} />
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-univrs-text-muted/20">
                  <p className="text-sm text-univrs-text-secondary">
                    <strong className="text-univrs-text-primary">Focus:</strong> Complete DOL toolchain with lexer, parser, type checker, and code generation.
                    Achieve self-hosting where DOL specifications can generate the DOL compiler itself.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Year 2: Manifestation */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-univrs-secondary-400 to-purple-500 flex items-center justify-center">
                    <Cpu className="w-6 h-6 text-univrs-bg-primary" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-light text-univrs-text-primary">Year 2</h2>
                    <p className="text-sm text-univrs-text-muted">2025-2026</p>
                  </div>
                </div>
                <h3 className="text-2xl font-light text-univrs-secondary-400 mb-2">Manifestation</h3>
                <p className="text-univrs-text-secondary italic mb-6">
                  "The machine that runs Spirits"
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-univrs-secondary-400/10 border border-univrs-secondary-400/30">
                  <CheckCircle2 className="w-3 h-3 text-univrs-secondary-400" />
                  <span className="text-sm text-univrs-secondary-400 font-medium">COMPLETE</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="card">
                <div className="space-y-1">
                  {year2Milestones.map((milestone, idx) => (
                    <MilestoneItem key={idx} milestone={milestone} />
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-univrs-text-muted/20">
                  <p className="text-sm text-univrs-text-secondary">
                    <strong className="text-univrs-text-primary">Delivered:</strong> VUDO VM with WASM sandbox, 6-state lifecycle, capability enforcement,
                    fuel metering. Spirit Runtime with manifest parsing, semantic versioning, Ed25519 signatures. Full CLI with REPL.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Year 2.5: DOL v0.5.0 */}
      <section className="py-16 bg-univrs-bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                    <Cpu className="w-6 h-6 text-univrs-bg-primary" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-light text-univrs-text-primary">v0.5.0</h2>
                    <p className="text-sm text-univrs-text-muted">2025</p>
                  </div>
                </div>
                <h3 className="text-2xl font-light text-cyan-400 mb-2">Compilation</h3>
                <p className="text-univrs-text-secondary italic mb-6">
                  "From HIR to WASM"
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30">
                  <Circle className="w-3 h-3 text-yellow-400" />
                  <span className="text-sm text-yellow-400 font-medium">NEXT</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="card">
                <div className="space-y-1">
                  {year25Milestones.map((milestone, idx) => (
                    <MilestoneItem key={idx} milestone={milestone} />
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-univrs-text-muted/20">
                  <p className="text-sm text-univrs-text-secondary">
                    <strong className="text-univrs-text-primary">Focus:</strong> MLIR dialect for DOL, lowering HIR to MLIR,
                    emitting WASM binaries for Spirit packages. Full integration with VUDO VM for execution.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Year 3: Emergence */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Sprout className="w-6 h-6 text-univrs-bg-primary" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-light text-univrs-text-primary">Year 3</h2>
                    <p className="text-sm text-univrs-text-muted">2026-2027</p>
                  </div>
                </div>
                <h3 className="text-2xl font-light text-purple-400 mb-2">Emergence</h3>
                <p className="text-univrs-text-secondary italic mb-6">
                  "The garden that grows itself"
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-univrs-text-muted/10 border border-univrs-text-muted/30">
                  <Circle className="w-3 h-3 text-univrs-text-muted" />
                  <span className="text-sm text-univrs-text-muted font-medium">PLANNED</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="card">
                <div className="space-y-1">
                  {year3Milestones.map((milestone, idx) => (
                    <MilestoneItem key={idx} milestone={milestone} />
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-univrs-text-muted/20">
                  <p className="text-sm text-univrs-text-secondary">
                    <strong className="text-univrs-text-primary">Focus:</strong> Full bootstrap where DOL compiles DOL to WASM.
                    Launch ecosystem economy with Mycelial Credits and Spirit Marketplace.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Highlights */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light text-univrs-text-primary mb-8 text-center">
            Why <span className="gradient-text">VUDO OS</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card">
              <div className="text-3xl mb-3">🧬</div>
              <h3 className="text-lg font-normal text-univrs-text-primary mb-2">First-Mover Advantage</h3>
              <p className="text-sm text-univrs-text-muted">
                First ontology-first DSL with formal semantics. No competing platforms in this space.
              </p>
            </div>
            <div className="card">
              <div className="text-3xl mb-3">🔬</div>
              <h3 className="text-lg font-normal text-univrs-text-primary mb-2">Proven Technology</h3>
              <p className="text-sm text-univrs-text-muted">
                1,705+ passing tests across lexer, parser, type checker, HIR, validation, and codegen. Production-ready v0.6.0.
              </p>
            </div>
            <div className="card">
              <div className="text-3xl mb-3">🌐</div>
              <h3 className="text-lg font-normal text-univrs-text-primary mb-2">Ecosystem Potential</h3>
              <p className="text-sm text-univrs-text-muted">
                Marketplace, credits system, and distributed computing unlock network effects and revenue streams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Milestone Tracker */}
      <MilestoneTracker />

      {/* Technical Progress */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light text-univrs-text-primary mb-8 text-center">
            Technical <span className="gradient-text">Progress</span>
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="card">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-light text-univrs-primary-400 mb-2">1,705+</div>
                  <div className="text-sm text-univrs-text-muted">DOL Tests Passing</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-light text-univrs-secondary-400 mb-2">v0.6.0</div>
                  <div className="text-sm text-univrs-text-muted">DOL + WASM Pipeline</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-light text-univrs-primary-400 mb-2">498</div>
                  <div className="text-sm text-univrs-text-muted">Unit Tests (src/)</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-light text-univrs-secondary-400 mb-2">1,159</div>
                  <div className="text-sm text-univrs-text-muted">Integration Tests</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="card max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-light text-univrs-text-primary mb-4">
              Join the Journey
            </h2>
            <p className="text-univrs-text-secondary mb-6">
              VUDO OS is building the future of self-aware computing. From formal specifications
              to distributed intelligence, we're creating tools that understand themselves.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://github.com/univrs/dol"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                View on GitHub
              </a>
              <a href="/about" className="btn-secondary">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
