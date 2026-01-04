import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Zap, ChevronRight, Code2, ExternalLink } from "lucide-react";

const nextSteps = [
    {
        title: "Language Guide",
        description: "Deep dive into DOL syntax, predicates, and semantics",
        href: "/dol/learn",
    },
    {
        title: "Examples",
        description: "Explore real-world DOL patterns and use cases",
        href: "/dol/examples",
    },
    {
        title: "Biology Module",
        description: "See DOL applied to biological systems modeling",
        href: "/dol/examples/biology",
    },
];

const resources = [
    {
        title: "GitHub: univrs/dol",
        href: "https://github.com/univrs/dol",
    },
    {
        title: "API Reference",
        href: "/dol/reference",
    },
];

export default function DOLQuickStart() {
    return (
        <>
            <Helmet>
                <title>DOL v0.7.0 Quick Start | Univrs Learn</title>
                <meta
                    name="description"
                    content="Get from zero to DOL in 5 minutes. Install, write your first gene, and start building ontology-first systems."
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
                            Quick Start
                        </span>
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                        <Zap
                            className="w-10 h-10"
                            style={{ color: "var(--glow-cyan)" }}
                        />
                        <h1
                            className="text-3xl sm:text-4xl font-light"
                            style={{ color: "var(--text-primary)" }}
                        >
                            DOL v0.7.0 Quick Start
                        </h1>
                    </div>
                    <p
                        className="text-xl max-w-2xl"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        Get from zero to DOL in 5 minutes.
                    </p>
                </div>
            </section>

            {/* Install */}
            <section
                className="py-12"
                style={{ backgroundColor: "var(--bg-secondary)" }}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 mb-6">
                        <div
                            className="flex items-center justify-center w-8 h-8 rounded-full text-sm font-light"
                            style={{
                                backgroundColor: "var(--glow-cyan)",
                                color: "var(--void)",
                            }}
                        >
                            1
                        </div>
                        <h2
                            className="text-2xl font-light"
                            style={{ color: "var(--text-primary)" }}
                        >
                            Install
                        </h2>
                    </div>
                    <div
                        className="rounded-xl overflow-hidden"
                        style={{
                            backgroundColor: "var(--bg-tertiary)",
                            border: "1px solid var(--border-subtle)",
                        }}
                    >
                        <div
                            className="px-4 py-2 flex items-center gap-2"
                            style={{
                                borderBottom: "1px solid var(--border-subtle)",
                            }}
                        >
                            <span
                                className="text-xs font-mono"
                                style={{ color: "var(--soft-gray)" }}
                            >
                                Terminal
                            </span>
                        </div>
                        <pre
                            className="p-6 text-sm font-mono overflow-x-auto"
                            style={{ color: "var(--glow-cyan)" }}
                        >
                            {`# Clone and build
git clone https://github.com/univrs/dol.git
cd dol
cargo build --release --all-features

# Add to PATH
export PATH="$PATH:$(pwd)/target/release"`}
                        </pre>
                    </div>
                </div>
            </section>

            {/* Your First Gene */}
            <section className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 mb-6">
                        <div
                            className="flex items-center justify-center w-8 h-8 rounded-full text-sm font-light"
                            style={{
                                backgroundColor: "var(--glow-cyan)",
                                color: "var(--void)",
                            }}
                        >
                            2
                        </div>
                        <h2
                            className="text-2xl font-light"
                            style={{ color: "var(--text-primary)" }}
                        >
                            Your First Gene
                        </h2>
                    </div>
                    <p
                        className="mb-6 text-sm"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        Create a file called <code className="font-mono text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: "var(--bg-secondary)", color: "var(--glow-cyan)" }}>hello.dol</code>:
                    </p>
                    <div
                        className="rounded-xl overflow-hidden"
                        style={{
                            backgroundColor: "var(--bg-secondary)",
                            border: "1px solid var(--border-subtle)",
                        }}
                    >
                        <div
                            className="px-4 py-2 flex items-center gap-2"
                            style={{
                                backgroundColor: "var(--bg-tertiary)",
                                borderBottom: "1px solid var(--border-subtle)",
                            }}
                        >
                            <span
                                className="text-xs font-mono"
                                style={{ color: "var(--soft-gray)" }}
                            >
                                hello.dol
                            </span>
                        </div>
                        <pre
                            className="p-6 text-sm font-mono overflow-x-auto"
                            style={{ color: "var(--glow-cyan)" }}
                        >
                            {`module hello @ 1.0.0

pub gene Greeting {
    has message: String = "Hello, World!"

    fun display() -> String {
        return this.message
    }

    exegesis {
        A simple greeting demonstrating DOL basics.
    }
}`}
                        </pre>
                    </div>
                    <div className="mt-6 grid md:grid-cols-3 gap-4">
                        <div className="card">
                            <code
                                className="text-xs"
                                style={{ color: "var(--glow-cyan)" }}
                            >
                                module
                            </code>
                            <p
                                className="text-sm mt-2"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                Declares a versioned module namespace
                            </p>
                        </div>
                        <div className="card">
                            <code
                                className="text-xs"
                                style={{ color: "var(--spore-purple)" }}
                            >
                                pub gene
                            </code>
                            <p
                                className="text-sm mt-2"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                Public gene with properties and methods
                            </p>
                        </div>
                        <div className="card">
                            <code
                                className="text-xs"
                                style={{ color: "var(--glow-gold)" }}
                            >
                                exegesis
                            </code>
                            <p
                                className="text-sm mt-2"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                Required documentation block
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Validate */}
            <section
                className="py-12"
                style={{ backgroundColor: "var(--bg-secondary)" }}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 mb-6">
                        <div
                            className="flex items-center justify-center w-8 h-8 rounded-full text-sm font-light"
                            style={{
                                backgroundColor: "var(--glow-cyan)",
                                color: "var(--void)",
                            }}
                        >
                            3
                        </div>
                        <h2
                            className="text-2xl font-light"
                            style={{ color: "var(--text-primary)" }}
                        >
                            Validate
                        </h2>
                    </div>
                    <div
                        className="rounded-xl overflow-hidden"
                        style={{
                            backgroundColor: "var(--bg-tertiary)",
                            border: "1px solid var(--border-subtle)",
                        }}
                    >
                        <div
                            className="px-4 py-2 flex items-center gap-2"
                            style={{
                                borderBottom: "1px solid var(--border-subtle)",
                            }}
                        >
                            <span
                                className="text-xs font-mono"
                                style={{ color: "var(--soft-gray)" }}
                            >
                                Terminal
                            </span>
                        </div>
                        <pre
                            className="p-6 text-sm font-mono overflow-x-auto"
                            style={{ color: "var(--text-secondary)" }}
                        >
                            <span style={{ color: "var(--soft-gray)" }}>$</span> dol-parse hello.dol{"\n"}
                            <span style={{ color: "var(--glow-cyan)" }}>✓</span> hello.dol (Greeting){"\n\n"}
                            <span style={{ color: "var(--soft-gray)" }}>$</span> dol-check hello.dol{"\n"}
                            <span style={{ color: "var(--glow-cyan)" }}>✓</span> All constraints satisfied
                        </pre>
                    </div>
                </div>
            </section>

            {/* Generate Rust */}
            <section className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 mb-6">
                        <div
                            className="flex items-center justify-center w-8 h-8 rounded-full text-sm font-light"
                            style={{
                                backgroundColor: "var(--glow-cyan)",
                                color: "var(--void)",
                            }}
                        >
                            4
                        </div>
                        <h2
                            className="text-2xl font-light"
                            style={{ color: "var(--text-primary)" }}
                        >
                            Generate Rust
                        </h2>
                    </div>
                    <div
                        className="rounded-xl overflow-hidden"
                        style={{
                            backgroundColor: "var(--bg-secondary)",
                            border: "1px solid var(--border-subtle)",
                        }}
                    >
                        <div
                            className="px-4 py-2 flex items-center gap-2"
                            style={{
                                backgroundColor: "var(--bg-tertiary)",
                                borderBottom: "1px solid var(--border-subtle)",
                            }}
                        >
                            <span
                                className="text-xs font-mono"
                                style={{ color: "var(--soft-gray)" }}
                            >
                                Terminal
                            </span>
                        </div>
                        <pre
                            className="p-6 text-sm font-mono overflow-x-auto"
                            style={{ color: "var(--text-secondary)" }}
                        >
                            <span style={{ color: "var(--soft-gray)" }}>$</span> dol-codegen hello.dol -o generated/{"\n"}
                            <span style={{ color: "var(--glow-cyan)" }}>✓</span> Generated: generated/hello.rs
                        </pre>
                    </div>
                </div>
            </section>

            {/* What's Next */}
            <section
                className="py-12"
                style={{ backgroundColor: "var(--bg-secondary)" }}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2
                        className="text-2xl font-light mb-8"
                        style={{ color: "var(--text-primary)" }}
                    >
                        What's Next?
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {nextSteps.map((step) => (
                            <Link
                                key={step.title}
                                to={step.href}
                                className="card group"
                            >
                                <h3
                                    className="text-lg font-normal mb-2 group-hover:opacity-80 transition-opacity"
                                    style={{ color: "var(--glow-cyan)" }}
                                >
                                    {step.title}
                                </h3>
                                <p
                                    className="text-sm"
                                    style={{ color: "var(--soft-gray)" }}
                                >
                                    {step.description}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Resources */}
            <section className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2
                        className="text-2xl font-light mb-8"
                        style={{ color: "var(--text-primary)" }}
                    >
                        Resources
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-4">
                        {resources.map((resource) => (
                            resource.href.startsWith("http") ? (
                                <a
                                    key={resource.title}
                                    href={resource.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="card group flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-3">
                                        <Code2
                                            className="w-5 h-5"
                                            style={{ color: "var(--glow-cyan)" }}
                                        />
                                        <span
                                            className="font-normal group-hover:opacity-80 transition-opacity"
                                            style={{ color: "var(--text-primary)" }}
                                        >
                                            {resource.title}
                                        </span>
                                    </div>
                                    <ExternalLink
                                        className="w-4 h-4 opacity-60"
                                        style={{ color: "var(--soft-gray)" }}
                                    />
                                </a>
                            ) : (
                                <Link
                                    key={resource.title}
                                    to={resource.href}
                                    className="card group flex items-center gap-3"
                                >
                                    <Code2
                                        className="w-5 h-5"
                                        style={{ color: "var(--glow-cyan)" }}
                                    />
                                    <span
                                        className="font-normal group-hover:opacity-80 transition-opacity"
                                        style={{ color: "var(--text-primary)" }}
                                    >
                                        {resource.title}
                                    </span>
                                </Link>
                            )
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
