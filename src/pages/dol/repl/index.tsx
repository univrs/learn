import { Routes, Route, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
    Terminal,
    Calculator,
    Code,
    Boxes,
    ArrowRight,
    Clock,
    CheckCircle,
} from "lucide-react";
import ReplBasics from "./Basics";
import ReplExpressions from "./Expressions";
import ReplFunctions from "./Functions";
import ReplGenes from "./Genes";

const tutorials = [
    {
        slug: "basics",
        title: "REPL Basics",
        description: "Get started with the DOL REPL - setup, first commands, and understanding output",
        duration: "10 min",
        icon: Terminal,
        topics: ["Installation", "First evaluation", "Understanding results"],
    },
    {
        slug: "expressions",
        title: "Expressions & Arithmetic",
        description: "Evaluate numbers, perform calculations, and understand type inference",
        duration: "15 min",
        icon: Calculator,
        topics: ["Integer literals", "Float literals", "Arithmetic operations", "Type inference"],
    },
    {
        slug: "functions",
        title: "Defining Functions",
        description: "Create reusable functions and build up your REPL environment",
        duration: "15 min",
        icon: Code,
        topics: ["Function syntax", "Parameters & return types", "Calling functions", "Building on functions"],
    },
    {
        slug: "genes",
        title: "Working with Genes",
        description: "Define data structures and access their fields in the REPL",
        duration: "20 min",
        icon: Boxes,
        topics: ["Gene definitions", "Field access", "Genes in functions", "Complex examples"],
    },
];

function ReplOverview() {
    return (
        <>
            <Helmet>
                <title>REPL Tutorial | DOL | Univrs Learn</title>
                <meta
                    name="description"
                    content="Interactive tutorials for the DOL REPL - learn to evaluate expressions, define functions, and work with genes."
                />
            </Helmet>

            {/* Hero */}
            <section className="py-12 sm:py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center"
                                style={{
                                    background:
                                        "linear-gradient(135deg, var(--glow-cyan), var(--spore-purple))",
                                }}
                            >
                                <Terminal
                                    className="w-6 h-6"
                                    style={{ color: "var(--void)" }}
                                />
                            </div>
                            <div>
                                <h1
                                    className="text-3xl sm:text-4xl font-light"
                                    style={{ color: "var(--text-primary)" }}
                                >
                                    REPL Tutorial
                                </h1>
                                <p
                                    className="text-sm"
                                    style={{ color: "var(--soft-gray)" }}
                                >
                                    Interactive DOL exploration
                                </p>
                            </div>
                        </div>
                        <p
                            className="text-lg mb-8"
                            style={{ color: "var(--text-secondary)" }}
                        >
                            Learn to use the DOL REPL (Read-Eval-Print Loop) for interactive
                            code exploration. From basic expressions to complex gene definitions,
                            master the art of exploratory programming in DOL.
                        </p>
                        <div
                            className="flex items-center gap-4 text-sm"
                            style={{ color: "var(--soft-gray)" }}
                        >
                            <span className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4" />
                                ~60 minutes total
                            </span>
                            <span className="flex items-center gap-1.5">
                                <CheckCircle className="w-4 h-4" />
                                4 lessons
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* What You'll Learn */}
            <section
                className="py-12"
                style={{ backgroundColor: "var(--bg-secondary)" }}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2
                        className="text-2xl font-light mb-6"
                        style={{ color: "var(--text-primary)" }}
                    >
                        What You'll Learn
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            "Evaluate expressions and see instant results",
                            "Perform arithmetic with integers and floats",
                            "Define and call functions interactively",
                            "Create genes and access their fields",
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-3 p-4 rounded-lg"
                                style={{
                                    backgroundColor: "var(--bg-tertiary)",
                                    border: "1px solid var(--border-subtle)",
                                }}
                            >
                                <CheckCircle
                                    className="w-5 h-5 flex-shrink-0 mt-0.5"
                                    style={{ color: "var(--glow-cyan)" }}
                                />
                                <span
                                    className="text-sm"
                                    style={{ color: "var(--text-secondary)" }}
                                >
                                    {item}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tutorial List */}
            <section className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2
                        className="text-2xl font-light mb-8"
                        style={{ color: "var(--text-primary)" }}
                    >
                        Lessons
                    </h2>
                    <div className="space-y-4">
                        {tutorials.map((tutorial, index) => (
                            <Link
                                key={tutorial.slug}
                                to={tutorial.slug}
                                className="block group"
                            >
                                <div
                                    className="p-6 rounded-xl transition-all hover:translate-x-1"
                                    style={{
                                        backgroundColor: "var(--bg-secondary)",
                                        border: "1px solid var(--border-subtle)",
                                    }}
                                >
                                    <div className="flex items-start gap-6">
                                        <div className="flex-shrink-0">
                                            <div
                                                className="w-12 h-12 rounded-lg flex items-center justify-center"
                                                style={{
                                                    backgroundColor: "var(--glow-cyan-dim)",
                                                }}
                                            >
                                                <tutorial.icon
                                                    className="w-6 h-6"
                                                    style={{ color: "var(--glow-cyan)" }}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span
                                                    className="text-sm font-mono px-2 py-0.5 rounded"
                                                    style={{
                                                        backgroundColor: "var(--bg-tertiary)",
                                                        color: "var(--soft-gray)",
                                                    }}
                                                >
                                                    {String(index + 1).padStart(2, "0")}
                                                </span>
                                                <h3
                                                    className="text-lg font-normal group-hover:opacity-80 transition-opacity"
                                                    style={{ color: "var(--text-primary)" }}
                                                >
                                                    {tutorial.title}
                                                </h3>
                                                <span
                                                    className="text-sm flex items-center gap-1"
                                                    style={{ color: "var(--soft-gray)" }}
                                                >
                                                    <Clock className="w-3.5 h-3.5" />
                                                    {tutorial.duration}
                                                </span>
                                            </div>
                                            <p
                                                className="text-sm mb-3"
                                                style={{ color: "var(--text-secondary)" }}
                                            >
                                                {tutorial.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {tutorial.topics.map((topic) => (
                                                    <span
                                                        key={topic}
                                                        className="text-xs px-2 py-1 rounded"
                                                        style={{
                                                            backgroundColor: "var(--moss)",
                                                            color: "var(--soft-gray)",
                                                        }}
                                                    >
                                                        {topic}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex-shrink-0 self-center">
                                            <ArrowRight
                                                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                                                style={{ color: "var(--glow-cyan)" }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Prerequisites */}
            <section
                className="py-12"
                style={{ backgroundColor: "var(--bg-secondary)" }}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2
                        className="text-2xl font-light mb-6"
                        style={{ color: "var(--text-primary)" }}
                    >
                        Prerequisites
                    </h2>
                    <div
                        className="p-6 rounded-xl"
                        style={{
                            backgroundColor: "var(--bg-tertiary)",
                            border: "1px solid var(--border-subtle)",
                        }}
                    >
                        <ul className="space-y-3">
                            <li
                                className="flex items-start gap-3"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                <span style={{ color: "var(--glow-cyan)" }}>•</span>
                                <span>Rust 1.70+ installed (<code className="text-sm px-1.5 py-0.5 rounded" style={{ backgroundColor: "var(--moss)", color: "var(--glow-cyan)" }}>rustc --version</code>)</span>
                            </li>
                            <li
                                className="flex items-start gap-3"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                <span style={{ color: "var(--glow-cyan)" }}>•</span>
                                <span>Basic familiarity with DOL syntax (recommended: complete the <Link to="/dol/learn" style={{ color: "var(--glow-cyan)" }}>DOL Learn</Link> tutorials first)</span>
                            </li>
                            <li
                                className="flex items-start gap-3"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                <span style={{ color: "var(--glow-cyan)" }}>•</span>
                                <span>The metadol crate with <code className="text-sm px-1.5 py-0.5 rounded" style={{ backgroundColor: "var(--moss)", color: "var(--glow-cyan)" }}>wasm</code> feature enabled</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <Link
                            to="basics"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-opacity hover:opacity-90"
                            style={{
                                backgroundColor: "var(--glow-cyan)",
                                color: "var(--void)",
                            }}
                        >
                            Start Learning
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}

export default function ReplIndex() {
    return (
        <Routes>
            <Route index element={<ReplOverview />} />
            <Route path="basics" element={<ReplBasics />} />
            <Route path="expressions" element={<ReplExpressions />} />
            <Route path="functions" element={<ReplFunctions />} />
            <Route path="genes" element={<ReplGenes />} />
        </Routes>
    );
}
