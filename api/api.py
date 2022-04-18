from typing import Optional, List

from fastapi import FastAPI, status, HTTPException
from schemas import Text
from database import SessionLocal
import models

app = FastAPI()

db = SessionLocal()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/texts", status_code=status.HTTP_200_OK)
def get_all_texts():
    texts=db.query(models.Text).all()
    retun texts

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