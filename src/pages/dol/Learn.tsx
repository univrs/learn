import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { BookOpen, ArrowRight, ChevronRight, Clock, GraduationCap } from "lucide-react";

const tutorials = [
    {
        number: "01",
        title: "Hello DOL",
        description: "Write your first DOL specification and learn the core concepts",
        topics: ["genes", "exegesis", "has predicate", "qualified identifiers"],
        link: "/dol/tutorials/001-hello-dol",
        duration: "15 min",
    },
    {
        number: "02",
        title: "Values and Types",
        description: "Learn about DOL's type system and typed gen declarations",
        topics: ["primitive types", "typed fields", "generics", "type annotations"],
        link: "/dol/tutorials/002-values-types",
        duration: "15 min",
    },
    {
        number: "03",
        title: "Functions",
        description: "Add behavior to genes with methods and standalone functions",
        topics: ["fun keyword", "methods", "return types", "closures"],
        link: "/dol/tutorials/003-functions",
        duration: "20 min",
    },
    {
        number: "04",
        title: "Control Flow",
        description: "Conditionals, loops, and pattern matching in DOL",
        topics: ["if/else", "match", "for loops", "pattern matching"],
        link: "/dol/tutorials/004-control-flow",
        duration: "20 min",
    },
    {
        number: "05",
        title: "Collections",
        description: "Work with Lists, Maps, and functional operations in DOL",
        topics: ["List", "Map", "Option", "functional methods"],
        link: "/dol/tutorials/005-collections",
        duration: "20 min",
    },
    {
        number: "06",
        title: "Traits and Constraints",
        description: "Define behaviors and enforce invariants in DOL",
        topics: ["trait", "constraint", "uses", "never", "invariants"],
        link: "/dol/tutorials/006-traits-constraints",
        duration: "25 min",
    },
    {
        number: "07",
        title: "Error Handling",
        description: "Handle errors with Option, Result, and pattern matching",
        topics: ["Option<T>", "Result<T, E>", "? operator", "error propagation"],
        link: "/dol/tutorials/007-error-handling",
        duration: "15 min",
    },
    {
        number: "08",
        title: "Modules and Imports",
        description: "Organize DOL specifications into reusable modules",
        topics: ["module", "use", "pub", "requires", "systems"],
        link: "/dol/tutorials/008-modules-imports",
        duration: "15 min",
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
                        className="text-xl max-w-2xl mb-6"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        Master the Design Ontology Language through hands-on
                        tutorials. Start with the basics and progress to
                        building complete systems.
                    </p>

                    {/* Track Stats */}
                    <div className="flex flex-wrap items-center gap-6 mb-8">
                        <div className="flex items-center gap-2">
                            <GraduationCap className="w-5 h-5" style={{ color: "var(--glow-cyan)" }} />
                            <span style={{ color: "var(--text-secondary)" }}>8 lessons</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5" style={{ color: "var(--glow-gold)" }} />
                            <span style={{ color: "var(--text-secondary)" }}>~2 hours total</span>
                        </div>
                        <span
                            className="px-3 py-1 rounded-full text-sm"
                            style={{
                                backgroundColor: "var(--glow-cyan-dim)",
                                color: "var(--glow-cyan)",
                            }}
                        >
                            Beginner Friendly
                        </span>
                    </div>

                    {/* CTA Button */}
                    <Link
                        to="/dol/tutorials/001-hello-dol"
                        className="btn-primary inline-flex items-center gap-2"
                    >
                        Start Learning
                        <ArrowRight className="w-4 h-4" />
                    </Link>
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
                            <Link
                                key={tutorial.number}
                                to={tutorial.link}
                                className="card group cursor-pointer block"
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
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3
                                                className="text-lg font-normal group-hover:text-univrs-primary-400 transition-colors"
                                                style={{
                                                    color: "var(--text-primary)",
                                                }}
                                            >
                                                {tutorial.title}
                                            </h3>
                                            <span
                                                className="text-xs px-2 py-0.5 rounded"
                                                style={{
                                                    backgroundColor: "var(--glow-gold-dim, rgba(255, 215, 0, 0.15))",
                                                    color: "var(--glow-gold)",
                                                }}
                                            >
                                                {tutorial.duration}
                                            </span>
                                        </div>
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
                                        className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                                        style={{ color: "var(--glow-cyan)" }}
                                    />
                                </div>
                            </Link>
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
                            {`gen container.exists {
  container has identifier
  container has name
  container has created_at

  container is entity
  container is persistent
}

docs {
  A container exists in the system and has a unique identifier.
  This is the most basic property of any container.
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

            {/* Final CTA */}
            <section
                className="py-16"
                style={{ backgroundColor: "var(--bg-secondary)" }}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                    <h2
                        className="text-2xl font-light mb-4"
                        style={{ color: "var(--text-primary)" }}
                    >
                        Ready to begin?
                    </h2>
                    <p
                        className="text-lg mb-8 max-w-xl mx-auto"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        Start with your first gen definition and build your
                        understanding step by step.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            to="/dol/tutorials/001-hello-dol"
                            className="btn-primary inline-flex items-center gap-2"
                        >
                            Start with Hello DOL
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            to="/dol/playground"
                            className="btn-secondary"
                        >
                            Try Playground
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
