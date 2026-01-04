import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Code2, ChevronRight, FileCode, Sparkles, Cpu, Layers } from "lucide-react";

const macros = [
    { name: "#derive(Trait, ...)", description: "Generate trait implementations" },
    { name: "#stringify(expr)", description: "Convert expression to string" },
    { name: "#concat(a, b, ...)", description: "Concatenate string literals" },
    { name: "#env(\"VAR\")", description: "Read environment variable (compile-time)" },
    { name: "#cfg(condition)", description: "Conditional compilation" },
    { name: "#assert(cond)", description: "Runtime assertion" },
    { name: "#assert_eq(a, b)", description: "Assert equality" },
    { name: "#format(fmt, ...)", description: "String formatting" },
    { name: "#dbg(expr)", description: "Debug print (returns value)" },
    { name: "#todo(msg)", description: "Mark unimplemented" },
    { name: "#unreachable()", description: "Mark unreachable code" },
    { name: "#file()", description: "Current file name" },
    { name: "#line()", description: "Current line number" },
    { name: "#column()", description: "Current column number" },
    { name: "#vec(a, b, c)", description: "Create a vector literal" },
    { name: "#compile_error(msg)", description: "Trigger compile-time error" },
    { name: "#option_env(\"VAR\")", description: "Optional environment variable" },
    { name: "#module_path()", description: "Current module path" },
];

const operatorPrecedence = [
    { operator: "'", name: "Quote", precedence: 135, associativity: "Prefix" },
    { operator: "!", name: "Eval", precedence: 130, associativity: "Prefix" },
    { operator: "?", name: "Reflect", precedence: 135, associativity: "Prefix" },
];

export default function DOLMetaprogramming() {
    return (
        <>
            <Helmet>
                <title>Meta-Programming | DOL v0.7.0 | Univrs Learn</title>
                <meta
                    name="description"
                    content="DOL meta-programming: Quote/Eval for AST manipulation, Reflect for type introspection, 18 built-in macros, and idiom brackets for applicative style."
                />
            </Helmet>

            {/* Hero */}
            <section className="py-16 sm:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div
                        className="flex items-center gap-2 text-sm mb-6"
                        style={{ color: "var(--soft-gray)" }}
                    >
                        <Link
                            to="/dol"
                            className="hover:text-univrs-primary-400 transition-colors"
                        >
                            DOL
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <span style={{ color: "var(--text-primary)" }}>
                            Meta-Programming
                        </span>
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                        <Code2
                            className="w-10 h-10"
                            style={{ color: "var(--spore-purple)" }}
                        />
                        <h1
                            className="text-3xl sm:text-4xl font-light"
                            style={{ color: "var(--text-primary)" }}
                        >
                            DOL Meta-Programming
                        </h1>
                    </div>
                    <p
                        className="text-xl max-w-3xl mb-4"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        DOL v0.7.0 includes powerful meta-programming capabilities for
                        code generation, AST manipulation, and compile-time computation.
                    </p>
                    <div
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm"
                        style={{
                            backgroundColor: "var(--forest-floor)",
                            color: "var(--glow-cyan)",
                        }}
                    >
                        <Sparkles className="w-4 h-4" />
                        Since v0.2.0
                    </div>
                </div>
            </section>

            {/* Quote and Eval */}
            <section
                className="py-16"
                style={{ backgroundColor: "var(--bg-secondary)" }}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2
                        className="text-2xl font-light mb-8"
                        style={{ color: "var(--text-primary)" }}
                    >
                        Quote and Eval
                    </h2>

                    {/* Quote */}
                    <div className="mb-10">
                        <h3
                            className="text-xl font-normal mb-4 flex items-center gap-2"
                            style={{ color: "var(--glow-cyan)" }}
                        >
                            <span
                                className="w-8 h-8 rounded flex items-center justify-center font-mono text-lg"
                                style={{ backgroundColor: "var(--bg-tertiary)" }}
                            >
                                '
                            </span>
                            Quote Operator
                        </h3>
                        <p
                            className="text-base mb-4"
                            style={{ color: "var(--text-secondary)" }}
                        >
                            Capture an expression as AST data without evaluating it.
                            Returns a <code
                                className="px-1.5 py-0.5 rounded text-sm"
                                style={{ backgroundColor: "var(--bg-tertiary)", color: "var(--glow-cyan)" }}
                            >Quoted&lt;T&gt;</code> type.
                        </p>
                        <div
                            className="rounded-xl overflow-hidden"
                            style={{
                                backgroundColor: "var(--bg-tertiary)",
                                border: "1px solid var(--border-subtle)",
                            }}
                        >
                            <div
                                className="px-4 py-2 flex items-center gap-2"
                                style={{ borderBottom: "1px solid var(--border-subtle)" }}
                            >
                                <FileCode className="w-4 h-4" style={{ color: "var(--glow-cyan)" }} />
                                <span className="text-xs font-mono" style={{ color: "var(--soft-gray)" }}>
                                    example.dol
                                </span>
                            </div>
                            <pre
                                className="p-6 text-sm font-mono overflow-x-auto"
                                style={{ color: "var(--text-primary)" }}
                            >
{`// Quote captures expressions as AST
ast = '(1 + 2 * 3)           // Quoted<Int64>
expr = '{ x + y }            // Quoted expression
block = '{
    if condition { a } else { b }
}

// The type system tracks quoted expressions
fun transform(code: Quoted<Expr>) -> Quoted<Expr> {
    // AST manipulation here
    return code
}`}
                            </pre>
                        </div>
                    </div>

                    {/* Eval */}
                    <div className="mb-10">
                        <h3
                            className="text-xl font-normal mb-4 flex items-center gap-2"
                            style={{ color: "var(--glow-gold)" }}
                        >
                            <span
                                className="w-8 h-8 rounded flex items-center justify-center font-mono text-lg"
                                style={{ backgroundColor: "var(--bg-tertiary)" }}
                            >
                                !
                            </span>
                            Eval Operator
                        </h3>
                        <p
                            className="text-base mb-4"
                            style={{ color: "var(--text-secondary)" }}
                        >
                            Execute a quoted expression. Unwraps <code
                                className="px-1.5 py-0.5 rounded text-sm"
                                style={{ backgroundColor: "var(--bg-tertiary)", color: "var(--glow-cyan)" }}
                            >Quoted&lt;T&gt;</code> to <code
                                className="px-1.5 py-0.5 rounded text-sm"
                                style={{ backgroundColor: "var(--bg-tertiary)", color: "var(--glow-gold)" }}
                            >T</code>.
                        </p>
                        <div
                            className="rounded-xl overflow-hidden"
                            style={{
                                backgroundColor: "var(--bg-tertiary)",
                                border: "1px solid var(--border-subtle)",
                            }}
                        >
                            <pre
                                className="p-6 text-sm font-mono overflow-x-auto"
                                style={{ color: "var(--text-primary)" }}
                            >
{`// Evaluate quoted expressions
ast = '(1 + 2 * 3)
result = !ast                // 7: Int64

// Quote and eval are inverses
x = 42
'x                           // Quoted<Int64>
!'x                          // 42

// Round-trip preservation
original = '(a + b * c)
!original                    // Evaluates the expression`}
                            </pre>
                        </div>
                    </div>

                    {/* Quasi-Quote */}
                    <div>
                        <h3
                            className="text-xl font-normal mb-4 flex items-center gap-2"
                            style={{ color: "var(--spore-purple)" }}
                        >
                            <span
                                className="w-8 h-8 rounded flex items-center justify-center font-mono text-lg"
                                style={{ backgroundColor: "var(--bg-tertiary)" }}
                            >
                                `~
                            </span>
                            Quasi-Quote and Unquote
                        </h3>
                        <p
                            className="text-base mb-4"
                            style={{ color: "var(--text-secondary)" }}
                        >
                            Build AST templates with holes that can be filled dynamically.
                        </p>
                        <div
                            className="rounded-xl overflow-hidden"
                            style={{
                                backgroundColor: "var(--bg-tertiary)",
                                border: "1px solid var(--border-subtle)",
                            }}
                        >
                            <pre
                                className="p-6 text-sm font-mono overflow-x-auto"
                                style={{ color: "var(--text-primary)" }}
                            >
{`// Quasi-quote with unquote splicing
x = 5
template = \`(1 + ~x)         // Splice x into template
result = !template           // 6

// Build expressions dynamically
fun make_adder(n: Int64) -> Quoted<Expr> {
    return \`(x + ~n)
}
add_five = make_adder(5)
result = !add_five where { x = 10 }  // 15`}
                            </pre>
                        </div>
                    </div>
                </div>
            </section>

            {/* Reflect */}
            <section className="py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2
                        className="text-2xl font-light mb-8 flex items-center gap-3"
                        style={{ color: "var(--text-primary)" }}
                    >
                        <Cpu className="w-6 h-6" style={{ color: "var(--glow-pink)" }} />
                        Reflect Operator
                    </h2>
                    <p
                        className="text-base mb-6"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        Get type information at runtime using the <code
                            className="px-1.5 py-0.5 rounded text-sm"
                            style={{ backgroundColor: "var(--bg-tertiary)", color: "var(--glow-pink)" }}
                        >?</code> operator.
                        Returns a <code
                            className="px-1.5 py-0.5 rounded text-sm"
                            style={{ backgroundColor: "var(--bg-tertiary)", color: "var(--glow-cyan)" }}
                        >TypeInfo</code> structure.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div
                            className="rounded-xl overflow-hidden"
                            style={{
                                backgroundColor: "var(--bg-tertiary)",
                                border: "1px solid var(--border-subtle)",
                            }}
                        >
                            <div
                                className="px-4 py-2"
                                style={{ borderBottom: "1px solid var(--border-subtle)" }}
                            >
                                <span className="text-xs font-mono" style={{ color: "var(--soft-gray)" }}>
                                    Using Reflect
                                </span>
                            </div>
                            <pre
                                className="p-6 text-sm font-mono overflow-x-auto"
                                style={{ color: "var(--text-primary)" }}
                            >
{`gene Person {
    has name: String
    has age: Int64
}

info = ?Person
// info.name == "Person"
// info.fields == [
//   { name: "name", type: "String" },
//   { name: "age", type: "Int64" }
// ]

// Check trait implementation
if ?Person.implements(Serializable) {
    serialize(person)
}`}
                            </pre>
                        </div>

                        <div
                            className="rounded-xl overflow-hidden"
                            style={{
                                backgroundColor: "var(--bg-tertiary)",
                                border: "1px solid var(--border-subtle)",
                            }}
                        >
                            <div
                                className="px-4 py-2"
                                style={{ borderBottom: "1px solid var(--border-subtle)" }}
                            >
                                <span className="text-xs font-mono" style={{ color: "var(--soft-gray)" }}>
                                    TypeInfo Structure
                                </span>
                            </div>
                            <pre
                                className="p-6 text-sm font-mono overflow-x-auto"
                                style={{ color: "var(--text-primary)" }}
                            >
{`gene TypeInfo {
    has name: String
    has kind: TypeKind
    has fields: List<FieldInfo>
    has methods: List<MethodInfo>

    fun implements(trait: Trait) -> Bool
    fun size() -> UInt64
    fun is_primitive() -> Bool
}

gene FieldInfo {
    has name: String
    has type_name: String
    has is_public: Bool
}`}
                            </pre>
                        </div>
                    </div>
                </div>
            </section>

            {/* Idiom Brackets */}
            <section
                className="py-16"
                style={{ backgroundColor: "var(--bg-secondary)" }}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2
                        className="text-2xl font-light mb-8 flex items-center gap-3"
                        style={{ color: "var(--text-primary)" }}
                    >
                        <Layers className="w-6 h-6" style={{ color: "var(--glow-gold)" }} />
                        Idiom Brackets
                    </h2>
                    <p
                        className="text-base mb-6"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        Applicative functor syntax sugar using <code
                            className="px-1.5 py-0.5 rounded text-sm"
                            style={{ backgroundColor: "var(--bg-tertiary)", color: "var(--glow-gold)" }}
                        >[| ... |]</code> brackets.
                    </p>

                    <div
                        className="rounded-xl overflow-hidden mb-8"
                        style={{
                            backgroundColor: "var(--bg-tertiary)",
                            border: "1px solid var(--border-subtle)",
                        }}
                    >
                        <pre
                            className="p-6 text-sm font-mono overflow-x-auto"
                            style={{ color: "var(--text-primary)" }}
                        >
{`// Instead of chaining operators:
result = add <$> mx <*> my

// Write naturally:
result = [| add mx my |]

// Works with any applicative functor
parsed = [| create_user name_result age_result email_result |]

// Desugaring rules:
// [| f |]       ->  f
// [| f a |]     ->  f <$> a
// [| f a b |]   ->  (f <$> a) <*> b
// [| f a b c |] ->  ((f <$> a) <*> b) <*> c`}
                        </pre>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="card">
                            <h4
                                className="text-sm font-normal mb-2"
                                style={{ color: "var(--glow-cyan)" }}
                            >
                                Option
                            </h4>
                            <code className="text-xs" style={{ color: "var(--text-secondary)" }}>
                                [| add (Some 1) (Some 2) |] = Some 3
                            </code>
                        </div>
                        <div className="card">
                            <h4
                                className="text-sm font-normal mb-2"
                                style={{ color: "var(--glow-gold)" }}
                            >
                                Result
                            </h4>
                            <code className="text-xs" style={{ color: "var(--text-secondary)" }}>
                                [| combine ok_a ok_b |] = Ok(combined)
                            </code>
                        </div>
                        <div className="card">
                            <h4
                                className="text-sm font-normal mb-2"
                                style={{ color: "var(--spore-purple)" }}
                            >
                                List
                            </h4>
                            <code className="text-xs" style={{ color: "var(--text-secondary)" }}>
                                [| pair [1,2] [a,b] |] = cartesian product
                            </code>
                        </div>
                    </div>
                </div>
            </section>

            {/* Macro System */}
            <section className="py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2
                        className="text-2xl font-light mb-4"
                        style={{ color: "var(--text-primary)" }}
                    >
                        Macro System
                    </h2>
                    <p
                        className="text-base mb-8"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        18 built-in macros for compile-time code generation and transformation.
                    </p>

                    {/* Macro Examples */}
                    <div className="mb-8">
                        <div
                            className="rounded-xl overflow-hidden"
                            style={{
                                backgroundColor: "var(--bg-tertiary)",
                                border: "1px solid var(--border-subtle)",
                            }}
                        >
                            <div
                                className="px-4 py-2"
                                style={{ borderBottom: "1px solid var(--border-subtle)" }}
                            >
                                <span className="text-xs font-mono" style={{ color: "var(--soft-gray)" }}>
                                    Macro Examples
                                </span>
                            </div>
                            <pre
                                className="p-6 text-sm font-mono overflow-x-auto"
                                style={{ color: "var(--text-primary)" }}
                            >
{`#derive(Debug, Clone)
gene Container {
    has id: UInt64
    has name: String
}

// Conditional compilation
#cfg(target.wasm)
fun platform_init() { wasm_init() }

#cfg(target.native)
fun platform_init() { native_init() }

// Debug printing
value = #dbg(compute_something())  // Prints and returns

// Assertions
#assert(count > 0, "count must be positive")
#assert_eq(expected, actual)

// String operations
msg = #format("Hello, {}!", name)
combined = #concat("pre", "fix", "_name")`}
                            </pre>
                        </div>
                    </div>

                    {/* Macro Reference Table */}
                    <div
                        className="rounded-xl overflow-hidden"
                        style={{
                            backgroundColor: "var(--bg-secondary)",
                            border: "1px solid var(--border-subtle)",
                        }}
                    >
                        <div
                            className="px-4 py-3"
                            style={{
                                backgroundColor: "var(--bg-tertiary)",
                                borderBottom: "1px solid var(--border-subtle)",
                            }}
                        >
                            <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                                Built-in Macros Reference
                            </span>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: "var(--border-subtle)" }}>
                            {macros.map((macro) => (
                                <div
                                    key={macro.name}
                                    className="p-4"
                                    style={{ backgroundColor: "var(--bg-secondary)" }}
                                >
                                    <code
                                        className="text-sm block mb-1"
                                        style={{ color: "var(--glow-cyan)" }}
                                    >
                                        {macro.name}
                                    </code>
                                    <span
                                        className="text-xs"
                                        style={{ color: "var(--soft-gray)" }}
                                    >
                                        {macro.description}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Operator Precedence */}
            <section
                className="py-16"
                style={{ backgroundColor: "var(--bg-secondary)" }}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2
                        className="text-2xl font-light mb-8"
                        style={{ color: "var(--text-primary)" }}
                    >
                        Operator Precedence
                    </h2>
                    <div
                        className="rounded-xl overflow-hidden"
                        style={{
                            border: "1px solid var(--border-subtle)",
                        }}
                    >
                        <table className="w-full">
                            <thead>
                                <tr style={{ backgroundColor: "var(--bg-tertiary)" }}>
                                    <th className="px-4 py-3 text-left text-sm" style={{ color: "var(--text-primary)" }}>
                                        Operator
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm" style={{ color: "var(--text-primary)" }}>
                                        Name
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm" style={{ color: "var(--text-primary)" }}>
                                        Precedence
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm" style={{ color: "var(--text-primary)" }}>
                                        Associativity
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {operatorPrecedence.map((op, i) => (
                                    <tr
                                        key={op.operator}
                                        style={{
                                            backgroundColor: i % 2 === 0 ? "var(--bg-secondary)" : "var(--bg-tertiary)",
                                        }}
                                    >
                                        <td className="px-4 py-3">
                                            <code
                                                className="text-lg"
                                                style={{ color: "var(--glow-cyan)" }}
                                            >
                                                {op.operator}
                                            </code>
                                        </td>
                                        <td className="px-4 py-3 text-sm" style={{ color: "var(--text-secondary)" }}>
                                            {op.name}
                                        </td>
                                        <td className="px-4 py-3 font-mono text-sm" style={{ color: "var(--glow-gold)" }}>
                                            {op.precedence}
                                        </td>
                                        <td className="px-4 py-3 text-sm" style={{ color: "var(--soft-gray)" }}>
                                            {op.associativity}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Key Takeaways */}
            <section className="py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div
                        className="card"
                        style={{
                            borderColor: "var(--spore-purple)",
                            borderWidth: "1px",
                        }}
                    >
                        <h2
                            className="text-2xl font-light mb-4"
                            style={{ color: "var(--spore-purple)" }}
                        >
                            Key Takeaways
                        </h2>
                        <ul
                            className="space-y-3 text-base"
                            style={{ color: "var(--text-secondary)" }}
                        >
                            <li className="flex items-start gap-3">
                                <span style={{ color: "var(--glow-cyan)" }}>1.</span>
                                <span>
                                    <strong style={{ color: "var(--text-primary)" }}>Quote</strong> (<code className="px-1 rounded" style={{ backgroundColor: "var(--bg-tertiary)" }}>'</code>) captures expressions as AST data of type <code className="px-1 rounded" style={{ backgroundColor: "var(--bg-tertiary)" }}>Quoted&lt;T&gt;</code>
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span style={{ color: "var(--glow-cyan)" }}>2.</span>
                                <span>
                                    <strong style={{ color: "var(--text-primary)" }}>Eval</strong> (<code className="px-1 rounded" style={{ backgroundColor: "var(--bg-tertiary)" }}>!</code>) executes quoted expressions, unwrapping <code className="px-1 rounded" style={{ backgroundColor: "var(--bg-tertiary)" }}>Quoted&lt;T&gt;</code> to <code className="px-1 rounded" style={{ backgroundColor: "var(--bg-tertiary)" }}>T</code>
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span style={{ color: "var(--glow-cyan)" }}>3.</span>
                                <span>
                                    <strong style={{ color: "var(--text-primary)" }}>Reflect</strong> (<code className="px-1 rounded" style={{ backgroundColor: "var(--bg-tertiary)" }}>?</code>) provides runtime type information via <code className="px-1 rounded" style={{ backgroundColor: "var(--bg-tertiary)" }}>TypeInfo</code>
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span style={{ color: "var(--glow-cyan)" }}>4.</span>
                                <span>
                                    <strong style={{ color: "var(--text-primary)" }}>Idiom Brackets</strong> (<code className="px-1 rounded" style={{ backgroundColor: "var(--bg-tertiary)" }}>[| f x y |]</code>) desugar to applicative functor chains
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span style={{ color: "var(--glow-cyan)" }}>5.</span>
                                <span>
                                    <strong style={{ color: "var(--text-primary)" }}>18 Built-in Macros</strong> provide compile-time code generation, assertions, and debugging
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
}
