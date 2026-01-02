import { Routes, Route, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Flame, ArrowRight, ChevronRight, Clock, GraduationCap, AlertTriangle } from "lucide-react";
import ProgressTracker from "@/components/ProgressTracker";

import HeterotropiCritique from "./HeterotropiCritique";
import SmallWorlds from "./SmallWorlds";
import Autopoiesis from "./Autopoiesis";
import Eroi from "./Eroi";
import Integration from "./Integration";

const modules = [
    {
        number: "01",
        slug: "heterotroph-critique",
        title: "The Heterotroph Critique",
        description: "Understanding the fatal flaw in mycelial metaphors - fungi are heterotrophic",
        topics: ["autotroph vs heterotroph", "energy sources", "primary energy", "solar flux"],
        href: "/docs/foundations/thermodynamics/heterotroph-critique",
        duration: "25 min",
    },
    {
        number: "02",
        slug: "small-worlds",
        title: "Small World Network Mathematics",
        description: "The Watts-Strogatz model and rigorous network topology",
        topics: ["clustering coefficient", "path length", "Dunbar's number", "network scaling"],
        href: "/docs/foundations/thermodynamics/small-worlds",
        duration: "30 min",
    },
    {
        number: "03",
        slug: "autopoiesis",
        title: "Autopoiesis and System Closure",
        description: "Self-producing systems and civilization's autopoietic status",
        topics: ["Maturana & Varela", "system closure", "material/energy/informational closure"],
        href: "/docs/foundations/thermodynamics/autopoiesis",
        duration: "30 min",
    },
    {
        number: "04",
        slug: "eroi",
        title: "Energy Return on Investment (EROI)",
        description: "The core metric for energy system viability",
        topics: ["EROI calculation", "EROIp", "minimum civilization threshold", "energy cliff"],
        href: "/docs/foundations/thermodynamics/eroi",
        duration: "25 min",
    },
    {
        number: "05",
        slug: "integration",
        title: "Integration - Energy Flows Through Networks",
        description: "Synthesizing all constraints into a coherent framework",
        topics: ["energy budgets", "system losses", "coordination overhead", "autopoietic closure"],
        href: "/docs/foundations/thermodynamics/integration",
        duration: "35 min",
    },
];

const lessonsForTracker = modules.map(m => ({
    slug: m.slug,
    title: m.title,
    duration: m.duration,
}));

function ThermodynamicsOverview() {
    return (
        <>
            <Helmet>
                <title>Thermodynamic Foundations | Univrs Learn</title>
                <meta
                    name="description"
                    content="A learning curriculum for thermodynamic reasoning, network mathematics, and autopoiesis theory."
                />
            </Helmet>

            {/* Hero */}
            <section className="py-16 sm:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div
                        className="flex items-center gap-2 text-sm mb-6"
                        style={{ color: "var(--soft-gray)" }}
                    >
                        <Link
                            to="/"
                            className="hover:text-univrs-primary-400 transition-colors"
                        >
                            Home
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <span style={{ color: "var(--text-primary)" }}>
                            Thermodynamic Foundations
                        </span>
                    </div>

                    <div className="max-w-3xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center"
                                style={{
                                    background:
                                        "linear-gradient(135deg, var(--glow-gold), rgba(255, 215, 0, 0.3))",
                                }}
                            >
                                <Flame
                                    className="w-6 h-6"
                                    style={{ color: "var(--void)" }}
                                />
                            </div>
                            <h1
                                className="text-3xl sm:text-4xl font-light"
                                style={{ color: "var(--text-primary)" }}
                            >
                                Thermodynamic Foundations
                            </h1>
                        </div>
                        <p
                            className="text-xl mb-6"
                            style={{ color: "var(--text-secondary)" }}
                        >
                            A learning curriculum for thermodynamic reasoning, network mathematics, and autopoiesis theory.
                        </p>

                        {/* Track Stats */}
                        <div className="flex flex-wrap items-center gap-6 mb-8">
                            <div className="flex items-center gap-2">
                                <GraduationCap className="w-5 h-5" style={{ color: "var(--glow-gold)" }} />
                                <span style={{ color: "var(--text-secondary)" }}>5 modules</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5" style={{ color: "var(--glow-cyan)" }} />
                                <span style={{ color: "var(--text-secondary)" }}>~2.5 hours total</span>
                            </div>
                            <span
                                className="px-3 py-1 rounded-full text-sm"
                                style={{
                                    backgroundColor: "rgba(255, 215, 0, 0.15)",
                                    color: "var(--glow-gold)",
                                }}
                            >
                                Foundational Theory
                            </span>
                        </div>

                        {/* CTA Button */}
                        <Link
                            to="/docs/foundations/thermodynamics/heterotroph-critique"
                            className="btn-primary inline-flex items-center gap-2"
                        >
                            Start Learning
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why This Exists */}
            <section
                className="py-12"
                style={{ backgroundColor: "var(--bg-secondary)" }}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div
                        className="rounded-xl p-6"
                        style={{
                            backgroundColor: "var(--bg-tertiary)",
                            border: "1px solid var(--glow-gold)",
                        }}
                    >
                        <div className="flex items-start gap-4">
                            <AlertTriangle
                                className="w-6 h-6 flex-shrink-0 mt-1"
                                style={{ color: "var(--glow-gold)" }}
                            />
                            <div>
                                <h2
                                    className="text-xl font-light mb-3"
                                    style={{ color: "var(--glow-gold)" }}
                                >
                                    Why This Exists
                                </h2>
                                <p
                                    className="mb-4"
                                    style={{ color: "var(--text-secondary)" }}
                                >
                                    In December 2025, Dr. Louis Arnoux of Fourth Transition Institute (FTI) critiqued our "Mycelial Economics" framework, identifying fundamental gaps in thermodynamic reasoning, network mathematics, and autopoiesis theory.
                                </p>
                                <p
                                    className="mb-4"
                                    style={{ color: "var(--text-secondary)" }}
                                >
                                    Rather than defend flawed foundations, we're doing the work to understand the problem correctly.
                                </p>
                                <p
                                    style={{ color: "var(--text-primary)" }}
                                >
                                    This curriculum documents that learning process publicly - modeling the intellectual honesty krzy.ai advocates.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Progress Tracker */}
            <section className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <h2
                                className="text-2xl font-light mb-8"
                                style={{ color: "var(--text-primary)" }}
                            >
                                Learning Path
                            </h2>
                            <div className="space-y-6">
                                {modules.map((module) => (
                                    <Link
                                        key={module.number}
                                        to={module.href}
                                        className="card group cursor-pointer block"
                                    >
                                        <div className="flex items-start gap-6">
                                            <div
                                                className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-lg font-light"
                                                style={{
                                                    backgroundColor: "rgba(255, 215, 0, 0.15)",
                                                    color: "var(--glow-gold)",
                                                }}
                                            >
                                                {module.number}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3
                                                        className="text-lg font-normal group-hover:opacity-80 transition-opacity"
                                                        style={{
                                                            color: "var(--text-primary)",
                                                        }}
                                                    >
                                                        {module.title}
                                                    </h3>
                                                    <span
                                                        className="text-xs px-2 py-0.5 rounded"
                                                        style={{
                                                            backgroundColor: "var(--glow-cyan-dim)",
                                                            color: "var(--glow-cyan)",
                                                        }}
                                                    >
                                                        {module.duration}
                                                    </span>
                                                </div>
                                                <p
                                                    className="text-sm mb-3"
                                                    style={{
                                                        color: "var(--text-secondary)",
                                                    }}
                                                >
                                                    {module.description}
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {module.topics.map((topic) => (
                                                        <span
                                                            key={topic}
                                                            className="text-xs px-2 py-1 rounded"
                                                            style={{
                                                                backgroundColor: "var(--border-subtle)",
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
                                                style={{ color: "var(--glow-gold)" }}
                                            />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar Progress */}
                        <div className="lg:col-span-1">
                            <ProgressTracker
                                trackId="thermodynamics-foundations"
                                lessons={lessonsForTracker}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Assessment Checklist */}
            <section
                className="py-16"
                style={{ backgroundColor: "var(--bg-secondary)" }}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2
                        className="text-2xl font-light mb-8"
                        style={{ color: "var(--text-primary)" }}
                    >
                        Are We Ready to Make Claims?
                    </h2>
                    <p
                        className="mb-6"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        Before asserting that "Mycelial Economics" or Univrs.io represents a viable alternative:
                    </p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                                className="p-4 rounded-lg flex items-start gap-3"
                                style={{
                                    backgroundColor: "var(--bg-tertiary)",
                                    border: "1px solid var(--border-subtle)",
                                }}
                            >
                                <div
                                    className="w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5"
                                    style={{ borderColor: "var(--soft-gray)" }}
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
                    <p
                        className="mt-6 text-sm"
                        style={{ color: "var(--glow-gold)" }}
                    >
                        If any box is unchecked, we're not ready to make claims.
                    </p>
                </div>
            </section>

            {/* Acknowledgment */}
            <section className="py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div
                        className="rounded-xl p-8 text-center max-w-2xl mx-auto"
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
                            className="text-sm"
                            style={{ color: "var(--soft-gray)" }}
                        >
                            - Dr. Louis Arnoux, Fourth Transition Institute
                        </p>
                        <p
                            className="mt-6"
                            style={{ color: "var(--text-secondary)" }}
                        >
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
            </section>
        </>
    );
}

export default function ThermodynamicsIndex() {
    return (
        <Routes>
            <Route index element={<ThermodynamicsOverview />} />
            <Route path="heterotroph-critique" element={<HeterotropiCritique />} />
            <Route path="small-worlds" element={<SmallWorlds />} />
            <Route path="autopoiesis" element={<Autopoiesis />} />
            <Route path="eroi" element={<Eroi />} />
            <Route path="integration" element={<Integration />} />
        </Routes>
    );
}
