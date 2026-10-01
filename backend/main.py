from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Incident(BaseModel):
    incident: str


@app.get("/health")
def health_check():
    return {"status": "AegisRCA is running"}


@app.post("/analyze")
def analyze_incident(data: Incident):
    return {
        "incident": data.incident,
        "status": "Incident received",
        "message": "AegisRCA investigation started"
    }
