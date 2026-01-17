import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronRight, Clock, ArrowRight, ArrowLeft, CheckCircle, Lightbulb, Code } from "lucide-react";
import DOLRepl from "../../../components/DOLRepl";

export default function ReplFunctions() {
    return (
        <>
            <Helmet>
                <title>Defining Functions | DOL REPL Tutorial | Univrs Learn</title>
                <meta
                    name="description"
                    content="Create reusable functions in the DOL REPL and build up your interactive environment."
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
                        <span style={{ color: "var(--text-primary)" }}>Functions</span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <span
                                className="text-sm px-3 py-1 rounded-full"
                                style={{ backgroundColor: "var(--glow-cyan-dim)", color: "var(--glow-cyan)" }}
                            >
                                Lesson 3 of 4
                            </span>
                            <div className="flex items-center gap-1.5 text-sm" style={{ color: "var(--text-secondary)" }}>
                                <Clock className="w-4 h-4" />
                                15 min
                            </div>
                        </div>
                    </div>

                    <h1 className="text-3xl font-light mb-4" style={{ color: "var(--text-primary)" }}>
                        Defining Functions
                    </h1>
                    <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
                        Create reusable functions in the REPL and build up your interactive programming
                        environment step by step.
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="pb-16">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    {/* Function Syntax */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-light mb-4" style={{ color: "var(--text-primary)" }}>
                            Function Syntax
                        </h2>
                        <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
                            Functions in DOL use the{" "}
                            <code className="px-1.5 py-0.5 rounded text-sm" style={{ backgroundColor: "var(--moss)", color: "var(--glow-cyan)" }}>pub fun</code>{" "}
                            keyword. Here's the basic structure:
                        </p>

                        <div
                            className="p-4 rounded-lg mb-6"
                            style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-subtle)" }}
                        >
                            <pre className="text-sm font-mono" style={{ color: "var(--glow-cyan)" }}>
{`pub fun function_name(param1: Type1, param2: Type2) -> ReturnType {
    // function body
    expression  // last expression is the return value
}`}
                            </pre>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                { part: "pub fun", desc: "Keyword to define a public function" },
                                { part: "param: Type", desc: "Parameter with explicit type" },
                                { part: "-> ReturnType", desc: "Return type annotation" },
                                { part: "{ body }", desc: "Function body; last expression is returned" },
                            ].map((item) => (
                                <div
                                    key={item.part}
                                    className="p-3 rounded-lg"
                                    style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-subtle)" }}
                                >
                                    <code className="text-sm font-mono" style={{ color: "var(--glow-cyan)" }}>
                                        {item.part}
                                    </code>
                                    <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Simple Function */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-light mb-4" style={{ color: "var(--text-primary)" }}>
                            Your First Function
                        </h2>
                        <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
                            Let's define a simple function that squares a number:
                        </p>

                        <DOLRepl
                            title="Define a Square Function"
                            description="Run this to define the function, then call it"
                            initialCode={`pub fun square(x: i64) -> i64 { x * x }`}
                            height="80px"
                        />

                        <p className="mt-4 mb-4" style={{ color: "var(--text-secondary)" }}>
                            After defining the function, you can call it:
                        </p>

                        <DOLRepl
                            title="Call the Function"
                            description="Now use the function you defined"
                            initialCode={`square(7)`}
                            height="80px"
                        />

                        <div
                            className="mt-6 p-4 rounded-lg flex items-start gap-3"
                            style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--spore-purple)" }}
                        >
                            <Lightbulb className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "var(--spore-purple)" }} />
                            <div>
                                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                                    <strong style={{ color: "var(--text-primary)" }}>Session Persistence:</strong>{" "}
                                    Functions you define persist within the REPL session. You can use them
                                    in subsequent evaluations without redefining them.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Multiple Parameters */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-light mb-4" style={{ color: "var(--text-primary)" }}>
                            Multiple Parameters
                        </h2>
                        <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
                            Functions can take multiple parameters, separated by commas:
                        </p>

                        <DOLRepl
                            title="Function with Two Parameters"
                            description="Define and call a function that adds two numbers"
                            initialCode={`pub fun add(a: i64, b: i64) -> i64 { a + b }`}
                            height="80px"
                        />

                        <div className="mt-4">
                            <DOLRepl
                                title="Call with Arguments"
                                initialCode={`add(10, 20)`}
                                height="80px"
                            />
                        </div>
                    </div>

                    {/* Float Functions */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-light mb-4" style={{ color: "var(--text-primary)" }}>
                            Float Functions
                        </h2>
                        <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
                            Functions can work with floating-point numbers using{" "}
                            <code className="px-1.5 py-0.5 rounded text-sm" style={{ backgroundColor: "var(--moss)", color: "var(--glow-cyan)" }}>f64</code>:
                        </p>

                        <DOLRepl
                            title="Circle Area Function"
                            description="Calculate the area of a circle"
                            initialCode={`pub fun area(radius: f64) -> f64 { 3.14159 * radius * radius }`}
                            height="80px"
                        />

                        <div className="mt-4">
                            <DOLRepl
                                title="Calculate Area"
                                description="Area of circle with radius 10"
                                initialCode={`area(10.0)`}
                                height="80px"
                            />
                        </div>
                    </div>

                    {/* Building on Functions */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-light mb-4" style={{ color: "var(--text-primary)" }}>
                            Building on Functions
                        </h2>
                        <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
                            One of the REPL's powerful features is that you can define new functions
                            that use previously defined functions:
                        </p>

                        <div className="space-y-4">
                            <DOLRepl
                                title="Step 1: Define square"
                                initialCode={`pub fun square(x: i64) -> i64 { x * x }`}
                                height="80px"
                            />
                            <DOLRepl
                                title="Step 2: Define cube using square"
                                initialCode={`pub fun cube(x: i64) -> i64 { x * square(x) }`}
                                height="80px"
                            />
                            <DOLRepl
                                title="Step 3: Use cube"
                                initialCode={`cube(4)`}
                                height="80px"
                            />
                        </div>

                        <p className="mt-4 text-sm" style={{ color: "var(--text-secondary)" }}>
                            This incremental approach is great for exploring ideas and building up
                            complex computations step by step.
                        </p>
                    </div>

                    {/* Complete Example */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-light mb-4" style={{ color: "var(--text-primary)" }}>
                            Complete Example: Temperature Conversion
                        </h2>
                        <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
                            Let's build a more practical example - converting between temperature scales:
                        </p>

                        <div
                            className="p-4 rounded-lg mb-6"
                            style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-subtle)" }}
                        >
                            <h4 className="text-sm font-medium mb-3 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                                <Code className="w-4 h-4" />
                                REPL Session
                            </h4>
                            <pre className="text-sm font-mono overflow-x-auto" style={{ color: "var(--glow-cyan)" }}>
{`>>> pub fun celsiusToFahrenheit(c: f64) -> f64 { c * 1.8 + 32.0 }
Defined function 'celsiusToFahrenheit'

>>> pub fun fahrenheitToCelsius(f: f64) -> f64 { (f - 32.0) / 1.8 }
Defined function 'fahrenheitToCelsius'

>>> celsiusToFahrenheit(100.0)
=> 212

>>> fahrenheitToCelsius(32.0)
=> 0

>>> celsiusToFahrenheit(0.0)
=> 32`}
                            </pre>
                        </div>

                        <DOLRepl
                            title="Try It Yourself"
                            description="Define and use temperature conversion functions"
                            initialCode={`pub fun celsiusToFahrenheit(c: f64) -> f64 { c * 1.8 + 32.0 }`}
                            height="80px"
                        />
                    </div>

                    {/* Challenge */}
                    <div
                        className="p-6 rounded-xl mb-12"
                        style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--spore-purple)" }}
                    >
                        <h3 className="text-lg font-normal mb-4" style={{ color: "var(--spore-purple)" }}>
                            Challenge: Pythagorean Theorem
                        </h3>
                        <p className="mb-4 text-sm" style={{ color: "var(--text-secondary)" }}>
                            Create a function that calculates the hypotenuse of a right triangle
                            given sides a and b. Formula: √(a² + b²)
                        </p>
                        <p className="mb-4 text-sm" style={{ color: "var(--text-secondary)" }}>
                            <em>Hint: For simplicity, just calculate a² + b² (we'll skip the square root)</em>
                        </p>
                        <DOLRepl
                            title="Your Solution"
                            description="Calculate a² + b²"
                            initialCode={`// Define your function here`}
                            height="100px"
                        />
                        <details className="mt-4">
                            <summary className="text-sm cursor-pointer" style={{ color: "var(--glow-cyan)" }}>
                                Show Solution
                            </summary>
                            <code
                                className="block mt-2 p-3 rounded text-sm font-mono"
                                style={{ backgroundColor: "var(--moss)", color: "var(--glow-cyan)" }}
                            >
                                pub fun hypotenuseSquared(a: f64, b: f64) -&gt; f64 &#123; a * a + b * b &#125;
                            </code>
                        </details>
                    </div>

                    {/* Key Points */}
                    <div
                        className="p-6 rounded-xl mb-12"
                        style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--glow-cyan)" }}
                    >
                        <h3 className="text-lg font-normal mb-4 flex items-center gap-2" style={{ color: "var(--glow-cyan)" }}>
                            <CheckCircle className="w-5 h-5" />
                            Key Points
                        </h3>
                        <ul className="space-y-2">
                            {[
                                "Functions are defined with 'pub fun name(params) -> ReturnType { body }'",
                                "Parameters require explicit type annotations",
                                "The last expression in the function body is the return value",
                                "Functions persist in the session and can call other defined functions",
                                "Both i64 and f64 types are supported for parameters and return values",
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
                            to="/dol/repl/expressions"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-opacity hover:opacity-80"
                            style={{ color: "var(--text-secondary)" }}
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Previous: Expressions
                        </Link>
                        <Link
                            to="/dol/repl/genes"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-opacity hover:opacity-90"
                            style={{ backgroundColor: "var(--glow-cyan)", color: "var(--void)" }}
                        >
                            Next: Genes
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
