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

@app.get("/texts", response_model=List[Text], status_code=status.HTTP_200_OK)
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



@app.post("/text", response_model=Text, status_code=status.HTTP_201_CREATED)
def create_a_text(text:Text):
    text_in_db = db.query(models.Text).filter(models.Text.id == text.id).first()
    if text_in_db is not None:
        raise HTTPException(status_code=400, detail="Textfield id already exists.")

    new_text = models.Text(
        id = text.id,
        en_us = text.en_us,
        no_nb = text.no_nb
    )
    db.add(new_text)
    db.commit()

    return new_text


@app.put("/text/{field_id}", response_model=Text, status_code=status.HTTP_200_OK)
def update_a_text(field_id: str, text:Text):
    text_to_update=db.query(models.Text).filter(models.Text.id == field_id).first()
    text_to_update.en_us = text.en_us
    text_to_update.no_nb = text.no_nb

    db.commit()

    return text_to_update