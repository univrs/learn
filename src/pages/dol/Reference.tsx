import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Code2, ChevronRight } from 'lucide-react'

const keywords = {
  declarations: ['gen', 'trait', 'rule', 'system', 'evo', 'docs', 'fun', 'sex', 'type', 'const', 'module', 'use'],
  deprecated: ['gene', 'constraint', 'evolves', 'exegesis'],
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
        <meta name="description" content="Syntax reference for the Design Ontology Language (DOL) v0.8.2." />
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
            Syntax, keywords, and CLI reference for DOL v0.8.2. There is no formal language specification yet; the lexer and parser source in univrs/dol are the reference.
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
              { title: 'Docs Required', desc: 'Every declaration should include a docs block (enforced by dol-check --require-exegesis)' },
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
{`gen scheduling.resources {
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

docs {
    The scheduling.resources gen defines the comprehensive resource model
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
    resource_feasibility_check requires cpu_capacity
    resource_feasibility_check requires memory_capacity

    each filter is deterministic
    each filter is parallelizable
    each filter is stateless

    filter requires node_pool
    filter emits eligible_nodes
}

docs {
    The scheduling filter trait defines the first phase of pod scheduling:
    node filtering. It eliminates nodes that cannot satisfy workload
    requirements, reducing the search space for scoring and selection.
}`}
              </pre>
            </div>
            <p className="mt-3 text-sm" style={{ color: 'var(--soft-gray)' }}>
              Allowed statements: <code>uses</code>, <code>has</code>, <code>is</code>, <code>requires</code>, <code>emits</code>, <code>matches</code>, <code>never</code>, plus quantifiers <code>each</code>/<code>all</code>/<code>no</code>
            </p>
          </div>

          {/* Constraint */}
          <div className="mb-12">
            <h3 className="text-xl font-normal mb-4" style={{ color: 'var(--spore-purple)' }}>Rule Declarations</h3>
            <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
              Rules (formerly <code>constraint</code>, now deprecated) declare invariants that must always hold true in the system.
            </p>
            <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
              <pre className="p-6 text-sm font-mono overflow-x-auto" style={{ color: 'var(--spore-purple)' }}>
{`rule scheduling.feasibility {
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
    binding_conflict emits reschedule
}

docs {
    The scheduling.feasibility rule defines invariants for pod placement.
    A node cannot accept a pod if capacity is exceeded, status is not ready,
    taints lack matching tolerations, or anti-affinity rules are violated.
}`}
              </pre>
            </div>
            <p className="mt-3 text-sm" style={{ color: 'var(--soft-gray)' }}>
              Allowed statements: <code>never</code>, <code>requires</code>, <code>has</code>, <code>is</code>, <code>emits</code>, <code>matches</code>
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

docs {
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
            The DOL toolchain provides command-line utilities for parsing, validating, testing, and code generation. Install them with <code>cargo install dol --features cli</code>. Note: in v0.8.2, <code>dol-parse</code> and <code>dol-check</code> only read the first declaration of each file; anything after it is not checked.
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

# JSON output for tooling
dol-parse --format json examples/genes/container.exists.dol

# Process a directory recursively
dol-parse -r examples/`}
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
                      <td className="py-2 px-3"><code style={{ color: 'var(--glow-cyan)' }}>-f, --format &lt;format&gt;</code></td>
                      <td className="py-2 px-3" style={{ color: 'var(--text-secondary)' }}>Output format: pretty, json, compact, or debug (default: pretty)</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td className="py-2 px-3"><code style={{ color: 'var(--glow-cyan)' }}>-r, --recursive</code></td>
                      <td className="py-2 px-3" style={{ color: 'var(--text-secondary)' }}>Recursively process directories</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td className="py-2 px-3"><code style={{ color: 'var(--glow-cyan)' }}>--validate</code></td>
                      <td className="py-2 px-3" style={{ color: 'var(--text-secondary)' }}>Validate only, don't output AST</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td className="py-2 px-3"><code style={{ color: 'var(--glow-cyan)' }}>--ci</code></td>
                      <td className="py-2 px-3" style={{ color: 'var(--text-secondary)' }}>CI mode: minimal output, exit code indicates success/failure</td>
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
  "files": [
    {
      "path": "examples/genes/container.exists.dol",
      "success": true,
      "declaration_type": "gene",
      "name": "container.exists"
    }
  ],
  "summary": {
    "total": 1,
    "successful": 1,
    "failed": 0
  }
}`}
                </pre>
              </div>
            </div>
          </div>

          {/* dol-check */}
          <div className="mb-12">
            <h3 className="text-xl font-normal mb-4" style={{ color: 'var(--glow-gold)' }}>dol-check</h3>
            <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
              Validate DOL files and check docs (exegesis) coverage, for CI pipelines and pre-commit hooks. Type errors are not enforced in v0.8.2, even with <code>--typecheck</code>.
            </p>

            <div className="mb-4">
              <h4 className="text-sm font-normal uppercase tracking-wide mb-3" style={{ color: 'var(--soft-gray)' }}>
                Basic Usage
              </h4>
              <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-subtle)' }}>
                <pre className="p-4 text-sm font-mono overflow-x-auto" style={{ color: 'var(--text-primary)' }}>
{`# Check all files in a directory
dol-check examples/

# Treat warnings as errors
dol-check --strict src/*.dol

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
                      <td className="py-2 px-3" style={{ color: 'var(--text-secondary)' }}>Treat warnings as errors</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td className="py-2 px-3"><code style={{ color: 'var(--glow-gold)' }}>--require-exegesis</code></td>
                      <td className="py-2 px-3" style={{ color: 'var(--text-secondary)' }}>Require docs (exegesis) blocks to be present and non-empty</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td className="py-2 px-3"><code style={{ color: 'var(--glow-gold)' }}>--ci</code></td>
                      <td className="py-2 px-3" style={{ color: 'var(--text-secondary)' }}>CI mode: exit code only, minimal output</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td className="py-2 px-3"><code style={{ color: 'var(--glow-gold)' }}>-f, --format &lt;format&gt;</code></td>
                      <td className="py-2 px-3" style={{ color: 'var(--text-secondary)' }}>Output format: pretty, json, or compact (default: pretty)</td>
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
{`✗ examples/minimal-test/Spirit.dol:2
  Parse error: invalid declaration type 'spirit' at line 2, column 1 (...)
⚠ examples/v0.8/functions.dol
  'Vector3' has no exegesis

Summary
  Files:    121
  Passed:   105
  Failed:   16
  Warnings: 103`}
                </pre>
              </div>
            </div>
          </div>

          {/* dol-codegen */}
          <div className="mb-12">
            <h3 className="text-xl font-normal mb-4" style={{ color: 'var(--spore-purple)' }}>dol-codegen</h3>
            <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
              Generate code from DOL specifications. Targets: Rust, TypeScript and JSON Schema. Output quality varies; not all generated Rust compiles standalone.
            </p>

            <div className="mb-4">
              <h4 className="text-sm font-normal uppercase tracking-wide mb-3" style={{ color: 'var(--soft-gray)' }}>
                Basic Usage
              </h4>
              <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-subtle)' }}>
                <pre className="p-4 text-sm font-mono overflow-x-auto" style={{ color: 'var(--text-primary)' }}>
{`# Write Rust to a file
dol-codegen hello.dol -o hello.rs

# Target Rust code (default, printed to stdout)
dol-codegen --target rust src/domain.dol

# Target TypeScript
dol-codegen --target typescript src/domain.dol

# Target JSON Schema
dol-codegen --target jsonschema src/domain.dol`}
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
                      <td className="py-2 px-3"><code style={{ color: 'var(--spore-purple)' }}>-t, --target &lt;target&gt;</code></td>
                      <td className="py-2 px-3" style={{ color: 'var(--text-secondary)' }}>Target language: rust, typescript, or jsonschema (default: rust)</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td className="py-2 px-3"><code style={{ color: 'var(--spore-purple)' }}>-o, --output &lt;file&gt;</code></td>
                      <td className="py-2 px-3" style={{ color: 'var(--text-secondary)' }}>Output file (defaults to stdout)</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td className="py-2 px-3"><code style={{ color: 'var(--spore-purple)' }}>-r, --recursive</code></td>
                      <td className="py-2 px-3" style={{ color: 'var(--text-secondary)' }}>Recursively process directories</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td className="py-2 px-3"><code style={{ color: 'var(--spore-purple)' }}>--derive &lt;list&gt;</code></td>
                      <td className="py-2 px-3" style={{ color: 'var(--text-secondary)' }}>Include derive macros (Rust only)</td>
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
{`/// The container gen defines the essential properties of a container in
/// the Univrs platform. ...
#[derive(Debug, Clone, PartialEq)]
pub struct ContainerExists {
    pub identity: String,
    pub status: String,
    pub boundaries: String,
    pub resources: String,
    pub image: String,
}`}
                </pre>
              </div>
            </div>
          </div>

          {/* dol-test */}
          <div className="mb-12">
            <h3 className="text-xl font-normal mb-4" style={{ color: 'var(--text-primary)' }}>dol-test</h3>
            <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
              Generate Rust test code from .dol.test files (it does not run the tests; use <code>cargo test</code> for that).
            </p>

            <div className="mb-4">
              <h4 className="text-sm font-normal uppercase tracking-wide mb-3" style={{ color: 'var(--soft-gray)' }}>
                Basic Usage
              </h4>
              <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-subtle)' }}>
                <pre className="p-4 text-sm font-mono overflow-x-auto" style={{ color: 'var(--text-primary)' }}>
{`# Generate tests into the default directory (tests/generated)
dol-test examples/container.lifecycle.dol.test

# Generate into a specific directory
dol-test -o tests/ examples/container.lifecycle.dol.test

# Validate test files without generating
dol-test validate examples/

# Show what would be generated (dry run)
dol-test plan examples/`}
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
                      <td className="py-2 px-3"><code>-o, --output &lt;dir&gt;</code></td>
                      <td className="py-2 px-3" style={{ color: 'var(--text-secondary)' }}>Output directory for generated tests (default: tests/generated)</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td className="py-2 px-3"><code>-s, --stubs</code></td>
                      <td className="py-2 px-3" style={{ color: 'var(--text-secondary)' }}>Generate stub tests only (unimplemented!() bodies)</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td className="py-2 px-3"><code>-f, --force</code></td>
                      <td className="py-2 px-3" style={{ color: 'var(--text-secondary)' }}>Overwrite existing generated files</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td className="py-2 px-3"><code>-q, --quiet</code></td>
                      <td className="py-2 px-3" style={{ color: 'var(--text-secondary)' }}>Quiet mode</td>
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
{`✓ examples/container.lifecycle.dol.test → tests/container_lifecycle_dol.rs

Summary
  Generated: 1`}
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
