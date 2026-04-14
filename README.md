# AgentShield X 🛡️

**Runtime Integrity Monitoring & Security Orchestration for Autonomous AI Agents.**

AgentShield X is a production-grade enterprise platform designed to enforce security guardrails on autonomous agent networks. It combines real-time behavioral monitoring, ML-driven anomaly detection, and decentralized audit anchoring to ensure the integrity of distributed AI systems.

---

## 🌓 Evolution of Shield

### [0] The Vision
![Landing Page](./0.png)

### [00] The Engine
![Architecture](./00.png)

### [1] Command Center
![Dashboard](./1.png)

### [11] Stress Testing
![Simulation](./11.png)

### [111] Deep Dive Audit
![Audit Explorer](./1111.png)

### [1111] Global Cluster Ops
![Global Ops](./111.png)

---

## 🚀 Key Features

- **Real-Time Telemetry**: Sub-100ms log streaming via WebSockets.
- **Behavioral Drift Detection**: Integrated `IsolationForest` ML engine for identifying subtle reasoning bypasses.
- **Blockchain Audit Anchoring**: Immutable log hashing using Ethereum/Polygon smart contracts.
- **Attack Simulation Environment**: Trigger controlled security anomalies to stress-test your guardrail policies.
- **Network Topology Graph**: D3.js powered visualization of agent communication and threat propagation.
---

## 🛠️ Advanced Infrastructure Stack

AgentShield X is engineered for extreme scale and sub-millisecond response times, utilizing a best-in-class distributed tech stack.

### **Frontend & Interface**
![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Remix](https://img.shields.io/badge/remix-000000?style=for-the-badge&logo=remix&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-0F172A?style=for-the-badge&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/framer-0055FF?style=for-the-badge&logo=framer&logoColor=white)

### **Distributed Backend & Pub/Sub**
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
![Apache Kafka](https://img.shields.io/badge/Apache%20Kafka-000?style=for-the-badge&logo=apachekafka)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)

### **Database & Security Ledger**
![PostgreSQL](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Solidity](https://img.shields.io/badge/Solidity-%23363636.svg?style=for-the-badge&logo=solidity&logoColor=white)
![Web3.js](https://img.shields.io/badge/web3.js-F16822?style=for-the-badge&logo=web3dotjs&logoColor=white)
![Blockchain](https://img.shields.io/badge/Blockchain-blue?style=for-the-badge&logo=blockchaindotcom&logoColor=white)

### **AI & Hardware Acceleration**
![Scikit-Learn](https://img.shields.io/badge/scikit--learn-%23F7931E.svg?style=for-the-badge&logo=scikit-learn&logoColor=white)
![PyTorch](https://img.shields.io/badge/PyTorch-%23EE4C2C.svg?style=for-the-badge&logo=PyTorch&logoColor=white)
![FPGA](https://img.shields.io/badge/FPGA-Security_Enforcement-orange?style=for-the-badge&logo=xilinx&logoColor=white)

---

## 🏗️ System Architecture Roles

- **Apache Kafka**: Serves as the high-throughput ingestion backbone, processing millions of agent telemetry logs per second before routing them to the Detection Engine.
- **Redis Cache**: Powers the "Live Feed" and sub-100ms dashboards by maintaining a hot-set of recent security anomalies in-memory.
- **FPGA Guardrails**: Optional hardware-level policy enforcement for ultra-low latency environments, ensuring guardrails cannot be bypassed even if the OS is compromised.
- **Remix/Next.js**: Hybrid frontend architecture ensuring instant server-side rendering of security reports and fluid client-side agent monitoring graphs.
- **Blockchain (L2)**: Log hashes are anchored to an L2 chain (Optimism/Polygon) to provide a cost-effective, tamper-proof audit trail.

## ⚙️ Setup & Installation

### 1. Database Initialization
Execute the schema script to set up the partitioned tables and security triggers.
```bash
psql -h localhost -U postgres -d agentshield -f docs/schema.sql
```

### 2. Backend Service
```bash
cd backend
pip install -r requirements.txt
python main.py
```

### 3. Frontend Application
```bash
cd frontend
npm install
npm run dev
```

---

## 📜 License
Distributed under the MIT License. See `LICENSE` for more information.

**Built with ❤️ for the future of Secure AI.**
