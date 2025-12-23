import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { BookOpen, ArrowRight, ChevronRight } from "lucide-react";

const tutorials = [
    {
        number: "01",
        title: "Getting Started",
        description: "Introduction to Metal DOL and the DOL-first paradigm",
        topics: ["Installation", "Your first DOL file", "Running dol-parse"],
    },
    {
        number: "02",
        title: "Writing Genes",
        description: "Deep dive into gene syntax and predicates",
        topics: [
            "has, is, derives predicates",
            "Typed properties",
            "Categories",
        ],
    },
    {
        number: "03",
        title: "Composing Traits",
        description: "Learn to build complex behaviors from simple units",
        topics: ["uses keyword", "Emitting events", "State machines"],
    },
    {
        number: "04",
        title: "System Design",
        description: "Architect complete systems with version requirements",
        topics: [
            "requires keyword",
            "Version constraints",
            "System composition",
        ],
    },
];

export default function DOLLearn() {
    return (
        <>
            <Helmet>
                <title>Learn DOL | Univrs Learn</title>
                <meta
                    name="description"
                    content="Interactive tutorials to learn the Design Ontology Language from basics to advanced concepts."
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
                            Learn
                        </span>
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                        <BookOpen
                            className="w-10 h-10"
                            style={{ color: "var(--glow-cyan)" }}
                        />
                        <h1
                            className="text-3xl sm:text-4xl font-light"
                            style={{ color: "var(--text-primary)" }}
                        >
                            Learn DOL
                        </h1>
                    </div>
                    <p
                        className="text-xl max-w-2xl"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        Master the Design Ontology Language through hands-on
                        tutorials. Start with the basics and progress to
                        building complete systems.
                    </p>
                </div>
            </section>

            {/* DOL-First Paradigm */}
            <section
                className="py-12"
                style={{ backgroundColor: "var(--bg-secondary)" }}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2
                        className="text-2xl font-light mb-6"
                        style={{ color: "var(--text-primary)" }}
                    >
                        The DOL-First Paradigm
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="card">
                            <h3
                                className="text-lg font-normal mb-3"
                                style={{ color: "var(--soft-gray)" }}
                            >
                                Traditional Development
                            </h3>
                            <div
                                className="space-y-2 text-sm"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                <p>1. Write code</p>
                                <p>2. Add comments/docs</p>
                                <p>3. Hope implementation matches design</p>
                            </div>
                        </div>
                        <div
                            className="card"
                            style={{
                                borderColor: "var(--glow-cyan)",
                                borderWidth: "1px",
                            }}
                        >
                            <h3
                                className="text-lg font-normal mb-3"
                                style={{ color: "var(--glow-cyan)" }}
                            >
                                DOL-First Development
                            </h3>
                            <div
                                className="space-y-2 text-sm"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                <p>
                                    1. <strong>Define your ontology</strong> in
                                    Metal DOL
                                </p>
                                <p>
                                    2. <strong>Generate tests</strong> that
                                    validate the ontology
                                </p>
                                <p>
                                    3. <strong>Implement code</strong> that
                                    passes the tests
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tutorials */}
            <section className="py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2
                        className="text-2xl font-light mb-8"
                        style={{ color: "var(--text-primary)" }}
                    >
                        Tutorial Series
                    </h2>
                    <div className="space-y-6">
                        {tutorials.map((tutorial) => (
                            <div
                                key={tutorial.number}
                                className="card group cursor-pointer"
                            >
                                <div className="flex items-start gap-6">
                                    <div
                                        className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-lg font-light"
                                        style={{
                                            backgroundColor:
                                                "var(--glow-cyan-dim)",
                                            color: "var(--glow-cyan)",
                                        }}
                                    >
                                        {tutorial.number}
                                    </div>
                                    <div className="flex-1">
                                        <h3
                                            className="text-lg font-normal mb-2 group-hover:text-univrs-primary-400 transition-colors"
                                            style={{
                                                color: "var(--text-primary)",
                                            }}
                                        >
                                            {tutorial.title}
                                        </h3>
                                        <p
                                            className="text-sm mb-3"
                                            style={{
                                                color: "var(--text-secondary)",
                                            }}
                                        >
                                            {tutorial.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {tutorial.topics.map((topic) => (
                                                <span
                                                    key={topic}
                                                    className="text-xs px-2 py-1 rounded"
                                                    style={{
                                                        backgroundColor:
                                                            "var(--border-subtle)",
                                                        color: "var(--soft-gray)",
                                                    }}
                                                >
                                                    {topic}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <ArrowRight
                                        className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity"
                                        style={{ color: "var(--glow-cyan)" }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quick Example */}
            <section
                className="py-16"
                style={{ backgroundColor: "var(--bg-secondary)" }}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2
                        className="text-2xl font-light mb-8"
                        style={{ color: "var(--text-primary)" }}
                    >
                        Your First DOL File
                    </h2>
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
                                my-first.dol
                            </span>
                        </div>
                        <pre
                            className="p-6 text-sm font-mono overflow-x-auto"
                            style={{ color: "var(--glow-cyan)" }}
                        >
                            {`gene container.exists @1.0.0 {

    has identifier: string
    is entity
    is persistent

    exegesis {
      A container exists in the system and has a unique identifier.
      This is the most basic property of any container.
    }
}`}
                        </pre>
                    </div>
                    <div className="mt-6 grid md:grid-cols-3 gap-4 text-sm">
                        <div
                            className="p-4 rounded-lg"
                            style={{ backgroundColor: "var(--bg-tertiary)" }}
                        >
                            <code
                                className="text-xs"
                                style={{ color: "var(--glow-cyan)" }}
                            >
                                gene
                            </code>
                            <p
                                className="mt-1"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                Declares an atomic ontological unit
                            </p>
                        </div>
                        <div
                            className="p-4 rounded-lg"
                            style={{ backgroundColor: "var(--bg-tertiary)" }}
                        >
                            <code
                                className="text-xs"
                                style={{ color: "var(--glow-gold)" }}
                            >
                                exegesis ...
                            </code>
                            <p
                                className="mt-1"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                Exegesis (required documentation)
                            </p>
                        </div>
                        <div
                            className="p-4 rounded-lg"
                            style={{ backgroundColor: "var(--bg-tertiary)" }}
                        >
                            <code
                                className="text-xs"
                                style={{ color: "var(--spore-purple)" }}
                            >
                                has, is
                            </code>
                            <p
                                className="mt-1"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                Predicates define properties
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* What You Can Build */}
            <section className="py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2
                        className="text-2xl font-light mb-8"
                        style={{ color: "var(--text-primary)" }}
                    >
                        What You Can Build
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                title: "Domain Entities",
                                desc: "Users, products, orders",
                            },
                            {
                                title: "System Behaviors",
                                desc: "Lifecycle states, event flows",
                            },
                            {
                                title: "Complex Constraints",
                                desc: "Business rules, invariants",
                            },
                            {
                                title: "Evolutionary Systems",
                                desc: "Versioned APIs, migrations",
                            },
                        ].map((item) => (
                            <div key={item.title} className="card">
                                <h3
                                    className="font-normal mb-2"
                                    style={{ color: "var(--glow-cyan)" }}
                                >
                                    {item.title}
                                </h3>
                                <p
                                    className="text-sm"
                                    style={{ color: "var(--soft-gray)" }}
                                >
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
