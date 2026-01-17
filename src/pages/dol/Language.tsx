import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { BookText, ChevronRight } from 'lucide-react'

const primitiveTypes = [
  { type: 'i8', description: 'Signed 8-bit integer', rust: 'i8', range: '-128 to 127' },
  { type: 'i16', description: 'Signed 16-bit integer', rust: 'i16', range: '-32,768 to 32,767' },
  { type: 'i32', description: 'Signed 32-bit integer', rust: 'i32', range: '-2^31 to 2^31-1' },
  { type: 'i64', description: 'Signed 64-bit integer', rust: 'i64', range: '-2^63 to 2^63-1' },
  { type: 'u8', description: 'Unsigned 8-bit integer', rust: 'u8', range: '0 to 255' },
  { type: 'u16', description: 'Unsigned 16-bit integer', rust: 'u16', range: '0 to 65,535' },
  { type: 'u32', description: 'Unsigned 32-bit integer', rust: 'u32', range: '0 to 2^32-1' },
  { type: 'u64', description: 'Unsigned 64-bit integer', rust: 'u64', range: '0 to 2^64-1' },
  { type: 'f32', description: 'IEEE 754 single-precision', rust: 'f32', range: '±3.4E38' },
  { type: 'f64', description: 'IEEE 754 double-precision', rust: 'f64', range: '±1.7E308' },
  { type: 'bool', description: 'Boolean value', rust: 'bool', range: 'true | false' },
  { type: 'string', description: 'UTF-8 encoded text', rust: 'String', range: 'Variable length' },
  { type: '()', description: 'Unit type (no value)', rust: '()', range: 'N/A' },
]

const operatorCategories = [
  {
    category: 'Arithmetic',
    operators: [
      { symbol: '+', meaning: 'Addition' },
      { symbol: '-', meaning: 'Subtraction' },
      { symbol: '*', meaning: 'Multiplication' },
      { symbol: '/', meaning: 'Division' },
      { symbol: '%', meaning: 'Modulo (remainder)' },
    ],
  },
  {
    category: 'Comparison',
    operators: [
      { symbol: '==', meaning: 'Equal to' },
      { symbol: '!=', meaning: 'Not equal to' },
      { symbol: '<', meaning: 'Less than' },
      { symbol: '>', meaning: 'Greater than' },
      { symbol: '<=', meaning: 'Less than or equal' },
      { symbol: '>=', meaning: 'Greater than or equal' },
    ],
  },
  {
    category: 'Logic',
    operators: [
      { symbol: '&&', meaning: 'Logical AND' },
      { symbol: '||', meaning: 'Logical OR' },
      { symbol: 'not', meaning: 'Logical NOT' },
      { symbol: 'implies', meaning: 'Logical implication' },
    ],
  },
  {
    category: 'Composition',
    operators: [
      { symbol: '|>', meaning: 'Pipe (forward composition)' },
      { symbol: '>>', meaning: 'Function composition' },
    ],
  },
  {
    category: 'Meta',
    operators: [
      { symbol: "'", meaning: 'Quote (defer evaluation)' },
      { symbol: '!', meaning: 'Evaluate quoted expression' },
      { symbol: '#', meaning: 'Macro invocation' },
      { symbol: '?', meaning: 'Reflection/introspection' },
    ],
  },
]

export default function DOLLanguage() {
  return (
    <>
      <Helmet>
        <title>DOL Language Guide | Univrs Learn</title>
        <meta
          name="description"
          content="Complete language guide for DOL v0.8.0 syntax including declarations, types, generics, operators, and control flow."
        />
      </Helmet>

      {/* Hero */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm mb-6" style={{ color: 'var(--soft-gray)' }}>
            <Link to="/dol" className="hover:text-univrs-primary-400 transition-colors">
              DOL
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span style={{ color: 'var(--text-primary)' }}>Language</span>
          </div>
          <div className="flex items-center gap-3 mb-6">
            <BookText className="w-10 h-10" style={{ color: 'var(--glow-cyan)' }} />
            <h1 className="text-3xl sm:text-4xl font-light" style={{ color: 'var(--text-primary)' }}>
              DOL Language Guide
            </h1>
          </div>
          <p className="text-xl max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
            Complete reference for DOL v0.8.0 syntax, covering declarations, types, generics, operators, and control flow.
          </p>
        </div>
      </section>

      {/* Module System */}
      <section className="py-12" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-light mb-6" style={{ color: 'var(--text-primary)' }}>
            Module System
          </h2>

          {/* Module Declaration */}
          <div className="mb-8">
            <h3 className="text-xl font-normal mb-4" style={{ color: 'var(--glow-cyan)' }}>
              Module Declaration
            </h3>
            <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
              Every DOL file begins with a module declaration specifying its namespace and version.
            </p>
            <div
              className="rounded-xl overflow-hidden"
              style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)' }}
            >
              <pre className="p-6 text-sm font-mono overflow-x-auto" style={{ color: 'var(--glow-cyan)' }}>
                {`module container.lifecycle @ 1.0.0

// Module contents follow...`}
              </pre>
            </div>
          </div>

          {/* Use Statements */}
          <div className="mb-8">
            <h3 className="text-xl font-normal mb-4" style={{ color: 'var(--glow-cyan)' }}>
              Use Statements
            </h3>
            <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
              Import declarations from other modules with explicit or wildcard imports.
            </p>
            <div
              className="rounded-xl overflow-hidden"
              style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)' }}
            >
              <pre className="p-6 text-sm font-mono overflow-x-auto" style={{ color: 'var(--glow-cyan)' }}>
                {`// Import specific items
use container.{ exists, lifecycle }

// Import all items from a module
use identity.*

// Nested imports
use system.orchestration.{ scheduler, allocator }`}
              </pre>
            </div>
          </div>

          {/* Visibility */}
          <div className="mb-8">
            <h3 className="text-xl font-normal mb-4" style={{ color: 'var(--glow-cyan)' }}>
              Visibility Modifiers
            </h3>
            <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
              Control which declarations are visible to other modules.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="card">
                <code className="text-sm" style={{ color: 'var(--glow-cyan)' }}>
                  pub
                </code>
                <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
                  Public to all modules
                </p>
              </div>
              <div className="card">
                <code className="text-sm" style={{ color: 'var(--glow-cyan)' }}>
                  pub(spirit)
                </code>
                <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
                  Public within the same spirit (crate)
                </p>
              </div>
              <div className="card">
                <code className="text-sm" style={{ color: 'var(--glow-cyan)' }}>
                  pub(parent)
                </code>
                <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
                  Public to parent module only
                </p>
              </div>
            </div>
            <div
              className="rounded-xl overflow-hidden mt-4"
              style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)' }}
            >
              <pre className="p-6 text-sm font-mono overflow-x-auto" style={{ color: 'var(--glow-cyan)' }}>
                {`pub gen container.exists @ 1.0.0 { /* ... */ }

pub(spirit) trait internal.helper @ 0.1.0 { /* ... */ }

pub(parent) rule local.invariant @ 1.0.0 { /* ... */ }`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Core Declarations */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-light mb-8" style={{ color: 'var(--text-primary)' }}>
            Core Declarations
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-normal mb-3" style={{ color: 'var(--glow-cyan)' }}>
                gen
              </h3>
              <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
                Atomic type definitions with fields and rules. Cannot be decomposed further.
              </p>
              <code className="text-xs" style={{ color: 'var(--soft-gray)' }}>
                gen name @ version &#123; /* statements */ &#125;
              </code>
            </div>

            <div className="card">
              <h3 className="text-lg font-normal mb-3" style={{ color: 'var(--glow-gold)' }}>
                trait
              </h3>
              <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
                Interface contracts defining methods and behavioral laws. Composable capabilities.
              </p>
              <code className="text-xs" style={{ color: 'var(--soft-gray)' }}>
                trait name @ version &#123; /* behaviors */ &#125;
              </code>
            </div>

            <div className="card">
              <h3 className="text-lg font-normal mb-3" style={{ color: 'var(--spore-purple)' }}>
                rule
              </h3>
              <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
                Named invariants that must always hold. Express business rules and system guarantees.
              </p>
              <code className="text-xs" style={{ color: 'var(--soft-gray)' }}>
                rule name @ version &#123; /* invariants */ &#125;
              </code>
            </div>

            <div className="card">
              <h3 className="text-lg font-normal mb-3" style={{ color: 'var(--text-primary)' }}>
                system
              </h3>
              <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
                Top-level compositions bringing together traits with version requirements.
              </p>
              <code className="text-xs" style={{ color: 'var(--soft-gray)' }}>
                system name @ version &#123; /* requirements */ &#125;
              </code>
            </div>

            <div className="card">
              <h3 className="text-lg font-normal mb-3" style={{ color: 'var(--glow-cyan)' }}>
                evo
              </h3>
              <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
                Version migrations defining how declarations change over time.
              </p>
              <code className="text-xs" style={{ color: 'var(--soft-gray)' }}>
                evo name from X.Y.Z to X.Y.Z+1 &#123; /* changes */ &#125;
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Type System */}
      <section className="py-16" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-light mb-8" style={{ color: 'var(--text-primary)' }}>
            Type System
          </h2>

          <h3 className="text-xl font-normal mb-6" style={{ color: 'var(--glow-cyan)' }}>
            Primitive Types
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-subtle)' }}>
                  <th className="py-3 px-4" style={{ color: 'var(--text-primary)' }}>
                    DOL Type
                  </th>
                  <th className="py-3 px-4" style={{ color: 'var(--text-primary)' }}>
                    Description
                  </th>
                  <th className="py-3 px-4" style={{ color: 'var(--text-primary)' }}>
                    Rust Equivalent
                  </th>
                  <th className="py-3 px-4" style={{ color: 'var(--text-primary)' }}>
                    Range
                  </th>
                </tr>
              </thead>
              <tbody>
                {primitiveTypes.map((t) => (
                  <tr key={t.type} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td className="py-3 px-4">
                      <code style={{ color: 'var(--glow-cyan)' }}>{t.type}</code>
                    </td>
                    <td className="py-3 px-4" style={{ color: 'var(--text-secondary)' }}>
                      {t.description}
                    </td>
                    <td className="py-3 px-4">
                      <code style={{ color: 'var(--glow-gold)' }}>{t.rust}</code>
                    </td>
                    <td className="py-3 px-4" style={{ color: 'var(--soft-gray)' }}>
                      {t.range}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-normal mb-4" style={{ color: 'var(--glow-cyan)' }}>
              Collection Types
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="card">
                <code className="text-sm" style={{ color: 'var(--glow-cyan)' }}>
                  Vec&lt;T&gt;
                </code>
                <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
                  Ordered sequence of elements
                </p>
              </div>
              <div className="card">
                <code className="text-sm" style={{ color: 'var(--glow-cyan)' }}>
                  Set&lt;T&gt;
                </code>
                <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
                  Unordered collection of unique elements
                </p>
              </div>
              <div className="card">
                <code className="text-sm" style={{ color: 'var(--glow-cyan)' }}>
                  Map&lt;K, V&gt;
                </code>
                <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
                  Key-value associations
                </p>
              </div>
              <div className="card">
                <code className="text-sm" style={{ color: 'var(--glow-cyan)' }}>
                  Option&lt;T&gt;
                </code>
                <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
                  Optional value (Some or None)
                </p>
              </div>
              <div className="card">
                <code className="text-sm" style={{ color: 'var(--glow-cyan)' }}>
                  Result&lt;T, E&gt;
                </code>
                <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
                  Success or error value
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Generics */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-light mb-8" style={{ color: 'var(--text-primary)' }}>
            Generics
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-normal mb-4" style={{ color: 'var(--glow-cyan)' }}>
                Simple Generic
              </h3>
              <div
                className="rounded-xl overflow-hidden"
                style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
              >
                <pre className="p-6 text-sm font-mono overflow-x-auto" style={{ color: 'var(--glow-cyan)' }}>
                  {`gen Container<T> @ 1.0.0 {
    has items: Vec<T>
    has capacity: u64
}`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-normal mb-4" style={{ color: 'var(--glow-cyan)' }}>
                Bounded Generic
              </h3>
              <div
                className="rounded-xl overflow-hidden"
                style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
              >
                <pre className="p-6 text-sm font-mono overflow-x-auto" style={{ color: 'var(--glow-cyan)' }}>
                  {`gen SortedList<T: Comparable> @ 1.0.0 {
    has items: Vec<T>
    is sorted
}`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-normal mb-4" style={{ color: 'var(--glow-cyan)' }}>
                Default Type Parameter
              </h3>
              <div
                className="rounded-xl overflow-hidden"
                style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
              >
                <pre className="p-6 text-sm font-mono overflow-x-auto" style={{ color: 'var(--glow-cyan)' }}>
                  {`gen Buffer<T = u8> @ 1.0.0 {
    has data: Vec<T>
    has size: u64
}`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-normal mb-4" style={{ color: 'var(--glow-cyan)' }}>
                Nested Generics
              </h3>
              <div
                className="rounded-xl overflow-hidden"
                style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
              >
                <pre className="p-6 text-sm font-mono overflow-x-auto" style={{ color: 'var(--glow-cyan)' }}>
                  {`gen Cache<K, V> @ 1.0.0 {
    has store: Map<K, Option<V>>
    has history: Vec<Result<V, Error>>
}`}
                </pre>
              </div>
            </div>
          </div>

          <div className="mt-8 card" style={{ borderColor: 'var(--glow-cyan)', borderWidth: '1px' }}>
            <h3 className="text-lg font-normal mb-3" style={{ color: 'var(--glow-cyan)' }}>
              Multiple Constraints
            </h3>
            <div
              className="rounded-xl overflow-hidden"
              style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)' }}
            >
              <pre className="p-6 text-sm font-mono overflow-x-auto" style={{ color: 'var(--glow-cyan)' }}>
                {`trait Serializable<T: Clone + Hash + Eq> @ 1.0.0 {
    fun to_bytes(value: T) -> Vec<u8>
    fun from_bytes(bytes: Vec<u8>) -> Option<T>
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Operators */}
      <section className="py-16" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-light mb-8" style={{ color: 'var(--text-primary)' }}>
            Operators
          </h2>

          <div className="space-y-8">
            {operatorCategories.map((category) => (
              <div key={category.category}>
                <h3 className="text-xl font-normal mb-4" style={{ color: 'var(--glow-cyan)' }}>
                  {category.category}
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                        <th className="py-3 px-4 w-32" style={{ color: 'var(--text-primary)' }}>
                          Operator
                        </th>
                        <th className="py-3 px-4" style={{ color: 'var(--text-primary)' }}>
                          Meaning
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.operators.map((op) => (
                        <tr key={op.symbol} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                          <td className="py-3 px-4">
                            <code className="text-base" style={{ color: 'var(--glow-cyan)' }}>
                              {op.symbol}
                            </code>
                          </td>
                          <td className="py-3 px-4" style={{ color: 'var(--text-secondary)' }}>
                            {op.meaning}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>

          {/* Operator Examples */}
          <div className="mt-8">
            <h3 className="text-xl font-normal mb-4" style={{ color: 'var(--glow-cyan)' }}>
              Operator Examples
            </h3>
            <div
              className="rounded-xl overflow-hidden"
              style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)' }}
            >
              <pre className="p-6 text-sm font-mono overflow-x-auto" style={{ color: 'var(--glow-cyan)' }}>
                {`// Arithmetic
total = price * quantity + tax

// Comparison
is_valid = age >= 18 && status == "active"

// Logic
can_proceed = has_permission && not is_blocked

// Pipe (function composition)
result = data
    |> validate
    |> transform
    |> persist

// Implication
invariant requires active implies running`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Control Flow */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-light mb-8" style={{ color: 'var(--text-primary)' }}>
            Control Flow
          </h2>

          <div className="space-y-8">
            {/* Conditionals */}
            <div>
              <h3 className="text-xl font-normal mb-4" style={{ color: 'var(--glow-cyan)' }}>
                Conditionals
              </h3>
              <div
                className="rounded-xl overflow-hidden"
                style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
              >
                <pre className="p-6 text-sm font-mono overflow-x-auto" style={{ color: 'var(--glow-cyan)' }}>
                  {`// If-else expression
result = if x > 0 {
    positive()
} else if x < 0 {
    negative()
} else {
    zero()
}

// Inline conditional
value = if ready { proceed() } else { wait() }`}
                </pre>
              </div>
            </div>

            {/* Pattern Matching */}
            <div>
              <h3 className="text-xl font-normal mb-4" style={{ color: 'var(--glow-cyan)' }}>
                Pattern Matching
              </h3>
              <div
                className="rounded-xl overflow-hidden"
                style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
              >
                <pre className="p-6 text-sm font-mono overflow-x-auto" style={{ color: 'var(--glow-cyan)' }}>
                  {`// Match on enum variants
result = match status {
    Running {
        continue()
    }
    Stopped {
        restart()
    }
    Failed(error) {
        log(error)
        recover()
    }
    _ {
        log("unknown state")
    }
}

// Match on values
response = match code {
    200 { "OK" }
    404 { "Not Found" }
    500 { "Server Error" }
    _ { "Unknown" }
}`}
                </pre>
              </div>
            </div>

            {/* Loops */}
            <div>
              <h3 className="text-xl font-normal mb-4" style={{ color: 'var(--glow-cyan)' }}>
                Loops
              </h3>
              <div
                className="rounded-xl overflow-hidden"
                style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
              >
                <pre className="p-6 text-sm font-mono overflow-x-auto" style={{ color: 'var(--glow-cyan)' }}>
                  {`// For loop (iteration)
for item in items {
    process(item)
}

// While loop
while active && not done {
    tick()
    check_status()
}

// Infinite loop with break
loop {
    work = get_next_task()
    if work.is_none() {
        break
    }
    execute(work)
}

// Continue to next iteration
for x in numbers {
    if x < 0 {
        continue
    }
    sum = sum + x
}`}
                </pre>
              </div>
            </div>

            {/* Guards and Filters */}
            <div>
              <h3 className="text-xl font-normal mb-4" style={{ color: 'var(--glow-cyan)' }}>
                Guards and Filters
              </h3>
              <div
                className="rounded-xl overflow-hidden"
                style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
              >
                <pre className="p-6 text-sm font-mono overflow-x-auto" style={{ color: 'var(--glow-cyan)' }}>
                  {`// Pattern matching with guards
match value {
    x if x > 100 { "large" }
    x if x > 10 { "medium" }
    _ { "small" }
}

// Filter in comprehensions
evens = [x for x in numbers if x % 2 == 0]

// Conditional iteration
for user in users if user.active {
    notify(user)
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Function Definitions */}
      <section className="py-16" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-light mb-8" style={{ color: 'var(--text-primary)' }}>
            Function Definitions
          </h2>

          <div className="space-y-6">
            <div
              className="rounded-xl overflow-hidden"
              style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)' }}
            >
              <pre className="p-6 text-sm font-mono overflow-x-auto" style={{ color: 'var(--glow-cyan)' }}>
                {`// Pure function
fun add(x: i64, y: i64) -> i64 {
    return x + y
}

// Generic function
fun first<T>(items: Vec<T>) -> Option<T> {
    if items.is_empty() {
        None
    } else {
        Some(items[0])
    }
}

// Function with rules
fun sort<T: Comparable>(items: Vec<T>) -> Vec<T> {
    // implementation
}

// Effectful function (IO/side effects)
sex fun print_message(msg: string) {
    vudo_print(msg)
}

// Effect block in pure function
fun compute_with_log(x: i64) -> i64 {
    let result = x * 2
    sex {
        vudo_print("computed: " + result.to_string())
    }
    return result
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-light mb-8" style={{ color: 'var(--text-primary)' }}>
            Best Practices
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-normal mb-3" style={{ color: 'var(--glow-cyan)' }}>
                Naming Conventions
              </h3>
              <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <li>Use lowercase with dots for modules: <code>container.lifecycle</code></li>
                <li>Use PascalCase for types: <code>ContainerState</code></li>
                <li>Use snake_case for functions and variables: <code>get_status</code></li>
                <li>Use SCREAMING_SNAKE_CASE for constants: <code>MAX_CAPACITY</code></li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-lg font-normal mb-3" style={{ color: 'var(--glow-cyan)' }}>
                Type Safety
              </h3>
              <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <li>Prefer specific types over generic ones</li>
                <li>Use <code>Option&lt;T&gt;</code> instead of nullable types</li>
                <li>Use <code>Result&lt;T, E&gt;</code> for fallible operations</li>
                <li>Leverage type inference where clear</li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-lg font-normal mb-3" style={{ color: 'var(--glow-cyan)' }}>
                Documentation
              </h3>
              <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <li>Every declaration must include docs</li>
                <li>Document public APIs with triple-quoted strings</li>
                <li>Explain the "why" not just the "what"</li>
                <li>Include examples in documentation</li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-lg font-normal mb-3" style={{ color: 'var(--glow-cyan)' }}>
                Versioning
              </h3>
              <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <li>Follow semantic versioning (major.minor.patch)</li>
                <li>Use <code>evo</code> declarations for breaking changes</li>
                <li>Document migration paths</li>
                <li>Deprecate before removing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
