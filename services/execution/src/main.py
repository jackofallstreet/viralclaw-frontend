"""
ViralClawOS — Execution Service
Handles content scheduling and publishing via platform APIs.

Endpoints:
  GET  /health
  POST /schedule          Schedule a content asset for publishing
  POST /publish/{id}      Publish a scheduled post immediately
  GET  /scheduled         List all scheduled posts for a user
  DELETE /scheduled/{id}  Cancel a scheduled post

Run:
  uvicorn main:app --host 0.0.0.0 --port 8002 --reload
"""

from __future__ import annotations

import os
import uuid
from datetime import datetime
from typing import Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="ViralClawOS Execution Service",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("ALLOWED_ORIGINS", "http://localhost:3001").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── In-memory store (replace with Supabase in production) ─────

scheduled_posts: dict[str, dict] = {}


# ── Schemas ───────────────────────────────────────────────────


class ScheduleRequest(BaseModel):
    user_id: str
    asset_id: str
    platform: str
    content: str
    scheduled_for: datetime
    metadata: Optional[dict] = None


class ScheduledPostResponse(BaseModel):
    id: str
    user_id: str
    asset_id: str
    platform: str
    content: str
    scheduled_for: datetime
    status: str
    created_at: datetime
    published_at: Optional[datetime] = None
    external_id: Optional[str] = None


PUBLISH_GATED_PLATFORMS = {"youtube", "x", "tiktok", "linkedin"}


# ── Routes ────────────────────────────────────────────────────


@app.get("/health")
async def health():
    return {"status": "ok", "service": "execution", "ts": datetime.utcnow()}


@app.post("/schedule", response_model=ScheduledPostResponse)
async def schedule_post(req: ScheduleRequest):
    """
    Schedule a content asset for publishing.
    All platforms require the asset to be in 'approved' status.
    """
    post_id = str(uuid.uuid4())
    now = datetime.utcnow()

    post = {
        "id": post_id,
        "user_id": req.user_id,
        "asset_id": req.asset_id,
        "platform": req.platform,
        "content": req.content,
        "scheduled_for": req.scheduled_for,
        "status": "scheduled",
        "created_at": now,
        "published_at": None,
        "external_id": None,
    }
    scheduled_posts[post_id] = post

    # TODO: enqueue in Temporal workflow for reliable execution
    # await temporal_client.start_workflow(
    #     PublishWorkflow.run,
    #     args=[post_id],
    #     id=f"publish-{post_id}",
    #     task_queue="execution",
    #     start_delay=req.scheduled_for - datetime.utcnow(),
    # )

    return ScheduledPostResponse(**post)


@app.post("/publish/{post_id}", response_model=ScheduledPostResponse)
async def publish_now(post_id: str):
    """
    Publish a scheduled post immediately.
    Calls the platform API directly — requires human approval upstream.
    """
    post = scheduled_posts.get(post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Scheduled post not found")

    # TODO: call platform-specific API
    # if post["platform"] == "x":
    #     x_client = XClient(config=...)
    #     tweet = await x_client.post_tweet(post["content"])
    #     post["external_id"] = tweet.id
    # elif post["platform"] == "youtube":
    #     ...

    post["status"] = "published"
    post["published_at"] = datetime.utcnow()

    return ScheduledPostResponse(**post)


@app.get("/scheduled")
async def list_scheduled(user_id: str):
    user_posts = [p for p in scheduled_posts.values() if p["user_id"] == user_id]
    return {"posts": user_posts, "count": len(user_posts)}


@app.delete("/scheduled/{post_id}")
async def cancel_scheduled(post_id: str):
    post = scheduled_posts.get(post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Scheduled post not found")

    post["status"] = "cancelled"

    # TODO: cancel Temporal workflow
    return {"ok": True, "post_id": post_id}
