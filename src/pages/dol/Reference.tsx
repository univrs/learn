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
{`gene scheduling.resources {
    // Node-level resource capacity
    node has cpu_capacity
    node has memory_capacity
    node has gpu_capacity

    // Container resource requests and limits
    container has cpu_request
    container has memory_request
    container has cpu_limit
    container has memory_limit

    // Resource derivation relationships
    allocatable derives from capacity
    allocatable derives from reserved

    // Resource quality constraints
    each cpu_capacity is quantifiable
    each cpu_capacity is non_negative
    each cpu_capacity is measured_in millicores

    each request is non_negative
    each limit is non_negative
    each limit is_greater_than_or_equal_to request

    // Resource compressibility
    cpu is compressible
    memory is incompressible
}

exegesis {
    The scheduling.resources gene defines the comprehensive resource model
    for container orchestration. CPU is measured in millicores (1000m = 1 core),
    memory in bytes. Compressible resources (CPU) are throttled when exceeded;
    incompressible resources (memory) cause OOM-kill.
}`}
              </pre>
            </div>
            <p className="mt-3 text-sm" style={{ color: 'var(--soft-gray)' }}>
              Allowed statements: <code>has</code>, <code>is</code>, <code>derives from</code>, <code>requires</code>, <code>each</code>
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
{`trait scheduling.filter {
    uses scheduling.resources
    uses scheduling.nodes

    filter has predicates
    filter has node_pool
    filter has eligible_nodes

    predicate has node_selector
    predicate has node_affinity
    predicate has tolerations

    toleration has key
    toleration has operator
    toleration has value
    toleration has effect

    filter has resource_feasibility_check
    resource_feasibility_check validates cpu_capacity
    resource_feasibility_check validates memory_capacity

    each filter is deterministic
    each filter is parallelizable
    each filter is stateless

    filter requires node_pool
    filter produces eligible_nodes

    filter phase precedes scoring_phase
    filter phase reduces search_space
}

exegesis {
    The scheduling filter trait defines the first phase of pod scheduling:
    node filtering. It eliminates nodes that cannot satisfy workload
    requirements, reducing the search space for scoring and selection.
}`}
              </pre>
            </div>
            <p className="mt-3 text-sm" style={{ color: 'var(--soft-gray)' }}>
              Allowed statements: <code>uses</code>, <code>has</code>, <code>is</code>, <code>validates</code>, <code>requires</code>, <code>produces</code>, <code>each</code>
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
{`constraint scheduling.feasibility {
    node_capacity never exceeded
    node_status requires ready
    resource_requests is bounded_by_limits

    anti_affinity_rules has enforcement
    enforcement is hard
    enforcement is soft

    pod_spreading has topology_constraint
    topology_constraint requires domain_key

    taints requires matching_tolerations
    matching_tolerations has operator
    operator is equal
    operator is present

    volume_affinity requires available_zone

    pod_priority is comparable
    preemption requires lower_priority_target

    scheduling_decision is atomic
    scheduling_decision requires validation
    binding_conflict triggers reschedule
}

exegesis {
    The scheduling.feasibility constraint defines invariants for pod placement.
    A node cannot accept a pod if capacity is exceeded, status is not ready,
    taints lack matching tolerations, or anti-affinity rules are violated.
}`}
              </pre>
            </div>
            <p className="mt-3 text-sm" style={{ color: 'var(--soft-gray)' }}>
              Allowed statements: <code>never</code>, <code>requires</code>, <code>has</code>, <code>is</code>, <code>triggers</code>
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
{`system scheduling.scheduler @0.1.0 {
    requires scheduling.resources >= 0.0.1
    requires scheduling.filter >= 0.0.1
    requires scheduling.score >= 0.0.1
    requires scheduling.select >= 0.0.1
    requires scheduling.bind >= 0.0.1

    uses state.concurrency
    uses event.emission
    uses error.handling
}

exegesis {
    The scheduling.scheduler system composes the complete pod scheduling
    pipeline: filter -> score -> select -> bind. Given a pending pod and
    available nodes, the scheduler determines optimal placement satisfying
    resource constraints, affinity rules, and system-wide objectives.
}`}
              </pre>
            </div>
            <p className="mt-3 text-sm" style={{ color: 'var(--soft-gray)' }}>
              Allowed statements: <code>requires</code> (with version constraints), <code>uses</code>
            </p>
          </div>
        </div>
      </section>

      {/* CLI Reference */}
      <section className="py-16" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-light mb-8" style={{ color: 'var(--text-primary)' }}>CLI Reference</h2>
          <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
            The DOL toolchain provides command-line utilities for parsing, validating, testing, and code generation.
          </p>

          {/* dol-parse */}
          <div className="mb-12">
            <h3 className="text-xl font-normal mb-4" style={{ color: 'var(--glow-cyan)' }}>dol-parse</h3>
            <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
              Parse DOL source files and validate syntax. Outputs structured AST representation in various formats.
            </p>

            <div className="mb-4">
              <h4 className="text-sm font-normal uppercase tracking-wide mb-3" style={{ color: 'var(--soft-gray)' }}>
                Basic Usage
              </h4>
              <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-subtle)' }}>
                <pre className="p-4 text-sm font-mono overflow-x-auto" style={{ color: 'var(--text-primary)' }}>
{`# Parse a single file
dol-parse examples/genes/container.exists.dol

# Output as JSON AST
dol-parse --format json examples/genes/container.exists.dol

# Output as Rust code
dol-parse --format rust examples/genes/container.exists.dol`}
                </pre>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-normal uppercase tracking-wide mb-3" style={{ color: 'var(--soft-gray)' }}>
                Options
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <th className="py-2 px-3" style={{ color: 'var(--text-primary)' }}>Option</th>
                      <th className="py-2 px-3" style={{ color: 'var(--text-primary)' }}>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td className="py-2 px-3"><code style={{ color: 'var(--glow-cyan)' }}>--format &lt;type&gt;</code></td>
                      <td className="py-2 px-3" style={{ color: 'var(--text-secondary)' }}>Output format: json, rust, or pretty (default: pretty)</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td className="py-2 px-3"><code style={{ color: 'var(--glow-cyan)' }}>-o, --output</code></td>
                      <td className="py-2 px-3" style={{ color: 'var(--text-secondary)' }}>Write output to file instead of stdout</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td className="py-2 px-3"><code style={{ color: 'var(--glow-cyan)' }}>-v, --verbose</code></td>
                      <td className="py-2 px-3" style={{ color: 'var(--text-secondary)' }}>Show detailed parsing information</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-normal uppercase tracking-wide mb-3" style={{ color: 'var(--soft-gray)' }}>
                Example Output
              </h4>
              <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-subtle)' }}>
                <pre className="p-4 text-sm font-mono overflow-x-auto" style={{ color: 'var(--glow-cyan)' }}>
{`{
  "declaration": "Gene",
  "name": "container.exists",
  "version": "1.0.0",
  "exegesis": "A container is the fundamental unit...",
  "statements": [
    { "type": "Has", "property": "identity", "value_type": "string" },
    { "type": "Has", "property": "state", "value_type": "ContainerState" },
    { "type": "Is", "predicate": "entity" }
  ]
}`}
                </pre>
              </div>
            </div>
          </div>

          {/* dol-check */}
          <div className="mb-12">
            <h3 className="text-xl font-normal mb-4" style={{ color: 'var(--glow-gold)' }}>dol-check</h3>
            <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
              Type check and validate constraints across DOL files. Perfect for CI/CD pipelines and pre-commit hooks.
            </p>

            <div className="mb-4">
              <h4 className="text-sm font-normal uppercase tracking-wide mb-3" style={{ color: 'var(--soft-gray)' }}>
                Basic Usage
              </h4>
              <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-subtle)' }}>
                <pre className="p-4 text-sm font-mono overflow-x-auto" style={{ color: 'var(--text-primary)' }}>
{`# Check all files in a directory
dol-check examples/

# Check with glob pattern
dol-check --strict src/**/*.dol

# Require exegesis on all declarations
dol-check --require-exegesis *.dol

# CI mode (exit 1 on any error)
dol-check --ci examples/`}
                </pre>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-normal uppercase tracking-wide mb-3" style={{ color: 'var(--soft-gray)' }}>
                Options
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <th className="py-2 px-3" style={{ color: 'var(--text-primary)' }}>Option</th>
                      <th className="py-2 px-3" style={{ color: 'var(--text-primary)' }}>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td className="py-2 px-3"><code style={{ color: 'var(--glow-gold)' }}>--strict</code></td>
                      <td className="py-2 px-3" style={{ color: 'var(--text-secondary)' }}>Enable all validation rules, fail on warnings</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td className="py-2 px-3"><code style={{ color: 'var(--glow-gold)' }}>--require-exegesis</code></td>
                      <td className="py-2 px-3" style={{ color: 'var(--text-secondary)' }}>Fail if any declaration lacks exegesis</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td className="py-2 px-3"><code style={{ color: 'var(--glow-gold)' }}>--ci</code></td>
                      <td className="py-2 px-3" style={{ color: 'var(--text-secondary)' }}>CI mode: minimal output, exit codes for automation</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td className="py-2 px-3"><code style={{ color: 'var(--glow-gold)' }}>--format &lt;type&gt;</code></td>
                      <td className="py-2 px-3" style={{ color: 'var(--text-secondary)' }}>Output format: human, json, or github (default: human)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-normal uppercase tracking-wide mb-3" style={{ color: 'var(--soft-gray)' }}>
                Example Output
              </h4>
              <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-subtle)' }}>
                <pre className="p-4 text-sm font-mono overflow-x-auto" style={{ color: 'var(--glow-gold)' }}>
{`Checking 12 DOL files...

✓ examples/genes/container.exists.dol
✓ examples/traits/container.lifecycle.dol
✗ examples/constraints/invalid.dol
  Error: Missing exegesis (line 1)
  Error: Undefined reference to 'unknown.trait' (line 8)

Summary: 10 passed, 2 failed
Exit code: 1`}
                </pre>
              </div>
            </div>
          </div>

          {/* dol-codegen */}
          <div className="mb-12">
            <h3 className="text-xl font-normal mb-4" style={{ color: 'var(--spore-purple)' }}>dol-codegen</h3>
            <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
              Generate code from DOL specifications. Supports multiple target languages and frameworks.
            </p>

            <div className="mb-4">
              <h4 className="text-sm font-normal uppercase tracking-wide mb-3" style={{ color: 'var(--soft-gray)' }}>
                Basic Usage
              </h4>
              <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-subtle)' }}>
                <pre className="p-4 text-sm font-mono overflow-x-auto" style={{ color: 'var(--text-primary)' }}>
{`# Generate to output directory
dol-codegen hello.dol -o generated/

# Target Rust code
dol-codegen --target rust src/domain.dol

# Target TypeScript interfaces
dol-codegen --target typescript src/domain.dol

# Generate with custom template
dol-codegen --target rust --template custom.hbs src/domain.dol`}
                </pre>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-normal uppercase tracking-wide mb-3" style={{ color: 'var(--soft-gray)' }}>
                Options
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <th className="py-2 px-3" style={{ color: 'var(--text-primary)' }}>Option</th>
                      <th className="py-2 px-3" style={{ color: 'var(--text-primary)' }}>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td className="py-2 px-3"><code style={{ color: 'var(--spore-purple)' }}>--target &lt;lang&gt;</code></td>
                      <td className="py-2 px-3" style={{ color: 'var(--text-secondary)' }}>Target language: rust, typescript, python, go</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td className="py-2 px-3"><code style={{ color: 'var(--spore-purple)' }}>-o, --output</code></td>
                      <td className="py-2 px-3" style={{ color: 'var(--text-secondary)' }}>Output directory for generated files</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td className="py-2 px-3"><code style={{ color: 'var(--spore-purple)' }}>--template</code></td>
                      <td className="py-2 px-3" style={{ color: 'var(--text-secondary)' }}>Custom template file (Handlebars format)</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td className="py-2 px-3"><code style={{ color: 'var(--spore-purple)' }}>--watch</code></td>
                      <td className="py-2 px-3" style={{ color: 'var(--text-secondary)' }}>Watch for changes and regenerate automatically</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-normal uppercase tracking-wide mb-3" style={{ color: 'var(--soft-gray)' }}>
                Example Output (Rust)
              </h4>
              <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-subtle)' }}>
                <pre className="p-4 text-sm font-mono overflow-x-auto" style={{ color: 'var(--spore-purple)' }}>
{`// Generated from container.exists.dol v1.0.0
// A container is the fundamental unit of workload isolation.

pub struct Container {
    pub identity: String,
    pub state: ContainerState,
    pub boundaries: ResourceBoundaries,
}

impl Entity for Container {}
impl Persistent for Container {}`}
                </pre>
              </div>
            </div>
          </div>

          {/* dol-test */}
          <div className="mb-12">
            <h3 className="text-xl font-normal mb-4" style={{ color: 'var(--text-primary)' }}>dol-test</h3>
            <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
              Run DOL test suites and generate test code from .dol.test files.
            </p>

            <div className="mb-4">
              <h4 className="text-sm font-normal uppercase tracking-wide mb-3" style={{ color: 'var(--soft-gray)' }}>
                Basic Usage
              </h4>
              <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-subtle)' }}>
                <pre className="p-4 text-sm font-mono overflow-x-auto" style={{ color: 'var(--text-primary)' }}>
{`# Run all tests in directory
dol-test examples/tests/

# Generate test code
dol-test --output tests/ *.dol.test

# Run specific test file
dol-test examples/traits/container.lifecycle.dol.test

# Watch mode for continuous testing
dol-test --watch examples/tests/`}
                </pre>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-normal uppercase tracking-wide mb-3" style={{ color: 'var(--soft-gray)' }}>
                Options
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <th className="py-2 px-3" style={{ color: 'var(--text-primary)' }}>Option</th>
                      <th className="py-2 px-3" style={{ color: 'var(--text-primary)' }}>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td className="py-2 px-3"><code>--output &lt;dir&gt;</code></td>
                      <td className="py-2 px-3" style={{ color: 'var(--text-secondary)' }}>Generate test files to specified directory</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td className="py-2 px-3"><code>--watch</code></td>
                      <td className="py-2 px-3" style={{ color: 'var(--text-secondary)' }}>Watch for changes and re-run tests</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td className="py-2 px-3"><code>--format &lt;type&gt;</code></td>
                      <td className="py-2 px-3" style={{ color: 'var(--text-secondary)' }}>Output format: pretty, json, junit (default: pretty)</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td className="py-2 px-3"><code>--filter &lt;pattern&gt;</code></td>
                      <td className="py-2 px-3" style={{ color: 'var(--text-secondary)' }}>Run only tests matching pattern</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-normal uppercase tracking-wide mb-3" style={{ color: 'var(--soft-gray)' }}>
                Example Output
              </h4>
              <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-subtle)' }}>
                <pre className="p-4 text-sm font-mono overflow-x-auto" style={{ color: 'var(--text-primary)' }}>
{`Running tests from examples/tests/

test container.lifecycle::creation ... ok
test container.lifecycle::state_transitions ... ok
test container.lifecycle::termination ... ok

Test results: 3 passed, 0 failed
Generated 3 test files to tests/

Time: 0.42s`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Keywords */}
      <section className="py-16">
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
