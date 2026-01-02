import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronRight, Clock, ArrowLeft, ArrowRight, BookOpen, HelpCircle, RefreshCw } from "lucide-react";
import ProgressTracker, { markLessonComplete } from "@/components/ProgressTracker";

const lessonsForTracker = [
    { slug: "heterotroph-critique", title: "The Heterotroph Critique", duration: "25 min" },
    { slug: "small-worlds", title: "Small World Network Mathematics", duration: "30 min" },
    { slug: "autopoiesis", title: "Autopoiesis and System Closure", duration: "30 min" },
    { slug: "eroi", title: "Energy Return on Investment", duration: "25 min" },
    { slug: "integration", title: "Integration - Energy Flows", duration: "35 min" },
];

export default function Autopoiesis() {
    const handleMarkComplete = () => {
        markLessonComplete("thermodynamics-foundations", "autopoiesis");
        window.location.reload();
    };

    return (
        <>
            <Helmet>
                <title>Autopoiesis and System Closure | Thermodynamic Foundations | Univrs Learn</title>
                <meta
                    name="description"
                    content="Understanding self-producing systems and civilization's autopoietic status."
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
                            Module 3
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
                                Module 3 of 5
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
                        Autopoiesis and System Closure
                    </h1>
                    <p
                        className="text-xl max-w-3xl"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        Understanding self-producing systems and the requirements for civilizational sustainability.
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="pb-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            {/* The Problem Statement */}
                            <div className="mb-12">
                                <h2
                                    className="text-2xl font-light mb-6"
                                    style={{ color: "var(--text-primary)" }}
                                >
                                    The Problem Statement
                                </h2>

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
                                        "Since sometime between 2010 and 2020, humankind has ceased being autopoietic and to date no replacement system that could cut it has been put in place."
                                    </p>
                                    <p
                                        className="text-sm mt-3"
                                        style={{ color: "var(--soft-gray)" }}
                                    >
                                        - Dr. Louis Arnoux
                                    </p>
                                </div>
                            </div>

                            {/* Autopoiesis Defined */}
                            <div className="mb-12">
                                <h2
                                    className="text-2xl font-light mb-6 flex items-center gap-3"
                                    style={{ color: "var(--text-primary)" }}
                                >
                                    <RefreshCw className="w-6 h-6" style={{ color: "var(--glow-cyan)" }} />
                                    Autopoiesis Defined (Maturana & Varela, 1980)
                                </h2>
                                <p
                                    className="mb-6 leading-relaxed"
                                    style={{ color: "var(--text-secondary)" }}
                                >
                                    An <strong style={{ color: "var(--glow-cyan)" }}>autopoietic system</strong> is one that:
                                </p>

                                <div className="space-y-4 mb-8">
                                    {[
                                        "Produces the components that constitute it",
                                        "Regenerates its own organization through those components",
                                        "Maintains its boundary with the environment",
                                        "Continues this process as long as the system exists",
                                    ].map((item, index) => (
                                        <div
                                            key={index}
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
                                                {index + 1}
                                            </div>
                                            <p style={{ color: "var(--text-secondary)" }}>
                                                {item}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Key Distinction */}
                                <div
                                    className="rounded-xl overflow-hidden mb-6"
                                    style={{
                                        backgroundColor: "var(--bg-secondary)",
                                        border: "1px solid var(--border-subtle)",
                                    }}
                                >
                                    <div
                                        className="px-4 py-3"
                                        style={{
                                            backgroundColor: "var(--bg-tertiary)",
                                            borderBottom: "1px solid var(--border-subtle)",
                                        }}
                                    >
                                        <span
                                            className="text-sm font-medium"
                                            style={{ color: "var(--text-primary)" }}
                                        >
                                            Key Distinction
                                        </span>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-0">
                                        <div
                                            className="p-6"
                                            style={{ borderRight: "1px solid var(--border-subtle)" }}
                                        >
                                            <h4
                                                className="font-medium mb-2"
                                                style={{ color: "var(--glow-cyan)" }}
                                            >
                                                Autopoietic
                                            </h4>
                                            <p
                                                className="text-sm mb-2"
                                                style={{ color: "var(--text-secondary)" }}
                                            >
                                                Self-producing, self-maintaining
                                            </p>
                                            <p
                                                className="text-sm"
                                                style={{ color: "var(--soft-gray)" }}
                                            >
                                                Examples: Living cells, potentially civilizations
                                            </p>
                                        </div>
                                        <div className="p-6">
                                            <h4
                                                className="font-medium mb-2"
                                                style={{ color: "var(--glow-gold)" }}
                                            >
                                                Allopoietic
                                            </h4>
                                            <p
                                                className="text-sm mb-2"
                                                style={{ color: "var(--text-secondary)" }}
                                            >
                                                Produces something other than itself
                                            </p>
                                            <p
                                                className="text-sm"
                                                style={{ color: "var(--soft-gray)" }}
                                            >
                                                Examples: Factories, machines
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* What "Ceased Being Autopoietic" Means */}
                            <div className="mb-12">
                                <h2
                                    className="text-2xl font-light mb-6"
                                    style={{ color: "var(--text-primary)" }}
                                >
                                    What "Ceased Being Autopoietic" Means
                                </h2>
                                <p
                                    className="mb-6 leading-relaxed"
                                    style={{ color: "var(--text-secondary)" }}
                                >
                                    If human civilization has lost autopoietic status, it means:
                                </p>

                                <div className="space-y-4 mb-6">
                                    {[
                                        "We can no longer reproduce our own operational basis",
                                        "The energy and material inputs required to maintain civilization exceed what we can capture",
                                        "We're drawing down accumulated stocks (fossil fuels, aquifers, topsoil) rather than living on flows",
                                        "The system is in thermodynamic deficit - consuming its own substrate",
                                    ].map((item, index) => (
                                        <div
                                            key={index}
                                            className="p-4 rounded-lg flex items-start gap-3"
                                            style={{
                                                backgroundColor: "rgba(255, 215, 0, 0.1)",
                                                border: "1px solid var(--glow-gold)",
                                            }}
                                        >
                                            <span
                                                className="font-mono text-sm"
                                                style={{ color: "var(--glow-gold)" }}
                                            >
                                                {index + 1}.
                                            </span>
                                            <p style={{ color: "var(--text-secondary)" }}>
                                                {item}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* The Closure Problem */}
                            <div className="mb-12">
                                <h2
                                    className="text-2xl font-light mb-6"
                                    style={{ color: "var(--text-primary)" }}
                                >
                                    The Closure Problem
                                </h2>
                                <p
                                    className="mb-6 leading-relaxed"
                                    style={{ color: "var(--text-secondary)" }}
                                >
                                    For any proposed alternative system to achieve autopoietic status, it must demonstrate:
                                </p>

                                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                                    {[
                                        {
                                            name: "Material Closure",
                                            desc: "Can produce/recycle all physical components from available inputs",
                                            color: "var(--glow-cyan)",
                                        },
                                        {
                                            name: "Energy Closure",
                                            desc: "Can capture sufficient primary energy to power all operations",
                                            color: "var(--glow-gold)",
                                        },
                                        {
                                            name: "Informational Closure",
                                            desc: "Can maintain/transmit the knowledge needed for self-reproduction",
                                            color: "var(--spore-purple)",
                                        },
                                        {
                                            name: "Organizational Closure",
                                            desc: "Can regenerate its own governance/coordination structures",
                                            color: "var(--glow-cyan)",
                                        },
                                    ].map((closure, index) => (
                                        <div
                                            key={index}
                                            className="p-4 rounded-lg"
                                            style={{
                                                backgroundColor: "var(--bg-secondary)",
                                                border: "1px solid var(--border-subtle)",
                                            }}
                                        >
                                            <h4
                                                className="font-medium mb-2"
                                                style={{ color: closure.color }}
                                            >
                                                {closure.name}
                                            </h4>
                                            <p
                                                className="text-sm"
                                                style={{ color: "var(--text-secondary)" }}
                                            >
                                                {closure.desc}
                                            </p>
                                        </div>
                                    ))}
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
                                            author: "Maturana, H.R. & Varela, F.J. (1980)",
                                            title: "Autopoiesis and Cognition: The Realization of the Living",
                                            publisher: "D. Reidel",
                                            note: "Foundational text",
                                        },
                                        {
                                            author: "Varela, F.J. (1979)",
                                            title: "Principles of Biological Autonomy",
                                            publisher: "North Holland",
                                            note: "Technical elaboration",
                                        },
                                        {
                                            author: "Luhmann, N. (1995)",
                                            title: "Social Systems",
                                            publisher: "Stanford University Press",
                                            note: "Autopoiesis applied to social systems",
                                        },
                                        {
                                            author: "Meadows, D.H. et al. (1972/2004)",
                                            title: "Limits to Growth (30-year update)",
                                            publisher: "Chelsea Green",
                                            note: "System dynamics of overshoot",
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

                            {/* Critical Questions */}
                            <div className="mb-12">
                                <h2
                                    className="text-2xl font-light mb-6 flex items-center gap-3"
                                    style={{ color: "var(--text-primary)" }}
                                >
                                    <HelpCircle className="w-6 h-6" style={{ color: "var(--spore-purple)" }} />
                                    Critical Questions
                                </h2>
                                <div className="space-y-4">
                                    {[
                                        "What would autopoietic closure look like for a bioregional economy?",
                                        "What's the minimum viable scale for autopoietic human settlement?",
                                        "How do we measure distance from autopoietic closure?",
                                        "What's the timeline for fossil fuel depletion relative to alternative development?",
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
                                    to="/docs/foundations/thermodynamics/small-worlds"
                                    className="flex items-center gap-2 text-sm hover:opacity-80 transition-opacity"
                                    style={{ color: "var(--soft-gray)" }}
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Small Worlds
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
                                    to="/docs/foundations/thermodynamics/eroi"
                                    className="flex items-center gap-2 text-sm hover:opacity-80 transition-opacity"
                                    style={{ color: "var(--glow-gold)" }}
                                >
                                    Next: EROI
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
                                    currentLesson="autopoiesis"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
