# Skill: MyceliaNetwork Node Deployer

## Purpose
Deploy, configure, and orchestrate MyceliaNetwork nodes across all node types (Spore, Mycelium, Fruiting, Rhizome) with proper peer discovery, gossipsub configuration, and integration hooks for RustOrchestration StateStore and CryptoSaint reputation systems.

## Domain Context
- **Platform(s)**: MyceliaNetwork (primary), RustOrchestration (integration), CryptoSaint.io (integration)
- **Layer**: Foundation
- **Mycelial Principle(s)**: 
  - Self-organization (nodes discover and connect automatically)
  - Adaptive growth (network strengthens with more participants)
  - Resilience (survives node failures)
- **Cross-Platform Integration**: Yes
  - Outputs node metrics to RustOrchestration StateStore
  - Reports contribution data for CryptoSaint reputation scoring
  - Configures gossipsub topics for cross-platform events

## Dependencies
- **Required Skills**: None (Foundation skill)
- **Enables Skills**: 
  - Math Engine Integration (needs running nodes)
  - Cross-Platform Bridge (needs deployed network)
  - Network Topology Mapper
  - Content Propagation Analyzer
- **Platform Dependencies**:
  - Rust toolchain (1.70+)
  - Cargo with wasm32 targets (for Spore nodes)
  - Docker (optional, for containerized deployment)
  - Tauri CLI (for desktop Mycelium nodes)
  - libp2p compatible network environment

## Technical Requirements

### Tools Needed
| Tool | Purpose |
|------|---------|
| bash_tool | Execute cargo builds, run nodes, network configuration |
| create_file | Generate configuration files, scripts, docker-compose |
| view | Inspect existing code, configs, logs |
| web_search | Reference libp2p docs, troubleshoot issues |

### Runtime Targets
| Node Type | Runtime | Build Target |
|-----------|---------|--------------|
| Spore | Browser WASM | wasm32-unknown-unknown |
| Mycelium | Native binary | Native (linux/darwin/windows) |
| Mycelium Desktop | Tauri app | Native + WebView |
| Fruiting | Server binary | Native (linux primarily) |
| Rhizome | Server binary | Native (linux primarily) |

### External Systems
- **libp2p**: Peer discovery, transport, gossipsub
- **mDNS**: Local network peer discovery
- **WebRTC**: Browser peer connections (Spore nodes)
- **QUIC**: High-performance transport option
- **Optional**: Docker registry for containerized deployment

### Input Format
```yaml
deployment_request:
  node_type: Spore | Mycelium | Fruiting | Rhizome
  node_name: string
  network_config:
    port: integer (default: 4001)
    bootstrap_peers: list[multiaddr] (optional)
    enable_mdns: boolean (default: true)
    transport: [tcp, quic, websocket, webrtc]
  storage_config:
    path: string
    max_size_gb: integer
  integration_config:
    rust_orchestration_endpoint: string (optional)
    cryptosaint_endpoint: string (optional)
    metrics_enabled: boolean
  deployment_mode: local | docker | cloud
```

### Output Format
```yaml
deployment_result:
  node_id: PeerId (Ed25519 derived)
  multiaddrs: list[string]
  status: running | failed | pending
  logs_path: string
  metrics_endpoint: string (if enabled)
  integration_status:
    rust_orchestration: connected | disconnected | not_configured
    cryptosaint: connected | disconnected | not_configured
  commands:
    start: string
    stop: string
    status: string
    logs: string
```

## Metacognitive Process

### Step 1: Analyze Deployment Request
**Thinking:** What type of node is being deployed? What are the network requirements? Are there existing nodes to connect to?

**Actions:**
1. Parse the deployment request YAML/JSON
2. Validate node type is one of: Spore, Mycelium, Fruiting, Rhizome
3. Check if bootstrap peers are provided or if this is first node
4. Verify port availability if deploying locally
5. Check for required dependencies based on node type

**Decision Points:**
- If Spore: Ensure wasm32 target is installed
- If Mycelium with desktop: Ensure Tauri CLI available
- If Fruiting: Verify sufficient resources (storage, bandwidth)
- If first node: Configure as bootstrap, no peers needed
- If joining network: Validate at least one bootstrap peer

**Platform Considerations:**
- MyceliaNetwork: Primary focus, all node types
- RustOrchestration: If endpoint provided, configure metrics export
- CryptoSaint: If endpoint provided, configure contribution reporting

**Output:** Validated deployment plan with resolved dependencies

### Step 2: Generate Configuration Files
**Thinking:** What configuration does this node type require? How do we enable the right features?

**Actions:**
1. Generate node identity configuration (Ed25519 keypair path)
2. Create network configuration with transport settings
3. Configure gossipsub topics for the node type:
   - `/mycelia/content/1.0.0` - Content propagation
   - `/mycelia/reputation/1.0.0` - Reputation updates
   - `/mycelia/governance/1.0.0` - Governance events
4. Set storage paths and limits
5. Configure integration endpoints if provided

**Decision Points:**
- Spore nodes: Minimal config, WebRTC-only, browser storage
- Mycelium nodes: Full config, multiple transports, local storage
- Fruiting nodes: Add bootstrap and signaling server configs
- Rhizome nodes: Enable permanent storage, historical indexing

**Platform Considerations:**
- For RustOrchestration integration: Add StateStore connection config
- For CryptoSaint integration: Add reputation reporting config

**Output:** Configuration files ready for deployment

```rust
// Example generated config structure
pub struct MyceliaNodeConfig {
    pub identity: IdentityConfig,
    pub network: NetworkConfig,
    pub storage: StorageConfig,
    pub gossipsub: GossipsubConfig,
    pub integrations: IntegrationConfig,
}

#[derive(Serialize, Deserialize)]
pub struct NetworkConfig {
    pub listen_port: u16,
    pub bootstrap_peers: Vec<Multiaddr>,
    pub enable_mdns: bool,
    pub transports: Vec<TransportType>,
}

#[derive(Serialize, Deserialize)]
pub struct IntegrationConfig {
    pub rust_orchestration: Option<RustOrchestrationConfig>,
    pub cryptosaint: Option<CryptoSaintConfig>,
    pub metrics: MetricsConfig,
}
```

### Step 3: Build Node Binary/WASM
**Thinking:** What build process is needed for this node type and target platform?

**Actions:**
1. Navigate to MyceliaNetwork repository
2. Select appropriate build target based on node type
3. Execute build with required features enabled
4. Verify build artifacts exist and are valid

**Commands by Node Type:**

```bash
# Spore (Browser WASM)
cargo build --target wasm32-unknown-unknown --release -p mycelia-spore
wasm-bindgen target/wasm32-unknown-unknown/release/mycelia_spore.wasm --out-dir ./web/pkg

# Mycelium (Native)
cargo build --release --bin mycelia-simple

# Mycelium Desktop (Tauri)
cd univrs-desktop && npm run tauri build

# Fruiting (Server with all features)
cargo build --release --bin mycelia-simple --features "bootstrap,signaling,metrics"

# Rhizome (Server with storage features)
cargo build --release --bin mycelia-simple --features "archive,historical,metrics"
```

**Decision Points:**
- Debug vs Release: Use release for production, debug for development
- Feature flags: Enable only features needed for node type
- Cross-compilation: May need cross or cargo-zigbuild for non-native targets

**Platform Considerations:**
- Ensure RustOrchestration metrics feature is enabled if integration configured
- Ensure CryptoSaint reporting feature is enabled if integration configured

**Output:** Built binary/WASM ready for deployment

### Step 4: Deploy Node
**Thinking:** How do we start this node with the right configuration? What's the deployment mode?

**Actions:**

**Local Deployment:**
```bash
# Start node with configuration
./target/release/mycelia-simple \
  --config ./config/node-config.toml \
  --name "${NODE_NAME}" \
  --port ${PORT}
```

**Docker Deployment:**
```yaml
# Generated docker-compose.yml
version: '3.8'
services:
  mycelia-node:
    image: univrs/mycelia:latest
    build:
      context: .
      dockerfile: Dockerfile.mycelia
    ports:
      - "${PORT}:${PORT}"
    volumes:
      - ./data:/data
      - ./config:/config
    environment:
      - MYCELIA_NODE_NAME=${NODE_NAME}
      - MYCELIA_PORT=${PORT}
      - RUST_LOG=info
    command: ["--config", "/config/node-config.toml"]
```

**Cloud Deployment (Azure/K8s):**
```yaml
# Generated Kubernetes manifest
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mycelia-${NODE_TYPE}
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mycelia-${NODE_TYPE}
  template:
    spec:
      containers:
        - name: mycelia
          image: univrs/mycelia:latest
          ports:
            - containerPort: ${PORT}
          env:
            - name: MYCELIA_NODE_NAME
              value: "${NODE_NAME}"
          volumeMounts:
            - name: data
              mountPath: /data
```

**Decision Points:**
- Local: Best for development and testing
- Docker: Best for consistent environments and easy scaling
- Cloud: Best for production Fruiting/Rhizome nodes

**Platform Considerations:**
- If RustOrchestration is managing this deployment, register with StateStore
- If CryptoSaint integration, start contribution tracking

**Output:** Running node with accessible endpoints

### Step 5: Verify Deployment and Configure Integration
**Thinking:** Is the node running correctly? Can it connect to peers? Are integrations working?

**Actions:**
1. Check node is listening on configured port
2. Verify peer discovery is working (mDNS or bootstrap)
3. Test gossipsub subscription to core topics
4. If integrations configured, verify connectivity:
   - RustOrchestration: Test StateStore connection
   - CryptoSaint: Test reputation endpoint

**Verification Commands:**
```bash
# Check node status
curl http://localhost:${METRICS_PORT}/health

# List connected peers
curl http://localhost:${METRICS_PORT}/peers

# Check gossipsub subscriptions
curl http://localhost:${METRICS_PORT}/pubsub/topics

# Test RustOrchestration integration
curl http://localhost:${METRICS_PORT}/integrations/rust-orchestration/status

# Test CryptoSaint integration
curl http://localhost:${METRICS_PORT}/integrations/cryptosaint/status
```

**Decision Points:**
- If no peers found after 30s: Check network config, firewall rules
- If integration fails: Log warning but continue (graceful degradation)
- If gossipsub fails: Critical error, node may not function correctly

**Output:** Deployment result with status and all endpoints

### Step 6: Generate Operational Scripts
**Thinking:** What scripts will help operate this node day-to-day?

**Actions:**
Generate convenience scripts for common operations:

```bash
# start-node.sh
#!/bin/bash
./target/release/mycelia-simple --config ./config/node-config.toml --name "${NODE_NAME}"

# stop-node.sh
#!/bin/bash
pkill -f "mycelia-simple.*${NODE_NAME}" || echo "Node not running"

# status-node.sh
#!/bin/bash
curl -s http://localhost:${METRICS_PORT}/health | jq .

# logs-node.sh
#!/bin/bash
tail -f ./logs/${NODE_NAME}.log

# peers-node.sh
#!/bin/bash
curl -s http://localhost:${METRICS_PORT}/peers | jq .
```

**Output:** Operational scripts in deployment directory

## Example Scenarios

### Scenario 1: Single Bootstrap Node - MyceliaNetwork
**Context:** First node in a new network, will serve as bootstrap for others

**Input:**
```yaml
deployment_request:
  node_type: Fruiting
  node_name: "Bootstrap-Alpha"
  network_config:
    port: 4001
    enable_mdns: true
    transport: [tcp, quic, websocket]
  storage_config:
    path: ./data/bootstrap
    max_size_gb: 100
  integration_config:
    metrics_enabled: true
  deployment_mode: local
```

**Expected Process:**
1. Validate Fruiting node requirements (storage, bandwidth)
2. Generate config with bootstrap and signaling features
3. Build with `--features "bootstrap,signaling,metrics"`
4. Start node on port 4001
5. Output bootstrap multiaddr for other nodes to use

**Cross-Platform Effects:**
- Node publishes metrics that RustOrchestration can consume
- Node identity registered for future CryptoSaint reputation tracking

**Expected Output:**
```yaml
deployment_result:
  node_id: "12D3KooWAbCdEfGhIjKlMnOpQrStUvWxYz..."
  multiaddrs:
    - "/ip4/127.0.0.1/tcp/4001/p2p/12D3KooW..."
    - "/ip4/127.0.0.1/udp/4001/quic-v1/p2p/12D3KooW..."
  status: running
  logs_path: "./logs/Bootstrap-Alpha.log"
  metrics_endpoint: "http://localhost:9090/metrics"
  integration_status:
    rust_orchestration: not_configured
    cryptosaint: not_configured
  commands:
    start: "./scripts/start-node.sh"
    stop: "./scripts/stop-node.sh"
    status: "./scripts/status-node.sh"
    logs: "./scripts/logs-node.sh"
```

### Scenario 2: Multi-Node Network with Integrations - Cross-Platform
**Context:** Deploying a test network with RustOrchestration and CryptoSaint integration

**Input:**
```yaml
deployment_request:
  nodes:
    - node_type: Fruiting
      node_name: "Hub-1"
      network_config:
        port: 4001
        transport: [tcp, quic]
      integration_config:
        rust_orchestration_endpoint: "http://localhost:8080/statestore"
        cryptosaint_endpoint: "http://localhost:9944"
        metrics_enabled: true
    - node_type: Mycelium
      node_name: "Alice"
      network_config:
        port: 4002
        bootstrap_peers: ["/ip4/127.0.0.1/tcp/4001"]
      integration_config:
        rust_orchestration_endpoint: "http://localhost:8080/statestore"
    - node_type: Mycelium
      node_name: "Bob"
      network_config:
        port: 4003
        bootstrap_peers: ["/ip4/127.0.0.1/tcp/4001"]
  deployment_mode: docker
```

**Expected Process:**
1. Generate docker-compose.yml with all three nodes
2. Configure Hub-1 as bootstrap with full integrations
3. Configure Alice and Bob to connect to Hub-1
4. Set up shared network for container communication
5. Deploy all nodes with proper startup ordering
6. Verify cross-node gossipsub connectivity
7. Verify RustOrchestration StateStore connectivity
8. Verify CryptoSaint endpoint connectivity

**Cross-Platform Effects:**
- All nodes register with RustOrchestration StateStore
- Hub-1 reports metrics for mycelial scheduling decisions
- Node contributions tracked for CryptoSaint reputation

**Expected Output:**
```yaml
deployment_result:
  network_id: "mycelia-test-network-20240101"
  nodes:
    - node_id: "12D3KooWHub1..."
      status: running
      role: bootstrap
    - node_id: "12D3KooWAlice..."
      status: running
      peers: ["12D3KooWHub1..."]
    - node_id: "12D3KooWBob..."
      status: running
      peers: ["12D3KooWHub1...", "12D3KooWAlice..."]
  integration_status:
    rust_orchestration: connected (3/3 nodes)
    cryptosaint: connected (1/3 nodes)
  commands:
    start_all: "docker-compose up -d"
    stop_all: "docker-compose down"
    logs: "docker-compose logs -f"
```

### Scenario 3: Browser Spore Node - WASM Target
**Context:** Deploying a lightweight browser node for web users

**Input:**
```yaml
deployment_request:
  node_type: Spore
  node_name: "WebUser-Demo"
  network_config:
    signaling_servers: ["wss://signal.mycelia.network"]
    ice_servers: ["stun:stun.l.google.com:19302"]
  storage_config:
    max_size_mb: 50  # Browser storage limit
  deployment_mode: local
```

**Expected Process:**
1. Build WASM target with wasm-pack or wasm-bindgen
2. Generate JavaScript bindings for web integration
3. Create minimal HTML/JS demo page
4. Configure WebRTC signaling server connection
5. Package for web deployment

**Cross-Platform Effects:**
- Spore nodes have limited integration capabilities
- Content consumption tracked but not credited (lightweight participation)
- Can propagate content through WebRTC mesh

**Expected Output:**
```yaml
deployment_result:
  node_id: "dynamic-per-session"
  artifacts:
    - path: "./web/pkg/mycelia_spore.js"
      type: "javascript"
    - path: "./web/pkg/mycelia_spore_bg.wasm"
      type: "wasm"
    - path: "./web/demo.html"
      type: "html"
  status: built
  serve_command: "python -m http.server 8080 --directory ./web"
  integration_status:
    rust_orchestration: not_supported
    cryptosaint: not_supported (observation only)
```

## Success Criteria
- [ ] Node starts successfully and listens on configured port
- [ ] Peer discovery works (mDNS for local, bootstrap for remote)
- [ ] Gossipsub topics subscribed correctly
- [ ] Node can publish and receive content messages
- [ ] Metrics endpoint accessible (if enabled)
- [ ] RustOrchestration StateStore connection works (if configured)
- [ ] CryptoSaint reputation reporting works (if configured)
- [ ] Generated scripts are executable and functional

## Error Handling

### Ambiguous Input
- **Missing node_type**: Prompt user to specify Spore/Mycelium/Fruiting/Rhizome
- **Missing port**: Use default 4001, warn about potential conflicts
- **Invalid transport**: List valid options, suggest based on node type

### Missing Dependencies
- **Rust not installed**: Provide installation instructions for rustup
- **WASM target missing**: Run `rustup target add wasm32-unknown-unknown`
- **Tauri CLI missing**: Run `cargo install tauri-cli`
- **Docker not available**: Fall back to local deployment mode

### Tool Failures
- **Build fails**: Check Cargo.toml, suggest `cargo clean`, provide error context
- **Port in use**: Suggest alternative port, check for existing nodes
- **Peer connection fails**: Verify network connectivity, firewall rules, peer addresses

### Cross-Platform Failures
- **RustOrchestration unreachable**: Log warning, continue without integration
- **CryptoSaint unreachable**: Log warning, continue without reputation tracking
- **Graceful degradation**: Node operates independently, retries integration periodically

## Regenerative Considerations

### Resource Efficiency
- Build artifacts are cached and reused
- Configuration templates minimize redundant generation
- Docker layers are optimized for minimal rebuilds

### Knowledge Sharing
- Deployment produces documentation of what was deployed
- Logs capture learnings for troubleshooting
- Scripts are self-documenting with comments

### Adaptive Learning
- Deployment metrics inform future optimizations
- Failed deployments logged with context for improvement
- Successful patterns extracted and reused

### Ecosystem Health
- Each node strengthens the network
- Bootstrap nodes serve the collective
- Integration hooks enable cross-platform synergy

## Integration Notes

### Upstream Dependencies
- MyceliaNetwork repository must be cloned/available
- Rust toolchain must be installed
- For integrations: RustOrchestration and/or CryptoSaint must be running

### Downstream Effects
- Deployed nodes are available for Math Engine Integration skill
- Network topology available for Cross-Platform Bridge skill
- Node metrics available for RustOrchestration scheduling decisions

### State Management
- Node identity (Ed25519 keypair) persisted in configured path
- Network state synced via gossipsub
- Integration state (connection status) tracked locally

### Event Propagation
- Node start/stop events can be published to gossipsub
- Peer connect/disconnect events available via metrics
- Content events flow through `/mycelia/content/1.0.0` topic

---

## Quick Reference Commands

```bash
# Clone and setup
git clone https://github.com/univrs/MyceliaNetwork
cd MyceliaNetwork
cargo build --release

# Single node (quick start)
cargo run --bin mycelia-simple -- --name "MyNode" --port 4001

# Multi-node network
./demo.sh  # Uses predefined test network

# With integrations
cargo run --bin mycelia-simple -- \
  --name "IntegratedNode" \
  --port 4001 \
  --rust-orchestration http://localhost:8080/statestore \
  --cryptosaint http://localhost:9944

# Browser WASM build
cargo build --target wasm32-unknown-unknown -p mycelia-spore
wasm-bindgen target/wasm32-unknown-unknown/release/mycelia_spore.wasm --out-dir ./web/pkg
```

## Related Skills
- **Math Engine Integration**: Uses deployed nodes to test algorithm integration
- **Cross-Platform Bridge**: Connects deployed network to other platforms
- **Network Topology Mapper**: Analyzes deployed network structure
- **Content Propagation Analyzer**: Tests content flow through deployed nodes
