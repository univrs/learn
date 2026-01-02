import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronRight, Clock, ArrowLeft, ArrowRight, BookOpen, HelpCircle, Zap, TrendingDown } from "lucide-react";
import ProgressTracker, { markLessonComplete } from "@/components/ProgressTracker";

const lessonsForTracker = [
    { slug: "heterotroph-critique", title: "The Heterotroph Critique", duration: "25 min" },
    { slug: "small-worlds", title: "Small World Network Mathematics", duration: "30 min" },
    { slug: "autopoiesis", title: "Autopoiesis and System Closure", duration: "30 min" },
    { slug: "eroi", title: "Energy Return on Investment", duration: "25 min" },
    { slug: "integration", title: "Integration - Energy Flows", duration: "35 min" },
];

export default function Eroi() {
    const handleMarkComplete = () => {
        markLessonComplete("thermodynamics-foundations", "eroi");
        window.location.reload();
    };

    return (
        <>
            <Helmet>
                <title>Energy Return on Investment (EROI) | Thermodynamic Foundations | Univrs Learn</title>
                <meta
                    name="description"
                    content="Understanding the core metric for energy system viability and civilizational sustainability."
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
                            Module 4
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
                                Module 4 of 5
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
                        Energy Return on Investment (EROI)
                    </h1>
                    <p
                        className="text-xl max-w-3xl"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        The core metric that determines whether an energy system can support civilization.
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="pb-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            {/* The Core Metric */}
                            <div className="mb-12">
                                <h2
                                    className="text-2xl font-light mb-6 flex items-center gap-3"
                                    style={{ color: "var(--text-primary)" }}
                                >
                                    <Zap className="w-6 h-6" style={{ color: "var(--glow-gold)" }} />
                                    The Core Metric
                                </h2>

                                <div
                                    className="rounded-xl p-8 mb-6 text-center"
                                    style={{
                                        backgroundColor: "var(--bg-secondary)",
                                        border: "1px solid var(--glow-gold)",
                                    }}
                                >
                                    <p
                                        className="text-2xl font-mono mb-4"
                                        style={{ color: "var(--glow-gold)" }}
                                    >
                                        EROI = Energy Returned / Energy Invested
                                    </p>
                                    <p style={{ color: "var(--text-secondary)" }}>
                                        If EROI = 10:1, you get 10 units of useful energy for every 1 unit invested in extraction/production.
                                    </p>
                                </div>
                            </div>

                            {/* Historical EROI Decline */}
                            <div className="mb-12">
                                <h2
                                    className="text-2xl font-light mb-6 flex items-center gap-3"
                                    style={{ color: "var(--text-primary)" }}
                                >
                                    <TrendingDown className="w-6 h-6" style={{ color: "var(--glow-cyan)" }} />
                                    Historical EROI Decline
                                </h2>

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
                                                    Energy Source
                                                </th>
                                                <th
                                                    className="px-4 py-3 text-left text-sm font-medium"
                                                    style={{ color: "var(--text-primary)" }}
                                                >
                                                    EROI (Historical)
                                                </th>
                                                <th
                                                    className="px-4 py-3 text-left text-sm font-medium"
                                                    style={{ color: "var(--text-primary)" }}
                                                >
                                                    EROI (Current)
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[
                                                { source: "US Oil (1930)", historical: "~100:1", current: "-" },
                                                { source: "US Oil (1970)", historical: "~30:1", current: "-" },
                                                { source: "US Oil (2020)", historical: "-", current: "~10:1" },
                                                { source: "Tar Sands", historical: "-", current: "~3:1" },
                                                { source: "Solar PV", historical: "-", current: "~10-20:1" },
                                                { source: "Wind", historical: "-", current: "~18-25:1" },
                                            ].map((row, index) => (
                                                <tr
                                                    key={index}
                                                    style={{ borderTop: "1px solid var(--border-subtle)" }}
                                                >
                                                    <td
                                                        className="px-4 py-3 text-sm font-medium"
                                                        style={{ color: "var(--text-primary)" }}
                                                    >
                                                        {row.source}
                                                    </td>
                                                    <td
                                                        className="px-4 py-3 text-sm font-mono"
                                                        style={{ color: "var(--glow-cyan)" }}
                                                    >
                                                        {row.historical}
                                                    </td>
                                                    <td
                                                        className="px-4 py-3 text-sm font-mono"
                                                        style={{ color: "var(--glow-gold)" }}
                                                    >
                                                        {row.current}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* EROIp */}
                            <div className="mb-12">
                                <h2
                                    className="text-2xl font-light mb-6"
                                    style={{ color: "var(--text-primary)" }}
                                >
                                    EROIp (Point of Production)
                                </h2>
                                <p
                                    className="mb-6 leading-relaxed"
                                    style={{ color: "var(--text-secondary)" }}
                                >
                                    Dr. Arnoux emphasizes <strong style={{ color: "var(--glow-cyan)" }}>EROIp</strong> - measuring EROI at the point of production, before transmission losses, storage inefficiencies, and end-use conversions.
                                </p>

                                <div
                                    className="rounded-xl p-6 mb-6"
                                    style={{
                                        backgroundColor: "var(--bg-tertiary)",
                                        border: "1px solid var(--border-subtle)",
                                    }}
                                >
                                    <h4
                                        className="font-medium mb-4"
                                        style={{ color: "var(--glow-gold)" }}
                                    >
                                        Why This Matters
                                    </h4>
                                    <p
                                        className="mb-4"
                                        style={{ color: "var(--text-secondary)" }}
                                    >
                                        A solar panel might have EROI of 15:1 at the panel, but after:
                                    </p>
                                    <ul className="space-y-2 mb-4">
                                        {[
                                            "Transmission losses (5-10%)",
                                            "Battery storage inefficiency (15-20%)",
                                            "Inverter losses (5%)",
                                            "End-use conversion losses (varies)",
                                        ].map((loss, index) => (
                                            <li
                                                key={index}
                                                className="flex items-center gap-2"
                                                style={{ color: "var(--text-secondary)" }}
                                            >
                                                <span style={{ color: "var(--soft-gray)" }}>-</span>
                                                {loss}
                                            </li>
                                        ))}
                                    </ul>
                                    <p
                                        className="font-medium"
                                        style={{ color: "var(--glow-gold)" }}
                                    >
                                        ...the delivered EROI to the end user may be much lower.
                                    </p>
                                </div>
                            </div>

                            {/* Minimum EROI for Civilization */}
                            <div className="mb-12">
                                <h2
                                    className="text-2xl font-light mb-6"
                                    style={{ color: "var(--text-primary)" }}
                                >
                                    Minimum EROI for Civilization
                                </h2>

                                <div
                                    className="rounded-xl p-6 mb-6"
                                    style={{
                                        backgroundColor: "rgba(255, 215, 0, 0.1)",
                                        border: "1px solid var(--glow-gold)",
                                    }}
                                >
                                    <p
                                        className="text-lg mb-4"
                                        style={{ color: "var(--text-primary)" }}
                                    >
                                        Estimates suggest modern industrial civilization requires minimum EROI of <strong style={{ color: "var(--glow-gold)" }}>~10-12:1</strong> to maintain itself.
                                    </p>
                                    <p style={{ color: "var(--text-secondary)" }}>
                                        Below this threshold, insufficient surplus energy exists to power non-energy sectors (healthcare, education, governance, culture).
                                    </p>
                                </div>

                                <div
                                    className="p-4 rounded-lg"
                                    style={{
                                        backgroundColor: "var(--bg-secondary)",
                                        border: "1px solid var(--border-subtle)",
                                    }}
                                >
                                    <p
                                        className="text-sm"
                                        style={{ color: "var(--soft-gray)" }}
                                    >
                                        This is sometimes called the "energy cliff" - as EROI drops from 10:1 toward 1:1, the percentage of society's effort devoted to energy extraction grows exponentially, crowding out everything else.
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
                                            author: "Hall, C.A.S. (2017)",
                                            title: "Energy Return on Investment: A Unifying Principle for Biology, Economics, and Sustainability",
                                            publisher: "Springer",
                                            note: "Comprehensive EROI framework",
                                        },
                                        {
                                            author: "Murphy, D.J. & Hall, C.A.S. (2010)",
                                            title: "Year in review - EROI or energy return on (energy) invested",
                                            publisher: "Annals of the New York Academy of Sciences, 1185, 102-118",
                                            note: "Key review paper",
                                        },
                                        {
                                            author: "Arnoux, L.",
                                            title: "EROIp and the Energy Seneca Cliff",
                                            publisher: "Fourth Transition Institute materials",
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
                                        "Calculate system EROI for a proposed Univrs.io node powered by solar + battery",
                                        "Model EROI at scale - what happens to system EROI as network grows?",
                                        "Compare EROI requirements of centralized vs. distributed coordination",
                                        "Identify the minimum EROI threshold for your proposed system to be viable",
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
                                    to="/docs/foundations/thermodynamics/autopoiesis"
                                    className="flex items-center gap-2 text-sm hover:opacity-80 transition-opacity"
                                    style={{ color: "var(--soft-gray)" }}
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Autopoiesis
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
                                    to="/docs/foundations/thermodynamics/integration"
                                    className="flex items-center gap-2 text-sm hover:opacity-80 transition-opacity"
                                    style={{ color: "var(--glow-gold)" }}
                                >
                                    Next: Integration
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
                                    currentLesson="eroi"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
