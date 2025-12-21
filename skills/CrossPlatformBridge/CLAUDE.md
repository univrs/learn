# Skill: Cross-Platform Bridge

## Purpose
Connect MyceliaNetwork's gossipsub messaging to RustOrchestration's StateStore and CryptoSaint's Substrate pallets, enabling unified data flow where P2P social events influence infrastructure scheduling, and economic transactions propagate back to the social layer—creating a cohesive mycelial ecosystem.

## Domain Context
- **Platform(s)**: All four (Univrs.io vision, MyceliaNetwork, RustOrchestration, CryptoSaint.io)
- **Layer**: Strategy
- **Mycelial Principle(s)**:
  - Resource Sharing (data flows based on collective need)
  - Symbiotic Relationships (platforms strengthen each other)
  - Collective Intelligence (distributed state creates emergent coordination)
  - Regenerative Cycles (contributions create credit, credit enables contribution)
- **Cross-Platform Integration**: Yes - this IS the cross-platform integration skill

## Dependencies
- **Required Skills**:
  - MyceliaNetwork Node Deployer (needs running P2P network)
  - Math Engine Integration (formulas for scoring/routing)
- **Enables Skills**:
  - Ecosystem Health Monitor
  - Contribution Flow Analyzer
  - Unified Governance Orchestrator
  - Cross-Network Settlement System
- **Platform Dependencies**:
  - Running MyceliaNetwork nodes with gossipsub
  - RustOrchestration with StateStore (etcd/TiKV)
  - CryptoSaint Substrate node with pallets
  - Shared network connectivity between all components

## Technical Requirements

### Tools Needed
| Tool | Purpose |
|------|---------|
| bash_tool | Run bridge services, test connectivity |
| create_file | Generate bridge configuration, adapters |
| view | Inspect logs, verify data flow |
| web_search | Reference Substrate RPC, libp2p docs |

### Runtime Targets
| Component | Runtime | Protocol |
|-----------|---------|----------|
| MyceliaNetwork Bridge Adapter | Native Rust | gossipsub over libp2p |
| RustOrchestration Bridge Adapter | Native Rust | gRPC to StateStore |
| CryptoSaint Bridge Adapter | Native Rust | JSON-RPC to Substrate |
| Event Router | Native Rust | Internal message passing |

### External Systems
| System | Interface | Purpose |
|--------|-----------|---------|
| MyceliaNetwork | libp2p gossipsub | Social events, reputation, content |
| RustOrchestration StateStore | etcd/TiKV gRPC | Node state, scheduling decisions |
| CryptoSaint Substrate | JSON-RPC/WebSocket | Credit transactions, reputation pallets |

### Input Format
```yaml
bridge_configuration:
  mycelia_network:
    bootstrap_peers: list[multiaddr]
    subscribed_topics:
      - "/mycelia/content/1.0.0"
      - "/mycelia/reputation/1.0.0"
      - "/mycelia/governance/1.0.0"
      - "/mycelia/contributions/1.0.0"
  rust_orchestration:
    statestore_endpoint: string  # e.g., "http://localhost:2379"
    statestore_type: etcd | tikv
    namespace: string  # e.g., "mycelia-bridge"
  cryptosaint:
    substrate_endpoint: string  # e.g., "ws://localhost:9944"
    signer_seed: string  # For submitting transactions
  event_routing:
    mycelia_to_orchestration:
      - event: "contribution_recorded"
        destination: "nodes/{node_id}/contributions"
      - event: "reputation_updated"
        destination: "nodes/{node_id}/reputation"
    mycelia_to_cryptosaint:
      - event: "credit_request"
        pallet: "mutual_credit"
        call: "extend_credit"
      - event: "contribution_recorded"
        pallet: "reputation"
        call: "record_contribution"
    orchestration_to_mycelia:
      - state_change: "nodes/*/scheduling_score"
        topic: "/mycelia/scheduling/1.0.0"
    cryptosaint_to_mycelia:
      - event: "CreditExtended"
        topic: "/mycelia/economics/1.0.0"
      - event: "ReputationUpdated"
        topic: "/mycelia/reputation/1.0.0"
```

### Output Format
```yaml
bridge_status:
  overall_health: healthy | degraded | unhealthy
  connections:
    mycelia_network:
      status: connected | disconnected
      peers: integer
      subscribed_topics: list[string]
      messages_received: integer
      messages_sent: integer
    rust_orchestration:
      status: connected | disconnected
      statestore_type: string
      keys_synced: integer
      last_sync: timestamp
    cryptosaint:
      status: connected | disconnected
      block_height: integer
      transactions_submitted: integer
      events_received: integer
  event_flow:
    total_events_routed: integer
    events_by_direction:
      mycelia_to_orchestration: integer
      mycelia_to_cryptosaint: integer
      orchestration_to_mycelia: integer
      cryptosaint_to_mycelia: integer
    errors: list[error_detail]
```

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         CROSS-PLATFORM BRIDGE                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐       │
│  │  MyceliaNetwork │     │ RustOrchestration│     │  CryptoSaint    │       │
│  │     Adapter     │     │     Adapter      │     │    Adapter      │       │
│  │                 │     │                  │     │                 │       │
│  │ ┌─────────────┐ │     │ ┌──────────────┐ │     │ ┌─────────────┐ │       │
│  │ │  gossipsub  │ │     │ │  StateStore  │ │     │ │  Substrate  │ │       │
│  │ │  listener   │ │     │ │    client    │ │     │ │  RPC client │ │       │
│  │ └─────┬───────┘ │     │ └──────┬───────┘ │     │ └──────┬──────┘ │       │
│  └───────┼─────────┘     └────────┼─────────┘     └────────┼────────┘       │
│          │                        │                        │                │
│          └────────────────────────┼────────────────────────┘                │
│                                   │                                         │
│                      ┌────────────▼────────────┐                            │
│                      │      Event Router       │                            │
│                      │                         │                            │
│                      │  • Event normalization  │                            │
│                      │  • Routing rules        │                            │
│                      │  • Transformation       │                            │
│                      │  • Deduplication        │                            │
│                      │  • Error handling       │                            │
│                      └─────────────────────────┘                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Metacognitive Process

### Step 1: Initialize Platform Connections
**Thinking:** Can we connect to all three platforms? What's the connection strategy?

**Actions:**
1. Connect to MyceliaNetwork via libp2p
   - Join gossipsub mesh
   - Subscribe to configured topics
   - Verify peer connectivity
2. Connect to RustOrchestration StateStore
   - Establish gRPC connection (etcd) or TiKV client
   - Verify read/write access
   - Set up watch streams for state changes
3. Connect to CryptoSaint Substrate
   - Establish WebSocket connection
   - Subscribe to runtime events
   - Verify transaction submission capability

**Connection Code:**
```rust
pub struct CrossPlatformBridge {
    mycelia_adapter: MyceliaNetworkAdapter,
    orchestration_adapter: RustOrchestrationAdapter,
    cryptosaint_adapter: CryptoSaintAdapter,
    event_router: EventRouter,
    config: BridgeConfiguration,
}

impl CrossPlatformBridge {
    pub async fn new(config: BridgeConfiguration) -> Result<Self> {
        // Initialize all adapters concurrently
        let (mycelia, orchestration, cryptosaint) = tokio::try_join!(
            MyceliaNetworkAdapter::connect(&config.mycelia_network),
            RustOrchestrationAdapter::connect(&config.rust_orchestration),
            CryptoSaintAdapter::connect(&config.cryptosaint),
        )?;
        
        let event_router = EventRouter::new(config.event_routing.clone());
        
        Ok(Self {
            mycelia_adapter: mycelia,
            orchestration_adapter: orchestration,
            cryptosaint_adapter: cryptosaint,
            event_router,
            config,
        })
    }
}
```

**Decision Points:**
- If any platform unavailable: Start in degraded mode, retry connection
- If credentials invalid: Report error, cannot proceed
- If partial connectivity: Bridge operates with available platforms

**Platform Considerations:**
- MyceliaNetwork: May have multiple peers, use most responsive
- RustOrchestration: Single StateStore endpoint, requires auth
- CryptoSaint: May need to wait for node sync

**Output:** Connected bridge with health status

### Step 2: Define Event Schemas
**Thinking:** What data flows between platforms? How do we normalize events?

**Actions:**
1. Define canonical event types shared across platforms
2. Create serialization/deserialization for each platform's format
3. Establish transformation rules for platform-specific formats

**Canonical Event Types:**
```rust
/// Unified event type that can flow between all platforms
#[derive(Clone, Debug, Serialize, Deserialize)]
pub enum BridgeEvent {
    // Contribution events (from any platform)
    ContributionRecorded {
        node_id: NodeId,
        contribution_type: ContributionType,
        amount: f64,
        timestamp: u64,
        source_platform: Platform,
    },
    
    // Reputation events
    ReputationUpdated {
        entity_id: EntityId,
        old_score: f64,
        new_score: f64,
        reason: String,
        source_platform: Platform,
    },
    
    // Credit/Economic events
    CreditExtended {
        from: AccountId,
        to: AccountId,
        amount: u128,
        terms: CreditTerms,
    },
    
    // Scheduling events
    SchedulingScoreUpdated {
        node_id: NodeId,
        old_score: f64,
        new_score: f64,
        factors: SchedulingFactors,
    },
    
    // Content events
    ContentPublished {
        content_id: ContentId,
        author: EntityId,
        propagation_score: f64,
    },
    
    // Governance events
    ProposalCreated {
        proposal_id: ProposalId,
        proposer: EntityId,
        voting_formula: String,
    },
    
    VoteCast {
        proposal_id: ProposalId,
        voter: EntityId,
        weight: f64,
    },
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub enum Platform {
    MyceliaNetwork,
    RustOrchestration,
    CryptoSaint,
}
```

**Platform-Specific Transformations:**
```rust
impl BridgeEvent {
    /// Convert from MyceliaNetwork gossipsub message
    pub fn from_mycelia(topic: &str, payload: &[u8]) -> Result<Self> {
        match topic {
            "/mycelia/contributions/1.0.0" => {
                let msg: MyceliaContribution = bincode::deserialize(payload)?;
                Ok(BridgeEvent::ContributionRecorded {
                    node_id: msg.node_id.into(),
                    contribution_type: msg.contribution_type.into(),
                    amount: msg.amount,
                    timestamp: msg.timestamp,
                    source_platform: Platform::MyceliaNetwork,
                })
            },
            "/mycelia/reputation/1.0.0" => {
                let msg: MyceliaReputation = bincode::deserialize(payload)?;
                Ok(BridgeEvent::ReputationUpdated {
                    entity_id: msg.peer_id.into(),
                    old_score: msg.old_score,
                    new_score: msg.new_score,
                    reason: msg.reason,
                    source_platform: Platform::MyceliaNetwork,
                })
            },
            _ => Err(Error::UnknownTopic(topic.to_string())),
        }
    }
    
    /// Convert from RustOrchestration StateStore change
    pub fn from_orchestration(key: &str, value: &[u8]) -> Result<Self> {
        if key.starts_with("nodes/") && key.ends_with("/scheduling_score") {
            let score: SchedulingScore = serde_json::from_slice(value)?;
            let node_id = extract_node_id(key)?;
            Ok(BridgeEvent::SchedulingScoreUpdated {
                node_id,
                old_score: score.previous,
                new_score: score.current,
                factors: score.factors,
            })
        } else {
            Err(Error::UnknownStateKey(key.to_string()))
        }
    }
    
    /// Convert from CryptoSaint Substrate event
    pub fn from_cryptosaint(event: SubstrateEvent) -> Result<Self> {
        match event.pallet.as_str() {
            "MutualCredit" => {
                match event.name.as_str() {
                    "CreditExtended" => {
                        let (from, to, amount, terms) = event.decode()?;
                        Ok(BridgeEvent::CreditExtended { from, to, amount, terms })
                    },
                    _ => Err(Error::UnknownEvent(event.name)),
                }
            },
            "Reputation" => {
                match event.name.as_str() {
                    "ReputationUpdated" => {
                        let (entity, old, new, reason) = event.decode()?;
                        Ok(BridgeEvent::ReputationUpdated {
                            entity_id: entity,
                            old_score: old,
                            new_score: new,
                            reason,
                            source_platform: Platform::CryptoSaint,
                        })
                    },
                    _ => Err(Error::UnknownEvent(event.name)),
                }
            },
            _ => Err(Error::UnknownPallet(event.pallet)),
        }
    }
}
```

**Output:** Event schema definitions and transformations

### Step 3: Implement Event Routing
**Thinking:** How do events flow from source to destination? What routing rules apply?

**Actions:**
1. Parse routing configuration
2. Set up event listeners for each source
3. Implement routing logic with transformations
4. Handle delivery confirmations and retries

**Event Router Implementation:**
```rust
pub struct EventRouter {
    routes: Vec<Route>,
    metrics: RouterMetrics,
    retry_queue: RetryQueue,
}

pub struct Route {
    source: EventSource,
    filter: Option<EventFilter>,
    transformation: Option<Transformation>,
    destinations: Vec<EventDestination>,
}

impl EventRouter {
    pub fn new(config: EventRoutingConfig) -> Self {
        let routes = config.into_routes();
        Self {
            routes,
            metrics: RouterMetrics::default(),
            retry_queue: RetryQueue::new(),
        }
    }
    
    pub async fn route_event(&mut self, event: BridgeEvent) -> Result<Vec<DeliveryResult>> {
        let mut results = Vec::new();
        
        for route in &self.routes {
            if route.matches(&event) {
                let transformed = route.transform(event.clone())?;
                
                for destination in &route.destinations {
                    match self.deliver(&transformed, destination).await {
                        Ok(confirmation) => {
                            self.metrics.record_success(destination);
                            results.push(DeliveryResult::Success(confirmation));
                        },
                        Err(e) => {
                            self.metrics.record_failure(destination);
                            self.retry_queue.add(transformed.clone(), destination.clone());
                            results.push(DeliveryResult::Failed(e));
                        }
                    }
                }
            }
        }
        
        Ok(results)
    }
    
    async fn deliver(&self, event: &BridgeEvent, dest: &EventDestination) -> Result<Confirmation> {
        match dest {
            EventDestination::MyceliaGossipsub { topic } => {
                let payload = event.to_mycelia_format()?;
                self.mycelia_adapter.publish(topic, payload).await
            },
            EventDestination::OrchestrationStateStore { key_pattern } => {
                let key = event.interpolate_key(key_pattern)?;
                let value = event.to_orchestration_format()?;
                self.orchestration_adapter.put(&key, &value).await
            },
            EventDestination::CryptoSaintPallet { pallet, call } => {
                let extrinsic = event.to_substrate_call(pallet, call)?;
                self.cryptosaint_adapter.submit(extrinsic).await
            },
        }
    }
}
```

**Routing Rules Configuration:**
```yaml
# Example: Contribution flows to both scheduling and credit
routes:
  - name: "contribution_to_scheduling"
    source:
      platform: mycelia_network
      topic: "/mycelia/contributions/1.0.0"
    filter:
      contribution_type: ["storage", "bandwidth", "relay"]
    destinations:
      - type: orchestration_statestore
        key_pattern: "nodes/{node_id}/contributions/{contribution_type}"
        
  - name: "contribution_to_credit"
    source:
      platform: mycelia_network
      topic: "/mycelia/contributions/1.0.0"
    destinations:
      - type: cryptosaint_pallet
        pallet: "reputation"
        call: "record_contribution"
        
  - name: "credit_to_social"
    source:
      platform: cryptosaint
      pallet: "mutual_credit"
      event: "CreditExtended"
    destinations:
      - type: mycelia_gossipsub
        topic: "/mycelia/economics/1.0.0"
        
  - name: "scheduling_to_social"
    source:
      platform: rust_orchestration
      key_pattern: "nodes/*/scheduling_score"
    destinations:
      - type: mycelia_gossipsub
        topic: "/mycelia/scheduling/1.0.0"
```

**Output:** Configured event router

### Step 4: Start Bridge Service
**Thinking:** How do we run the bridge as a long-running service?

**Actions:**
1. Initialize all connections (Step 1)
2. Start event listeners for each platform
3. Run main event loop processing incoming events
4. Handle graceful shutdown

**Main Bridge Loop:**
```rust
impl CrossPlatformBridge {
    pub async fn run(&mut self) -> Result<()> {
        // Start all listeners
        let mycelia_events = self.mycelia_adapter.subscribe_all().await?;
        let orchestration_events = self.orchestration_adapter.watch_all().await?;
        let cryptosaint_events = self.cryptosaint_adapter.subscribe_events().await?;
        
        // Merge all event streams
        let mut all_events = futures::stream::select_all(vec![
            mycelia_events.map(|e| ("mycelia", e)),
            orchestration_events.map(|e| ("orchestration", e)),
            cryptosaint_events.map(|e| ("cryptosaint", e)),
        ]);
        
        // Process events
        while let Some((source, raw_event)) = all_events.next().await {
            match self.process_event(source, raw_event).await {
                Ok(results) => {
                    for result in results {
                        if let DeliveryResult::Failed(e) = result {
                            tracing::warn!("Event delivery failed: {}", e);
                        }
                    }
                },
                Err(e) => {
                    tracing::error!("Event processing error: {}", e);
                }
            }
            
            // Process retry queue periodically
            self.event_router.process_retries().await?;
        }
        
        Ok(())
    }
    
    async fn process_event(&mut self, source: &str, raw: RawEvent) -> Result<Vec<DeliveryResult>> {
        let event = match source {
            "mycelia" => BridgeEvent::from_mycelia(&raw.topic, &raw.payload)?,
            "orchestration" => BridgeEvent::from_orchestration(&raw.key, &raw.value)?,
            "cryptosaint" => BridgeEvent::from_cryptosaint(raw.into())?,
            _ => return Err(Error::UnknownSource(source.to_string())),
        };
        
        self.event_router.route_event(event).await
    }
}
```

**Output:** Running bridge service

### Step 5: Monitor and Report Health
**Thinking:** How do we know the bridge is healthy? What metrics matter?

**Actions:**
1. Track connection status for each platform
2. Count events processed by direction
3. Monitor error rates and retry queue depth
4. Expose metrics endpoint for monitoring

**Health Monitoring:**
```rust
pub struct BridgeHealth {
    pub overall_status: HealthStatus,
    pub connections: ConnectionHealth,
    pub event_flow: EventFlowMetrics,
    pub errors: Vec<RecentError>,
}

impl CrossPlatformBridge {
    pub fn health(&self) -> BridgeHealth {
        let mycelia_healthy = self.mycelia_adapter.is_connected();
        let orchestration_healthy = self.orchestration_adapter.is_connected();
        let cryptosaint_healthy = self.cryptosaint_adapter.is_connected();
        
        let overall = match (mycelia_healthy, orchestration_healthy, cryptosaint_healthy) {
            (true, true, true) => HealthStatus::Healthy,
            (true, _, _) | (_, true, _) | (_, _, true) => HealthStatus::Degraded,
            (false, false, false) => HealthStatus::Unhealthy,
        };
        
        BridgeHealth {
            overall_status: overall,
            connections: ConnectionHealth {
                mycelia_network: if mycelia_healthy { 
                    ConnectionStatus::Connected { 
                        peers: self.mycelia_adapter.peer_count(),
                        topics: self.mycelia_adapter.subscribed_topics(),
                    }
                } else { 
                    ConnectionStatus::Disconnected 
                },
                rust_orchestration: if orchestration_healthy {
                    ConnectionStatus::Connected {
                        keys_synced: self.orchestration_adapter.synced_key_count(),
                    }
                } else {
                    ConnectionStatus::Disconnected
                },
                cryptosaint: if cryptosaint_healthy {
                    ConnectionStatus::Connected {
                        block_height: self.cryptosaint_adapter.block_height(),
                    }
                } else {
                    ConnectionStatus::Disconnected
                },
            },
            event_flow: self.event_router.metrics.clone(),
            errors: self.event_router.recent_errors(10),
        }
    }
}

// HTTP endpoint for health checks
async fn health_endpoint(bridge: Arc<Mutex<CrossPlatformBridge>>) -> impl Reply {
    let health = bridge.lock().await.health();
    warp::reply::json(&health)
}
```

**Output:** Health status and metrics

## Example Scenarios

### Scenario 1: Contribution Flows to Credit - Full Cycle
**Context:** A MyceliaNetwork node contributes storage, which should affect both scheduling and credit

**Input:**
MyceliaNetwork publishes to `/mycelia/contributions/1.0.0`:
```json
{
  "node_id": "12D3KooWAbCd...",
  "contribution_type": "storage",
  "amount_gb": 100,
  "duration_hours": 24,
  "timestamp": 1704067200
}
```

**Expected Process:**
1. Bridge receives gossipsub message
2. Transforms to canonical `ContributionRecorded` event
3. Routes to two destinations:
   - RustOrchestration: `nodes/12D3KooWAbCd.../contributions/storage`
   - CryptoSaint: `reputation.record_contribution()`
4. RustOrchestration updates scheduling score
5. CryptoSaint mints contribution credits
6. Scheduling update flows back to MyceliaNetwork

**Cross-Platform Effects:**
- Node gets higher scheduling priority in RustOrchestration
- Node gains reputation in CryptoSaint
- Other nodes see updated scheduling scores via gossipsub

**Expected Output:**
```yaml
event_flow:
  contribution_recorded:
    source: mycelia_network
    destinations:
      - rust_orchestration: success
      - cryptosaint: success
  scheduling_score_updated:
    source: rust_orchestration
    destinations:
      - mycelia_network: success
```

### Scenario 2: Credit Extension Propagates to Social - Economic Event
**Context:** CryptoSaint credit extension should be visible in social layer

**Input:**
CryptoSaint emits `mutual_credit.CreditExtended` event:
```json
{
  "from": "5GrwvaEF...",
  "to": "5FHneW46...",
  "amount": 1000000000000,
  "terms": {
    "interest_rate": 0,
    "maturity_blocks": null
  }
}
```

**Expected Process:**
1. Bridge receives Substrate event via WebSocket subscription
2. Transforms to canonical `CreditExtended` event
3. Routes to MyceliaNetwork: `/mycelia/economics/1.0.0`
4. Social layer can display credit relationships
5. Content propagation algorithms can use credit data

**Cross-Platform Effects:**
- MyceliaNetwork users see credit relationship forming
- Content from credited users may propagate differently
- Community governance can factor in credit relationships

**Expected Output:**
```yaml
event_flow:
  credit_extended:
    source: cryptosaint
    destinations:
      - mycelia_network: success
    transformation: account_id_to_peer_id
```

### Scenario 3: Reputation Sync Across Platforms - Bidirectional
**Context:** Reputation should be consistent across MyceliaNetwork and CryptoSaint

**Input:**
MyceliaNetwork calculates new reputation using Math Engine formula:
```json
{
  "peer_id": "12D3KooWXyZ...",
  "old_score": 0.75,
  "new_score": 0.82,
  "reason": "consistent_uptime_contribution",
  "formula_used": "reputation_flow"
}
```

**Expected Process:**
1. Bridge receives reputation update from gossipsub
2. Transforms to canonical `ReputationUpdated` event
3. Routes to CryptoSaint: `reputation.update_score()`
4. CryptoSaint stores on-chain for permanence
5. On-chain update emits event
6. Bridge propagates confirmation back (avoids loop via source tracking)

**Cross-Platform Effects:**
- Reputation now anchored on-chain (immutable record)
- CryptoSaint credit decisions can use reputation
- RustOrchestration scheduling can query on-chain reputation

**Expected Output:**
```yaml
event_flow:
  reputation_updated:
    source: mycelia_network
    destinations:
      - cryptosaint: success
    loop_prevention: source_tracking
```

### Scenario 4: Degraded Mode Operation - Partial Connectivity
**Context:** CryptoSaint node is down, bridge should continue operating

**Input:**
Bridge health check shows:
```yaml
connections:
  mycelia_network: connected
  rust_orchestration: connected
  cryptosaint: disconnected
```

**Expected Process:**
1. Bridge detects CryptoSaint disconnection
2. Switches to degraded mode
3. Events destined for CryptoSaint queue for retry
4. Events between MyceliaNetwork ↔ RustOrchestration continue flowing
5. Periodic reconnection attempts to CryptoSaint
6. When CryptoSaint reconnects, replay queued events

**Cross-Platform Effects:**
- Contribution credits delayed but not lost
- On-chain reputation sync paused
- Scheduling and social layers continue functioning

**Expected Output:**
```yaml
bridge_status:
  overall_health: degraded
  retry_queue:
    cryptosaint: 47 events pending
  reconnect_attempts: 5
  last_attempt: "2024-01-01T12:00:00Z"
```

## Success Criteria
- [ ] Bridge connects to all three platforms successfully
- [ ] Events flow correctly in all configured directions
- [ ] Transformations produce valid data for each platform
- [ ] Retry queue handles temporary failures
- [ ] Health endpoint accurately reports status
- [ ] Loop prevention works (no infinite event cycles)
- [ ] Graceful degradation when platforms unavailable
- [ ] Metrics accurately track event flow

## Error Handling

### Ambiguous Input
- **Unknown event type**: Log and skip, don't crash bridge
- **Malformed payload**: Attempt best-effort parsing, queue for manual review
- **Missing routing rule**: Log warning, event dropped

### Missing Dependencies
- **Platform unavailable at startup**: Start in degraded mode, retry
- **Configuration missing**: Fail fast with clear error message
- **Credentials invalid**: Report authentication failure

### Tool Failures
- **gossipsub publish fails**: Retry with exponential backoff
- **StateStore write fails**: Queue for retry, alert if persistent
- **Substrate transaction fails**: Check nonce, retry with adjustment

### Cross-Platform Failures
- **Single platform down**: Operate in degraded mode
- **All platforms down**: Enter standby, aggressive reconnection
- **Network partition**: May cause inconsistency, log for manual resolution

## Regenerative Considerations

### Resource Efficiency
- Batch events when possible to reduce overhead
- Use efficient serialization (bincode for internal, JSON for external)
- Connection pooling for Substrate RPC

### Knowledge Sharing
- Event logs provide audit trail
- Metrics enable ecosystem health monitoring
- Routing rules are declarative and shareable

### Adaptive Learning
- Track which routes are most active
- Identify bottlenecks in event flow
- Suggest routing optimizations based on patterns

### Ecosystem Health
- Bridge enables the whole greater than parts
- Cross-platform data creates emergent coordination
- Unified view strengthens all platforms

## Integration Notes

### Upstream Dependencies
- MyceliaNetwork nodes must be running with gossipsub
- RustOrchestration StateStore must be accessible
- CryptoSaint Substrate node must be synced

### Downstream Effects
- Enables Ecosystem Health Monitor skill
- Enables unified governance across platforms
- Creates foundation for cross-network settlement

### State Management
- Bridge maintains minimal state (connections, retry queue)
- Routing rules are configuration, not runtime state
- Event history stored in respective platforms

### Event Propagation
- Events tagged with source platform to prevent loops
- Idempotent event handlers where possible
- Exactly-once semantics via deduplication

---

## Quick Start

```bash
# Build the bridge
cargo build --release --bin mycelia-bridge

# Run with configuration
./target/release/mycelia-bridge --config bridge-config.yaml

# Or via environment variables
MYCELIA_BOOTSTRAP=/ip4/127.0.0.1/tcp/4001 \
ORCHESTRATION_ENDPOINT=http://localhost:2379 \
CRYPTOSAINT_ENDPOINT=ws://localhost:9944 \
./target/release/mycelia-bridge

# Check health
curl http://localhost:8080/health

# View metrics
curl http://localhost:8080/metrics
```

## Configuration Reference

```yaml
# bridge-config.yaml
mycelia_network:
  bootstrap_peers:
    - "/ip4/127.0.0.1/tcp/4001/p2p/12D3KooW..."
  subscribed_topics:
    - "/mycelia/content/1.0.0"
    - "/mycelia/reputation/1.0.0"
    - "/mycelia/contributions/1.0.0"
    - "/mycelia/governance/1.0.0"

rust_orchestration:
  statestore_endpoint: "http://localhost:2379"
  statestore_type: "etcd"
  namespace: "mycelia"
  watch_prefixes:
    - "nodes/"
    - "scheduling/"

cryptosaint:
  substrate_endpoint: "ws://localhost:9944"
  signer_seed: "${BRIDGE_SIGNER_SEED}"  # From environment
  pallets:
    - "MutualCredit"
    - "Reputation"
    - "EcologicalBalance"

event_routing:
  # See routing rules in Step 3

health:
  endpoint: "0.0.0.0:8080"
  metrics_path: "/metrics"
  health_path: "/health"

retry:
  max_attempts: 5
  initial_backoff_ms: 100
  max_backoff_ms: 30000
  backoff_multiplier: 2.0
```

## Related Skills
- **MyceliaNetwork Node Deployer**: Provides running nodes
- **Math Engine Integration**: Formulas used in event processing
- **Ecosystem Health Monitor**: Consumes bridge metrics
- **Contribution Flow Analyzer**: Analyzes cross-platform flows
