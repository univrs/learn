import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronRight, Clock, ArrowLeft, ArrowRight, BookOpen, HelpCircle, Layers, CheckSquare } from "lucide-react";
import ProgressTracker, { markLessonComplete } from "@/components/ProgressTracker";

const lessonsForTracker = [
    { slug: "heterotroph-critique", title: "The Heterotroph Critique", duration: "25 min" },
    { slug: "small-worlds", title: "Small World Network Mathematics", duration: "30 min" },
    { slug: "autopoiesis", title: "Autopoiesis and System Closure", duration: "30 min" },
    { slug: "eroi", title: "Energy Return on Investment", duration: "25 min" },
    { slug: "integration", title: "Integration - Energy Flows", duration: "35 min" },
];

export default function Integration() {
    const handleMarkComplete = () => {
        markLessonComplete("thermodynamics-foundations", "integration");
        window.location.reload();
    };

    return (
        <>
            <Helmet>
                <title>Integration - Energy Flows Through Networks | Thermodynamic Foundations | Univrs Learn</title>
                <meta
                    name="description"
                    content="Synthesizing thermodynamic constraints into a coherent framework for system design."
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
                            Module 5
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
                                Module 5 of 5
                            </span>
                            <div
                                className="flex items-center gap-1.5 text-sm"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                <Clock className="w-4 h-4" />
                                35 min
                            </div>
                        </div>
                    </div>

                    <h1
                        className="text-3xl sm:text-4xl font-light mb-4"
                        style={{ color: "var(--text-primary)" }}
                    >
                        Integration - Energy Flows Through Networks
                    </h1>
                    <p
                        className="text-xl max-w-3xl"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        Synthesizing all thermodynamic constraints into a coherent framework for viable system design.
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="pb-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            {/* The Synthesis Question */}
                            <div className="mb-12">
                                <h2
                                    className="text-2xl font-light mb-6 flex items-center gap-3"
                                    style={{ color: "var(--text-primary)" }}
                                >
                                    <Layers className="w-6 h-6" style={{ color: "var(--glow-gold)" }} />
                                    The Synthesis Question
                                </h2>
                                <p
                                    className="mb-6 leading-relaxed"
                                    style={{ color: "var(--text-secondary)" }}
                                >
                                    Given:
                                </p>

                                <div className="space-y-3 mb-6">
                                    {[
                                        { module: "Module 1", constraint: "Energy must originate from autotrophic sources" },
                                        { module: "Module 2", constraint: "Network topology must be mathematically coherent" },
                                        { module: "Module 3", constraint: "System must achieve autopoietic closure" },
                                        { module: "Module 4", constraint: "EROI must exceed civilization maintenance threshold" },
                                    ].map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-4 p-4 rounded-lg"
                                            style={{
                                                backgroundColor: "var(--bg-secondary)",
                                                border: "1px solid var(--border-subtle)",
                                            }}
                                        >
                                            <span
                                                className="text-xs px-2 py-1 rounded font-mono"
                                                style={{
                                                    backgroundColor: "var(--glow-cyan-dim)",
                                                    color: "var(--glow-cyan)",
                                                }}
                                            >
                                                {item.module}
                                            </span>
                                            <p style={{ color: "var(--text-secondary)" }}>
                                                {item.constraint}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div
                                    className="rounded-xl p-6"
                                    style={{
                                        backgroundColor: "rgba(255, 215, 0, 0.1)",
                                        border: "1px solid var(--glow-gold)",
                                    }}
                                >
                                    <p
                                        className="text-lg font-medium"
                                        style={{ color: "var(--glow-gold)" }}
                                    >
                                        How do we design a system that satisfies all constraints?
                                    </p>
                                </div>
                            </div>

                            {/* Framework for Analysis */}
                            <div className="mb-12">
                                <h2
                                    className="text-2xl font-light mb-6"
                                    style={{ color: "var(--text-primary)" }}
                                >
                                    Framework for Analysis
                                </h2>

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
                                            energy-flow-framework.txt
                                        </span>
                                    </div>
                                    <pre
                                        className="p-6 text-sm font-mono overflow-x-auto"
                                        style={{ color: "var(--glow-cyan)" }}
                                    >
{`┌─────────────────────────────────────────────────────────┐
│                    SOLAR INFLUX                         │
│                    (Primary Source)                     │
└─────────────────────────┬───────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│              AUTOTROPHIC CAPTURE                        │
│   (Photovoltaics, Solar Thermal, Biomass, Wind*)       │
│   * Wind is indirect solar                              │
│   EROI at capture: ____                                 │
└─────────────────────────┬───────────────────────────────┘
                          │
                          ▼ Transmission losses: ____%
┌─────────────────────────────────────────────────────────┐
│              STORAGE/BUFFERING                          │
│   (Batteries, Thermal Mass, Pumped Hydro)              │
│   Round-trip efficiency: ____%                          │
└─────────────────────────┬───────────────────────────────┘
                          │
                          ▼ Distribution losses: ____%
┌─────────────────────────────────────────────────────────┐
│              NETWORK COORDINATION                       │
│   (The "mycelial" layer — computation, communication)  │
│   Energy cost of coordination: ____ J/node/day         │
└─────────────────────────┬───────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│              USEFUL WORK OUTPUT                         │
│   (Economic activity, life support, culture)           │
│   Net delivered EROI: ____                              │
└─────────────────────────────────────────────────────────┘`}
                                    </pre>
                                </div>
                            </div>

                            {/* Questions This Framework Must Answer */}
                            <div className="mb-12">
                                <h2
                                    className="text-2xl font-light mb-6 flex items-center gap-3"
                                    style={{ color: "var(--text-primary)" }}
                                >
                                    <HelpCircle className="w-6 h-6" style={{ color: "var(--spore-purple)" }} />
                                    Questions This Framework Must Answer
                                </h2>
                                <div className="space-y-4">
                                    {[
                                        {
                                            question: "What's the energy budget?",
                                            detail: "Total joules available from autotrophic capture"
                                        },
                                        {
                                            question: "What are the losses?",
                                            detail: "At each transformation step"
                                        },
                                        {
                                            question: "What's the coordination overhead?",
                                            detail: "Energy cost of running the distributed network"
                                        },
                                        {
                                            question: "What's left for useful work?",
                                            detail: "Net energy after system maintenance"
                                        },
                                        {
                                            question: "Does it close?",
                                            detail: "Can the system reproduce itself from this energy budget?"
                                        },
                                    ].map((item, index) => (
                                        <div
                                            key={index}
                                            className="p-4 rounded-lg"
                                            style={{
                                                backgroundColor: "var(--bg-secondary)",
                                                border: "1px solid var(--border-subtle)",
                                            }}
                                        >
                                            <p
                                                className="font-medium mb-1"
                                                style={{ color: "var(--text-primary)" }}
                                            >
                                                <span
                                                    className="font-mono mr-2"
                                                    style={{ color: "var(--spore-purple)" }}
                                                >
                                                    {index + 1}.
                                                </span>
                                                {item.question}
                                            </p>
                                            <p
                                                className="text-sm pl-6"
                                                style={{ color: "var(--soft-gray)" }}
                                            >
                                                {item.detail}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Assessment Checklist */}
                            <div className="mb-12">
                                <h2
                                    className="text-2xl font-light mb-6 flex items-center gap-3"
                                    style={{ color: "var(--text-primary)" }}
                                >
                                    <CheckSquare className="w-6 h-6" style={{ color: "var(--glow-gold)" }} />
                                    Assessment: Are We Ready to Make Claims?
                                </h2>
                                <p
                                    className="mb-6"
                                    style={{ color: "var(--text-secondary)" }}
                                >
                                    Before asserting that "Mycelial Economics" or Univrs.io represents a viable alternative:
                                </p>

                                <div className="space-y-3 mb-6">
                                    {[
                                        "Energy flow diagram completed with actual numbers",
                                        "Network topology modeled with C and L calculated at target scale",
                                        "Autopoietic closure analysis shows positive energy/material balance",
                                        "System EROI exceeds minimum civilization threshold (~10:1)",
                                        "Scaling analysis shows viability from pilot to bioregional scale",
                                        "External review by someone with thermodynamics expertise",
                                    ].map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-3 p-4 rounded-lg"
                                            style={{
                                                backgroundColor: "var(--bg-secondary)",
                                                border: "1px solid var(--border-subtle)",
                                            }}
                                        >
                                            <div
                                                className="w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5"
                                                style={{ borderColor: "var(--soft-gray)" }}
                                            />
                                            <p style={{ color: "var(--text-secondary)" }}>
                                                {item}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div
                                    className="p-4 rounded-lg"
                                    style={{
                                        backgroundColor: "rgba(255, 215, 0, 0.1)",
                                        border: "1px solid var(--glow-gold)",
                                    }}
                                >
                                    <p
                                        className="font-medium"
                                        style={{ color: "var(--glow-gold)" }}
                                    >
                                        If any box is unchecked, we're not ready to make claims.
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
                                    Synthesis Reading
                                </h2>
                                <div className="space-y-4">
                                    {[
                                        {
                                            note: "Review all previous module readings",
                                            detail: "Cross-reference the thermodynamic, network, and autopoiesis literature",
                                        },
                                        {
                                            note: "Fourth Transition Institute materials",
                                            detail: "Dr. Arnoux's synthesis of thermodynamic constraints on civilization",
                                        },
                                        {
                                            note: "Systems ecology literature",
                                            detail: "How natural ecosystems achieve energy flow and closure",
                                        },
                                    ].map((item, index) => (
                                        <div
                                            key={index}
                                            className="p-4 rounded-lg"
                                            style={{
                                                backgroundColor: "var(--bg-secondary)",
                                                border: "1px solid var(--border-subtle)",
                                            }}
                                        >
                                            <p
                                                className="font-medium"
                                                style={{ color: "var(--text-primary)" }}
                                            >
                                                {item.note}
                                            </p>
                                            <p
                                                className="text-sm mt-1"
                                                style={{ color: "var(--soft-gray)" }}
                                            >
                                                {item.detail}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Final Acknowledgment */}
                            <div className="mb-12">
                                <div
                                    className="rounded-xl p-8 text-center"
                                    style={{
                                        backgroundColor: "var(--bg-tertiary)",
                                        border: "1px solid var(--border-subtle)",
                                    }}
                                >
                                    <blockquote
                                        className="text-xl font-light italic mb-4"
                                        style={{ color: "var(--text-primary)" }}
                                    >
                                        "It's a long road. It takes time."
                                    </blockquote>
                                    <p
                                        className="text-sm mb-4"
                                        style={{ color: "var(--soft-gray)" }}
                                    >
                                        - Dr. Louis Arnoux
                                    </p>
                                    <p style={{ color: "var(--text-secondary)" }}>
                                        This curriculum exists because Dr. Arnoux took time to critique our work seriously. The gaps he identified are real. Addressing them honestly is the only path to building something that actually works.
                                    </p>
                                    <p
                                        className="mt-4 font-medium"
                                        style={{ color: "var(--glow-cyan)" }}
                                    >
                                        We're on the road.
                                    </p>
                                </div>
                            </div>

                            {/* Navigation */}
                            <div
                                className="flex items-center justify-between pt-8 mt-8"
                                style={{ borderTop: "1px solid var(--border-subtle)" }}
                            >
                                <Link
                                    to="/docs/foundations/thermodynamics/eroi"
                                    className="flex items-center gap-2 text-sm hover:opacity-80 transition-opacity"
                                    style={{ color: "var(--soft-gray)" }}
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    EROI
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
                                    to="/docs/foundations/thermodynamics"
                                    className="flex items-center gap-2 text-sm hover:opacity-80 transition-opacity"
                                    style={{ color: "var(--glow-gold)" }}
                                >
                                    Back to Overview
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
                                    currentLesson="integration"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
