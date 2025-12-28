import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronRight, Clock } from "lucide-react";
import { Suspense, lazy, useMemo } from "react";
import { MDXProvider } from "@mdx-js/react";

// Tutorial metadata - matches the actual MDX files
const tutorials = [
    {
        slug: "001-hello-dol",
        title: "Hello DOL",
        description: "Write your first DOL specification and learn core concepts",
        duration: "15 min",
    },
    {
        slug: "002-values-types",
        title: "Values and Types",
        description: "Learn about DOL's type system and typed gene declarations",
        duration: "15 min",
    },
    {
        slug: "003-functions",
        title: "Functions",
        description: "Add behavior with methods and standalone functions",
        duration: "20 min",
    },
    {
        slug: "004-control-flow",
        title: "Control Flow",
        description: "Conditionals, loops, and pattern matching",
        duration: "20 min",
    },
    {
        slug: "005-collections",
        title: "Collections",
        description: "Work with Lists, Maps, and functional operations",
        duration: "20 min",
    },
    {
        slug: "006-traits-constraints",
        title: "Traits and Constraints",
        description: "Define behaviors and enforce invariants",
        duration: "25 min",
    },
    {
        slug: "007-error-handling",
        title: "Error Handling",
        description: "Handle errors with Option, Result, and pattern matching",
        duration: "15 min",
    },
    {
        slug: "008-modules-imports",
        title: "Modules and Imports",
        description: "Organize DOL specs into reusable modules",
        duration: "15 min",
    },
];

// MDX components for styling
const mdxComponents = {
    h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h1
            {...props}
            className="text-3xl font-light mb-6"
            style={{ color: "var(--text-primary)" }}
        />
    ),
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2
            {...props}
            className="text-2xl font-light mt-10 mb-4"
            style={{ color: "var(--text-primary)" }}
        />
    ),
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3
            {...props}
            className="text-xl font-normal mt-8 mb-3"
            style={{ color: "var(--text-primary)" }}
        />
    ),
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
        <p
            {...props}
            className="mb-4 leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
        />
    ),
    ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
        <ul {...props} className="list-disc pl-6 mb-4 space-y-2" />
    ),
    ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
        <ol {...props} className="list-decimal pl-6 mb-4 space-y-2" />
    ),
    li: (props: React.HTMLAttributes<HTMLLIElement>) => (
        <li {...props} style={{ color: "var(--text-secondary)" }} />
    ),
    code: (props: React.HTMLAttributes<HTMLElement>) => {
        const isBlock = props.className?.includes("language-");
        if (isBlock) {
            return (
                <code
                    {...props}
                    className="block font-mono text-sm"
                    style={{ color: "var(--glow-cyan)" }}
                />
            );
        }
        return (
            <code
                {...props}
                className="px-1.5 py-0.5 rounded font-mono text-sm"
                style={{
                    backgroundColor: "var(--moss)",
                    color: "var(--glow-cyan)",
                }}
            />
        );
    },
    pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
        <pre
            {...props}
            className="p-4 rounded-lg mb-6 overflow-x-auto font-mono text-sm"
            style={{
                backgroundColor: "var(--bg-secondary)",
                border: "1px solid var(--border-subtle)",
            }}
        />
    ),
    table: (props: React.HTMLAttributes<HTMLTableElement>) => (
        <div className="overflow-x-auto mb-6">
            <table
                {...props}
                className="min-w-full"
                style={{ borderColor: "var(--border-subtle)" }}
            />
        </div>
    ),
    th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
        <th
            {...props}
            className="px-4 py-2 text-left text-sm font-medium"
            style={{
                backgroundColor: "var(--bg-secondary)",
                color: "var(--text-primary)",
                borderBottom: "1px solid var(--border-subtle)",
            }}
        />
    ),
    td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
        <td
            {...props}
            className="px-4 py-2 text-sm"
            style={{
                color: "var(--text-secondary)",
                borderBottom: "1px solid var(--border-subtle)",
            }}
        />
    ),
    a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
        const { href, className, ...rest } = props;
        // Preserve btn-primary and btn-secondary classes from MDX content
        const isButton =
            className?.includes("btn-primary") ||
            className?.includes("btn-secondary");

        if (href?.startsWith("/")) {
            return (
                <Link
                    to={href}
                    {...rest}
                    className={
                        isButton
                            ? className
                            : "underline transition-opacity hover:opacity-80"
                    }
                    style={isButton ? undefined : { color: "var(--glow-cyan)" }}
                />
            );
        }
        return (
            <a
                href={href}
                {...rest}
                className={
                    isButton
                        ? className
                        : "underline transition-opacity hover:opacity-80"
                }
                style={isButton ? undefined : { color: "var(--glow-cyan)" }}
                target="_blank"
                rel="noopener noreferrer"
            />
        );
    },
    strong: (props: React.HTMLAttributes<HTMLElement>) => (
        <strong {...props} style={{ color: "var(--text-primary)" }} />
    ),
    blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
        <blockquote
            {...props}
            className="pl-4 my-4 italic"
            style={{
                borderLeft: "3px solid var(--glow-cyan)",
                color: "var(--text-secondary)",
            }}
        />
    ),
};

// Lazy load MDX content
const tutorialModules = import.meta.glob("../../content/tutorials/dol/*.mdx");

function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center py-20">
            <div
                className="w-8 h-8 border-2 rounded-full animate-spin"
                style={{
                    borderColor: "var(--border-subtle)",
                    borderTopColor: "var(--glow-cyan)",
                }}
            />
        </div>
    );
}

export default function DOLTutorial() {
    const { slug } = useParams<{ slug: string }>();

    const currentIndex = tutorials.findIndex((t) => t.slug === slug);
    const tutorial = tutorials[currentIndex];

    // Dynamically import the MDX content
    const TutorialContent = useMemo(() => {
        if (!slug) return null;
        const modulePath = `../../content/tutorials/dol/${slug}.mdx`;
        const loader = tutorialModules[modulePath];
        if (!loader) return null;
        return lazy(() => loader() as Promise<{ default: React.ComponentType }>);
    }, [slug]);

    if (!tutorial || !TutorialContent) {
        return <Navigate to="/dol/learn" replace />;
    }

    return (
        <>
            <Helmet>
                <title>{tutorial.title} | DOL Tutorials | Univrs Learn</title>
                <meta name="description" content={tutorial.description} />
            </Helmet>

            {/* Breadcrumb & Header */}
            <section className="py-8 sm:py-12">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
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
                        <Link
                            to="/dol/learn"
                            className="hover:text-univrs-primary-400 transition-colors"
                        >
                            Learn
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <span style={{ color: "var(--text-primary)" }}>
                            {tutorial.title}
                        </span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <span
                                className="text-sm px-3 py-1 rounded-full"
                                style={{
                                    backgroundColor: "var(--glow-cyan-dim)",
                                    color: "var(--glow-cyan)",
                                }}
                            >
                                Lesson {currentIndex + 1} of {tutorials.length}
                            </span>
                            <div
                                className="flex items-center gap-1.5 text-sm"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                <Clock className="w-4 h-4" />
                                {tutorial.duration}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="pb-16">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <article
                        className="prose prose-invert max-w-none"
                        style={
                            {
                                "--tw-prose-body": "var(--text-secondary)",
                                "--tw-prose-headings": "var(--text-primary)",
                                "--tw-prose-links": "var(--glow-cyan)",
                                "--tw-prose-code": "var(--glow-cyan)",
                                "--tw-prose-pre-bg": "var(--bg-secondary)",
                            } as React.CSSProperties
                        }
                    >
                        <MDXProvider components={mdxComponents}>
                            <Suspense fallback={<LoadingSpinner />}>
                                <TutorialContent />
                            </Suspense>
                        </MDXProvider>
                    </article>

                </div>
            </section>
        </>
    );
}
