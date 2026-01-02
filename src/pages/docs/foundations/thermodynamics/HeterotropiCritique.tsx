import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronRight, Clock, ArrowLeft, ArrowRight, BookOpen, AlertCircle, HelpCircle } from "lucide-react";
import ProgressTracker, { markLessonComplete } from "@/components/ProgressTracker";

const lessonsForTracker = [
    { slug: "heterotroph-critique", title: "The Heterotroph Critique", duration: "25 min" },
    { slug: "small-worlds", title: "Small World Network Mathematics", duration: "30 min" },
    { slug: "autopoiesis", title: "Autopoiesis and System Closure", duration: "30 min" },
    { slug: "eroi", title: "Energy Return on Investment", duration: "25 min" },
    { slug: "integration", title: "Integration - Energy Flows", duration: "35 min" },
];

export default function HeterotropiCritique() {
    const handleMarkComplete = () => {
        markLessonComplete("thermodynamics-foundations", "heterotroph-critique");
        window.location.reload();
    };

    return (
        <>
            <Helmet>
                <title>The Heterotroph Critique | Thermodynamic Foundations | Univrs Learn</title>
                <meta
                    name="description"
                    content="Understanding the fatal flaw in mycelial metaphors - fungi are heterotrophic and require autotrophic energy sources."
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
                            Module 1
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
                                Module 1 of 5
                            </span>
                            <div
                                className="flex items-center gap-1.5 text-sm"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                <Clock className="w-4 h-4" />
                                25 min
                            </div>
                        </div>
                    </div>

                    <h1
                        className="text-3xl sm:text-4xl font-light mb-4"
                        style={{ color: "var(--text-primary)" }}
                    >
                        The Heterotroph Critique
                    </h1>
                    <p
                        className="text-xl max-w-3xl"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        Understanding why fungi-based metaphors contain a fundamental thermodynamic flaw.
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="pb-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            {/* The Problem We Didn't See */}
                            <div className="mb-12">
                                <h2
                                    className="text-2xl font-light mb-6"
                                    style={{ color: "var(--text-primary)" }}
                                >
                                    The Problem We Didn't See
                                </h2>
                                <p
                                    className="mb-4 leading-relaxed"
                                    style={{ color: "var(--text-secondary)" }}
                                >
                                    Our mycelial metaphor contains a fatal flaw: <strong style={{ color: "var(--glow-gold)" }}>fungi are heterotrophic</strong>.
                                </p>

                                {/* Organism Types Table */}
                                <div
                                    className="rounded-xl overflow-hidden mb-6"
                                    style={{
                                        backgroundColor: "var(--bg-secondary)",
                                        border: "1px solid var(--border-subtle)",
                                    }}
                                >
                                    <table className="w-full">
                                        <thead>
                                            <tr style={{ backgroundColor: "var(--bg-tertiary)" }}>
                                                <th
                                                    className="px-4 py-3 text-left text-sm font-medium"
                                                    style={{ color: "var(--text-primary)" }}
                                                >
                                                    Organism Type
                                                </th>
                                                <th
                                                    className="px-4 py-3 text-left text-sm font-medium"
                                                    style={{ color: "var(--text-primary)" }}
                                                >
                                                    Energy Source
                                                </th>
                                                <th
                                                    className="px-4 py-3 text-left text-sm font-medium"
                                                    style={{ color: "var(--text-primary)" }}
                                                >
                                                    Example
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr style={{ borderTop: "1px solid var(--border-subtle)" }}>
                                                <td
                                                    className="px-4 py-3 text-sm font-medium"
                                                    style={{ color: "var(--glow-cyan)" }}
                                                >
                                                    Autotroph
                                                </td>
                                                <td
                                                    className="px-4 py-3 text-sm"
                                                    style={{ color: "var(--text-secondary)" }}
                                                >
                                                    Captures primary energy (solar flux)
                                                </td>
                                                <td
                                                    className="px-4 py-3 text-sm"
                                                    style={{ color: "var(--text-secondary)" }}
                                                >
                                                    Plants, photosynthetic bacteria
                                                </td>
                                            </tr>
                                            <tr style={{ borderTop: "1px solid var(--border-subtle)" }}>
                                                <td
                                                    className="px-4 py-3 text-sm font-medium"
                                                    style={{ color: "var(--glow-gold)" }}
                                                >
                                                    Heterotroph
                                                </td>
                                                <td
                                                    className="px-4 py-3 text-sm"
                                                    style={{ color: "var(--text-secondary)" }}
                                                >
                                                    Consumes already-captured energy
                                                </td>
                                                <td
                                                    className="px-4 py-3 text-sm"
                                                    style={{ color: "var(--text-secondary)" }}
                                                >
                                                    Fungi, animals, humans
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <p
                                    className="mb-6 leading-relaxed"
                                    style={{ color: "var(--text-secondary)" }}
                                >
                                    Fungi decompose organic matter - they feed on energy that plants already captured from sunlight. A distributed network of heterotrophs still requires an autotrophic source somewhere.
                                </p>

                                {/* The Critique Quote */}
                                <div
                                    className="rounded-xl p-6 mb-6"
                                    style={{
                                        backgroundColor: "var(--bg-tertiary)",
                                        borderLeft: "4px solid var(--glow-gold)",
                                    }}
                                >
                                    <p
                                        className="italic mb-3"
                                        style={{ color: "var(--text-primary)" }}
                                    >
                                        "Your mycelium metaphor highlights the problem: fungi are heterotrophic. They need a ready source of energy in the form of decaying matter while plants are autotrophic using sun energy influx. Fungi are a direct parallel to humans feeding on fossil fuels."
                                    </p>
                                    <p
                                        className="text-sm"
                                        style={{ color: "var(--soft-gray)" }}
                                    >
                                        - Dr. Louis Arnoux
                                    </p>
                                </div>
                            </div>

                            {/* What This Means */}
                            <div className="mb-12">
                                <h2
                                    className="text-2xl font-light mb-6"
                                    style={{ color: "var(--text-primary)" }}
                                >
                                    What This Means for Univrs.io
                                </h2>
                                <p
                                    className="mb-6 leading-relaxed"
                                    style={{ color: "var(--text-secondary)" }}
                                >
                                    Any economic system we propose must answer:
                                </p>
                                <div className="space-y-4 mb-6">
                                    {[
                                        { num: "1", question: "Where does the primary energy come from?", examples: "Solar? Nuclear? Geothermal?" },
                                        { num: "2", question: "How is it captured?", examples: "Photovoltaics? Thermal? Biological?" },
                                        { num: "3", question: "How does it flow through the network?", examples: "Joules, not metaphors" },
                                        { num: "4", question: "What's the net energy after system maintenance costs?", examples: "" },
                                    ].map((item) => (
                                        <div
                                            key={item.num}
                                            className="flex items-start gap-4 p-4 rounded-lg"
                                            style={{
                                                backgroundColor: "var(--bg-secondary)",
                                                border: "1px solid var(--border-subtle)",
                                            }}
                                        >
                                            <div
                                                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                                                style={{
                                                    backgroundColor: "var(--glow-cyan-dim)",
                                                    color: "var(--glow-cyan)",
                                                }}
                                            >
                                                {item.num}
                                            </div>
                                            <div>
                                                <p
                                                    className="font-medium"
                                                    style={{ color: "var(--text-primary)" }}
                                                >
                                                    {item.question}
                                                </p>
                                                {item.examples && (
                                                    <p
                                                        className="text-sm mt-1"
                                                        style={{ color: "var(--soft-gray)" }}
                                                    >
                                                        {item.examples}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div
                                    className="p-4 rounded-lg flex items-start gap-3"
                                    style={{
                                        backgroundColor: "rgba(255, 215, 0, 0.1)",
                                        border: "1px solid var(--glow-gold)",
                                    }}
                                >
                                    <AlertCircle
                                        className="w-5 h-5 flex-shrink-0 mt-0.5"
                                        style={{ color: "var(--glow-gold)" }}
                                    />
                                    <p
                                        className="text-sm"
                                        style={{ color: "var(--text-secondary)" }}
                                    >
                                        A "mycelial distribution network" describes coordination patterns, not energy capture. It's a heterotrophic layer that requires autotrophic foundations.
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
                                            author: "Georgescu-Roegen, N. (1971)",
                                            title: "The Entropy Law and the Economic Process",
                                            publisher: "Harvard University Press",
                                            note: "Foundational text on thermodynamic economics",
                                        },
                                        {
                                            author: "Odum, H.T. (1971)",
                                            title: "Environment, Power, and Society",
                                            publisher: "Wiley-Interscience",
                                            note: "Energy systems language (emergy)",
                                        },
                                        {
                                            author: "Hall, C.A.S. & Klitgaard, K. (2018)",
                                            title: "Energy and the Wealth of Nations",
                                            publisher: "Springer",
                                            note: "EROI framework",
                                        },
                                        {
                                            author: "Arnoux, L.",
                                            title: "Thermodynamics, Fossil Fuels and Renewables",
                                            publisher: "Medium series",
                                            note: "Direct from the critic",
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

                            {/* Self-Assessment Questions */}
                            <div className="mb-12">
                                <h2
                                    className="text-2xl font-light mb-6 flex items-center gap-3"
                                    style={{ color: "var(--text-primary)" }}
                                >
                                    <HelpCircle className="w-6 h-6" style={{ color: "var(--spore-purple)" }} />
                                    Self-Assessment Questions
                                </h2>
                                <div className="space-y-4">
                                    {[
                                        "Can you diagram the energy flow from sun to your proposed network endpoint?",
                                        "At each transformation step, what's the efficiency loss?",
                                        "What's the EROI of your system's energy source?",
                                        "How much energy does maintaining the coordination network itself consume?",
                                    ].map((question, index) => (
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
                                                {question}
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
                                    to="/docs/foundations/thermodynamics"
                                    className="flex items-center gap-2 text-sm hover:opacity-80 transition-opacity"
                                    style={{ color: "var(--soft-gray)" }}
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to Overview
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
                                    to="/docs/foundations/thermodynamics/small-worlds"
                                    className="flex items-center gap-2 text-sm hover:opacity-80 transition-opacity"
                                    style={{ color: "var(--glow-gold)" }}
                                >
                                    Next: Small Worlds
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
                                    currentLesson="heterotroph-critique"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
