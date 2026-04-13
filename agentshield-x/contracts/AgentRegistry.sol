// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title AgentRegistry
 * @dev Maintains a decentralized registry of authorized AI agents and their trust scores.
 */
contract AgentRegistry is Ownable {
    
    struct Agent {
        string name;
        address owner;
        uint256 trustScore; // 0-10000 (basis points)
        bool isActive;
        uint256 registeredAt;
    }

    mapping(bytes32 => Agent) public agents;
    bytes32[] public agentIds;

    event AgentRegistered(bytes32 indexed agentId, string name, address owner);
    event TrustScoreUpdated(bytes32 indexed agentId, uint256 newScore);
    event AgentStatusChanged(bytes32 indexed agentId, bool isActive);

    constructor() Ownable(msg.sender) {}

    function registerAgent(bytes32 agentId, string memory name, address owner) external onlyOwner {
        require(agents[agentId].registeredAt == 0, "Agent already exists");
        
        agents[agentId] = Agent({
            name: name,
            owner: owner,
            trustScore: 10000, // Start with full trust
            isActive: true,
            registeredAt: block.timestamp
        });
        
        agentIds.push(agentId);
        emit AgentRegistered(agentId, name, owner);
    }

    function updateTrustScore(bytes32 agentId, uint256 newScore) external onlyOwner {
        require(agents[agentId].registeredAt != 0, "Agent not found");
        require(newScore <= 10000, "Invalid score");
        
        agents[agentId].trustScore = newScore;
        emit TrustScoreUpdated(agentId, newScore);
    }

    function setAgentStatus(bytes32 agentId, bool isActive) external onlyOwner {
        require(agents[agentId].registeredAt != 0, "Agent not found");
        agents[agentId].isActive = isActive;
        emit AgentStatusChanged(agentId, isActive);
    }

    function getAgent(bytes32 agentId) external view returns (Agent memory) {
        return agents[agentId];
    }
}
