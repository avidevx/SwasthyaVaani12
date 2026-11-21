import json
import os
import uuid
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Query
from fastapi.staticfiles import StaticFiles
from livekit import api

load_dotenv()

app = FastAPI(
    title="SwasthyaVaani — ASHA Voice Register",
    description="Zero-build static PWA and LiveKit token service for SwasthyaVaani.",
)

STATIC_DIR = Path(__file__).resolve().parent / "static"


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/token")
def get_livekit_token(
    room: str = Query(
        default="asha-demo",
        pattern=r"^[A-Za-z0-9_-]{1,64}$",
        description="LiveKit room name",
    ),
    beneficiary_id: str = Query(
        default="ASHA-104",
        pattern=r"^[A-Za-z0-9_-]{1,64}$",
        description="Beneficiary identifier attached to participant metadata",
    ),
) -> dict[str, str]:
    livekit_url = os.getenv("LIVEKIT_URL", "").strip()
    api_key = os.getenv("LIVEKIT_API_KEY", "").strip()
    api_secret = os.getenv("LIVEKIT_API_SECRET", "").strip()

    if not livekit_url or not api_key or not api_secret:
        raise HTTPException(
            status_code=503,
            detail=(
                "LiveKit credentials are not configured on the server. "
                "Set LIVEKIT_URL, LIVEKIT_API_KEY, and LIVEKIT_API_SECRET."
            ),
        )

    identity = f"asha-{beneficiary_id}-{uuid.uuid4().hex[:8]}"

    try:
        token = (
            api.AccessToken(api_key, api_secret)
            .with_identity(identity)
            .with_name(f"ASHA Worker ({beneficiary_id})")
            .with_metadata(json.dumps({"beneficiary_id": beneficiary_id}))
            .with_grants(
                api.VideoGrants(
                    room_join=True,
                    room=room,
                    can_publish=True,
                    can_subscribe=True,
                    can_publish_data=True,
                )
            )
            .to_jwt()
        )
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail="Failed to generate LiveKit session token.",
        ) from exc

    return {
        "url": livekit_url,
        "token": token,
        "room": room,
        "identity": identity,
    }


app.mount("/", StaticFiles(directory=str(STATIC_DIR), html=True), name="static")
