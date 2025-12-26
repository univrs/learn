import { Helmet } from 'react-helmet-async'
import { CheckCircle2, Circle, Rocket, Cpu, Sprout } from 'lucide-react'

interface Milestone {
  name: string
  status: 'complete' | 'in-progress' | 'planned'
  metric?: string
}

const year1Milestones: Milestone[] = [
  { name: 'DOL 2.0 Specification', status: 'complete' },
  { name: 'Lexer + Parser', status: 'complete', metric: '157 tests' },
  { name: 'Type Checker', status: 'complete', metric: '87 tests' },
  { name: 'SEX System', status: 'complete', metric: '24 tests' },
  { name: 'Rust Codegen', status: 'complete', metric: '24 tests' },
  { name: 'Self-Hosting (v0.2.2)', status: 'complete', metric: '741+ tests' },
]

const year2Milestones: Milestone[] = [
  { name: 'VUDO VM Architecture', status: 'planned' },
  { name: 'Spirit Execution Engine', status: 'planned' },
  { name: 'Tauri Desktop IDE', status: 'planned' },
  { name: 'P2P Network Protocol', status: 'planned' },
  { name: 'Distributed Computing', status: 'planned' },
]

const year3Milestones: Milestone[] = [
  { name: 'Mycelial Credits System', status: 'planned' },
  { name: 'Spirit Marketplace', status: 'planned' },
  { name: 'Imaginarium Platform', status: 'planned' },
  { name: 'Community Governance', status: 'planned' },
  { name: 'Enterprise Deployment', status: 'planned' },
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
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-univrs-text-muted/10 border border-univrs-text-muted/30">
                  <Circle className="w-3 h-3 text-univrs-text-muted" />
                  <span className="text-sm text-univrs-text-muted font-medium">PLANNED</span>
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
                    <strong className="text-univrs-text-primary">Focus:</strong> Build the VUDO Virtual Machine to execute Spirit specifications.
                    Develop desktop IDE and establish peer-to-peer network for distributed computation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Year 3: Emergence */}
      <section className="py-16 bg-univrs-bg-secondary">
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
                    <strong className="text-univrs-text-primary">Focus:</strong> Launch ecosystem economy with Mycelial Credits.
                    Create marketplace for Spirit trading and collaborative development through the Imaginarium platform.
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
                276 passing tests across lexer, parser, type checker, and SEX system. Production-ready foundation.
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

      {/* Technical Progress */}
      <section className="py-16 bg-univrs-bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light text-univrs-text-primary mb-8 text-center">
            Technical <span className="gradient-text">Progress</span>
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="card">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-light text-univrs-primary-400 mb-2">741+</div>
                  <div className="text-sm text-univrs-text-muted">Total Tests Passing</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-light text-univrs-secondary-400 mb-2">6</div>
                  <div className="text-sm text-univrs-text-muted">Core Systems Complete</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-light text-univrs-primary-400 mb-2">100%</div>
                  <div className="text-sm text-univrs-text-muted">Year 1 Complete</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-light text-univrs-primary-400 mb-2">v0.2.2</div>
                  <div className="text-sm text-univrs-text-muted">Bootstrap Released</div>
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
