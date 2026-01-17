import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronRight, Clock, ArrowRight, ArrowLeft, CheckCircle, Lightbulb, Boxes, Trophy } from "lucide-react";
import DOLRepl from "../../../components/DOLRepl";

export default function ReplGenes() {
    return (
        <>
            <Helmet>
                <title>Working with Genes | DOL REPL Tutorial | Univrs Learn</title>
                <meta
                    name="description"
                    content="Define data structures (genes) and access their fields in the DOL REPL."
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
                        <span style={{ color: "var(--text-primary)" }}>Genes</span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <span
                                className="text-sm px-3 py-1 rounded-full"
                                style={{ backgroundColor: "var(--glow-cyan-dim)", color: "var(--glow-cyan)" }}
                            >
                                Lesson 4 of 4
                            </span>
                            <div className="flex items-center gap-1.5 text-sm" style={{ color: "var(--text-secondary)" }}>
                                <Clock className="w-4 h-4" />
                                20 min
                            </div>
                        </div>
                    </div>

                    <h1 className="text-3xl font-light mb-4" style={{ color: "var(--text-primary)" }}>
                        Working with Genes
                    </h1>
                    <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
                        Define data structures using genes and access their fields in the REPL.
                        Genes are DOL's primary way to structure data.
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="pb-16">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    {/* What are Genes? */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-light mb-4" style={{ color: "var(--text-primary)" }}>
                            What are Genes?
                        </h2>
                        <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
                            Genes are DOL's equivalent of structs or records. They define a collection
                            of named fields, each with a type. Use the{" "}
                            <code className="px-1.5 py-0.5 rounded text-sm" style={{ backgroundColor: "var(--moss)", color: "var(--glow-cyan)" }}>gen</code>{" "}
                            keyword to define a gene:
                        </p>

                        <div
                            className="p-4 rounded-lg mb-6"
                            style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-subtle)" }}
                        >
                            <pre className="text-sm font-mono" style={{ color: "var(--glow-cyan)" }}>
{`gen GeneName {
    has field1: Type1
    has field2: Type2
}`}
                            </pre>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                { part: "gen", desc: "Keyword to define a gene (data structure)" },
                                { part: "has field: Type", desc: "Declare a field with its type" },
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

                    {/* Defining a Gene */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-light mb-4" style={{ color: "var(--text-primary)" }}>
                            Defining a Gene
                        </h2>
                        <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
                            Let's define a simple Point gene with x and y coordinates:
                        </p>

                        <DOLRepl
                            title="Define a Point Gene"
                            description="A 2D point with integer coordinates"
                            initialCode={`gen Point { has x: i64  has y: i64 }`}
                            height="80px"
                        />

                        <div
                            className="mt-6 p-4 rounded-lg flex items-start gap-3"
                            style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--spore-purple)" }}
                        >
                            <Lightbulb className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "var(--spore-purple)" }} />
                            <div>
                                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                                    <strong style={{ color: "var(--text-primary)" }}>Note:</strong>{" "}
                                    In the REPL, you can put multiple <code className="px-1 rounded text-xs" style={{ backgroundColor: "var(--moss)" }}>has</code> declarations
                                    on one line, separated by spaces. In regular DOL files, you'd typically
                                    put each on its own line.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Using Genes in Functions */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-light mb-4" style={{ color: "var(--text-primary)" }}>
                            Using Genes in Functions
                        </h2>
                        <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
                            To use a gene in the REPL, you need to create an instance inside a function.
                            The function creates the gene instance and can access its fields:
                        </p>

                        <div className="space-y-4">
                            <DOLRepl
                                title="Step 1: Define the Gene"
                                initialCode={`gen Point { has x: i64  has y: i64 }`}
                                height="80px"
                            />
                            <DOLRepl
                                title="Step 2: Create a Function that Uses It"
                                description="Create a Point and return its x coordinate"
                                initialCode={`pub fun getX() -> i64 {
    let p = Point { x: 42, y: 100 }
    p.x
}`}
                                height="120px"
                            />
                            <DOLRepl
                                title="Step 3: Call the Function"
                                initialCode={`getX()`}
                                height="80px"
                            />
                        </div>
                    </div>

                    {/* Gene Instance Syntax */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-light mb-4" style={{ color: "var(--text-primary)" }}>
                            Gene Instance Syntax
                        </h2>
                        <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
                            To create an instance of a gene, use curly braces with field assignments:
                        </p>

                        <div
                            className="p-4 rounded-lg mb-6"
                            style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-subtle)" }}
                        >
                            <pre className="text-sm font-mono" style={{ color: "var(--glow-cyan)" }}>
{`let variableName = GeneName { field1: value1, field2: value2 }`}
                            </pre>
                        </div>

                        <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
                            Access fields using dot notation:
                        </p>

                        <div
                            className="p-4 rounded-lg"
                            style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-subtle)" }}
                        >
                            <pre className="text-sm font-mono" style={{ color: "var(--glow-cyan)" }}>
{`variableName.field1  // Access field1
variableName.field2  // Access field2`}
                            </pre>
                        </div>
                    </div>

                    {/* Float Gene Example */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-light mb-4" style={{ color: "var(--text-primary)" }}>
                            Float Gene Example
                        </h2>
                        <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
                            Let's create a Vector2D gene with floating-point components and calculate
                            the sum of its components:
                        </p>

                        <div className="space-y-4">
                            <DOLRepl
                                title="Define Vector2D"
                                initialCode={`gen Vector2D { has dx: f64  has dy: f64 }`}
                                height="80px"
                            />
                            <DOLRepl
                                title="Sum the Components"
                                initialCode={`pub fun vectorSum() -> f64 {
    let v = Vector2D { dx: 3.0, dy: 4.0 }
    v.dx + v.dy
}`}
                                height="120px"
                            />
                            <DOLRepl
                                title="Run It"
                                initialCode={`vectorSum()`}
                                height="80px"
                            />
                        </div>
                    </div>

                    {/* Rectangle Example */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-light mb-4" style={{ color: "var(--text-primary)" }}>
                            Complete Example: Rectangle
                        </h2>
                        <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
                            Let's build a more complete example with a Rectangle gene and functions
                            to calculate its area and perimeter:
                        </p>

                        <div
                            className="p-4 rounded-lg mb-6"
                            style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-subtle)" }}
                        >
                            <h4 className="text-sm font-medium mb-3 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                                <Boxes className="w-4 h-4" />
                                REPL Session
                            </h4>
                            <pre className="text-sm font-mono overflow-x-auto" style={{ color: "var(--glow-cyan)" }}>
{`>>> gen Rectangle { has width: i64  has height: i64 }
Defined gene 'Rectangle'

>>> pub fun calcArea() -> i64 {
...     let rect = Rectangle { width: 10, height: 5 }
...     rect.width * rect.height
... }
Defined function 'calcArea'

>>> pub fun calcPerimeter() -> i64 {
...     let rect = Rectangle { width: 10, height: 5 }
...     2 * (rect.width + rect.height)
... }
Defined function 'calcPerimeter'

>>> calcArea()
=> 50

>>> calcPerimeter()
=> 30`}
                            </pre>
                        </div>

                        <DOLRepl
                            title="Try It: Define Rectangle"
                            initialCode={`gen Rectangle { has width: i64  has height: i64 }`}
                            height="80px"
                        />
                    </div>

                    {/* Challenge */}
                    <div
                        className="p-6 rounded-xl mb-12"
                        style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--spore-purple)" }}
                    >
                        <h3 className="text-lg font-normal mb-4" style={{ color: "var(--spore-purple)" }}>
                            Final Challenge: Circle Properties
                        </h3>
                        <p className="mb-4 text-sm" style={{ color: "var(--text-secondary)" }}>
                            Create a Circle gene with a radius field (f64), then write functions to:
                        </p>
                        <ol className="list-decimal pl-5 mb-4 space-y-1 text-sm" style={{ color: "var(--text-secondary)" }}>
                            <li>Calculate the area (π × r²)</li>
                            <li>Calculate the circumference (2 × π × r)</li>
                        </ol>
                        <p className="mb-4 text-sm" style={{ color: "var(--text-secondary)" }}>
                            Use 3.14159 for π.
                        </p>
                        <DOLRepl
                            title="Your Solution"
                            description="Define Circle and calculate its properties"
                            initialCode={`// Step 1: Define the Circle gene
gen Circle { has radius: f64 }

// Step 2: Write your functions below`}
                            height="150px"
                        />
                        <details className="mt-4">
                            <summary className="text-sm cursor-pointer" style={{ color: "var(--glow-cyan)" }}>
                                Show Solution
                            </summary>
                            <pre
                                className="mt-2 p-3 rounded text-sm font-mono overflow-x-auto"
                                style={{ backgroundColor: "var(--moss)", color: "var(--glow-cyan)" }}
                            >
{`gen Circle { has radius: f64 }

pub fun circleArea() -> f64 {
    let c = Circle { radius: 5.0 }
    3.14159 * c.radius * c.radius
}

pub fun circleCircumference() -> f64 {
    let c = Circle { radius: 5.0 }
    2.0 * 3.14159 * c.radius
}`}
                            </pre>
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
                                "Genes are defined with 'gen GeneName { has field: Type }'",
                                "Create gene instances with 'GeneName { field: value }'",
                                "Access fields with dot notation: instance.field",
                                "Gene instances must be created inside functions in the REPL",
                                "Genes persist in the session and can be used across functions",
                            ].map((point, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                                    <span style={{ color: "var(--glow-cyan)" }}>•</span>
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Congratulations */}
                    <div
                        className="p-6 rounded-xl mb-12 text-center"
                        style={{
                            background: "linear-gradient(135deg, var(--glow-cyan-dim), var(--spore-purple-dim))",
                            border: "1px solid var(--glow-cyan)",
                        }}
                    >
                        <Trophy className="w-12 h-12 mx-auto mb-4" style={{ color: "var(--glow-cyan)" }} />
                        <h3 className="text-xl font-normal mb-2" style={{ color: "var(--text-primary)" }}>
                            Congratulations!
                        </h3>
                        <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
                            You've completed the DOL REPL tutorial! You now know how to:
                        </p>
                        <ul className="inline-block text-left space-y-1 text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
                            <li>• Evaluate expressions and understand type inference</li>
                            <li>• Define and call functions with parameters</li>
                            <li>• Create genes and access their fields</li>
                            <li>• Build up complex computations incrementally</li>
                        </ul>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                to="/dol/playground"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-opacity hover:opacity-90"
                                style={{ backgroundColor: "var(--glow-cyan)", color: "var(--void)" }}
                            >
                                Try the Playground
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                to="/dol/learn"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-opacity hover:opacity-80"
                                style={{ backgroundColor: "var(--bg-tertiary)", color: "var(--text-primary)", border: "1px solid var(--border-subtle)" }}
                            >
                                More DOL Tutorials
                            </Link>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between pt-8 border-t" style={{ borderColor: "var(--border-subtle)" }}>
                        <Link
                            to="/dol/repl/functions"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-opacity hover:opacity-80"
                            style={{ color: "var(--text-secondary)" }}
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Previous: Functions
                        </Link>
                        <Link
                            to="/dol/repl"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-opacity hover:opacity-90"
                            style={{ backgroundColor: "var(--glow-cyan)", color: "var(--void)" }}
                        >
                            Back to Overview
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
