import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronRight, Clock, ArrowLeft, ArrowRight, BookOpen, HelpCircle, Network } from "lucide-react";
import ProgressTracker, { markLessonComplete } from "@/components/ProgressTracker";

const lessonsForTracker = [
    { slug: "heterotroph-critique", title: "The Heterotroph Critique", duration: "25 min" },
    { slug: "small-worlds", title: "Small World Network Mathematics", duration: "30 min" },
    { slug: "autopoiesis", title: "Autopoiesis and System Closure", duration: "30 min" },
    { slug: "eroi", title: "Energy Return on Investment", duration: "25 min" },
    { slug: "integration", title: "Integration - Energy Flows", duration: "35 min" },
];

export default function SmallWorlds() {
    const handleMarkComplete = () => {
        markLessonComplete("thermodynamics-foundations", "small-worlds");
        window.location.reload();
    };

    return (
        <>
            <Helmet>
                <title>Small World Network Mathematics | Thermodynamic Foundations | Univrs Learn</title>
                <meta
                    name="description"
                    content="The Watts-Strogatz model and rigorous network topology mathematics for distributed systems."
                />
            </Helmet>

            {/* Breadcrumb & Header */}
            <section className="py-8 sm:py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div
                        className="flex items-center gap-2 text-sm mb-6"
                        style={{ color: "var(--soft-gray)" }}
                    >
                        <Link to="/" className="hover:opacity-80 transition-opacity">
                            Home
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link to="/docs/foundations/thermodynamics" className="hover:opacity-80 transition-opacity">
                            Thermodynamics
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <span style={{ color: "var(--text-primary)" }}>
                            Module 2
                        </span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <span
                                className="text-sm px-3 py-1 rounded-full"
                                style={{
                                    backgroundColor: "rgba(255, 215, 0, 0.15)",
                                    color: "var(--glow-gold)",
                                }}
                            >
                                Module 2 of 5
                            </span>
                            <div
                                className="flex items-center gap-1.5 text-sm"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                <Clock className="w-4 h-4" />
                                30 min
                            </div>
                        </div>
                    </div>

                    <h1
                        className="text-3xl sm:text-4xl font-light mb-4"
                        style={{ color: "var(--text-primary)" }}
                    >
                        Small World Network Mathematics
                    </h1>
                    <p
                        className="text-xl max-w-3xl"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        Understanding the rigorous mathematics behind network topology claims.
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="pb-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            {/* The Problem */}
                            <div className="mb-12">
                                <h2
                                    className="text-2xl font-light mb-6"
                                    style={{ color: "var(--text-primary)" }}
                                >
                                    The Problem We Glossed Over
                                </h2>
                                <p
                                    className="mb-6 leading-relaxed"
                                    style={{ color: "var(--text-secondary)" }}
                                >
                                    We invoked Dunbar's number (~150 stable relationships) without demonstrating the actual network topology mathematics.
                                </p>

                                <div
                                    className="rounded-xl p-6 mb-6"
                                    style={{
                                        backgroundColor: "var(--bg-tertiary)",
                                        borderLeft: "4px solid var(--glow-gold)",
                                    }}
                                >
                                    <p
                                        className="italic"
                                        style={{ color: "var(--text-primary)" }}
                                    >
                                        "Your use of the Dunbar number does not stack up. You do not seem to understand the maths of Small Worlds."
                                    </p>
                                    <p
                                        className="text-sm mt-3"
                                        style={{ color: "var(--soft-gray)" }}
                                    >
                                        - Dr. Louis Arnoux
                                    </p>
                                </div>
                            </div>

                            {/* Watts-Strogatz Model */}
                            <div className="mb-12">
                                <h2
                                    className="text-2xl font-light mb-6 flex items-center gap-3"
                                    style={{ color: "var(--text-primary)" }}
                                >
                                    <Network className="w-6 h-6" style={{ color: "var(--glow-cyan)" }} />
                                    Watts-Strogatz Model (1998)
                                </h2>
                                <p
                                    className="mb-6 leading-relaxed"
                                    style={{ color: "var(--text-secondary)" }}
                                >
                                    The foundational small-world network paper defines two key metrics:
                                </p>

                                {/* Clustering Coefficient */}
                                <div
                                    className="rounded-xl p-6 mb-6"
                                    style={{
                                        backgroundColor: "var(--bg-secondary)",
                                        border: "1px solid var(--border-subtle)",
                                    }}
                                >
                                    <h3
                                        className="text-lg font-medium mb-3"
                                        style={{ color: "var(--glow-cyan)" }}
                                    >
                                        Clustering Coefficient C(p)
                                    </h3>
                                    <ul className="space-y-2 mb-4">
                                        <li style={{ color: "var(--text-secondary)" }}>
                                            Measures local "cliquishness" - how many of your neighbors know each other
                                        </li>
                                        <li style={{ color: "var(--text-secondary)" }}>
                                            <strong style={{ color: "var(--text-primary)" }}>High C</strong> = tight local clusters
                                        </li>
                                    </ul>
                                    <div
                                        className="p-4 rounded-lg font-mono text-sm"
                                        style={{
                                            backgroundColor: "var(--void)",
                                            color: "var(--glow-cyan)",
                                        }}
                                    >
                                        C = (number of triangles x 3) / (number of connected triples)
                                    </div>
                                </div>

                                {/* Characteristic Path Length */}
                                <div
                                    className="rounded-xl p-6 mb-6"
                                    style={{
                                        backgroundColor: "var(--bg-secondary)",
                                        border: "1px solid var(--border-subtle)",
                                    }}
                                >
                                    <h3
                                        className="text-lg font-medium mb-3"
                                        style={{ color: "var(--glow-cyan)" }}
                                    >
                                        Characteristic Path Length L(p)
                                    </h3>
                                    <ul className="space-y-2 mb-4">
                                        <li style={{ color: "var(--text-secondary)" }}>
                                            Average shortest path between any two nodes
                                        </li>
                                        <li style={{ color: "var(--text-secondary)" }}>
                                            <strong style={{ color: "var(--text-primary)" }}>Low L</strong> = any node can reach any other quickly
                                        </li>
                                    </ul>
                                    <div
                                        className="p-4 rounded-lg font-mono text-sm"
                                        style={{
                                            backgroundColor: "var(--void)",
                                            color: "var(--glow-cyan)",
                                        }}
                                    >
                                        L = (1/N(N-1)) x sum of d(i,j) for all pairs
                                    </div>
                                </div>

                                {/* Small World Property */}
                                <div
                                    className="rounded-xl p-6 mb-6"
                                    style={{
                                        backgroundColor: "rgba(255, 215, 0, 0.1)",
                                        border: "1px solid var(--glow-gold)",
                                    }}
                                >
                                    <h3
                                        className="text-lg font-medium mb-3"
                                        style={{ color: "var(--glow-gold)" }}
                                    >
                                        The Small World Property
                                    </h3>
                                    <p
                                        className="mb-4"
                                        style={{ color: "var(--text-secondary)" }}
                                    >
                                        A network is "small world" when:
                                    </p>
                                    <ul className="space-y-2 mb-4">
                                        <li style={{ color: "var(--text-secondary)" }}>
                                            <strong style={{ color: "var(--text-primary)" }}>High clustering</strong> (like regular lattices): C &gt;&gt; C_random
                                        </li>
                                        <li style={{ color: "var(--text-secondary)" }}>
                                            <strong style={{ color: "var(--text-primary)" }}>Short path lengths</strong> (like random graphs): L &#8776; L_random
                                        </li>
                                    </ul>
                                    <p
                                        className="text-sm italic"
                                        style={{ color: "var(--glow-gold)" }}
                                    >
                                        Key insight: Adding just a few random "shortcuts" dramatically reduces L while barely affecting C.
                                    </p>
                                </div>
                            </div>

                            {/* Mathematical Requirements */}
                            <div className="mb-12">
                                <h2
                                    className="text-2xl font-light mb-6"
                                    style={{ color: "var(--text-primary)" }}
                                >
                                    Mathematical Requirements for Our Claims
                                </h2>
                                <p
                                    className="mb-6 leading-relaxed"
                                    style={{ color: "var(--text-secondary)" }}
                                >
                                    To claim our network has small-world properties, we must calculate:
                                </p>

                                <div
                                    className="rounded-xl overflow-hidden mb-6"
                                    style={{
                                        backgroundColor: "var(--bg-secondary)",
                                        border: "1px solid var(--border-subtle)",
                                    }}
                                >
                                    <div
                                        className="px-4 py-2"
                                        style={{
                                            backgroundColor: "var(--bg-tertiary)",
                                            borderBottom: "1px solid var(--border-subtle)",
                                        }}
                                    >
                                        <span
                                            className="text-xs font-mono"
                                            style={{ color: "var(--soft-gray)" }}
                                        >
                                            network-requirements.txt
                                        </span>
                                    </div>
                                    <pre
                                        className="p-6 text-sm font-mono overflow-x-auto"
                                        style={{ color: "var(--glow-cyan)" }}
                                    >
{`For network with N nodes and average degree k:

Random network baselines:
  C_random ≈ k/N
  L_random ≈ ln(N)/ln(k)

Our network must show:
  C_actual >> C_random  (high clustering)
  L_actual ≈ L_random   (short paths)`}
                                    </pre>
                                </div>

                                <div
                                    className="p-4 rounded-lg"
                                    style={{
                                        backgroundColor: "var(--bg-tertiary)",
                                        border: "1px solid var(--border-subtle)",
                                    }}
                                >
                                    <p
                                        className="font-medium mb-2"
                                        style={{ color: "var(--spore-purple)" }}
                                    >
                                        Scaling Question:
                                    </p>
                                    <p style={{ color: "var(--text-secondary)" }}>
                                        As N grows from 150 to 15,000 to 1.5 million, how do C and L change? Does the network maintain small-world properties at scale?
                                    </p>
                                </div>
                            </div>

                            {/* Required Reading */}
                            <div className="mb-12">
                                <h2
                                    className="text-2xl font-light mb-6 flex items-center gap-3"
                                    style={{ color: "var(--text-primary)" }}
                                >
                                    <BookOpen className="w-6 h-6" style={{ color: "var(--glow-cyan)" }} />
                                    Required Reading
                                </h2>
                                <div className="space-y-4">
                                    {[
                                        {
                                            author: "Watts, D.J. & Strogatz, S.H. (1998)",
                                            title: "Collective dynamics of 'small-world' networks",
                                            publisher: "Nature, 393, 440-442",
                                            note: "Original paper",
                                        },
                                        {
                                            author: "Newman, M.E.J. (2003)",
                                            title: "The structure and function of complex networks",
                                            publisher: "SIAM Review, 45(2), 167-256",
                                            note: "Comprehensive overview",
                                        },
                                        {
                                            author: "Barabasi, A.L. & Albert, R. (1999)",
                                            title: "Emergence of scaling in random networks",
                                            publisher: "Science, 286, 509-512",
                                            note: "Scale-free networks",
                                        },
                                        {
                                            author: "Dunbar, R.I.M. (1992)",
                                            title: "Neocortex size as a constraint on group size in primates",
                                            publisher: "Journal of Human Evolution, 22(6), 469-493",
                                            note: "Actual Dunbar paper",
                                        },
                                    ].map((book, index) => (
                                        <div
                                            key={index}
                                            className="p-4 rounded-lg flex items-start gap-3"
                                            style={{
                                                backgroundColor: "var(--bg-secondary)",
                                                border: "1px solid var(--border-subtle)",
                                            }}
                                        >
                                            <div
                                                className="w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5"
                                                style={{ borderColor: "var(--soft-gray)" }}
                                            />
                                            <div>
                                                <p
                                                    className="text-sm"
                                                    style={{ color: "var(--soft-gray)" }}
                                                >
                                                    {book.author}
                                                </p>
                                                <p
                                                    className="font-medium"
                                                    style={{ color: "var(--text-primary)" }}
                                                >
                                                    {book.title}
                                                </p>
                                                <p
                                                    className="text-sm"
                                                    style={{ color: "var(--soft-gray)" }}
                                                >
                                                    {book.publisher} - {book.note}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Exercises */}
                            <div className="mb-12">
                                <h2
                                    className="text-2xl font-light mb-6 flex items-center gap-3"
                                    style={{ color: "var(--text-primary)" }}
                                >
                                    <HelpCircle className="w-6 h-6" style={{ color: "var(--spore-purple)" }} />
                                    Exercises
                                </h2>
                                <div className="space-y-4">
                                    {[
                                        "Calculate clustering coefficient for a network of 150 nodes where each node connects to 10 neighbors",
                                        "Model path length as network scales from 150 -> 1,500 -> 15,000 nodes",
                                        "Simulate shortcut addition - how many random long-range connections reduce L by 50%?",
                                        "Compare to Dunbar - does cognitive limit on stable relationships affect network topology calculations?",
                                    ].map((exercise, index) => (
                                        <div
                                            key={index}
                                            className="p-4 rounded-lg"
                                            style={{
                                                backgroundColor: "var(--bg-secondary)",
                                                border: "1px solid var(--border-subtle)",
                                            }}
                                        >
                                            <p style={{ color: "var(--text-secondary)" }}>
                                                <span
                                                    className="font-mono mr-2"
                                                    style={{ color: "var(--spore-purple)" }}
                                                >
                                                    {index + 1}.
                                                </span>
                                                {exercise}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Navigation */}
                            <div
                                className="flex items-center justify-between pt-8 mt-8"
                                style={{ borderTop: "1px solid var(--border-subtle)" }}
                            >
                                <Link
                                    to="/docs/foundations/thermodynamics/heterotroph-critique"
                                    className="flex items-center gap-2 text-sm hover:opacity-80 transition-opacity"
                                    style={{ color: "var(--soft-gray)" }}
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Heterotroph Critique
                                </Link>

                                <button
                                    onClick={handleMarkComplete}
                                    className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
                                    style={{
                                        backgroundColor: "var(--glow-cyan-dim)",
                                        color: "var(--glow-cyan)",
                                    }}
                                >
                                    Mark as Complete
                                </button>

                                <Link
                                    to="/docs/foundations/thermodynamics/autopoiesis"
                                    className="flex items-center gap-2 text-sm hover:opacity-80 transition-opacity"
                                    style={{ color: "var(--glow-gold)" }}
                                >
                                    Next: Autopoiesis
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-8">
                                <ProgressTracker
                                    trackId="thermodynamics-foundations"
                                    lessons={lessonsForTracker}
                                    currentLesson="small-worlds"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
