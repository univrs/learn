import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Terminal, ChevronRight, Lightbulb, Zap, Code2 } from "lucide-react";
import DOLRepl from "../../components/DOLRepl";

// Example code snippets for the playground - GROUNDED in real DOL syntax
const examples = {
    hello: {
        title: "Hello DOL",
        description: "Your first DOL gene definition",
        code: `// Welcome to DOL!
// Genes are the fundamental building blocks

gene hello.world {
  message has content
  message has sender
  message has timestamp
}

exegesis {
  The hello.world gene defines a simple message
  with content, sender, and timestamp properties.
}

print("Hello from DOL!")
print("Genes define what things should be.")`,
        expectedOutput: "Hello from DOL!",
    },
    gene: {
        title: "Defining Genes",
        description: "Create typed gene specifications",
        code: `// Define a User gene with typed properties
module example.user @ 0.1.0

pub gene User {
  has id: UInt64
  has name: String
  has email: String
  has created_at: Int64
}

exegesis {
  User gene with typed fields.
  Each property has a type from DOL's type system.
}

print("User gene defined successfully")`,
    },
    constraints: {
        title: "Adding Constraints",
        description: "Enforce business rules with constraints",
        code: `// Constraints ensure invariants hold
gene product.exists {
  product has id
  product has name
  product has price
}

constraint product.valid {
  price never negative
  name never empty
}

exegesis {
  Products must have positive prices
  and non-empty names.
}

print("Product constraint validated")`,
    },
    functions: {
        title: "Functions",
        description: "Add behavior with functions",
        code: `// Functions use the fun keyword
pub gene Counter {
  has value: Int64
  has max: Int64

  fun increment() -> Counter {
    return Counter {
      value: this.value + 1,
      max: this.max
    }
  }

  fun is_at_max() -> Bool {
    return this.value >= this.max
  }
}

print("Counter with methods defined")`,
    },
};

export default function DOLPlayground() {
    return (
        <>
            <Helmet>
                <title>DOL Playground | Univrs Learn</title>
                <meta
                    name="description"
                    content="Interactive DOL playground. Write, run, and experiment with Design Ontology Language specifications in your browser."
                />
            </Helmet>

            {/* Hero */}
            <section className="py-12 sm:py-16">
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
                            Playground
                        </span>
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                        <Terminal
                            className="w-10 h-10"
                            style={{ color: "var(--glow-cyan)" }}
                        />
                        <h1
                            className="text-3xl sm:text-4xl font-light"
                            style={{ color: "var(--text-primary)" }}
                        >
                            DOL Playground
                        </h1>
                    </div>
                    <p
                        className="text-xl max-w-2xl mb-4"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        Write and execute DOL specifications in your browser.
                        Experiment with the language before installing anything.
                    </p>
                    <div
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm"
                        style={{
                            backgroundColor: "var(--glow-cyan-dim)",
                            color: "var(--glow-cyan)",
                        }}
                    >
                        <Zap className="w-4 h-4" />
                        <span>Mock evaluator - WASM integration coming soon</span>
                    </div>
                </div>
            </section>

            {/* Main Playground */}
            <section className="pb-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <DOLRepl
                        title="Interactive Playground"
                        description="Write DOL code below and click Run or press Cmd+Enter to execute."
                        initialCode={examples.hello.code}
                        height="350px"
                        showHistory={true}
                    />
                </div>
            </section>

            {/* Example Gallery */}
            <section
                className="py-12"
                style={{ backgroundColor: "var(--bg-secondary)" }}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3 mb-8">
                        <Lightbulb
                            className="w-6 h-6"
                            style={{ color: "var(--glow-gold)" }}
                        />
                        <h2
                            className="text-2xl font-light"
                            style={{ color: "var(--text-primary)" }}
                        >
                            Example Gallery
                        </h2>
                    </div>
                    <p
                        className="text-lg mb-8 max-w-2xl"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        Explore these examples to learn DOL concepts. Each example
                        is interactive - try modifying the code and running it!
                    </p>

                    <div className="grid gap-8">
                        {/* Hello World Example */}
                        <div>
                            <DOLRepl
                                title={examples.hello.title}
                                description={examples.hello.description}
                                initialCode={examples.hello.code}
                                expectedOutput={examples.hello.expectedOutput}
                                height="320px"
                            />
                        </div>

                        {/* Gene Example */}
                        <div>
                            <DOLRepl
                                title={examples.gene.title}
                                description={examples.gene.description}
                                initialCode={examples.gene.code}
                                height="300px"
                            />
                        </div>

                        {/* Constraints Example */}
                        <div>
                            <DOLRepl
                                title={examples.constraints.title}
                                description={examples.constraints.description}
                                initialCode={examples.constraints.code}
                                height="320px"
                            />
                        </div>

                        {/* Functions Example */}
                        <div>
                            <DOLRepl
                                title={examples.functions.title}
                                description={examples.functions.description}
                                initialCode={examples.functions.code}
                                height="340px"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Read-Only Example */}
            <section className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3 mb-8">
                        <Code2
                            className="w-6 h-6"
                            style={{ color: "var(--spore-purple)" }}
                        />
                        <h2
                            className="text-2xl font-light"
                            style={{ color: "var(--text-primary)" }}
                        >
                            View-Only Example
                        </h2>
                    </div>
                    <p
                        className="text-lg mb-8 max-w-2xl"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        Some examples are read-only for documentation purposes.
                        This is useful when you want to show reference code without
                        allowing modifications.
                    </p>

                    <DOLRepl
                        title="Reference: Complete System Pattern"
                        description="A complete system specification following DOL best practices (read-only)"
                        readOnly={true}
                        initialCode={`// Complete System Pattern
// Demonstrates genes, traits, constraints, and systems

module order.system @ 1.0.0

// Core gene definition
pub gene Order {
  has id: UInt64
  has customer_id: UInt64
  has items: List<OrderItem>
  has status: OrderStatus
  has created_at: Int64
  has total_amount: Float64
}

// Enum-style gene for status
pub gene OrderStatus {
  type: enum {
    Pending,
    Confirmed,
    Shipped,
    Delivered,
    Cancelled
  }
}

// Trait for orderable items
trait order.valid {
  uses order.exists
  order has items
  items never empty
  total never negative
}

// System composition
system order.service @1.0.0 {
  requires order.valid >= 0.0.1

  uses Order
  service has persistence.strategy
}

exegesis {
  Order system with status tracking,
  validation constraints, and service composition.
}

print("OrderSystem ready")`}
                        height="500px"
                        showHistory={false}
                    />
                </div>
            </section>

            {/* Quick Tips */}
            <section
                className="py-12"
                style={{ backgroundColor: "var(--bg-secondary)" }}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2
                        className="text-2xl font-light mb-8"
                        style={{ color: "var(--text-primary)" }}
                    >
                        Playground Tips
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="card">
                            <div
                                className="text-lg font-mono mb-2"
                                style={{ color: "var(--glow-cyan)" }}
                            >
                                Cmd + Enter
                            </div>
                            <p
                                className="text-sm"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                Run your code quickly without clicking the button
                            </p>
                        </div>
                        <div className="card">
                            <div
                                className="text-lg font-mono mb-2"
                                style={{ color: "var(--glow-cyan)" }}
                            >
                                print("message")
                            </div>
                            <p
                                className="text-sm"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                Print messages to see output in the console
                            </p>
                        </div>
                        <div className="card">
                            <div
                                className="text-lg font-mono mb-2"
                                style={{ color: "var(--glow-cyan)" }}
                            >
                                History Panel
                            </div>
                            <p
                                className="text-sm"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                Click the history icon to restore previous code
                            </p>
                        </div>
                        <div className="card">
                            <div
                                className="text-lg font-mono mb-2"
                                style={{ color: "var(--glow-cyan)" }}
                            >
                                gene name { }
                            </div>
                            <p
                                className="text-sm"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                Define genes with properties using has keyword
                            </p>
                        </div>
                        <div className="card">
                            <div
                                className="text-lg font-mono mb-2"
                                style={{ color: "var(--glow-cyan)" }}
                            >
                                Copy Button
                            </div>
                            <p
                                className="text-sm"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                Copy code to clipboard to use in your project
                            </p>
                        </div>
                        <div className="card">
                            <div
                                className="text-lg font-mono mb-2"
                                style={{ color: "var(--glow-cyan)" }}
                            >
                                Reset Button
                            </div>
                            <p
                                className="text-sm"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                Restore the original example code
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Next Steps CTA */}
            <section className="py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                    <h2
                        className="text-2xl font-light mb-4"
                        style={{ color: "var(--text-primary)" }}
                    >
                        Ready to go deeper?
                    </h2>
                    <p
                        className="text-lg mb-8 max-w-xl mx-auto"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        Learn the complete DOL syntax, explore the standard library,
                        or check out real-world examples.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/dol/language" className="btn-primary">
                            Language Reference
                        </Link>
                        <Link to="/dol/examples" className="btn-secondary">
                            View Examples
                        </Link>
                        <Link to="/dol/quickstart" className="btn-secondary">
                            Quick Start Guide
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
