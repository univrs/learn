import { useState } from 'react'
import { CheckCircle2, Circle, GitBranch, Cpu, Zap } from 'lucide-react'

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

interface Phase {
  id: string
  name: string
  status: 'complete' | 'active' | 'pending'
  tests: number
  description: string
  deliverables: string[]
}

interface Repository {
  name: string
  url: string
  status: 'stable' | 'active' | 'pending'
  tests: number
}

interface ENRSubsystem {
  name: string
  status: 'complete' | 'active' | 'pending'
  dolLines: number
  formula?: string
}

// User/Adoption metrics - showing the gaps honestly
interface AdoptionMetrics {
  productionDeployments: number
  externalContributors: number
  githubStars: number
  npmDownloads: number
}

// ═══════════════════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════════════════

const phases: Phase[] = [
  {
    id: 'phase1',
    name: 'Phase 1: Parser + Lexer',
    status: 'complete',
    tests: 150,
    description: 'DOL language parsing foundation',
    deliverables: ['Lexer', 'Parser', 'AST', 'Error recovery'],
  },
  {
    id: 'phase2a',
    name: 'Phase 2a: HIR v0.7.0',
    status: 'complete',
    tests: 466,
    description: 'High-level Intermediate Representation',
    deliverables: ['HirModule', 'HirDecl', 'HirExpr', 'Type system'],
  },
  {
    id: 'phase2b',
    name: 'Phase 2b: VUDO VM',
    status: 'complete',
    tests: 402,
    description: 'WebAssembly virtual machine',
    deliverables: ['Wasmtime runtime', 'Sandbox', 'Fuel metering', 'Host functions'],
  },
  {
    id: 'phase2c',
    name: 'Phase 2c: Spirit Runtime',
    status: 'complete',
    tests: 50,
    description: 'Capability-based agent system',
    deliverables: ['Spirit registry', 'Manifest', 'Capabilities', 'Lifecycle'],
  },
  {
    id: 'phase3',
    name: 'Phase 3: MLIR + WASM Pipeline',
    status: 'complete',
    tests: 50,
    description: 'DOL -> HIR -> MLIR -> WASM compilation',
    deliverables: ['MLIR lowering', 'WASM backend', 'add.wasm validated'],
  },
  {
    id: 'phase4a',
    name: 'Phase 4a: Hyphal Network',
    status: 'complete',
    tests: 38,
    description: 'Biology-inspired distributed patterns',
    deliverables: ['Topology', 'Discovery', 'Growth', 'Swarm coordinator'],
  },
  {
    id: 'phase4b',
    name: 'Phase 4b: ENR Economic Layer',
    status: 'active',
    tests: 0,
    description: 'Entropy-Nexus-Revival primitives',
    deliverables: ['Core types', 'Entropy calculator', 'Nexus topology', 'Revival pool'],
  },
]

const repositories: Repository[] = [
  { name: 'univrs-dol', url: 'https://github.com/univrs/univrs-dol', status: 'stable', tests: 454 },
  { name: 'univrs-enr', url: 'https://github.com/univrs/univrs-enr', status: 'active', tests: 0 },
  { name: 'univrs-network', url: 'https://github.com/univrs/univrs-network', status: 'pending', tests: 0 },
  { name: 'univrs-vudo', url: 'https://github.com/univrs/univrs-vudo', status: 'stable', tests: 402 },
]

const enrSubsystems: ENRSubsystem[] = [
  { name: 'Core', status: 'active', dolLines: 529, formula: 'Credits, NodeId, CreditTransfer' },
  { name: 'Entropy', status: 'pending', dolLines: 405, formula: 'S = wn*Sn + wc*Sc + ws*Ss + wt*St' },
  { name: 'Nexus', status: 'pending', dolLines: 525, formula: 'Election, Gradient Aggregation' },
  { name: 'Revival', status: 'pending', dolLines: 521, formula: '40% / 25% / 20% / 15%' },
  { name: 'Septal', status: 'pending', dolLines: 463, formula: 'Circuit Breaker, Woronin' },
  { name: 'Pricing', status: 'pending', dolLines: 651, formula: 'Fixed / Dynamic / Auction' },
]

// Adoption metrics - the gaps we're showing honestly
// "The dashboard shows 6/7 phases. The critique shows 0/1 users."
const adoption: AdoptionMetrics = {
  productionDeployments: 0,
  externalContributors: 0,
  githubStars: 0,
  npmDownloads: 0,
}

// ═══════════════════════════════════════════════════════════════════════════
// STATUS COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

function StatusIcon({ status }: { status: 'complete' | 'active' | 'pending' | 'stable' }) {
  if (status === 'complete' || status === 'stable') {
    return <CheckCircle2 className="w-4 h-4 text-univrs-primary-400 flex-shrink-0" />
  }
  if (status === 'active') {
    return <Circle className="w-4 h-4 text-yellow-400 flex-shrink-0 animate-pulse" />
  }
  return <Circle className="w-4 h-4 text-univrs-text-muted flex-shrink-0" />
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export default function MilestoneTracker() {
  const [activeTab, setActiveTab] = useState<'phases' | 'repos' | 'enr'>('phases')

  const totalTests = phases.reduce((sum, p) => sum + p.tests, 0)
  const completedPhases = phases.filter((p) => p.status === 'complete').length
  const totalDolLines = enrSubsystems.reduce((sum, s) => sum + s.dolLines, 0)

  const tabs = [
    { id: 'phases' as const, label: 'Phases', icon: Cpu },
    { id: 'repos' as const, label: 'Repos', icon: GitBranch },
    { id: 'enr' as const, label: 'ENR', icon: Zap },
  ]

  return (
    <section className="py-16 bg-univrs-bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm tracking-widest uppercase text-univrs-primary-400 mb-4">
            Development Progress
          </p>
          <h2 className="text-3xl sm:text-4xl font-light text-univrs-text-primary mb-4">
            The network is not pipes. It is a{' '}
            <span className="gradient-text">living market</span>.
          </h2>
        </div>

        {/* Builder Stats */}
        <div className="flex flex-wrap justify-center gap-8 sm:gap-16 mb-8">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-light text-univrs-primary-400">
              {completedPhases}/{phases.length}
            </div>
            <div className="text-xs text-univrs-text-muted uppercase tracking-wider mt-1">
              Phases
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-light text-univrs-primary-400">
              {totalTests.toLocaleString()}
            </div>
            <div className="text-xs text-univrs-text-muted uppercase tracking-wider mt-1">
              Tests
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-light text-univrs-secondary-400">
              {totalDolLines.toLocaleString()}
            </div>
            <div className="text-xs text-univrs-text-muted uppercase tracking-wider mt-1">
              DOL Lines
            </div>
          </div>
        </div>

        {/* User/Adoption Stats - showing the gaps honestly */}
        <div className="flex flex-wrap justify-center gap-8 sm:gap-16 mb-12 py-4 border-t border-b border-univrs-text-muted/10">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-light text-univrs-text-muted">
              {adoption.productionDeployments}/1
            </div>
            <div className="text-xs text-univrs-text-muted uppercase tracking-wider mt-1">
              Production
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-light text-univrs-text-muted">
              {adoption.externalContributors}
            </div>
            <div className="text-xs text-univrs-text-muted uppercase tracking-wider mt-1">
              External Contributors
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-light text-univrs-text-muted">
              {adoption.githubStars}
            </div>
            <div className="text-xs text-univrs-text-muted uppercase tracking-wider mt-1">
              GitHub Stars
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm rounded-full border transition-all ${
                activeTab === id
                  ? 'bg-univrs-primary-400/10 border-univrs-primary-400/50 text-univrs-primary-400'
                  : 'border-univrs-text-muted/20 text-univrs-text-secondary hover:border-univrs-text-muted/40'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'phases' && (
            <div className="space-y-4">
              {phases.map((phase) => (
                <div
                  key={phase.id}
                  className="card hover:border-univrs-primary-400/30"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <StatusIcon status={phase.status} />
                    <span className="font-medium text-univrs-text-primary flex-1">
                      {phase.name}
                    </span>
                    <span className="text-xs text-univrs-primary-400 bg-univrs-primary-400/10 px-2 py-1 rounded">
                      {phase.tests} tests
                    </span>
                  </div>
                  <p className="text-sm text-univrs-text-muted mb-3 ml-7">
                    {phase.description}
                  </p>
                  <div className="flex flex-wrap gap-2 ml-7">
                    {phase.deliverables.map((d) => (
                      <span
                        key={d}
                        className="text-xs bg-univrs-bg-tertiary px-2 py-1 rounded text-univrs-text-secondary"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'repos' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {repositories.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card flex items-center gap-3 hover:border-univrs-primary-400/30"
                >
                  <StatusIcon status={repo.status} />
                  <span className="font-mono text-sm text-univrs-text-primary flex-1">
                    {repo.name}
                  </span>
                  <span className="text-xs text-univrs-primary-400">
                    {repo.tests} tests
                  </span>
                </a>
              ))}
            </div>
          )}

          {activeTab === 'enr' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {enrSubsystems.map((sys) => (
                <div key={sys.name} className="card">
                  <div className="flex items-center gap-2 mb-2">
                    <StatusIcon status={sys.status} />
                    <span className="font-medium text-univrs-text-primary">
                      {sys.name}
                    </span>
                  </div>
                  {sys.formula && (
                    <code className="block text-xs text-univrs-primary-400 bg-univrs-primary-400/5 p-2 rounded mb-2 font-mono overflow-hidden text-ellipsis whitespace-nowrap">
                      {sys.formula}
                    </code>
                  )}
                  <span className="text-xs text-univrs-text-muted">
                    {sys.dolLines} DOL lines
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-xs text-univrs-text-muted">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </section>
  )
}
