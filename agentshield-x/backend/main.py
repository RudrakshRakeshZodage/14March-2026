from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict
import asyncio
import json
import logging

# Configure Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("AgentShieldX")

app = FastAPI(
    title="AgentShield X API",
    description="Enterprise AI Security Platform Backend",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- WebSocket Manager ---
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        logger.info(f"New connection. Total: {len(self.active_connections)}")

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)
        logger.info(f"Connection closed. Total: {len(self.active_connections)}")

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            try:
                await connection.send_text(message)
            except Exception as e:
                logger.error(f"Error broadcasting: {e}")

manager = ConnectionManager()

# --- Endpoints ---

@app.get("/")
async def root():
    return {"status": "AgentShield X Online", "version": "1.0.0"}

@app.get("/api/v1/health")
async def health_check():
    return {"status": "healthy", "timestamp": "2026-04-13T20:58:00Z"}

# WebSocket for real-time logs and alerts
@app.websocket("/ws/stream")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            # Keep connection alive
            data = await websocket.receive_text()
            # Echo for testing or handle specific commands
            await websocket.send_text(f"Message received: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket)

# Start background task to simulate live logs
@app.on_event("startup")
async def startup_event():
    asyncio.create_task(simulate_live_logs())

async def simulate_live_logs():
    """Simulates real-time agent activity and detections."""
    actions = ["api_call", "file_access", "network_request", "inference"]
    agents = ["Agent-Alpha", "Agent-Beta", "Agent-Gamma"]
    
    while True:
        await asyncio.sleep(3) # Send every 3 seconds
        log = {
            "agent_id": agents[hash(asyncio.get_event_loop().time()) % len(agents)],
            "action": actions[hash(asyncio.get_event_loop().time()) % len(actions)],
            "severity": "info" if asyncio.get_event_loop().time() % 10 < 8 else "high",
            "message": "Routine integrity check complete" if asyncio.get_event_loop().time() % 10 < 8 else "Suspicious API sequence detected",
            "timestamp": "2026-04-13T20:58:00Z"
        }
        await manager.broadcast(json.dumps(log))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
