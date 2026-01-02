import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronRight, FileText } from "lucide-react";

const sections = [
    {
        title: "Declarations",
        items: [
            { syntax: "module name @ version", desc: "Define a module" },
            { syntax: "use path.{ items }", desc: "Import from module" },
            { syntax: "pub gene Name { ... }", desc: "Public gene (struct)" },
            { syntax: "pub trait Name { ... }", desc: "Public trait (interface)" },
            { syntax: "pub system Name { ... }", desc: "Public system (composed)" },
            { syntax: "constraint name { ... }", desc: "Define constraint rule" },
            { syntax: "evolves Old > New @ version { ... }", desc: "Schema evolution" },
        ],
    },
    {
        title: "Types",
        items: [
            { syntax: "Int8, Int16, Int32, Int64", desc: "Signed integers" },
            { syntax: "UInt8, UInt16, UInt32, UInt64", desc: "Unsigned integers" },
            { syntax: "Float32, Float64", desc: "Floating point" },
            { syntax: "Bool, String, Void", desc: "Primitives" },
            { syntax: "List<T>", desc: "Dynamic array" },
            { syntax: "Map<K, V>", desc: "Hash map" },
            { syntax: "Option<T>", desc: "Optional value" },
            { syntax: "Result<T, E>", desc: "Success or error" },
            { syntax: "(A, B, C)", desc: "Tuple type" },
            { syntax: "(A, B) -> C", desc: "Function type" },
        ],
    },
    {
        title: "Gene Body",
        items: [
            { syntax: "type: enum { A, B, C }", desc: "Enum variants" },
            { syntax: "has field: Type = default", desc: "Field with default" },
            { syntax: "constraint name { predicate }", desc: "Invariant rule" },
            { syntax: "fun method() -> Type { body }", desc: "Method definition" },
            { syntax: "exegesis { documentation }", desc: "Required docs" },
        ],
    },
    {
        title: "Operators",
        items: [
            { syntax: "|>", desc: "Pipe: x |> f  ->  f(x)" },
            { syntax: ">>", desc: "Compose: f >> g  ->  (x) -> g(f(x))" },
            { syntax: "'", desc: "Quote: 'expr  ->  Quoted<T>" },
            { syntax: "!", desc: "Eval: !quoted  ->  T" },
            { syntax: "?", desc: "Reflect: ?Type  ->  TypeInfo" },
            { syntax: "#", desc: "Macro: #name(...)  ->  expanded" },
            { syntax: "[| |]", desc: "Idiom: [| f x y |]  ->  f <$> x <*> y" },
            { syntax: "<$>", desc: "Map (functor)" },
            { syntax: "<*>", desc: "Apply (applicative)" },
        ],
    },
    {
        title: "Control Flow",
        items: [
            { syntax: "if cond { } else { }", desc: "Conditional" },
            { syntax: "match x { A { } B { } _ { } }", desc: "Pattern match" },
            { syntax: "for item in items { }", desc: "For loop" },
            { syntax: "while cond { }", desc: "While loop" },
            { syntax: "loop { break }", desc: "Infinite loop" },
            { syntax: "return value", desc: "Early return" },
            { syntax: "break / continue", desc: "Loop control" },
        ],
    },
    {
        title: "Lambdas & Functions",
        items: [
            { syntax: "\\x -> x + 1", desc: "Lambda expression" },
            { syntax: "\\(x, y) -> x + y", desc: "Multi-param lambda" },
            { syntax: "\\x: Int64 -> x * 2", desc: "Typed parameter" },
            { syntax: "fun name(x: T) -> R { }", desc: "Named function" },
        ],
    },
    {
        title: "Common Macros",
        items: [
            { syntax: "#derive(Debug, Clone)", desc: "Generate impls" },
            { syntax: "#assert(condition)", desc: "Runtime assertion" },
            { syntax: "#dbg(expr)", desc: "Debug print" },
            { syntax: "#format(\"...\", args)", desc: "String formatting" },
            { syntax: "#cfg(target.wasm)", desc: "Conditional compile" },
            { syntax: "#env(\"VAR\")", desc: "Compile-time env" },
        ],
    },
];

export default function DOLCheatsheet() {
    return (
        <>
            <Helmet>
                <title>DOL Syntax Cheatsheet | Univrs Learn</title>
                <meta
                    name="description"
                    content="Quick reference for DOL syntax: declarations, types, operators, control flow, and meta-programming."
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
                            Cheatsheet
                        </span>
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                        <FileText
                            className="w-10 h-10"
                            style={{ color: "var(--glow-gold)" }}
                        />
                        <h1
                            className="text-3xl sm:text-4xl font-light"
                            style={{ color: "var(--text-primary)" }}
                        >
                            DOL Syntax Cheatsheet
                        </h1>
                    </div>
                    <p
                        className="text-xl max-w-2xl"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        Quick reference for the Design Ontology Language syntax.
                    </p>
                </div>
            </section>

            {/* Cheatsheet Grid */}
            <section
                className="py-12"
                style={{ backgroundColor: "var(--bg-secondary)" }}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-6">
                        {sections.map((section) => (
                            <div
                                key={section.title}
                                className="rounded-xl overflow-hidden"
                                style={{
                                    backgroundColor: "var(--bg-tertiary)",
                                    border: "1px solid var(--border-subtle)",
                                }}
                            >
                                <div
                                    className="px-4 py-3"
                                    style={{
                                        borderBottom: "1px solid var(--border-subtle)",
                                        backgroundColor: "var(--forest-floor)",
                                    }}
                                >
                                    <h2
                                        className="text-lg font-medium"
                                        style={{ color: "var(--glow-cyan)" }}
                                    >
                                        {section.title}
                                    </h2>
                                </div>
                                <div className="p-4">
                                    <table className="w-full">
                                        <tbody>
                                            {section.items.map((item, i) => (
                                                <tr
                                                    key={i}
                                                    className={i > 0 ? "border-t" : ""}
                                                    style={{ borderColor: "var(--border-subtle)" }}
                                                >
                                                    <td className="py-2 pr-4">
                                                        <code
                                                            className="text-sm"
                                                            style={{ color: "var(--glow-gold)" }}
                                                        >
                                                            {item.syntax}
                                                        </code>
                                                    </td>
                                                    <td
                                                        className="py-2 text-sm"
                                                        style={{ color: "var(--soft-gray)" }}
                                                    >
                                                        {item.desc}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Version Info */}
            <section className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div
                        className="text-center text-sm"
                        style={{ color: "var(--soft-gray)" }}
                    >
                        DOL v0.6.0 "WASM Pipeline" | 1,705+ tests passing
                    </div>
                </div>
            </section>
        </>
    );
}
