# Skills Framework Specification

## Overview

Skills are composable, self-describing capability modules that AI agents and systems can discover, understand, and use.

**Site**: https://skills.metalearn.org

---

## Design Principles

### 1. Self-Describing
Every skill carries its own documentation. A SKILL.md file is not optional—it IS the skill's identity.

### 2. Composable
Skills are designed to work together. Dependencies are explicit. Conflicts are declared.

### 3. Discoverable
Skills can be found by capability, not just by name. "I need file system access" → CrossPlatformBridge.

### 4. Testable
Every skill includes tests that verify its contract. If tests pass, the skill works.

### 5. AI-Native
Skills are designed for AI agents to understand and use, not just humans.

---

## Skill Structure

```
skill-name/
├── SKILL.md              # REQUIRED: Contract and documentation
├── skill.dol             # OPTIONAL: DOL specification
│
├── src/                  # Implementation
│   ├── mod.rs            # (or index.ts, main.py, etc.)
│   └── ...
│
├── tests/                # Verification
│   ├── unit/
│   └── integration/
│
├── examples/             # Usage demonstrations
│   └── basic.rs
│
└── README.md             # Human-readable overview (can link to SKILL.md)
```

---

## SKILL.md Specification

The SKILL.md file is the heart of a skill. It must contain:

```markdown
# Skill Name

## Purpose
One paragraph explaining what this skill does and why.

## Capabilities
What this skill provides (can be discovered by AI):

- `capability.name`: Description
- `capability.other`: Description

## Dependencies
What this skill requires:

- `other-skill >= 1.0.0`: Why needed
- `system.feature`: Required system feature

## Conflicts
What this skill cannot work with:

- `incompatible-skill`: Why

## Configuration
How to configure this skill:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `param1`  | string | "default" | What it does |

## Usage

### Basic Example
\`\`\`rust
// Code example showing basic usage
\`\`\`

### Advanced Example
\`\`\`rust
// Code example showing advanced usage
\`\`\`

## API Reference

### Functions

#### `function_name(params) -> Return`
Description of what it does.

### Types

#### `TypeName`
Description of the type.

## Error Handling
How errors are reported and what they mean.

## Testing
How to verify this skill works.

## Version History
- 0.1.0: Initial release
```

---

## skill.dol (Optional but Recommended)

For skills that want DOL specification:

```dol
// CrossPlatformBridge skill specification

system skill.cross_platform_bridge @ 0.1.0 {
  requires stdlib.primitives >= 0.1.0
  
  provides platform.abstraction
  provides file_system.access
  provides environment.detection
  provides command.execution
}

exegesis {
  CrossPlatformBridge provides a unified interface for platform-specific
  operations. Code using this skill works identically on Windows, macOS,
  and Linux without conditional compilation.
}

// What this skill gives you
gene cross_platform.path {
  path is string
  path uses forward_slash separator
  path is normalized
  path resolves to native format on use
}

gene cross_platform.environment {
  environment has os_type
  environment has arch
  environment has home_directory
  environment has temp_directory
}

trait cross_platform.read_file {
  read_file takes path
  read_file returns bytes or error
  
  path is cross_platform.path
  error includes not_found
  error includes permission_denied
}

trait cross_platform.write_file {
  write_file takes path
  write_file takes bytes
  write_file returns success or error
  
  write_file creates parent directories
}

trait cross_platform.execute {
  execute takes command
  execute takes arguments
  execute returns output or error
  
  command is resolved via PATH
  output includes stdout
  output includes stderr
  output includes exit_code
}

constraint cross_platform.consistency {
  behavior is identical across platforms
  path.separator is always forward_slash in API
  line_endings are normalized
}
```

---

## Capability Taxonomy

Skills declare capabilities using a hierarchical namespace:

```
capability/
├── compute/
│   ├── cpu                 # CPU-bound computation
│   ├── gpu                 # GPU acceleration
│   ├── distributed         # Multi-node computation
│   └── math/
│       ├── linear_algebra
│       ├── statistics
│       └── symbolic
│
├── storage/
│   ├── file_system         # Local file access
│   ├── database            # Database access
│   ├── key_value           # KV store access
│   └── distributed         # Distributed storage
│
├── network/
│   ├── http                # HTTP client/server
│   ├── websocket           # WebSocket connections
│   ├── p2p                 # Peer-to-peer
│   ├── rpc                 # Remote procedure calls
│   └── discovery           # Service discovery
│
├── platform/
│   ├── abstraction         # Cross-platform APIs
│   ├── windows             # Windows-specific
│   ├── macos               # macOS-specific
│   └── linux               # Linux-specific
│
├── security/
│   ├── crypto              # Cryptographic operations
│   ├── auth                # Authentication
│   ├── identity            # Identity management
│   └── secrets             # Secret management
│
├── ai/
│   ├── inference           # Model inference
│   ├── embedding           # Vector embeddings
│   ├── generation          # Content generation
│   └── tool_use            # Tool calling
│
└── lifecycle/
    ├── init                # Initialization
    ├── health              # Health checking
    ├── metrics             # Metrics collection
    └── shutdown            # Graceful shutdown
```

---

## Skill Discovery

### By Capability Query

```rust
// Find skills that provide file system access
let skills = catalog.find_by_capability("storage.file_system");

// Find skills that provide P2P networking
let skills = catalog.find_by_capability("network.p2p");

// Find skills that work on all platforms
let skills = catalog.find_by_capability("platform.abstraction");
```

### By Dependency Resolution

```rust
// Find skills that can satisfy these requirements
let requirements = vec![
    "storage.file_system >= 1.0",
    "network.http >= 0.5",
];
let solution = catalog.resolve(requirements);
```

### AI Discovery (via SKILL.md)

Claude reads SKILL.md files to understand:
- What the skill does (Purpose)
- What it provides (Capabilities)
- How to use it (Examples)
- What can go wrong (Error Handling)

---

## Skill Composition

### Direct Composition

```rust
// Skill A uses Skill B directly
use cross_platform_bridge::fs;
use math_engine::matrix;

pub fn process_data(path: &str) -> Result<Matrix> {
    let data = fs::read_file(path)?;
    let matrix = matrix::from_csv(&data)?;
    Ok(matrix)
}
```

### Declarative Composition (via DOL)

```dol
system my_composite_skill @ 0.1.0 {
  requires skill.cross_platform_bridge >= 0.1.0
  requires skill.math_engine >= 0.1.0
  
  provides data.processing
  
  // Composition logic
  data.processing combines:
    cross_platform_bridge.read_file
    math_engine.matrix.from_csv
    math_engine.matrix.transform
    cross_platform_bridge.write_file
}
```

### Runtime Composition

```rust
// Skills loaded and composed at runtime
let pipeline = SkillPipeline::new()
    .add(catalog.get("cross_platform_bridge")?)
    .add(catalog.get("math_engine")?)
    .connect("file_reader", "matrix_parser")?
    .build();

let result = pipeline.execute(input)?;
```

---

## Skill Lifecycle

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        SKILL LIFECYCLE                                  │
│                                                                         │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐             │
│  │ Discover│───▶│  Load   │───▶│Configure│───▶│  Use    │             │
│  └─────────┘    └─────────┘    └─────────┘    └─────────┘             │
│       │              │              │              │                    │
│       │              │              │              │                    │
│       ▼              ▼              ▼              ▼                    │
│  Read SKILL.md  Load code     Apply params   Call APIs                 │
│  Check deps     Init state    Validate       Handle errors             │
│  Verify compat  Run init()    Connect deps   Return results            │
│                                                                         │
│                                              │                          │
│                                              ▼                          │
│                                        ┌─────────┐                      │
│                                        │ Shutdown│                      │
│                                        └─────────┘                      │
│                                              │                          │
│                                              ▼                          │
│                                        Cleanup, release                 │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Example Skills from MyceliaNetwork

### CrossPlatformBridge

```yaml
name: CrossPlatformBridge
version: 0.1.0
capabilities:
  - platform.abstraction
  - storage.file_system
  - lifecycle.init

provides:
  - Unified path handling (forward slashes everywhere)
  - Platform-agnostic file operations
  - Environment detection (OS, arch, paths)
  - Native command execution

use_cases:
  - Write code that works on Windows, macOS, and Linux
  - Avoid #[cfg(target_os = "...")] everywhere
  - Consistent file paths in configs
```

### MathEngineIntegration

```yaml
name: MathEngineIntegration
version: 0.1.0
capabilities:
  - compute.math.linear_algebra
  - compute.math.statistics
  - compute.cpu

provides:
  - Matrix operations (multiply, inverse, decomposition)
  - Statistical functions (mean, std, correlation)
  - Linear algebra (eigenvalues, SVD, LU)
  - Scientific computing primitives

use_cases:
  - Data analysis pipelines
  - Machine learning preprocessing
  - Scientific simulations
```

### MyceliaNetworkNodeDeployer

```yaml
name: MyceliaNetworkNodeDeployer
version: 0.1.0
capabilities:
  - network.p2p
  - network.discovery
  - lifecycle.init
  - lifecycle.health

dependencies:
  - CrossPlatformBridge >= 0.1.0

provides:
  - P2P node initialization
  - Network joining and discovery
  - Peer management
  - Health monitoring

use_cases:
  - Deploy a new node to the Mycelial network
  - Join existing network
  - Monitor node health
```

---

## Creating a New Skill

### Step 1: Create Structure

```bash
mkdir -p my-skill/{src,tests,examples}
touch my-skill/SKILL.md
touch my-skill/skill.dol  # optional
```

### Step 2: Write SKILL.md

Start with the template above. Be thorough—this is how both humans and AI understand your skill.

### Step 3: Implement

```rust
// src/lib.rs
pub struct MySkill {
    config: Config,
}

impl MySkill {
    pub fn new(config: Config) -> Self {
        Self { config }
    }
    
    pub fn do_thing(&self, input: Input) -> Result<Output> {
        // Implementation
    }
}
```

### Step 4: Test

```rust
// tests/unit/basic.rs
#[test]
fn test_do_thing() {
    let skill = MySkill::new(Config::default());
    let result = skill.do_thing(Input::sample());
    assert!(result.is_ok());
}
```

### Step 5: Document Examples

```rust
// examples/basic.rs
use my_skill::MySkill;

fn main() {
    let skill = MySkill::new(Config::default());
    let result = skill.do_thing(Input::sample()).unwrap();
    println!("Result: {:?}", result);
}
```

### Step 6: Publish

```bash
# Register with skills catalog
skills publish my-skill/

# Or submit PR to skills.metalearn.org
```

---

## Integration with Claude

Claude uses skills by:

1. **Reading SKILL.md** to understand capabilities
2. **Checking dependencies** to ensure prerequisites
3. **Following examples** for correct usage
4. **Handling errors** as documented

### Claude Discovery Prompt

When Claude needs a capability:

```
I need to [do something]. Let me check available skills...

Reading: CrossPlatformBridge/SKILL.md
- Provides: platform.abstraction, storage.file_system
- This could help with file operations

Reading: MathEngineIntegration/SKILL.md  
- Provides: compute.math.linear_algebra
- This could help with matrix operations

I'll use CrossPlatformBridge for file access and MathEngineIntegration
for computation.
```

---

## Future: Skill Marketplace

```
skills.metalearn.org/
├── /catalog              # Browse all skills
│   ├── /official         # MetaLearn maintained
│   ├── /community        # Community contributed
│   └── /enterprise       # Commercial skills
│
├── /search               # Search by capability
├── /submit               # Submit new skill
├── /verify               # Verification process
└── /api                  # Programmatic access
```

---

## Versioning

Skills follow semver:

- **MAJOR**: Breaking API changes
- **MINOR**: New capabilities, backward compatible
- **PATCH**: Bug fixes, no API changes

Dependency constraints:
- `skill >= 1.0.0`: Any 1.x version
- `skill ^1.2.0`: 1.2.0 to <2.0.0
- `skill ~1.2.0`: 1.2.0 to <1.3.0
- `skill = 1.2.3`: Exact version only
