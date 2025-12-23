import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Code2, ChevronRight } from 'lucide-react'

const keywords = {
  declarations: ['gene', 'trait', 'constraint', 'system', 'evolves', 'exegesis'],
  predicates: ['has', 'is', 'derives', 'from', 'requires', 'uses', 'emits', 'matches', 'never'],
  evolution: ['adds', 'deprecates', 'removes', 'because'],
  tests: ['test', 'given', 'when', 'then', 'always'],
  quantifiers: ['each', 'all', 'no'],
}

const operators = [
  { symbol: '{ }', meaning: 'Block delimiters' },
  { symbol: '@', meaning: 'Version marker' },
  { symbol: '>', meaning: 'Version greater than' },
  { symbol: '>=', meaning: 'Version greater than or equal' },
  { symbol: '=', meaning: 'Version exact match' },
]

export default function DOLReference() {
  return (
    <>
      <Helmet>
        <title>DOL Reference | Univrs Learn</title>
        <meta name="description" content="Complete language specification and syntax reference for the Design Ontology Language." />
      </Helmet>

      {/* Hero */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm mb-6" style={{ color: 'var(--soft-gray)' }}>
            <Link to="/dol" className="hover:text-univrs-primary-400 transition-colors">DOL</Link>
            <ChevronRight className="w-4 h-4" />
            <span style={{ color: 'var(--text-primary)' }}>Reference</span>
          </div>
          <div className="flex items-center gap-3 mb-6">
            <Code2 className="w-10 h-10" style={{ color: 'var(--glow-cyan)' }} />
            <h1 className="text-3xl sm:text-4xl font-light" style={{ color: 'var(--text-primary)' }}>
              Language Reference
            </h1>
          </div>
          <p className="text-xl max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
            Complete specification of the Metal DOL language syntax, keywords, and semantics.
          </p>
        </div>
      </section>

      {/* Design Principles */}
      <section className="py-12" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-light mb-6" style={{ color: 'var(--text-primary)' }}>Design Principles</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Declarative', desc: 'Describes what things are, not how they work' },
              { title: 'Ontology-First', desc: 'All concepts must be declared before implementation' },
              { title: 'Exegesis Required', desc: 'Every declaration must include human-readable explanation' },
              { title: 'Versioned', desc: 'Changes are tracked through explicit evolution declarations' },
              { title: 'Composable', desc: 'Complex behaviors are built from simple, atomic units' },
            ].map((principle) => (
              <div key={principle.title} className="card">
                <h3 className="font-normal mb-2" style={{ color: 'var(--glow-cyan)' }}>{principle.title}</h3>
                <p className="text-sm" style={{ color: 'var(--soft-gray)' }}>{principle.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Declaration Types */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-light mb-8" style={{ color: 'var(--text-primary)' }}>Declaration Types</h2>

          {/* Gene */}
          <div className="mb-12">
            <h3 className="text-xl font-normal mb-4" style={{ color: 'var(--glow-cyan)' }}>Gene Declarations</h3>
            <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
              Genes are the atomic units of DOL. They declare fundamental truths that cannot be decomposed further.
            </p>
            <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
              <pre className="p-6 text-sm font-mono overflow-x-auto" style={{ color: 'var(--glow-cyan)' }}>
{`gene container.exists @1.0.0 {
    """
    A container is the fundamental unit of workload isolation.
    Every container possesses these four essential properties.
    """

    has identity: string
    has state: ContainerState
    has boundaries: ResourceBoundaries
    is entity
    is persistent
}`}
              </pre>
            </div>
            <p className="mt-3 text-sm" style={{ color: 'var(--soft-gray)' }}>
              Allowed statements: <code>has</code>, <code>is</code>, <code>derives from</code>, <code>requires</code>
            </p>
          </div>

          {/* Trait */}
          <div className="mb-12">
            <h3 className="text-xl font-normal mb-4" style={{ color: 'var(--glow-gold)' }}>Trait Declarations</h3>
            <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
              Traits compose genes and declare behaviors. They represent composable capabilities.
            </p>
            <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
              <pre className="p-6 text-sm font-mono overflow-x-auto" style={{ color: 'var(--glow-gold)' }}>
{`trait container.lifecycle @1.0.0 {
    """
    The container lifecycle defines the state machine that governs
    container execution from creation through termination.
    """

    uses container.exists
    uses identity.cryptographic

    container is created
    container is started
    container is stopped

    each transition emits event
}`}
              </pre>
            </div>
            <p className="mt-3 text-sm" style={{ color: 'var(--soft-gray)' }}>
              Allowed statements: <code>uses</code>, <code>has</code>, <code>is</code>, <code>emits</code>, quantified statements
            </p>
          </div>

          {/* Constraint */}
          <div className="mb-12">
            <h3 className="text-xl font-normal mb-4" style={{ color: 'var(--spore-purple)' }}>Constraint Declarations</h3>
            <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
              Constraints define invariants that must always hold true in the system.
            </p>
            <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
              <pre className="p-6 text-sm font-mono overflow-x-auto" style={{ color: 'var(--spore-purple)' }}>
{`constraint container.integrity @1.0.0 {
    """
    Container integrity constraints ensure runtime state matches
    the declared ontology. Violations indicate system errors.
    """

    state matches declared
    identity never changes
    boundaries never expand
}`}
              </pre>
            </div>
            <p className="mt-3 text-sm" style={{ color: 'var(--soft-gray)' }}>
              Allowed statements: <code>matches</code>, <code>never</code>, <code>has</code>, <code>is</code>
            </p>
          </div>

          {/* System */}
          <div className="mb-12">
            <h3 className="text-xl font-normal mb-4" style={{ color: 'var(--text-primary)' }}>System Declarations</h3>
            <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
              Systems are top-level compositions that bring together traits with version requirements.
            </p>
            <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
              <pre className="p-6 text-sm font-mono overflow-x-auto" style={{ color: 'var(--text-primary)' }}>
{`system univrs.orchestrator @0.1.0 {
    """
    The Univrs orchestrator manages container lifecycles,
    scheduling, and resource allocation across the cluster.
    """

    requires container.lifecycle >= 0.0.2
    requires node.discovery >= 0.0.1
    requires identity.cryptographic = 1.0.0
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Keywords */}
      <section className="py-16" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-light mb-8" style={{ color: 'var(--text-primary)' }}>Reserved Keywords</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(keywords).map(([category, words]) => (
              <div key={category} className="card">
                <h3 className="text-sm font-normal uppercase tracking-wide mb-3" style={{ color: 'var(--soft-gray)' }}>
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {words.map((word) => (
                    <code
                      key={word}
                      className="text-sm px-2 py-1 rounded"
                      style={{ backgroundColor: 'var(--glow-cyan-dim)', color: 'var(--glow-cyan)' }}
                    >
                      {word}
                    </code>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Operators */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-light mb-8" style={{ color: 'var(--text-primary)' }}>Operators and Delimiters</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <th className="py-3 px-4" style={{ color: 'var(--text-primary)' }}>Symbol</th>
                  <th className="py-3 px-4" style={{ color: 'var(--text-primary)' }}>Meaning</th>
                </tr>
              </thead>
              <tbody>
                {operators.map((op) => (
                  <tr key={op.symbol} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td className="py-3 px-4">
                      <code style={{ color: 'var(--glow-cyan)' }}>{op.symbol}</code>
                    </td>
                    <td className="py-3 px-4" style={{ color: 'var(--text-secondary)' }}>{op.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* File Conventions */}
      <section className="py-16" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-light mb-8" style={{ color: 'var(--text-primary)' }}>File Conventions</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="font-normal mb-3" style={{ color: 'var(--glow-cyan)' }}>Source Files</h3>
              <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <li>Use the <code>.dol</code> extension</li>
                <li>Each file contains exactly one primary declaration</li>
                <li>Files are UTF-8 encoded</li>
              </ul>
            </div>
            <div className="card">
              <h3 className="font-normal mb-3" style={{ color: 'var(--glow-gold)' }}>Test Files</h3>
              <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <li>Use the <code>.dol.test</code> extension</li>
                <li>Contain test declarations with given/when/then</li>
                <li>Reference source DOL files</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
