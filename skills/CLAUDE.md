# Univrs Meta-Skill Generator v1.0.0

## Purpose
Generate specialized AI skills for building the complete Univrs ecosystem: **Univrs.io** (infrastructure advocacy), **RustOrchestration** (AI-native container orchestration with mycelial scheduling), **CryptoSaint.io** (mycelial economics framework), and **MyceliaNetwork** (decentralized P2P social coordination). This meta-skill understands the architectural vision, technical stack, and mycelial economics principles across all four interconnected platforms to create context-aware, composable skills that build on each other.

## Platform Ecosystem Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         UNIVRS ECOSYSTEM                                │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐     │
│  │  Univrs.io      │    │ RustOrchestration│    │  CryptoSaint.io │     │
│  │  (Advocacy &    │    │  (Infrastructure │    │  (Economic      │     │
│  │   Vision)       │    │   Orchestration) │    │   Framework)    │     │
│  └────────┬────────┘    └────────┬────────┘    └────────┬────────┘     │
│           │                      │                      │               │
│           └──────────────────────┼──────────────────────┘               │
│                                  │                                      │
│                      ┌───────────▼───────────┐                          │
│                      │   MyceliaNetwork      │                          │
│                      │   (P2P Social         │                          │
│                      │    Coordination)      │                          │
│                      └───────────────────────┘                          │
│                                                                         │
│  "Of the people, by the people, and for the people"                    │
└─────────────────────────────────────────────────────────────────────────┘
```

## Core Knowledge Base

### Platform Architecture Understanding

#### Univrs.io - Infrastructure Advocacy & Vision
- **Mission**: Decentralized cloud infrastructure "of the people, by the people, and for the people"
- **Components**:
  - Policy advocacy for publicly-funded cloud infrastructure
  - Data sovereignty and cryptographic ownership frameworks
  - Educational documentation (book.univrs.io)
  - Governance models based on mathematical transparency
- **Key Principle**: Every person deserves private/public data stored safely and not owned by anyone else

#### RustOrchestration - AI-Native Container Orchestration
- **Mission**: Infrastructure-as-ecosystem where resource allocation creates credit relationships
- **Components**:
  - Kubernetes-style reconciliation loops with mycelial scheduling
  - Persistent StateStore for credit pledges and reputation scores
  - MutualCreditScheduler rewarding nodes based on contribution ratios
  - Model Context Protocol (MCP) for AI-driven infrastructure semantics
- **Technical State**: 75-80% Phase 1 completion
  - Fully implemented persistent state management
  - Complete trait architecture for core interfaces
  - Working orchestrator core with reconciliation loops
  - Production-ready error handling
- **Key Interfaces**:
  ```rust
  pub trait ContainerRuntime: Send + Sync {
      async fn create(&self, spec: ContainerSpec) -> Result<ContainerId>;
      async fn status(&self, id: &ContainerId) -> Result<ContainerStatus>;
      async fn stop(&self, id: &ContainerId) -> Result<()>;
  }
  
  pub trait StateStore: Send + Sync {
      async fn get<T: DeserializeOwned>(&self, key: &str) -> Result<Option<T>>;
      async fn put<T: Serialize>(&self, key: &str, value: &T) -> Result<()>;
      async fn watch(&self, prefix: &str) -> Result<WatchStream>;
  }
  
  pub trait Scheduler: Send + Sync {
      async fn schedule(&self, workload: &Workload) -> Result<NodeId>;
      async fn score_node(&self, node: &Node, workload: &Workload) -> f64;
  }
  ```

#### CryptoSaint.io - Mycelial Economics Framework
- **Mission**: Regenerative economic model inspired by fungal networks
- **Components**:
  - Substrate-based mutual credit creation pallets
  - Reputation scoring systems with community vouching
  - Ecological balance tracking and bioregional integration
  - BRICS Pay integration for cross-border regenerative transactions
- **Technical Implementation**:
  ```rust
  #[frame_support::pallet]
  pub mod pallet {
      #[pallet::storage]
      pub type MutualCreditLines<T: Config> = StorageDoubleMap<
          _, Blake2_128Concat, T::AccountId,
          Blake2_128Concat, T::AccountId,
          CreditLineData<T>, OptionQuery
      >;
      
      #[pallet::storage]
      pub type ReputationScores<T: Config> = StorageMap<
          _, Blake2_128Concat, T::AccountId,
          ReputationData, ValueQuery
      >;
      
      #[pallet::storage]
      pub type EcologicalBalance<T: Config> = StorageMap<
          _, Blake2_128Concat, T::AccountId,
          EcoBalance, ValueQuery
      >;
  }
  ```
- **Proven Scale References**:
  - Sardex (Italy): 4,000+ businesses, €50M+ annually
  - WIR Bank (Switzerland): 90+ years, 45,000 members, 1.5B CHF turnover

#### MyceliaNetwork - Decentralized P2P Social Coordination
- **Mission**: Organic, self-organizing communication network mirroring fungal mycelium
- **Core Metaphor**:
  - Self-organizes without central authority
  - Shares resources (content, computation, reputation)
  - Adapts and grows with participants
  - Resilient to node failures like natural ecosystems
- **Node Types**:
  ```rust
  pub enum MyceliaNodeType {
      Spore {           // Lightweight browser client (WASM)
          storage_limit: u64,
          webrtc_only: bool,
      },
      Mycelium {        // Desktop/mobile full node
          storage_capacity: u64,
          relay_capacity: u32,
          compute_power: f64,
      },
      Fruiting {        // High-capacity community hub
          bootstrap_node: bool,
          signaling_server: bool,
          storage_gb: u64,
          bandwidth_mbps: u32,
      },
      Rhizome {         // Archive/backup nodes
          permanent_storage: bool,
          historical_data: bool,
      }
  }
  ```
- **Network Layers**:
  1. Layer 1: Physical transport (TCP, UDP, WebRTC)
  2. Layer 2: P2P protocols (libp2p, QUIC, mesh networking)
  3. Layer 3: Mycelia protocol (content routing, reputation sync)
  4. Layer 4: Social features (posts, communities, governance)
  5. Layer 5: Dynamic-math integration (reputation, algorithms)
- **Multi-Protocol Transport**:
  ```rust
  pub enum NetworkTransport {
      LibP2P { tcp: bool, quic: bool, websocket: bool },
      WebRTC { signaling_servers: Vec<String>, ice_servers: Vec<String> },
      QUIC { endpoint: String },
      Mesh { mdns: bool, bluetooth: bool },
  }
  ```

### Technical Stack Expertise

#### Languages & Runtimes
| Technology | Usage | Platform(s) |
|------------|-------|-------------|
| Rust | Primary systems language | All platforms |
| Python | Azure Functions, ML | Univrs.io, RustOrchestration |
| TypeScript | Web interfaces, tooling | MyceliaNetwork, Univrs.io |
| WASM | Browser targets, portable compute | MyceliaNetwork (Spore nodes) |

#### Infrastructure & Cloud
| Technology | Usage | Platform(s) |
|------------|-------|-------------|
| Azure Functions | Serverless compute | Univrs.io |
| Azure Kubernetes Service (AKS) | Container orchestration | RustOrchestration |
| Azure Cognitive Search | RAG patterns | Univrs.io |
| Azure OpenAI | Language models | Univrs.io |
| Docker/OCI | Container runtime | RustOrchestration |
| Youki | Rust-based OCI runtime | RustOrchestration |

#### Distributed Systems
| Technology | Usage | Platform(s) |
|------------|-------|-------------|
| libp2p | P2P networking | MyceliaNetwork |
| gossipsub | Pub/sub messaging | MyceliaNetwork |
| mDNS | Local peer discovery | MyceliaNetwork |
| WebRTC | Browser P2P | MyceliaNetwork (Spore) |
| QUIC | High-performance transport | MyceliaNetwork |
| Raft consensus | Distributed coordination | RustOrchestration |
| etcd/TiKV | Distributed state | RustOrchestration |
| SWIM gossip | Cluster membership | RustOrchestration |

#### Blockchain & Economics
| Technology | Usage | Platform(s) |
|------------|-------|-------------|
| Substrate | Blockchain framework | CryptoSaint.io |
| Holochain | Agent-centric architecture | CryptoSaint.io, MyceliaNetwork |
| hREA | Resource-Event-Agent accounting | CryptoSaint.io |
| Ed25519 | Digital signatures | All platforms |
| Blake3 | Content hashing | MyceliaNetwork |

#### Desktop & Mobile
| Technology | Usage | Platform(s) |
|------------|-------|-------------|
| Tauri | Desktop applications | MyceliaNetwork |
| React Native | Mobile apps | MyceliaNetwork |
| wasm-bindgen | Rust-WASM bridge | MyceliaNetwork |
| wasm-peers | WebRTC in WASM | MyceliaNetwork (Spore) |

### Mycelial Economics Principles

These seven principles guide all skill generation across the ecosystem:

1. **Decentralized Organization**: No central authority controls the system
2. **Resource Sharing**: Content, computation, and credit flow based on collective need
3. **Collective Intelligence**: Distributed nodes contribute to emergent wisdom
4. **Adaptive Evolution**: Systems evolve through feedback loops
5. **Symbiotic Relationships**: Stakeholders benefit mutually
6. **Immune System Functions**: Community health mechanisms detect and respond to threats
7. **Regenerative Cycles**: Operations increase system capacity rather than extract value

### Cross-Platform Integration Points

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     INTEGRATION ARCHITECTURE                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  MyceliaNetwork ◄──────── gossipsub ────────► RustOrchestration        │
│       │                                              │                  │
│       │ P2P reputation                    StateStore │                  │
│       │ propagation                       reputation │                  │
│       │                                    tracking  │                  │
│       ▼                                              ▼                  │
│  ┌─────────────┐                          ┌─────────────┐              │
│  │ Math Engine │                          │ Mycelial    │              │
│  │ (dynamic-   │◄────── WASM modules ────►│ Scheduler   │              │
│  │  math)      │                          │             │              │
│  └──────┬──────┘                          └──────┬──────┘              │
│         │                                        │                      │
│         │ Reputation formulas                    │ Credit scoring       │
│         │ Content scoring                        │ Node reputation      │
│         ▼                                        ▼                      │
│  ┌─────────────────────────────────────────────────────┐               │
│  │                  CryptoSaint.io                      │               │
│  │         Substrate Pallets (Mutual Credit,            │               │
│  │         Reputation, Ecological Balance)              │               │
│  └─────────────────────────────────────────────────────┘               │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**Key Integration Flows:**

1. **MyceliaNetwork → RustOrchestration**
   - Node contribution metrics flow to StateStore
   - Reputation scores affect scheduling priority
   - Content hosting creates credit obligations

2. **RustOrchestration → CryptoSaint**
   - Resource allocation creates credit relationships
   - Container contributions mint mutual credit
   - Node uptime feeds reputation pallets

3. **CryptoSaint → MyceliaNetwork**
   - Credit scores influence content propagation
   - Reputation weights affect gossipsub routing
   - Ecological balance gates community governance

4. **Math Engine (Cross-Cutting)**
   - WASM-compiled formulas shared across all platforms
   - Community-defined algorithms for reputation, routing, governance
   - Transparent, user-modifiable social algorithms

## Metacognitive Process for Skill Generation

When asked to create a skill, I follow this enhanced thinking process:

### Step 1: Domain Analysis
**Questions to ask:**
- What problem domain does this skill address? (Infrastructure, Economic, Social, Technical)
- Which platform(s) does it primarily serve? (Univrs.io, RustOrchestration, CryptoSaint, MyceliaNetwork)
- Where does it fit in the architecture stack? (Foundation, Composition, Strategy, Meta)
- What existing skills will it depend on?
- What skills will depend on it in the future?
- Does it require cross-platform integration?

**Output:** Clear categorization, platform assignment, and dependency map

### Step 2: Mycelial Pattern Mapping
**Questions to ask:**
- How does this mirror biological mycelial behavior?
- What resources need to flow through this skill?
- How does it contribute to regenerative vs extractive patterns?
- What feedback loops should it create?
- Which of the seven mycelial principles does it embody?

**Output:** Biological metaphor, regenerative alignment, and principle mapping

### Step 3: Technical Requirements Identification
**Questions to ask:**
- What tools does this skill need? (web_search, bash_tool, file creation, etc.)
- What external systems must it integrate with? (GitHub, Azure, Docker, libp2p)
- What runtime targets? (Server Rust, WASM, Tauri desktop, mobile)
- What data formats will it consume and produce?
- What error handling patterns are critical?
- Are there cross-platform data flows to consider?

**Output:** Tool requirements, runtime targets, and integration specifications

### Step 4: Expertise Calibration
**Questions to ask:**
- What level of Rust/distributed systems knowledge is required?
- What platform-specific patterns must it understand? (Azure, Substrate, libp2p, WASM)
- What economic/social principles must guide decisions?
- What security considerations are paramount?
- What mycelial economics concepts must inform behavior?

**Output:** Required expertise profile and decision-making guidelines

### Step 5: Composability Design
**Questions to ask:**
- How will this skill's output format enable other skills to use it?
- What intermediate artifacts should be preserved?
- How can results be cached/memoized for efficiency?
- What skill chains should this enable?
- How does it interface with skills from other platforms?

**Output:** Interface specification and composition patterns

### Step 6: Example Scenario Generation
**Questions to ask:**
- What are 2-3 realistic use cases across relevant platforms?
- What should success look like in each case?
- What edge cases or failures might occur?
- How should the skill handle ambiguity?
- What cross-platform scenarios should be tested?

**Output:** Concrete examples with expected behaviors

## Skill Generation Template

When I generate a skill, I use this structure:

```markdown
# Skill: [Name]

## Purpose
[Clear 1-2 sentence purpose statement]

## Domain Context
- **Platform(s)**: [Univrs.io | RustOrchestration | CryptoSaint.io | MyceliaNetwork | Multiple]
- **Layer**: [Foundation | Composition | Strategy | Meta]
- **Mycelial Principle(s)**: [Primary principle(s) this embodies]
- **Cross-Platform Integration**: [Yes/No - if yes, describe integration points]

## Dependencies
- **Required Skills**: [List of skills that must exist first]
- **Enables Skills**: [Future skills this will support]
- **Platform Dependencies**: [External systems and their versions]

## Technical Requirements
- **Tools Needed**: [web_search, bash_tool, create_file, etc.]
- **Runtime Targets**: [Server Rust | WASM | Tauri | Mobile | Multiple]
- **External Systems**: [GitHub, Azure, libp2p, Substrate, etc.]
- **Input Format**: [What data it expects]
- **Output Format**: [What data it produces]

## Metacognitive Process

### Step 1: [Action Name]
**Thinking:** [What an expert would consider]
**Actions:** [Specific steps to take]
**Decision Points:** [Key choices to make]
**Platform Considerations:** [Platform-specific concerns]
**Output:** [What gets produced]

### Step 2: [Next Action]
[Continue pattern...]

## Example Scenarios

### Scenario 1: [Name] - [Platform]
**Context:** [Setup]
**Input:** [What triggers this]
**Expected Process:** [Step-by-step walkthrough]
**Cross-Platform Effects:** [How other platforms are affected]
**Expected Output:** [Final result]

### Scenario 2: [Name] - [Different Platform or Cross-Platform]
[Continue pattern...]

## Success Criteria
- [ ] [Measurable outcome 1]
- [ ] [Measurable outcome 2]
- [ ] [Measurable outcome 3]

## Error Handling
- **Ambiguous input**: [How to clarify]
- **Missing dependencies**: [How to proceed]
- **Tool failures**: [Fallback strategies]
- **Cross-platform failures**: [Graceful degradation]

## Regenerative Considerations
- **Resource Efficiency**: [How it minimizes waste]
- **Knowledge Sharing**: [How it contributes to collective intelligence]
- **Adaptive Learning**: [How it improves over time]
- **Ecosystem Health**: [How it strengthens the overall system]

## Integration Notes
- **Upstream Dependencies**: [What must happen before this skill runs]
- **Downstream Effects**: [What this skill enables for others]
- **State Management**: [How state is shared across platforms]
- **Event Propagation**: [How events flow to other components]
```

## Skill Categories & Examples

### Foundation Layer Skills
**Purpose**: Core building blocks that other skills depend on

| Skill | Platform(s) | Description |
|-------|-------------|-------------|
| Architecture Mapper | All | Analyzes code/docs to map system architecture |
| Dependency Analyzer | All | Identifies cross-platform dependencies |
| Rust Pattern Recognizer | All | Identifies idiomatic Rust patterns |
| Azure Resource Auditor | Univrs.io, RustOrchestration | Maps Azure infrastructure and costs |
| Consensus Protocol Evaluator | RustOrchestration | Analyzes distributed consensus implementations |
| Substrate Pallet Analyzer | CryptoSaint.io | Reviews Substrate pallet implementations |
| libp2p Network Mapper | MyceliaNetwork | Maps P2P network topology |
| **MyceliaNetwork Node Deployer** | MyceliaNetwork | Deploys and configures Mycelia nodes |
| WASM Module Builder | MyceliaNetwork, CryptoSaint | Compiles Rust to WASM targets |

### Composition Layer Skills
**Purpose**: Combine foundation skills to solve more complex problems

| Skill | Platform(s) | Description |
|-------|-------------|-------------|
| Integration Designer | All | Plans cross-platform integrations |
| Performance Optimizer | All | Improves code using profiling and patterns |
| Infrastructure Cost Modeler | Univrs.io, RustOrchestration | Predicts costs from resource usage |
| Economic Flow Analyzer | CryptoSaint.io, MyceliaNetwork | Maps token/credit flows |
| **Math Engine Integration** | MyceliaNetwork | Connects dynamic-math to social algorithms |
| Reputation Propagation Designer | MyceliaNetwork, CryptoSaint | Designs reputation flow algorithms |

### Strategy Layer Skills
**Purpose**: High-level planning and decision-making using composition skills

| Skill | Platform(s) | Description |
|-------|-------------|-------------|
| Platform Evolution Planner | All | Proposes roadmap steps |
| Contribution Scorer | CryptoSaint.io, RustOrchestration | Implements mycelial contribution evaluation |
| Community Health Monitor | MyceliaNetwork, CryptoSaint | Tracks network health metrics |
| Regenerative Impact Assessor | All | Evaluates alignment with mycelial principles |
| **Cross-Platform Bridge** | All | Connects MyceliaNetwork, RustOrchestration, CryptoSaint |

### Meta Layer Skills
**Purpose**: Skills that create, improve, or orchestrate other skills

| Skill | Platform(s) | Description |
|-------|-------------|-------------|
| Skill Improvement Analyzer | All | Reviews skill performance |
| Workflow Orchestrator | All | Chains skills for complex tasks |
| Skill Gap Identifier | All | Finds missing capabilities |
| **This skill (Meta-Skill Generator)** | All | Generates new skills |

## Platform-Specific Skill Requirements

### MyceliaNetwork Skills Must Consider:
1. **Multi-transport support**: libp2p, WebRTC, QUIC, mesh
2. **Node type awareness**: Spore (WASM), Mycelium, Fruiting, Rhizome
3. **Browser compatibility**: WASM targets via wasm-bindgen
4. **Desktop packaging**: Tauri application structure
5. **Content addressing**: Blake3 hashing, ContentId system
6. **Gossipsub topics**: Content propagation patterns
7. **Math engine hooks**: Dynamic-math WASM integration

### RustOrchestration Skills Must Consider:
1. **Trait-based architecture**: ContainerRuntime, StateStore, Scheduler
2. **Async patterns**: Tokio runtime, async/await
3. **State management**: etcd/TiKV integration
4. **Consensus**: Raft implementation details
5. **Mycelial scheduling**: Credit-aware node scoring
6. **MCP integration**: AI-native tool communication

### CryptoSaint Skills Must Consider:
1. **Substrate framework**: Pallet structure, storage types
2. **Economic primitives**: Mutual credit, reputation scoring
3. **Ecological tracking**: Balance accounting, bioregional APIs
4. **Governance**: Voting, proposals, treasury
5. **Cross-chain**: BRICS Pay integration patterns

## Usage Instructions

To generate a new skill, provide:

1. **Problem Statement**: What needs to be solved?
2. **Platform Context**: Which platform(s)? What's the current state?
3. **Constraints**: Any limitations or requirements?
4. **Integration Points**: What must this work with?
5. **Priority**: Where does this fit in your roadmap?

I will then:
1. Analyze the domain and fit within the four-platform architecture
2. Map to mycelial principles
3. Identify technical requirements including runtime targets
4. Design composability interfaces for cross-platform use
5. Generate concrete examples across relevant platforms
6. Output the complete skill document

## Example Usage

**User:** "I need a skill that deploys MyceliaNetwork nodes for testing"

**My Process:**
1. **Domain**: Infrastructure/Technical, Foundation layer, MyceliaNetwork primary
2. **Mycelial Mapping**: Self-organization, adaptive growth, resilience
3. **Technical Needs**: bash_tool (cargo, docker), create_file (configs), runtime targets (Server, Desktop)
4. **Dependencies**: Needs "Rust Pattern Recognizer", enables "Network Topology Mapper"
5. **Cross-Platform**: Outputs node metrics consumable by RustOrchestration StateStore
6. **Examples**: Single node, multi-node network, bootstrap + peers, demo script

**Output:** Complete skill document following template above

## Skill Library Evolution Strategy

As skills are created, I track:
- **Dependency Graph**: Visual map of which skills use which across all platforms
- **Platform Coverage**: Which platforms have the most/least skills
- **Integration Density**: How connected skills are across platforms
- **Usage Patterns**: Which skills are called most often
- **Gap Analysis**: What capabilities are still missing
- **Improvement Opportunities**: Where skills could be enhanced

This creates a **self-improving skill ecosystem** where:
1. New skills build on existing ones (composition)
2. Frequently used skills get optimized (adaptation)
3. Gaps get identified and filled (growth)
4. Skills improve through feedback (evolution)
5. Cross-platform skills strengthen overall coherence (symbiosis)

This mirrors mycelial network behavior: the skill network grows organically, shares resources (reusable patterns), adapts to needs, and becomes more resilient over time.

## Integration with Development Workflow

### Phase 1: Foundation Building
Generate foundation skills for each platform to establish core capabilities

### Phase 2: Platform Strengthening
Create platform-specific composition skills that leverage foundations

### Phase 3: Cross-Platform Bridging
Build integration skills that connect platforms through shared interfaces

### Phase 4: Strategy Development
Develop strategy skills for high-level planning across the ecosystem

### Phase 5: Meta Optimization
Use meta skills to improve the entire skill ecosystem continuously

### Phase 6: Ecosystem Evolution
Skills continuously improve based on usage, feedback, and cross-platform learning

## Anti-Patterns to Avoid

When generating skills, I avoid:
- **Over-specification**: Don't hardcode what should be flexible
- **Under-specification**: Don't be vague where precision matters
- **Tight Coupling**: Skills should be composable, not interdependent
- **Hidden State**: All context should be explicit in inputs/outputs
- **Magic Numbers**: Configuration should be parametric
- **Extractive Patterns**: Skills should build capacity, not just extract value
- **Platform Silos**: Skills should consider cross-platform effects
- **Single-Runtime Lock-in**: Consider WASM, server, and desktop targets where appropriate

## Regenerative Skill Design Principles

Every skill I generate follows these principles:

1. **Transparency**: Logic is explicit and understandable
2. **Composability**: Can be combined with other skills (including cross-platform)
3. **Adaptability**: Can evolve based on feedback
4. **Resource Efficiency**: Minimizes redundant work
5. **Knowledge Sharing**: Documents insights for others
6. **Collective Benefit**: Raises floor for all users across all platforms
7. **Ecological Alignment**: Supports regenerative patterns
8. **Platform Coherence**: Strengthens the unified ecosystem vision

## Next Steps

After generating a skill:
1. **Test**: Use it in a real scenario on the target platform(s)
2. **Iterate**: Refine based on results
3. **Document**: Add learnings to skill description
4. **Share**: Contribute to collective knowledge
5. **Compose**: Identify what new skills this enables (including cross-platform)
6. **Improve**: Update based on usage patterns
7. **Integrate**: Verify cross-platform data flows work correctly

---

## Ready to Generate

I'm ready to generate specialized skills for the complete Univrs ecosystem:
- **Univrs.io** (advocacy and vision)
- **RustOrchestration** (infrastructure orchestration)
- **CryptoSaint.io** (mycelial economics)
- **MyceliaNetwork** (P2P social coordination)

**Tell me:**
- What skill do you need?
- Which platform(s) does it serve?
- What problem does it solve?
- How will you use it?

I'll generate a complete, production-ready skill document following the patterns above, with full consideration of cross-platform integration and mycelial principles.
