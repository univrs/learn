import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronRight, Clock, ArrowRight, ArrowLeft, CheckCircle, Lightbulb } from "lucide-react";
import DOLRepl from "../../../components/DOLRepl";

export default function ReplExpressions() {
    return (
        <>
            <Helmet>
                <title>Expressions & Arithmetic | DOL REPL Tutorial | Univrs Learn</title>
                <meta
                    name="description"
                    content="Evaluate numbers, perform calculations, and understand type inference in the DOL REPL."
                />
            </Helmet>

            {/* Breadcrumb & Header */}
            <section className="py-8 sm:py-12">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div
                        className="flex items-center gap-2 text-sm mb-6"
                        style={{ color: "var(--soft-gray)" }}
                    >
                        <Link to="/dol" className="hover:text-univrs-primary-400 transition-colors">
                            DOL
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link to="/dol/repl" className="hover:text-univrs-primary-400 transition-colors">
                            REPL Tutorial
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <span style={{ color: "var(--text-primary)" }}>Expressions</span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <span
                                className="text-sm px-3 py-1 rounded-full"
                                style={{
                                    backgroundColor: "var(--glow-cyan-dim)",
                                    color: "var(--glow-cyan)",
                                }}
                            >
                                Lesson 2 of 4
                            </span>
                            <div
                                className="flex items-center gap-1.5 text-sm"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                <Clock className="w-4 h-4" />
                                15 min
                            </div>
                        </div>
                    </div>

                    <h1 className="text-3xl font-light mb-4" style={{ color: "var(--text-primary)" }}>
                        Expressions & Arithmetic
                    </h1>
                    <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
                        Learn to evaluate numbers, perform calculations, and understand how the REPL
                        infers types for your expressions.
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="pb-16">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    {/* Integer Literals */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-light mb-4" style={{ color: "var(--text-primary)" }}>
                            Integer Literals
                        </h2>
                        <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
                            The simplest expressions are integer literals. The REPL automatically infers
                            these as <code className="px-1.5 py-0.5 rounded text-sm" style={{ backgroundColor: "var(--moss)", color: "var(--glow-cyan)" }}>i64</code> (64-bit signed integers):
                        </p>

                        <DOLRepl
                            title="Integer Literals"
                            description="Try different integer values"
                            initialCode="42"
                            height="80px"
                        />

                        <p className="mt-4 text-sm" style={{ color: "var(--text-secondary)" }}>
                            Try changing the value to <code className="px-1 rounded" style={{ backgroundColor: "var(--moss)", color: "var(--glow-cyan)" }}>-17</code>,{" "}
                            <code className="px-1 rounded" style={{ backgroundColor: "var(--moss)", color: "var(--glow-cyan)" }}>0</code>, or{" "}
                            <code className="px-1 rounded" style={{ backgroundColor: "var(--moss)", color: "var(--glow-cyan)" }}>999999</code>.
                        </p>
                    </div>

                    {/* Float Literals */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-light mb-4" style={{ color: "var(--text-primary)" }}>
                            Float Literals
                        </h2>
                        <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
                            Numbers with decimal points are inferred as{" "}
                            <code className="px-1.5 py-0.5 rounded text-sm" style={{ backgroundColor: "var(--moss)", color: "var(--glow-cyan)" }}>f64</code>{" "}
                            (64-bit floating point):
                        </p>

                        <DOLRepl
                            title="Float Literals"
                            description="Numbers with decimals become f64"
                            initialCode="3.14159"
                            height="80px"
                        />

                        <div
                            className="mt-6 p-4 rounded-lg flex items-start gap-3"
                            style={{
                                backgroundColor: "var(--bg-secondary)",
                                border: "1px solid var(--spore-purple)",
                            }}
                        >
                            <Lightbulb className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "var(--spore-purple)" }} />
                            <div>
                                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                                    <strong style={{ color: "var(--text-primary)" }}>Type Inference Rule:</strong>{" "}
                                    If a number contains a decimal point, it's a float. Otherwise, it's an integer.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Arithmetic Operations */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-light mb-4" style={{ color: "var(--text-primary)" }}>
                            Arithmetic Operations
                        </h2>
                        <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
                            DOL supports the standard arithmetic operators with proper precedence:
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4 mb-6">
                            {[
                                { op: "+", name: "Addition", example: "10 + 20" },
                                { op: "-", name: "Subtraction", example: "100 - 37" },
                                { op: "*", name: "Multiplication", example: "6 * 7" },
                                { op: "/", name: "Division", example: "100 / 4" },
                            ].map((item) => (
                                <div
                                    key={item.op}
                                    className="p-4 rounded-lg"
                                    style={{
                                        backgroundColor: "var(--bg-secondary)",
                                        border: "1px solid var(--border-subtle)",
                                    }}
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <span
                                            className="w-8 h-8 rounded flex items-center justify-center font-mono text-lg"
                                            style={{
                                                backgroundColor: "var(--glow-cyan-dim)",
                                                color: "var(--glow-cyan)",
                                            }}
                                        >
                                            {item.op}
                                        </span>
                                        <span style={{ color: "var(--text-primary)" }}>{item.name}</span>
                                    </div>
                                    <code className="text-sm font-mono" style={{ color: "var(--soft-gray)" }}>
                                        {item.example}
                                    </code>
                                </div>
                            ))}
                        </div>

                        <DOLRepl
                            title="Try Arithmetic"
                            description="Experiment with different operations"
                            initialCode="10 + 20 * 2"
                            height="80px"
                        />

                        <p className="mt-4 text-sm" style={{ color: "var(--text-secondary)" }}>
                            Notice that <code className="px-1 rounded" style={{ backgroundColor: "var(--moss)", color: "var(--glow-cyan)" }}>10 + 20 * 2</code>{" "}
                            equals 50, not 60. Multiplication has higher precedence than addition.
                        </p>
                    </div>

                    {/* Precedence */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-light mb-4" style={{ color: "var(--text-primary)" }}>
                            Operator Precedence
                        </h2>
                        <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
                            Use parentheses to override the default precedence:
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4 mb-6">
                            <DOLRepl
                                title="Default Precedence"
                                description="Multiplication first"
                                initialCode="10 + 20 * 2"
                                height="80px"
                            />
                            <DOLRepl
                                title="With Parentheses"
                                description="Addition first"
                                initialCode="(10 + 20) * 2"
                                height="80px"
                            />
                        </div>

                        <div
                            className="p-4 rounded-lg"
                            style={{
                                backgroundColor: "var(--bg-secondary)",
                                border: "1px solid var(--border-subtle)",
                            }}
                        >
                            <h4 className="text-sm font-medium mb-3" style={{ color: "var(--text-primary)" }}>
                                Precedence Order (highest to lowest)
                            </h4>
                            <ol className="space-y-1 text-sm" style={{ color: "var(--text-secondary)" }}>
                                <li><span style={{ color: "var(--glow-cyan)" }}>1.</span> Parentheses <code className="px-1 rounded text-xs" style={{ backgroundColor: "var(--moss)" }}>()</code></li>
                                <li><span style={{ color: "var(--glow-cyan)" }}>2.</span> Multiplication, Division <code className="px-1 rounded text-xs" style={{ backgroundColor: "var(--moss)" }}>* /</code></li>
                                <li><span style={{ color: "var(--glow-cyan)" }}>3.</span> Addition, Subtraction <code className="px-1 rounded text-xs" style={{ backgroundColor: "var(--moss)" }}>+ -</code></li>
                            </ol>
                        </div>
                    </div>

                    {/* Float Arithmetic */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-light mb-4" style={{ color: "var(--text-primary)" }}>
                            Float Arithmetic
                        </h2>
                        <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
                            Float operations work the same way, with the result type being{" "}
                            <code className="px-1.5 py-0.5 rounded text-sm" style={{ backgroundColor: "var(--moss)", color: "var(--glow-cyan)" }}>f64</code>:
                        </p>

                        <DOLRepl
                            title="Float Arithmetic"
                            description="Operations on floating-point numbers"
                            initialCode="1.5 + 2.5"
                            height="80px"
                        />

                        <p className="mt-4 text-sm" style={{ color: "var(--text-secondary)" }}>
                            Try: <code className="px-1 rounded" style={{ backgroundColor: "var(--moss)", color: "var(--glow-cyan)" }}>3.14159 * 2.0</code>,{" "}
                            <code className="px-1 rounded" style={{ backgroundColor: "var(--moss)", color: "var(--glow-cyan)" }}>10.0 / 3.0</code>
                        </p>
                    </div>

                    {/* Challenge */}
                    <div
                        className="p-6 rounded-xl mb-12"
                        style={{
                            backgroundColor: "var(--bg-secondary)",
                            border: "1px solid var(--spore-purple)",
                        }}
                    >
                        <h3 className="text-lg font-normal mb-4" style={{ color: "var(--spore-purple)" }}>
                            Challenge: Calculate Circle Area
                        </h3>
                        <p className="mb-4 text-sm" style={{ color: "var(--text-secondary)" }}>
                            The area of a circle is <em>π × r²</em>. Calculate the area of a circle
                            with radius 5 using <code className="px-1 rounded" style={{ backgroundColor: "var(--moss)", color: "var(--glow-cyan)" }}>3.14159</code> for π.
                        </p>
                        <DOLRepl
                            title="Your Solution"
                            description="Calculate: π × 5²"
                            initialCode="// Replace this with your calculation"
                            height="80px"
                        />
                        <details className="mt-4">
                            <summary className="text-sm cursor-pointer" style={{ color: "var(--glow-cyan)" }}>
                                Show Solution
                            </summary>
                            <code
                                className="block mt-2 p-3 rounded text-sm font-mono"
                                style={{ backgroundColor: "var(--moss)", color: "var(--glow-cyan)" }}
                            >
                                3.14159 * 5.0 * 5.0
                            </code>
                        </details>
                    </div>

                    {/* Key Points */}
                    <div
                        className="p-6 rounded-xl mb-12"
                        style={{
                            backgroundColor: "var(--bg-secondary)",
                            border: "1px solid var(--glow-cyan)",
                        }}
                    >
                        <h3 className="text-lg font-normal mb-4 flex items-center gap-2" style={{ color: "var(--glow-cyan)" }}>
                            <CheckCircle className="w-5 h-5" />
                            Key Points
                        </h3>
                        <ul className="space-y-2">
                            {[
                                "Integers without decimals are i64, numbers with decimals are f64",
                                "Standard arithmetic operators: +, -, *, /",
                                "Multiplication and division have higher precedence than addition and subtraction",
                                "Use parentheses to override default precedence",
                            ].map((point, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                                    <span style={{ color: "var(--glow-cyan)" }}>•</span>
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between pt-8 border-t" style={{ borderColor: "var(--border-subtle)" }}>
                        <Link
                            to="/dol/repl/basics"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-opacity hover:opacity-80"
                            style={{ color: "var(--text-secondary)" }}
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Previous: Basics
                        </Link>
                        <Link
                            to="/dol/repl/functions"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-opacity hover:opacity-90"
                            style={{ backgroundColor: "var(--glow-cyan)", color: "var(--void)" }}
                        >
                            Next: Functions
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
