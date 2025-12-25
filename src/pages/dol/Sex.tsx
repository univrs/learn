import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Zap, ChevronRight, AlertTriangle, CheckCircle, XCircle, FileCode } from "lucide-react";

const errorCodes = [
    {
        code: "E001",
        title: "Sex in pure context",
        description: "Attempting to use side effects in a pure context",
        example: "Using sex keyword outside .sex.dol file or sex/ directory",
    },
    {
        code: "E002",
        title: "Mutable global outside sex",
        description: "Mutable global state declared in pure context",
        example: "var counter: Int64 = 0 in a .dol file",
    },
    {
        code: "E003",
        title: "FFI outside sex",
        description: "Foreign Function Interface call in pure context",
        example: "extern functions called from pure code",
    },
    {
        code: "E004",
        title: "I/O outside sex",
        description: "Input/Output operations in pure context",
        example: "File operations, network calls, or println in .dol files",
    },
];

const warningCodes = [
    {
        code: "W001",
        title: "Large sex block",
        description: "Sex block exceeds recommended size limit",
        recommendation: "Refactor into smaller sex functions",
    },
    {
        code: "W002",
        title: "Sex function without documentation",
        description: "Sex functions should have detailed exegesis",
        recommendation: "Add comprehensive documentation explaining side effects",
    },
];

const effectKinds = [
    {
        kind: "I/O",
        description: "File operations, network calls, console output",
        color: "var(--glow-cyan)",
    },
    {
        kind: "FFI",
        description: "Foreign Function Interface calls to external code",
        color: "var(--glow-gold)",
    },
    {
        kind: "MutableGlobal",
        description: "Reading or writing mutable global state",
        color: "var(--spore-purple)",
    },
    {
        kind: "NonDeterministic",
        description: "Operations with unpredictable outcomes (random, time)",
        color: "var(--glow-pink)",
    },
    {
        kind: "Unsafe",
        description: "Unsafe memory operations or low-level access",
        color: "var(--danger-red)",
    },
];

export default function DOLSex() {
    return (
        <>
            <Helmet>
                <title>SEX: Side Effect eXecution | Univrs Learn</title>
                <meta
                    name="description"
                    content="Learn about DOL's SEX system - how to handle side effects safely with explicit marking and file-level isolation."
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
                            SEX System
                        </span>
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                        <Zap
                            className="w-10 h-10"
                            style={{ color: "var(--glow-pink)" }}
                        />
                        <h1
                            className="text-3xl sm:text-4xl font-light"
                            style={{ color: "var(--text-primary)" }}
                        >
                            SEX: Side Effect eXecution
                        </h1>
                    </div>
                    <p
                        className="text-xl max-w-2xl mb-4"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        DOL is <strong style={{ color: "var(--glow-cyan)" }}>pure by default</strong>. Side effects require explicit marking.
                    </p>
                    <p
                        className="text-lg max-w-2xl"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        Like sexual reproduction in biology enables genetic recombination and boundary-crossing,
                        the SEX system enables controlled interaction with the outside world.
                    </p>
                </div>
            </section>

            {/* Philosophy */}
            <section
                className="py-12"
                style={{ backgroundColor: "var(--bg-secondary)" }}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2
                        className="text-2xl font-light mb-6"
                        style={{ color: "var(--text-primary)" }}
                    >
                        The Biological Metaphor
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="card">
                            <h3
                                className="text-lg font-normal mb-3"
                                style={{ color: "var(--glow-cyan)" }}
                            >
                                Genetic Recombination
                            </h3>
                            <p
                                className="text-sm"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                Mixing genetic material across boundaries. In DOL,
                                this is interacting with external systems - files,
                                networks, foreign code.
                            </p>
                        </div>
                        <div className="card">
                            <h3
                                className="text-lg font-normal mb-3"
                                style={{ color: "var(--glow-gold)" }}
                            >
                                Mutation
                            </h3>
                            <p
                                className="text-sm"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                Changing inherited state. In DOL, this is mutating
                                global variables and maintaining state across
                                function calls.
                            </p>
                        </div>
                        <div className="card">
                            <h3
                                className="text-lg font-normal mb-3"
                                style={{ color: "var(--spore-purple)" }}
                            >
                                Breaking Isolation
                            </h3>
                            <p
                                className="text-sm"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                Crossing protective barriers. In DOL, this is
                                breaking functional purity to achieve real-world
                                effects.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* File-Level Marking */}
            <section className="py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2
                        className="text-2xl font-light mb-8"
                        style={{ color: "var(--text-primary)" }}
                    >
                        File-Level Isolation
                    </h2>
                    <p
                        className="text-base mb-6"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        Sex code must be isolated in dedicated files or directories.
                        This makes effects immediately visible in your project structure.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="card">
                            <div className="flex items-center gap-2 mb-3">
                                <CheckCircle
                                    className="w-5 h-5"
                                    style={{ color: "var(--success-green)" }}
                                />
                                <h3
                                    className="text-lg font-normal"
                                    style={{ color: "var(--text-primary)" }}
                                >
                                    Sex Context
                                </h3>
                            </div>
                            <div
                                className="space-y-2 text-sm font-mono"
                                style={{ color: "var(--glow-cyan)" }}
                            >
                                <div>io.sex.dol</div>
                                <div>network.sex.dol</div>
                                <div>sex/globals.dol</div>
                                <div>sex/ffi.dol</div>
                            </div>
                            <p
                                className="text-xs mt-3"
                                style={{ color: "var(--soft-gray)" }}
                            >
                                Side effects are allowed
                            </p>
                        </div>
                        <div className="card">
                            <div className="flex items-center gap-2 mb-3">
                                <XCircle
                                    className="w-5 h-5"
                                    style={{ color: "var(--danger-red)" }}
                                />
                                <h3
                                    className="text-lg font-normal"
                                    style={{ color: "var(--text-primary)" }}
                                >
                                    Pure Context
                                </h3>
                            </div>
                            <div
                                className="space-y-2 text-sm font-mono"
                                style={{ color: "var(--soft-gray)" }}
                            >
                                <div>container.dol</div>
                                <div>traits/lifecycle.dol</div>
                                <div>genes/entity.dol</div>
                                <div>constraints/valid.dol</div>
                            </div>
                            <p
                                className="text-xs mt-3"
                                style={{ color: "var(--soft-gray)" }}
                            >
                                Only pure code allowed
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Syntax Examples */}
            <section
                className="py-16"
                style={{ backgroundColor: "var(--bg-secondary)" }}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2
                        className="text-2xl font-light mb-8"
                        style={{ color: "var(--text-primary)" }}
                    >
                        Syntax
                    </h2>

                    {/* Sex Functions */}
                    <div className="mb-8">
                        <h3
                            className="text-xl font-normal mb-4"
                            style={{ color: "var(--glow-cyan)" }}
                        >
                            Sex Functions
                        </h3>
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
                                <FileCode className="w-4 h-4" style={{ color: "var(--glow-pink)" }} />
                                <span
                                    className="text-xs font-mono"
                                    style={{ color: "var(--soft-gray)" }}
                                >
                                    io.sex.dol
                                </span>
                            </div>
                            <pre
                                className="p-6 text-sm font-mono overflow-x-auto"
                                style={{ color: "var(--text-primary)" }}
                            >
{`// Pure function (default)
fun pure_add(a: Int64, b: Int64) -> Int64 {
    return a + b
}

// Effectful function
sex fun log(msg: String) -> Void {
    println(msg)  // I/O side effect
}

// Complex sex function
sex fun write_file(path: String, content: String) -> Result<Void, Error> {
    file = open(path, WRITE_MODE)
    file.write(content)
    file.close()
    return Ok(())
}`}
                            </pre>
                        </div>
                    </div>

                    {/* Sex Variables */}
                    <div className="mb-8">
                        <h3
                            className="text-xl font-normal mb-4"
                            style={{ color: "var(--glow-gold)" }}
                        >
                            Sex Variables
                        </h3>
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
                                <FileCode className="w-4 h-4" style={{ color: "var(--glow-pink)" }} />
                                <span
                                    className="text-xs font-mono"
                                    style={{ color: "var(--soft-gray)" }}
                                >
                                    sex/globals.dol
                                </span>
                            </div>
                            <pre
                                className="p-6 text-sm font-mono overflow-x-auto"
                                style={{ color: "var(--text-primary)" }}
                            >
{`// Mutable global state
sex var COUNTER: Int64 = 0

sex fun increment() -> Int64 {
    COUNTER += 1
    return COUNTER
}

sex fun get_counter() -> Int64 {
    return COUNTER
}

// Generated Rust code:
// static mut COUNTER: i64 = 0;
//
// pub fn increment() -> i64 {
//     unsafe { COUNTER += 1; COUNTER }
// }`}
                            </pre>
                        </div>
                    </div>

                    {/* Sex Blocks */}
                    <div className="mb-8">
                        <h3
                            className="text-xl font-normal mb-4"
                            style={{ color: "var(--spore-purple)" }}
                        >
                            Sex Blocks
                        </h3>
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
                                <FileCode className="w-4 h-4" style={{ color: "var(--glow-pink)" }} />
                                <span
                                    className="text-xs font-mono"
                                    style={{ color: "var(--soft-gray)" }}
                                >
                                    compute.sex.dol
                                </span>
                            </div>
                            <pre
                                className="p-6 text-sm font-mono overflow-x-auto"
                                style={{ color: "var(--text-primary)" }}
                            >
{`// Mostly pure function with localized effects
fun compute_with_logging(data: List<Int64>) -> Int64 {
    result = data.sum()

    // Localized side effect
    sex {
        log("Computed sum: " + result.to_string())
        log("Input size: " + data.length.to_string())
    }

    return result
}

// Sex blocks can have return values
fun process_with_fallback(key: String) -> Option<String> {
    return sex {
        try_read_cache(key)
    }
}`}
                            </pre>
                        </div>
                    </div>

                    {/* FFI Example */}
                    <div>
                        <h3
                            className="text-xl font-normal mb-4"
                            style={{ color: "var(--glow-pink)" }}
                        >
                            Foreign Function Interface
                        </h3>
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
                                <FileCode className="w-4 h-4" style={{ color: "var(--glow-pink)" }} />
                                <span
                                    className="text-xs font-mono"
                                    style={{ color: "var(--soft-gray)" }}
                                >
                                    ffi.sex.dol
                                </span>
                            </div>
                            <pre
                                className="p-6 text-sm font-mono overflow-x-auto"
                                style={{ color: "var(--text-primary)" }}
                            >
{`// Declare external C functions
extern "C" {
    fun malloc(size: UInt64) -> Ptr<Void>
    fun free(ptr: Ptr<Void>) -> Void
    fun getpid() -> Int32
}

// Use them in sex functions
sex fun allocate_buffer(size: UInt64) -> Ptr<Void> {
    ptr = malloc(size)
    if ptr.is_null() {
        panic("Allocation failed")
    }
    return ptr
}

sex fun get_process_id() -> Int32 {
    return getpid()
}`}
                            </pre>
                        </div>
                    </div>
                </div>
            </section>

            {/* Effect Kinds */}
            <section className="py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2
                        className="text-2xl font-light mb-8"
                        style={{ color: "var(--text-primary)" }}
                    >
                        Effect Categories
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {effectKinds.map((effect) => (
                            <div
                                key={effect.kind}
                                className="card"
                                style={{
                                    borderLeft: `3px solid ${effect.color}`,
                                }}
                            >
                                <h3
                                    className="font-normal mb-2"
                                    style={{ color: effect.color }}
                                >
                                    {effect.kind}
                                </h3>
                                <p
                                    className="text-sm"
                                    style={{ color: "var(--text-secondary)" }}
                                >
                                    {effect.description}
                                </p>
                            </div>
                        ))}
                        <div
                            className="card"
                            style={{
                                borderLeft: "3px solid var(--soft-gray)",
                            }}
                        >
                            <h3
                                className="font-normal mb-2"
                                style={{ color: "var(--soft-gray)" }}
                            >
                                General
                            </h3>
                            <p
                                className="text-sm"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                Any other side effect not covered by specific categories
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Compiler Errors */}
            <section
                className="py-16"
                style={{ backgroundColor: "var(--bg-secondary)" }}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2
                        className="text-2xl font-light mb-8"
                        style={{ color: "var(--text-primary)" }}
                    >
                        Compiler Errors
                    </h2>
                    <div className="space-y-4">
                        {errorCodes.map((error) => (
                            <div key={error.code} className="card">
                                <div className="flex items-start gap-4">
                                    <div
                                        className="flex-shrink-0 w-16 h-16 rounded-lg flex items-center justify-center text-base font-mono"
                                        style={{
                                            backgroundColor: "rgba(239, 68, 68, 0.1)",
                                            color: "var(--danger-red)",
                                            border: "1px solid var(--danger-red)",
                                        }}
                                    >
                                        {error.code}
                                    </div>
                                    <div className="flex-1">
                                        <h3
                                            className="text-lg font-normal mb-2"
                                            style={{ color: "var(--text-primary)" }}
                                        >
                                            {error.title}
                                        </h3>
                                        <p
                                            className="text-sm mb-2"
                                            style={{ color: "var(--text-secondary)" }}
                                        >
                                            {error.description}
                                        </p>
                                        <code
                                            className="text-xs px-2 py-1 rounded"
                                            style={{
                                                backgroundColor: "var(--bg-tertiary)",
                                                color: "var(--soft-gray)",
                                            }}
                                        >
                                            {error.example}
                                        </code>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Warnings */}
            <section className="py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2
                        className="text-2xl font-light mb-8"
                        style={{ color: "var(--text-primary)" }}
                    >
                        Compiler Warnings
                    </h2>
                    <div className="space-y-4">
                        {warningCodes.map((warning) => (
                            <div key={warning.code} className="card">
                                <div className="flex items-start gap-4">
                                    <div
                                        className="flex-shrink-0 w-16 h-16 rounded-lg flex items-center justify-center text-base font-mono"
                                        style={{
                                            backgroundColor: "rgba(234, 179, 8, 0.1)",
                                            color: "var(--glow-gold)",
                                            border: "1px solid var(--glow-gold)",
                                        }}
                                    >
                                        {warning.code}
                                    </div>
                                    <div className="flex-1">
                                        <h3
                                            className="text-lg font-normal mb-2"
                                            style={{ color: "var(--text-primary)" }}
                                        >
                                            {warning.title}
                                        </h3>
                                        <p
                                            className="text-sm mb-2"
                                            style={{ color: "var(--text-secondary)" }}
                                        >
                                            {warning.description}
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <AlertTriangle
                                                className="w-4 h-4"
                                                style={{ color: "var(--glow-gold)" }}
                                            />
                                            <span
                                                className="text-xs"
                                                style={{ color: "var(--soft-gray)" }}
                                            >
                                                {warning.recommendation}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Type Checker Integration */}
            <section
                className="py-16"
                style={{ backgroundColor: "var(--bg-secondary)" }}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2
                        className="text-2xl font-light mb-8"
                        style={{ color: "var(--text-primary)" }}
                    >
                        Effect Context Tracking
                    </h2>
                    <p
                        className="text-base mb-6"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        The type checker maintains effect context throughout compilation,
                        ensuring that effects never leak into pure code.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="card">
                            <h3
                                className="text-lg font-normal mb-3"
                                style={{ color: "var(--glow-cyan)" }}
                            >
                                Context Stack
                            </h3>
                            <div
                                className="space-y-2 text-sm font-mono"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                <div>Pure → Sex → Pure</div>
                                <div>Pure → Sex → Sex → Pure</div>
                                <div>Sex → Pure (nested pure block)</div>
                            </div>
                        </div>
                        <div className="card">
                            <h3
                                className="text-lg font-normal mb-3"
                                style={{ color: "var(--glow-gold)" }}
                            >
                                Inference
                            </h3>
                            <p
                                className="text-sm"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                Type inference works within sex blocks, automatically
                                tracking effect context for nested expressions and
                                ensuring type safety across boundaries.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Rust Code Generation */}
            <section className="py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2
                        className="text-2xl font-light mb-8"
                        style={{ color: "var(--text-primary)" }}
                    >
                        Code Generation
                    </h2>
                    <p
                        className="text-base mb-6"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        Sex constructs map to specific Rust patterns for safety and performance.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3
                                className="text-lg font-normal mb-3"
                                style={{ color: "var(--glow-cyan)" }}
                            >
                                DOL
                            </h3>
                            <div
                                className="rounded-xl overflow-hidden"
                                style={{
                                    backgroundColor: "var(--bg-tertiary)",
                                    border: "1px solid var(--border-subtle)",
                                }}
                            >
                                <pre
                                    className="p-4 text-sm font-mono overflow-x-auto"
                                    style={{ color: "var(--glow-cyan)" }}
                                >
{`sex var COUNTER: Int64 = 0

sex fun increment() -> Int64 {
    COUNTER += 1
    return COUNTER
}`}
                                </pre>
                            </div>
                        </div>
                        <div>
                            <h3
                                className="text-lg font-normal mb-3"
                                style={{ color: "var(--glow-gold)" }}
                            >
                                Rust
                            </h3>
                            <div
                                className="rounded-xl overflow-hidden"
                                style={{
                                    backgroundColor: "var(--bg-tertiary)",
                                    border: "1px solid var(--border-subtle)",
                                }}
                            >
                                <pre
                                    className="p-4 text-sm font-mono overflow-x-auto"
                                    style={{ color: "var(--glow-gold)" }}
                                >
{`static mut COUNTER: i64 = 0;

/// Side-effectful function
pub fn increment() -> i64 {
    unsafe {
        COUNTER += 1;
        COUNTER
    }
}`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Best Practices */}
            <section
                className="py-16"
                style={{ backgroundColor: "var(--bg-secondary)" }}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2
                        className="text-2xl font-light mb-8"
                        style={{ color: "var(--text-primary)" }}
                    >
                        Best Practices
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="card">
                            <div className="flex items-center gap-2 mb-3">
                                <CheckCircle
                                    className="w-5 h-5"
                                    style={{ color: "var(--success-green)" }}
                                />
                                <h3
                                    className="text-lg font-normal"
                                    style={{ color: "var(--text-primary)" }}
                                >
                                    Do
                                </h3>
                            </div>
                            <ul
                                className="space-y-2 text-sm"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                <li>• Isolate effects in .sex.dol files or sex/ directory</li>
                                <li>• Document sex functions with comprehensive exegesis</li>
                                <li>• Keep sex blocks small and focused</li>
                                <li>• Use sex blocks for localized effects in pure functions</li>
                                <li>• Prefer pure code wherever possible</li>
                            </ul>
                        </div>
                        <div className="card">
                            <div className="flex items-center gap-2 mb-3">
                                <XCircle
                                    className="w-5 h-5"
                                    style={{ color: "var(--danger-red)" }}
                                />
                                <h3
                                    className="text-lg font-normal"
                                    style={{ color: "var(--text-primary)" }}
                                >
                                    Don't
                                </h3>
                            </div>
                            <ul
                                className="space-y-2 text-sm"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                <li>• Put I/O operations in .dol files</li>
                                <li>• Use mutable globals outside sex context</li>
                                <li>• Create large sex blocks (exceeding limits)</li>
                                <li>• Leave sex functions undocumented</li>
                                <li>• Mix pure and effectful code without clear boundaries</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Summary */}
            <section className="py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div
                        className="card"
                        style={{
                            borderColor: "var(--glow-pink)",
                            borderWidth: "1px",
                        }}
                    >
                        <h2
                            className="text-2xl font-light mb-4"
                            style={{ color: "var(--glow-pink)" }}
                        >
                            Key Takeaways
                        </h2>
                        <ul
                            className="space-y-3 text-base"
                            style={{ color: "var(--text-secondary)" }}
                        >
                            <li className="flex items-start gap-3">
                                <span style={{ color: "var(--glow-cyan)" }}>1.</span>
                                <span>DOL is pure by default - side effects must be explicitly marked with <code className="text-sm px-1 py-0.5 rounded" style={{ backgroundColor: "var(--bg-tertiary)", color: "var(--glow-pink)" }}>sex</code></span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span style={{ color: "var(--glow-cyan)" }}>2.</span>
                                <span>Effects are file-level isolated using .sex.dol extension or sex/ directory</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span style={{ color: "var(--glow-cyan)" }}>3.</span>
                                <span>The compiler tracks six effect kinds: I/O, FFI, MutableGlobal, NonDeterministic, Unsafe, and General</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span style={{ color: "var(--glow-cyan)" }}>4.</span>
                                <span>Sex functions, variables, and blocks provide different granularities of effect control</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span style={{ color: "var(--glow-cyan)" }}>5.</span>
                                <span>Type checker maintains effect context stack, preventing effect leakage into pure code</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
}
