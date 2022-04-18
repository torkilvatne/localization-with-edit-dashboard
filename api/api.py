from typing import Optional, List

from fastapi import FastAPI, status, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schemas import Text
from database import SessionLocal
import models

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8000",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db = SessionLocal()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/texts", status_code=status.HTTP_200_OK)
def get_all_texts():
    texts=db.query(models.Text).all()
    return texts

@app.get("/formattedTexts", status_code=status.HTTP_200_OK)
def get_all_texts():
    texts=db.query(models.Text).all()
    no_nb = {}
    en_us = {}
    for text in texts:
        no_nb[text.id] = text.no_nb
        en_us[text.id] = text.en_us
    texts_formatted = {
        "no-nb" : no_nb,
        "en-us" : en_us
    }
    return texts_formatted