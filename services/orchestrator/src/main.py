"""
ViralClawOS — Orchestrator Service
FastAPI + LangGraph

Endpoints:
  POST /missions          Create and queue a new mission
  GET  /missions/{id}     Get mission status + task list
  POST /missions/{id}/approve  Approve a human-review gate
  GET  /agents            List all agent statuses
  GET  /tasks/{id}        Get task details

Run:
  uvicorn main:app --host 0.0.0.0 --port 8000 --reload
"""

from __future__ import annotations

import os
import uuid
from datetime import datetime
from typing import Any, Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="ViralClawOS Orchestrator",
    version="0.1.0",
    description="Multi-agent orchestration service",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("ALLOWED_ORIGINS", "http://localhost:3001").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── In-memory store (replace with Supabase in production) ─────

missions: dict[str, dict] = {}
tasks: dict[str, dict] = {}

# ── Schemas ───────────────────────────────────────────────────


class CreateMissionRequest(BaseModel):
    user_id: str
    input: str


class MissionResponse(BaseModel):
    id: str
    user_id: str
    input: str
    status: str
    task_ids: list[str]
    created_at: datetime
    updated_at: datetime
    summary: Optional[str] = None


class ApproveRequest(BaseModel):
    task_id: str
    approved: bool
    note: Optional[str] = None


# ── Routes ────────────────────────────────────────────────────


@app.get("/health")
async def health():
    return {"status": "ok", "service": "orchestrator", "ts": datetime.utcnow()}


@app.post("/missions", response_model=MissionResponse)
async def create_mission(req: CreateMissionRequest):
    """
    Decompose a user mission and route tasks to the agent swarm.
    """
    mission_id = str(uuid.uuid4())
    now = datetime.utcnow()

    mission = {
        "id": mission_id,
        "user_id": req.user_id,
        "input": req.input,
        "status": "queued",
        "task_ids": [],
        "created_at": now,
        "updated_at": now,
        "summary": None,
    }
    missions[mission_id] = mission

    # TODO: kick off LangGraph workflow asynchronously
    # from graph import run_mission_graph
    # background_tasks.add_task(run_mission_graph, mission_id, req.input)

    return MissionResponse(**mission)


@app.get("/missions/{mission_id}", response_model=MissionResponse)
async def get_mission(mission_id: str):
    mission = missions.get(mission_id)
    if not mission:
        raise HTTPException(status_code=404, detail="Mission not found")
    return MissionResponse(**mission)


@app.post("/missions/{mission_id}/approve")
async def approve_gate(mission_id: str, req: ApproveRequest):
    """
    Approve or reject a human-in-the-loop review gate.
    """
    mission = missions.get(mission_id)
    if not mission:
        raise HTTPException(status_code=404, detail="Mission not found")

    task = tasks.get(req.task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    task["approved"] = req.approved
    task["approval_note"] = req.note
    task["reviewed_at"] = datetime.utcnow()

    return {"ok": True, "task_id": req.task_id, "approved": req.approved}


@app.get("/agents")
async def list_agents():
    """Return current agent statuses."""
    agent_ids = [
        "trend-intelligence",
        "strategy",
        "production",
        "distribution",
        "analytics",
        "revenue",
    ]
    return {
        "agents": [
            {
                "id": aid,
                "status": "idle",
                "last_run_at": None,
                "tasks_today": 0,
            }
            for aid in agent_ids
        ]
    }


@app.get("/tasks/{task_id}")
async def get_task(task_id: str):
    task = tasks.get(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task
