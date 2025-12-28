import { Routes, Route, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FileCode, BookOpen, Library, Code2, ArrowRight, Sparkles, Zap, Package, Github, Terminal } from "lucide-react";

const DOL_VERSION = "0.4.0";
import DOLLearn from "./Learn";
import DOLReference from "./Reference";
import DOLStdlib from "./Stdlib";
import DOLExamples from "./Examples";
import DOLMetaprogramming from "./Metaprogramming";
import DOLSex from "./Sex";
import DOLCheatsheet from "./Cheatsheet";
import DOLQuickStart from "./QuickStart";
import DOLPlayground from "./Playground";
import DOLTutorial from "./Tutorial";

const sections = [
    {
        name: "Playground",
        description: "Write and run DOL code in your browser",
        href: "/dol/playground",
        icon: Terminal,
        isNew: true,
    },
    {
        name: "Learn DOL",
        description: "Interactive tutorials from basics to advanced concepts",
        href: "/dol/learn",
        icon: BookOpen,
    },
    {
        name: "Meta-Programming",
        description: "Quote/Eval, Reflect, Macros, and Idiom Brackets",
        href: "/dol/metaprogramming",
        icon: Sparkles,
        isNew: true,
    },
    {
        name: "SEX System",
        description: "Side Effect eXecution for controlled I/O",
        href: "/dol/sex",
        icon: Zap,
    },
    {
        name: "Examples",
        description: "Real-world examples from the biology module",
        href: "/dol/examples",
        icon: FileCode,
    },
    {
        name: "Reference",
        description: "Complete language specification and syntax",
        href: "/dol/reference",
        icon: Code2,
    },
    {
        name: "Standard Library",
        description: "Built-in types, traits, and constraints",
        href: "/dol/stdlib",
        icon: Library,
    },
];

function DOLOverview() {
    return (
        <>
            <Helmet>
                <title>DOL - Design Ontology Language | Univrs Learn</title>
                <meta
                    name="description"
                    content="Learn the Design Ontology Language (DOL) - a specification language for systems that know what they should be."
                />
            </Helmet>

            {/* Hero */}
            <section className="py-16 sm:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center"
                                style={{
                                    background:
                                        "linear-gradient(135deg, var(--glow-cyan), var(--glow-cyan-dim))",
                                }}
                            >
                                <FileCode
                                    className="w-6 h-6"
                                    style={{ color: "var(--void)" }}
                                />
                            </div>
                            <h1
                                className="text-3xl sm:text-4xl font-light"
                                style={{ color: "var(--text-primary)" }}
                            >
                                Design Ontology Language
                            </h1>
                        </div>
                        <p
                            className="text-xl mb-6"
                            style={{ color: "var(--text-secondary)" }}
                        >
                            A specification language for systems that know what
                            they should be.
                        </p>
                        <div className="flex flex-wrap items-center gap-4">
                            <a
                                href={`https://crates.io/crates/dol/${DOL_VERSION}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-opacity hover:opacity-80"
                                style={{
                                    backgroundColor: "var(--bg-tertiary)",
                                    border: "1px solid var(--border-subtle)",
                                    color: "var(--glow-cyan)",
                                }}
                            >
                                <Package className="w-4 h-4" />
                                v{DOL_VERSION}
                            </a>
                            <a
                                href="https://github.com/univrs/dol"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-opacity hover:opacity-80"
                                style={{
                                    backgroundColor: "var(--bg-tertiary)",
                                    border: "1px solid var(--border-subtle)",
                                    color: "var(--text-secondary)",
                                }}
                            >
                                <Github className="w-4 h-4" />
                                GitHub
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Install Section */}
            <section className="py-8" style={{ backgroundColor: "var(--bg-tertiary)" }}>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                            Install:
                        </span>
                        <code
                            className="px-4 py-2 rounded-lg font-mono text-sm"
                            style={{
                                backgroundColor: "var(--void)",
                                border: "1px solid var(--border-subtle)",
                                color: "var(--glow-cyan)",
                            }}
                        >
                            cargo install dol
                        </code>
                    </div>
                </div>
            </section>

            {/* Key Concepts */}
            <section
                className="py-16"
                style={{ backgroundColor: "var(--bg-secondary)" }}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2
                        className="text-2xl font-light mb-8"
                        style={{ color: "var(--text-primary)" }}
                    >
                        Key Concepts
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                name: "Genes",
                                desc: "Define properties and data structures",
                            },
                            {
                                name: "Traits",
                                desc: "Define behaviors and capabilities",
                            },
                            {
                                name: "Constraints",
                                desc: "Define rules and invariants",
                            },
                            {
                                name: "Systems",
                                desc: "Compose genes, traits, and constraints",
                            },
                        ].map((concept) => (
                            <div key={concept.name} className="card">
                                <h3
                                    className="text-lg font-normal mb-2"
                                    style={{ color: "var(--glow-cyan)" }}
                                >
                                    {concept.name}
                                </h3>
                                <p
                                    className="text-sm"
                                    style={{ color: "var(--soft-gray)" }}
                                >
                                    {concept.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Example */}
            <section className="py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2
                        className="text-2xl font-light mb-8"
                        style={{ color: "var(--text-primary)" }}
                    >
                        Quick Example
                    </h2>
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
                                example.dol
                            </span>
                        </div>
                        <pre
                            className="p-6 text-sm font-mono overflow-x-auto"
                            style={{ color: "var(--glow-cyan)" }}
                        >
                            {`gene hello.world {
  message has content
  message has sender
  message has timestamp
}

exegesis {
  The hello.world gene defines a message entity
  with three essential properties.
}`}
                        </pre>
                    </div>
                </div>
            </section>

            {/* Navigation sections */}
            <section
                className="py-16"
                style={{ backgroundColor: "var(--bg-secondary)" }}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2
                        className="text-2xl font-light mb-8"
                        style={{ color: "var(--text-primary)" }}
                    >
                        Explore DOL
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {sections.map((section) => (
                            <Link
                                key={section.name}
                                to={section.href}
                                className="card group relative"
                            >
                                {'isNew' in section && section.isNew && (
                                    <span
                                        className="absolute top-3 right-3 text-xs px-2 py-0.5 rounded-full"
                                        style={{
                                            backgroundColor: "var(--spore-purple)",
                                            color: "var(--void)",
                                        }}
                                    >
                                        New
                                    </span>
                                )}
                                <section.icon
                                    className="w-8 h-8 mb-4"
                                    style={{ color: "var(--glow-cyan)" }}
                                />
                                <h3
                                    className="text-lg font-normal mb-2 group-hover:opacity-80 transition-opacity"
                                    style={{ color: "var(--text-primary)" }}
                                >
                                    {section.name}
                                </h3>
                                <p
                                    className="text-sm mb-4"
                                    style={{ color: "var(--soft-gray)" }}
                                >
                                    {section.description}
                                </p>
                                <div
                                    className="flex items-center text-sm"
                                    style={{ color: "var(--glow-cyan)" }}
                                >
                                    Explore
                                    <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export default function DOLIndex() {
    return (
        <Routes>
            <Route index element={<DOLOverview />} />
            <Route path="playground" element={<DOLPlayground />} />
            <Route path="learn" element={<DOLLearn />} />
            <Route path="tutorials/:slug" element={<DOLTutorial />} />
            <Route path="metaprogramming" element={<DOLMetaprogramming />} />
            <Route path="sex" element={<DOLSex />} />
            <Route path="examples" element={<DOLExamples />} />
            <Route path="reference" element={<DOLReference />} />
            <Route path="stdlib" element={<DOLStdlib />} />
            <Route path="cheatsheet" element={<DOLCheatsheet />} />
            <Route path="quick-start" element={<DOLQuickStart />} />
        </Routes>
    );
}
