# Skill: Math Engine Integration

## Purpose
Connect the dynamic-math WASM compilation platform to MyceliaNetwork's social algorithms, enabling communities to define, compile, and deploy transparent mathematical formulas for reputation flow, content propagation, community governance, and network routing decisions.

## Domain Context
- **Platform(s)**: MyceliaNetwork (primary), CryptoSaint.io (formula sharing), RustOrchestration (scheduling formulas)
- **Layer**: Composition
- **Mycelial Principle(s)**:
  - Collective Intelligence (community-defined algorithms)
  - Transparency (visible, auditable formulas)
  - Adaptive Evolution (formulas can be updated based on feedback)
  - Decentralized Organization (no hidden corporate algorithms)
- **Cross-Platform Integration**: Yes
  - WASM modules shared across all platforms
  - Formulas can feed CryptoSaint reputation pallets
  - Formulas can influence RustOrchestration scheduling decisions

## Dependencies
- **Required Skills**: 
  - MyceliaNetwork Node Deployer (needs running nodes to test)
- **Enables Skills**:
  - Cross-Platform Bridge (uses compiled formulas)
  - Community Governance Designer
  - Reputation Flow Analyzer
  - Content Recommendation Tuner
- **Platform Dependencies**:
  - dynamic-math WASM compiler platform
  - Rust toolchain with wasm32 target
  - Running MyceliaNetwork node(s) for integration testing
  - Optional: Substrate runtime for CryptoSaint integration

## Technical Requirements

### Tools Needed
| Tool | Purpose |
|------|---------|
| bash_tool | Compile WASM modules, run tests, deploy |
| create_file | Generate formula definitions, integration code |
| view | Inspect existing formulas, test results |
| web_search | Reference WASM optimization, math libraries |

### Runtime Targets
| Component | Runtime | Notes |
|-----------|---------|-------|
| Math Compiler | Native Rust | Compiles formulas to WASM |
| Compiled Formulas | WASM | Portable across all node types |
| Node Integration | Native + WASM | Loads and executes formulas |
| Browser Execution | WASM | Spore nodes execute in browser |

### External Systems
- **dynamic-math platform**: The core math compilation engine
- **MyceliaNetwork gossipsub**: For propagating formula updates
- **Optional**: CryptoSaint Substrate chain for on-chain formula verification
- **Optional**: RustOrchestration StateStore for scheduling formula storage

### Input Format
```yaml
math_integration_request:
  formula_type: reputation | content | governance | routing | custom
  formula_definition:
    name: string
    expression: string  # Mathematical expression
    variables: list[string]
    description: string
  compilation_options:
    optimization_level: 0 | 1 | 2 | 3
    target_size: minimize | balanced | maximize_speed
    include_debug: boolean
  deployment_target:
    mycelia_network: boolean
    cryptosaint: boolean
    rust_orchestration: boolean
  test_cases:
    - inputs: map[string, float]
      expected_output: float
```

### Output Format
```yaml
math_integration_result:
  formula_id: ContentId  # Blake3 hash of compiled WASM
  wasm_module:
    path: string
    size_bytes: integer
    optimization_level: integer
  integration_status:
    mycelia_network: deployed | pending | failed
    cryptosaint: deployed | pending | failed | not_requested
    rust_orchestration: deployed | pending | failed | not_requested
  test_results:
    passed: integer
    failed: integer
    details: list[test_result]
  usage_example:
    rust_code: string
    javascript_code: string  # For browser nodes
```

## Metacognitive Process

### Step 1: Parse and Validate Formula
**Thinking:** Is this formula syntactically correct? Are all variables defined? Does it align with the formula type?

**Actions:**
1. Parse the mathematical expression
2. Extract all variables used in the expression
3. Validate variables match the declared variable list
4. Check for common errors (division by zero potential, overflow risks)
5. Validate expression aligns with formula type semantics

**Formula Type Semantics:**
```
reputation:
  - Output should be 0.0 to 1.0 (normalized score)
  - Common variables: source_rep, connection_strength, trust_factor, time_decay
  
content:
  - Output typically 0.0 to 1.0 (propagation priority)
  - Common variables: author_rep, content_quality, topic_match, network_position
  
governance:
  - Output can be boolean (threshold) or weighted (voting power)
  - Common variables: member_reputation, stake, time_in_community, participation
  
routing:
  - Output is weight for routing decisions
  - Common variables: node_uptime, bandwidth, storage_contribution, reputation
  
custom:
  - No semantic restrictions
  - User must ensure appropriate output range
```

**Decision Points:**
- If variables undefined: Return error with missing variables
- If expression unparseable: Provide specific syntax error location
- If semantics mismatch: Warn but allow (user may have valid reason)

**Platform Considerations:**
- CryptoSaint formulas may need additional on-chain verification metadata
- RustOrchestration formulas should output f64 for scheduling scores

**Output:** Validated formula ready for compilation

### Step 2: Compile to WASM
**Thinking:** How do we transform this formula into efficient, portable WASM?

**Actions:**
1. Generate Rust source code wrapping the formula
2. Apply optimization settings
3. Compile to wasm32-unknown-unknown target
4. Run wasm-opt for additional optimization (if available)
5. Generate WASM bindings for JavaScript (for Spore nodes)

**Generated Rust Wrapper:**
```rust
// Auto-generated by Math Engine Integration skill
// Formula: {name}
// Expression: {expression}

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct {StructName}Formula {
    // Cached computation state if needed
}

#[wasm_bindgen]
impl {StructName}Formula {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self {}
    }
    
    /// Evaluate the formula with given inputs
    /// Variables: {variables}
    #[wasm_bindgen]
    pub fn evaluate(&self, {params}) -> f64 {
        {compiled_expression}
    }
    
    /// Get formula metadata
    #[wasm_bindgen]
    pub fn metadata() -> String {
        r#"{{"name": "{name}", "variables": {variables_json}}}"#.to_string()
    }
}

// Native Rust interface (for non-WASM contexts)
pub fn evaluate({params}) -> f64 {
    {compiled_expression}
}
```

**Compilation Commands:**
```bash
# Generate Rust source
create formula_generated.rs

# Compile to WASM
cargo build --target wasm32-unknown-unknown --release

# Optimize WASM (if wasm-opt available)
wasm-opt -O3 target/wasm32-unknown-unknown/release/formula.wasm \
  -o target/optimized/formula.wasm

# Generate JS bindings
wasm-bindgen target/optimized/formula.wasm \
  --out-dir ./pkg \
  --target web
```

**Decision Points:**
- Optimization level 0: Fast compile, larger size (development)
- Optimization level 3: Slow compile, smallest size (production)
- Include debug: Add source maps and debug symbols

**Output:** Compiled WASM module with bindings

### Step 3: Run Test Cases
**Thinking:** Does the compiled formula produce correct outputs?

**Actions:**
1. Load compiled WASM module
2. For each test case:
   - Call evaluate() with test inputs
   - Compare output to expected value (within epsilon)
   - Record pass/fail with details
3. Report overall test results
4. If any tests fail, provide diagnostic information

**Test Harness:**
```rust
#[cfg(test)]
mod tests {
    use super::*;
    
    #[test]
    fn test_formula_cases() {
        let formula = {StructName}Formula::new();
        
        // Test case 1
        let result = formula.evaluate({test_inputs_1});
        assert!((result - {expected_1}).abs() < 1e-6, 
            "Expected {expected_1}, got {}", result);
        
        // Additional test cases...
    }
    
    #[test]
    fn test_edge_cases() {
        let formula = {StructName}Formula::new();
        
        // Test with zero inputs
        let result = formula.evaluate(0.0, 0.0, 0.0, 0.0);
        assert!(result.is_finite(), "Formula should handle zero inputs");
        
        // Test with extreme values
        let result = formula.evaluate(1e10, 1e10, 1e10, 1e10);
        assert!(result.is_finite(), "Formula should handle large inputs");
    }
}
```

**Decision Points:**
- All tests pass: Proceed to deployment
- Some tests fail: Report failures, ask user to verify formula or test cases
- Edge case failures: Warn about potential runtime issues

**Output:** Test results with pass/fail details

### Step 4: Deploy to MyceliaNetwork
**Thinking:** How do we make this formula available to all nodes in the network?

**Actions:**
1. Create ContentId from WASM hash (Blake3)
2. Package formula with metadata
3. Publish to MyceliaNetwork via gossipsub
4. Register in local formula registry
5. Verify propagation to connected peers

**Formula Package Structure:**
```rust
#[derive(Serialize, Deserialize)]
pub struct FormulaPackage {
    pub id: ContentId,
    pub metadata: FormulaMetadata,
    pub wasm_bytes: Vec<u8>,
    pub signature: Signature,  // Author signature
    pub published_at: u64,
}

#[derive(Serialize, Deserialize)]
pub struct FormulaMetadata {
    pub name: String,
    pub formula_type: FormulaType,
    pub expression: String,  // Human-readable
    pub variables: Vec<VariableInfo>,
    pub author: PeerId,
    pub version: u32,
    pub description: String,
}
```

**Gossipsub Publication:**
```rust
// Publish formula to network
let topic = Topic::new("/mycelia/formulas/1.0.0");
let message = bincode::serialize(&formula_package)?;
network.gossipsub.publish(topic, message)?;

// Also publish to formula-type-specific topic
let type_topic = Topic::new(format!("/mycelia/formulas/{}/1.0.0", formula_type));
network.gossipsub.publish(type_topic, message)?;
```

**Platform Considerations:**
- MyceliaNetwork: Primary deployment, all nodes can access
- Cross-platform: Formula ID can be referenced by CryptoSaint and RustOrchestration

**Output:** Deployed formula with ContentId

### Step 5: Integrate with MyceliaMathEngine
**Thinking:** How do nodes load and use this formula?

**Actions:**
1. Register formula in node's MathEngine
2. Create evaluation interface
3. Test integration with live node operations
4. Verify formula is used in appropriate contexts

**MyceliaMathEngine Integration:**
```rust
pub struct MyceliaMathEngine {
    pub formulas: HashMap<String, CompiledFormula>,
    pub formula_cache: LruCache<ContentId, WasmModule>,
}

impl MyceliaMathEngine {
    /// Load a formula from the network
    pub async fn load_formula(&mut self, formula_id: &ContentId) -> Result<()> {
        // Fetch formula package from network
        let package = self.network.fetch_content(formula_id).await?;
        let formula: FormulaPackage = bincode::deserialize(&package)?;
        
        // Verify signature
        formula.verify_signature()?;
        
        // Load WASM module
        let module = wasmer::Module::new(&self.engine, &formula.wasm_bytes)?;
        let instance = module.instantiate(&self.store)?;
        
        // Register by name
        self.formulas.insert(formula.metadata.name.clone(), CompiledFormula {
            module,
            instance,
            metadata: formula.metadata,
        });
        
        Ok(())
    }
    
    /// Execute a formula with given inputs
    pub fn execute(&self, name: &str, inputs: Vec<f64>) -> Result<f64> {
        let formula = self.formulas.get(name)
            .ok_or(Error::FormulaNotFound)?;
        
        let evaluate = formula.instance.exports.get_function("evaluate")?;
        let result = evaluate.call(&inputs.into_wasm_values())?;
        
        Ok(result.into_f64())
    }
}
```

**Usage in Social Algorithms:**
```rust
impl MyceliaNetwork {
    pub async fn calculate_content_propagation(&self, content: &Content) -> f64 {
        let author_rep = self.get_user_reputation(&content.author_id);
        let content_quality = self.analyze_content_quality(content).await;
        let topic_match = self.calculate_topic_relevance(&content.tags);
        let network_pos = self.get_network_centrality(&content.author_id);
        let time_factor = self.calculate_time_relevance(content.created_at);
        
        // Use community-defined formula!
        self.math_engine.execute("content_virality", vec![
            author_rep, content_quality, topic_match, network_pos, time_factor
        ]).unwrap_or(0.5)  // Default to neutral if formula unavailable
    }
}
```

**Output:** Formula integrated into node operations

### Step 6: Cross-Platform Deployment (Optional)
**Thinking:** Should this formula be available to CryptoSaint or RustOrchestration?

**Actions for CryptoSaint:**
1. Generate Substrate-compatible formula wrapper
2. Submit formula hash to on-chain registry
3. Enable formula reference in reputation calculations

```rust
// CryptoSaint pallet integration
#[pallet::call]
impl<T: Config> Pallet<T> {
    /// Register an off-chain formula for use in reputation calculations
    #[pallet::weight(10_000)]
    pub fn register_formula(
        origin: OriginFor<T>,
        formula_id: [u8; 32],  // ContentId hash
        formula_type: FormulaType,
        ipfs_cid: Vec<u8>,  // Where to fetch WASM
    ) -> DispatchResult {
        let who = ensure_signed(origin)?;
        
        FormulaRegistry::<T>::insert(formula_id, FormulaRegistration {
            owner: who,
            formula_type,
            ipfs_cid,
            registered_at: <frame_system::Pallet<T>>::block_number(),
        });
        
        Self::deposit_event(Event::FormulaRegistered { formula_id, owner: who });
        Ok(())
    }
}
```

**Actions for RustOrchestration:**
1. Store formula in StateStore with routing prefix
2. Enable MutualCreditScheduler to use formula
3. Verify formula produces valid scheduling scores

```rust
// RustOrchestration integration
impl MutualCreditScheduler {
    pub async fn load_scoring_formula(&mut self, formula_id: &str) -> Result<()> {
        // Fetch from StateStore
        let formula_bytes: Vec<u8> = self.state_store
            .get(&format!("formulas/{}", formula_id))
            .await?
            .ok_or(Error::FormulaNotFound)?;
        
        // Load WASM module
        self.scoring_formula = Some(WasmModule::from_bytes(&formula_bytes)?);
        
        Ok(())
    }
    
    pub fn score_node(&self, node: &Node, workload: &Workload) -> f64 {
        if let Some(ref formula) = self.scoring_formula {
            formula.evaluate(vec![
                node.uptime_ratio(),
                node.bandwidth_available(),
                node.credit_balance(),
                node.reputation_score(),
            ])
        } else {
            // Fallback to default scoring
            self.default_score(node, workload)
        }
    }
}
```

**Output:** Cross-platform deployment status

## Example Scenarios

### Scenario 1: Reputation Flow Formula - MyceliaNetwork
**Context:** Community wants to define how reputation propagates through connections

**Input:**
```yaml
math_integration_request:
  formula_type: reputation
  formula_definition:
    name: "reputation_flow"
    expression: "source_rep * connection_strength * trust_factor * exp(-time_decay * days)"
    variables: [source_rep, connection_strength, trust_factor, time_decay, days]
    description: "Reputation flows from source through connection, decaying over time"
  compilation_options:
    optimization_level: 2
    target_size: balanced
  deployment_target:
    mycelia_network: true
    cryptosaint: true
  test_cases:
    - inputs: {source_rep: 0.9, connection_strength: 0.8, trust_factor: 0.7, time_decay: 0.1, days: 0}
      expected_output: 0.504
    - inputs: {source_rep: 0.9, connection_strength: 0.8, trust_factor: 0.7, time_decay: 0.1, days: 7}
      expected_output: 0.252
```

**Expected Process:**
1. Parse expression, validate 5 variables
2. Generate Rust code with exponential decay
3. Compile to WASM (expect ~5KB optimized)
4. Run tests, verify decay over 7 days ≈ half
5. Deploy to MyceliaNetwork gossipsub
6. Register in CryptoSaint formula registry

**Cross-Platform Effects:**
- MyceliaNetwork nodes use for reputation propagation decisions
- CryptoSaint can reference for on-chain reputation calculations

**Expected Output:**
```yaml
math_integration_result:
  formula_id: "bafyreih3..."  # Blake3 hash
  wasm_module:
    path: "./pkg/reputation_flow.wasm"
    size_bytes: 4892
    optimization_level: 2
  integration_status:
    mycelia_network: deployed
    cryptosaint: deployed
    rust_orchestration: not_requested
  test_results:
    passed: 2
    failed: 0
  usage_example:
    rust_code: |
      let score = math_engine.execute("reputation_flow", vec![
          source_rep, connection_strength, trust_factor, time_decay, days
      ])?;
```

### Scenario 2: Community Governance Formula - Multi-Platform
**Context:** DAO community wants quadratic voting weighted by participation history

**Input:**
```yaml
math_integration_request:
  formula_type: governance
  formula_definition:
    name: "quadratic_participation_vote"
    expression: "sqrt(stake) * (1 + log(1 + participation_count) / 10) * reputation"
    variables: [stake, participation_count, reputation]
    description: "Quadratic voting with participation bonus, reputation weighted"
  compilation_options:
    optimization_level: 3
    target_size: minimize
  deployment_target:
    mycelia_network: true
    cryptosaint: true
    rust_orchestration: false
  test_cases:
    - inputs: {stake: 100, participation_count: 0, reputation: 1.0}
      expected_output: 10.0
    - inputs: {stake: 100, participation_count: 100, reputation: 1.0}
      expected_output: 12.0
    - inputs: {stake: 100, participation_count: 100, reputation: 0.5}
      expected_output: 6.0
```

**Expected Process:**
1. Parse expression with sqrt and log functions
2. Validate all 3 variables present
3. Compile with maximum optimization
4. Run 3 test cases, verify quadratic + log behavior
5. Deploy to both MyceliaNetwork and CryptoSaint
6. For CryptoSaint: Generate pallet-compatible wrapper

**Cross-Platform Effects:**
- MyceliaNetwork: Used for in-network governance proposals
- CryptoSaint: On-chain governance voting power calculations

**Expected Output:**
```yaml
math_integration_result:
  formula_id: "bafyreig7..."
  wasm_module:
    path: "./pkg/quadratic_participation_vote.wasm"
    size_bytes: 3241
    optimization_level: 3
  integration_status:
    mycelia_network: deployed
    cryptosaint: deployed
  test_results:
    passed: 3
    failed: 0
```

### Scenario 3: Mycelial Scheduling Formula - RustOrchestration
**Context:** Configure node scoring for mycelial credit-aware scheduling

**Input:**
```yaml
math_integration_request:
  formula_type: routing
  formula_definition:
    name: "mycelial_node_score"
    expression: "uptime * 0.3 + bandwidth * 0.2 + credit_balance * 0.3 + reputation * 0.2"
    variables: [uptime, bandwidth, credit_balance, reputation]
    description: "Balanced node scoring for mycelial scheduling with credit weight"
  deployment_target:
    mycelia_network: false
    cryptosaint: false
    rust_orchestration: true
  test_cases:
    - inputs: {uptime: 0.99, bandwidth: 0.8, credit_balance: 0.5, reputation: 0.9}
      expected_output: 0.787
```

**Expected Process:**
1. Parse simple weighted average expression
2. Compile with balanced optimization
3. Run test case
4. Store in RustOrchestration StateStore
5. Configure MutualCreditScheduler to use formula

**Cross-Platform Effects:**
- RustOrchestration uses for all scheduling decisions
- Credit balance from CryptoSaint influences scheduling priority
- Reputation from MyceliaNetwork feeds into scoring

**Expected Output:**
```yaml
math_integration_result:
  formula_id: "bafyreid2..."
  integration_status:
    mycelia_network: not_requested
    cryptosaint: not_requested
    rust_orchestration: deployed
  usage_example:
    rust_code: |
      let score = scheduler.score_node(&node, &workload);
      // Uses mycelial_node_score formula internally
```

## Success Criteria
- [ ] Formula compiles to valid WASM without errors
- [ ] All test cases pass within epsilon tolerance
- [ ] WASM size is within acceptable limits for node type
- [ ] Formula deploys successfully to requested platforms
- [ ] Nodes can load and execute formula correctly
- [ ] Cross-platform integrations function as expected
- [ ] Formula execution time is acceptable (<1ms for simple formulas)

## Error Handling

### Ambiguous Input
- **Undefined variables**: List variable in expression not in variables list
- **Circular definition**: Variable defined in terms of itself
- **Ambiguous operators**: Clarify precedence (e.g., `a * b + c` vs `a * (b + c)`)

### Missing Dependencies
- **dynamic-math not available**: Provide setup instructions
- **WASM target missing**: `rustup target add wasm32-unknown-unknown`
- **wasm-opt not installed**: Continue without extra optimization, warn

### Tool Failures
- **Compilation error**: Parse error message, suggest formula corrections
- **Test failures**: Show expected vs actual, suggest debugging steps
- **Deployment failure**: Retry with backoff, fall back to local-only

### Cross-Platform Failures
- **CryptoSaint unavailable**: Deploy to MyceliaNetwork only, queue for later
- **RustOrchestration unavailable**: Store formula, retry connection
- **Graceful degradation**: Formulas work independently on each platform

## Regenerative Considerations

### Resource Efficiency
- Compiled WASM cached to avoid recompilation
- Formulas content-addressed for deduplication
- Lightweight WASM execution vs interpreted formulas

### Knowledge Sharing
- Formula expressions are human-readable in metadata
- Version history preserved for learning
- Community can fork and improve formulas

### Adaptive Learning
- Usage metrics inform formula popularity
- A/B testing support for formula improvements
- Community feedback loop for formula refinement

### Ecosystem Health
- Transparent algorithms build trust
- Community-defined formulas prevent central manipulation
- Shared formulas reduce duplicated effort

## Integration Notes

### Upstream Dependencies
- dynamic-math platform for compilation
- MyceliaNetwork nodes for deployment testing
- Optional: Running CryptoSaint/RustOrchestration for cross-platform

### Downstream Effects
- Formulas enable Cross-Platform Bridge skill
- Deployed formulas available for Community Governance
- Formula library grows ecosystem capabilities

### State Management
- Formula registry stored in MyceliaNetwork content store
- Cross-platform references via ContentId (Blake3 hash)
- Version tracking via formula metadata

### Event Propagation
- Formula publication events on `/mycelia/formulas/1.0.0`
- Type-specific events on `/mycelia/formulas/{type}/1.0.0`
- Cross-platform sync via formula ID references

---

## Standard Formula Library

These formulas are pre-compiled and available in all MyceliaNetwork deployments:

### Reputation Formulas
```yaml
- name: "simple_reputation_flow"
  expression: "source_rep * connection_strength"
  
- name: "decaying_reputation"
  expression: "source_rep * exp(-decay_rate * time_days)"
  
- name: "trust_weighted_reputation"
  expression: "source_rep * trust_score * (1 - spam_probability)"
```

### Content Formulas
```yaml
- name: "engagement_virality"
  expression: "author_rep * quality_score * freshness * network_reach"
  
- name: "topic_relevance"
  expression: "dot_product(content_topics, user_interests) / norm(content_topics)"
```

### Governance Formulas
```yaml
- name: "one_person_one_vote"
  expression: "if(reputation > threshold, 1.0, 0.0)"
  
- name: "quadratic_voting"
  expression: "sqrt(stake)"
  
- name: "conviction_voting"
  expression: "stake * (1 - exp(-time_staked / half_life))"
```

### Routing Formulas
```yaml
- name: "capacity_weighted_routing"
  expression: "bandwidth * uptime * (1 - load_factor)"
  
- name: "mycelial_nutrient_flow"
  expression: "capacity * need_differential * connection_health"
```

## Related Skills
- **MyceliaNetwork Node Deployer**: Provides running nodes for testing
- **Cross-Platform Bridge**: Uses formulas for cross-platform coordination
- **Community Governance Designer**: Uses governance formulas
- **Reputation Flow Analyzer**: Analyzes formula effects on reputation
