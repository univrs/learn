import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronRight, Clock, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import DOLRepl from "../../../components/DOLRepl";

export default function ReplBasics() {
    return (
        <>
            <Helmet>
                <title>REPL Basics | DOL Tutorial | Univrs Learn</title>
                <meta
                    name="description"
                    content="Get started with the DOL REPL - setup, first commands, and understanding output."
                />
            </Helmet>

            {/* Breadcrumb & Header */}
            <section className="py-8 sm:py-12">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
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
                        <Link
                            to="/dol/repl"
                            className="hover:text-univrs-primary-400 transition-colors"
                        >
                            REPL Tutorial
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <span style={{ color: "var(--text-primary)" }}>Basics</span>
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
                                Lesson 1 of 4
                            </span>
                            <div
                                className="flex items-center gap-1.5 text-sm"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                <Clock className="w-4 h-4" />
                                10 min
                            </div>
                        </div>
                    </div>

                    <h1
                        className="text-3xl font-light mb-4"
                        style={{ color: "var(--text-primary)" }}
                    >
                        REPL Basics
                    </h1>
                    <p
                        className="text-lg"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        Get started with the DOL REPL - your interactive environment for exploring
                        and testing DOL code.
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="pb-16">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    {/* What is a REPL? */}
                    <div className="mb-12">
                        <h2
                            className="text-2xl font-light mb-4"
                            style={{ color: "var(--text-primary)" }}
                        >
                            What is a REPL?
                        </h2>
                        <p
                            className="mb-4"
                            style={{ color: "var(--text-secondary)" }}
                        >
                            REPL stands for <strong style={{ color: "var(--text-primary)" }}>Read-Eval-Print Loop</strong>.
                            It's an interactive programming environment that:
                        </p>
                        <ul className="space-y-3 mb-6">
                            {[
                                { term: "Reads", desc: "your input code" },
                                { term: "Evaluates", desc: "the code and computes the result" },
                                { term: "Prints", desc: "the result back to you" },
                                { term: "Loops", desc: "back to read more input" },
                            ].map((item) => (
                                <li
                                    key={item.term}
                                    className="flex items-start gap-3"
                                    style={{ color: "var(--text-secondary)" }}
                                >
                                    <span
                                        className="font-mono px-2 py-0.5 rounded text-sm"
                                        style={{
                                            backgroundColor: "var(--glow-cyan-dim)",
                                            color: "var(--glow-cyan)",
                                        }}
                                    >
                                        {item.term}
                                    </span>
                                    <span>{item.desc}</span>
                                </li>
                            ))}
                        </ul>
                        <p style={{ color: "var(--text-secondary)" }}>
                            The DOL REPL compiles your code to WebAssembly and executes it instantly,
                            giving you immediate feedback on expressions, function definitions, and more.
                        </p>
                    </div>

                    {/* Setup */}
                    <div className="mb-12">
                        <h2
                            className="text-2xl font-light mb-4"
                            style={{ color: "var(--text-primary)" }}
                        >
                            Setting Up
                        </h2>
                        <p
                            className="mb-4"
                            style={{ color: "var(--text-secondary)" }}
                        >
                            To use the DOL REPL in your Rust project, add the dependency with the{" "}
                            <code
                                className="px-1.5 py-0.5 rounded text-sm"
                                style={{
                                    backgroundColor: "var(--moss)",
                                    color: "var(--glow-cyan)",
                                }}
                            >
                                wasm
                            </code>{" "}
                            feature:
                        </p>
                        <div
                            className="rounded-lg overflow-hidden mb-6"
                            style={{
                                backgroundColor: "var(--bg-secondary)",
                                border: "1px solid var(--border-subtle)",
                            }}
                        >
                            <div
                                className="px-4 py-2 text-xs font-mono"
                                style={{
                                    backgroundColor: "var(--bg-tertiary)",
                                    borderBottom: "1px solid var(--border-subtle)",
                                    color: "var(--soft-gray)",
                                }}
                            >
                                Cargo.toml
                            </div>
                            <pre
                                className="p-4 text-sm font-mono overflow-x-auto"
                                style={{ color: "var(--glow-cyan)" }}
                            >
{`[dependencies]
dol = { version = "0.8", features = ["wasm"] }`}
                            </pre>
                        </div>

                        <p
                            className="mb-4"
                            style={{ color: "var(--text-secondary)" }}
                        >
                            Then create a REPL instance in your code:
                        </p>
                        <div
                            className="rounded-lg overflow-hidden"
                            style={{
                                backgroundColor: "var(--bg-secondary)",
                                border: "1px solid var(--border-subtle)",
                            }}
                        >
                            <div
                                className="px-4 py-2 text-xs font-mono"
                                style={{
                                    backgroundColor: "var(--bg-tertiary)",
                                    borderBottom: "1px solid var(--border-subtle)",
                                    color: "var(--soft-gray)",
                                }}
                            >
                                main.rs
                            </div>
                            <pre
                                className="p-4 text-sm font-mono overflow-x-auto"
                                style={{ color: "var(--glow-cyan)" }}
                            >
{`use metadol::repl::{SpiritRepl, EvalResult};

fn main() {
    let mut repl = SpiritRepl::new();

    // Now you can evaluate DOL code!
    match repl.eval("42") {
        Ok(EvalResult::Expression { value, .. }) => {
            println!("Result: {}", value);
        }
        other => println!("{:?}", other),
    }
}`}
                            </pre>
                        </div>
                    </div>

                    {/* Try It */}
                    <div className="mb-12">
                        <h2
                            className="text-2xl font-light mb-4"
                            style={{ color: "var(--text-primary)" }}
                        >
                            Your First Evaluation
                        </h2>
                        <p
                            className="mb-6"
                            style={{ color: "var(--text-secondary)" }}
                        >
                            Let's start with something simple - evaluating a number. Try running
                            the code below:
                        </p>

                        <DOLRepl
                            title="Try It: Your First REPL Command"
                            description="Click 'Run' to evaluate this simple expression"
                            initialCode="42"
                            height="100px"
                        />
                    </div>

                    {/* Understanding Results */}
                    <div className="mb-12">
                        <h2
                            className="text-2xl font-light mb-4"
                            style={{ color: "var(--text-primary)" }}
                        >
                            Understanding Results
                        </h2>
                        <p
                            className="mb-4"
                            style={{ color: "var(--text-secondary)" }}
                        >
                            The REPL returns different types of results depending on what you evaluate:
                        </p>

                        <div className="space-y-4 mb-6">
                            {[
                                {
                                    type: "Expression",
                                    desc: "Returns the computed value and its type",
                                    example: "42 → 42 : i64",
                                },
                                {
                                    type: "Defined",
                                    desc: "Confirms a function or gene was defined",
                                    example: 'pub fun square(x: i64) ... → Defined function \'square\'',
                                },
                                {
                                    type: "Empty",
                                    desc: "For comments or empty input",
                                    example: "// comment → (no output)",
                                },
                            ].map((item) => (
                                <div
                                    key={item.type}
                                    className="p-4 rounded-lg"
                                    style={{
                                        backgroundColor: "var(--bg-secondary)",
                                        border: "1px solid var(--border-subtle)",
                                    }}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <span
                                            className="font-mono text-sm px-2 py-0.5 rounded"
                                            style={{
                                                backgroundColor: "var(--glow-cyan-dim)",
                                                color: "var(--glow-cyan)",
                                            }}
                                        >
                                            {item.type}
                                        </span>
                                    </div>
                                    <p
                                        className="text-sm mb-2"
                                        style={{ color: "var(--text-secondary)" }}
                                    >
                                        {item.desc}
                                    </p>
                                    <code
                                        className="text-xs font-mono"
                                        style={{ color: "var(--soft-gray)" }}
                                    >
                                        {item.example}
                                    </code>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Key Points */}
                    <div
                        className="p-6 rounded-xl mb-12"
                        style={{
                            backgroundColor: "var(--bg-secondary)",
                            border: "1px solid var(--glow-cyan)",
                        }}
                    >
                        <h3
                            className="text-lg font-normal mb-4 flex items-center gap-2"
                            style={{ color: "var(--glow-cyan)" }}
                        >
                            <CheckCircle className="w-5 h-5" />
                            Key Points
                        </h3>
                        <ul className="space-y-2">
                            {[
                                "The DOL REPL compiles to WebAssembly for fast execution",
                                "Definitions persist within a session - you can use functions you've defined",
                                "Expression results include both value and type information",
                                "The wasm feature is required for expression evaluation",
                            ].map((point, i) => (
                                <li
                                    key={i}
                                    className="flex items-start gap-2 text-sm"
                                    style={{ color: "var(--text-secondary)" }}
                                >
                                    <span style={{ color: "var(--glow-cyan)" }}>•</span>
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between pt-8 border-t" style={{ borderColor: "var(--border-subtle)" }}>
                        <Link
                            to="/dol/repl"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-opacity hover:opacity-80"
                            style={{ color: "var(--text-secondary)" }}
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Overview
                        </Link>
                        <Link
                            to="/dol/repl/expressions"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-opacity hover:opacity-90"
                            style={{
                                backgroundColor: "var(--glow-cyan)",
                                color: "var(--void)",
                            }}
                        >
                            Next: Expressions
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
