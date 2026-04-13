// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title AuditLogger
 * @dev Stores cryptographic hashes of agent logs for immutable verification.
 */
contract AuditLogger is AccessControl {
    bytes32 public constant LOGGER_ROLE = keccak256("LOGGER_ROLE");

    struct LogEntry {
        bytes32 logHash;
        uint256 timestamp;
        uint256 blockNumber;
        address submitter;
    }

    // Mapping from log UUID (stored as bytes32) to LogEntry
    mapping(bytes32 => LogEntry) public auditLogs;
    
    // Array of log IDs for enumeration
    bytes32[] public logIds;

    event LogAnchored(bytes32 indexed logId, bytes32 logHash, uint256 timestamp);

    constructor(address admin) {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(LOGGER_ROLE, admin);
    }

    /**
     * @dev Anchors a log hash to the blockchain.
     * @param logId The UUID of the log from the database.
     * @param logHash The SHA-256 hash of the log content.
     */
    function anchorLog(bytes32 logId, bytes32 logHash) external onlyRole(LOGGER_ROLE) {
        require(auditLogs[logId].timestamp == 0, "Log already anchored");
        
        auditLogs[logId] = LogEntry({
            logHash: logHash,
            timestamp: block.timestamp,
            blockNumber: block.number,
            submitter: msg.sender
        });
        
        logIds.push(logId);
        emit LogAnchored(logId, logHash, block.timestamp);
    }

    /**
     * @dev Verifies if a log hash matches the anchored one.
     */
    function verifyLog(bytes32 logId, bytes32 logHash) external view returns (bool) {
        return auditLogs[logId].logHash == logHash;
    }

    function getLogCount() external view returns (uint256) {
        return logIds.length;
    }
}
