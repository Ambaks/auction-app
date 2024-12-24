'''
FastAPI app
'''
from database import Base
from fastapi import FastAPI, HTTPException, Depends
from typing import Annotated, List
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import SessionLocal, engine
import models
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "https://ambaks.github.io/auction-app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

class EmailBase(BaseModel):
    email: str

class EmailModel(EmailBase):
    id: int

    class Config:
        from_attributes=True



def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



db_dependency = Annotated[Session, Depends(get_db)]

Base.metadata.create_all(bind=engine)


@app.post('/emails', response_model=EmailModel)
async def create_email(email: EmailBase, db: db_dependency):
    db_email = models.Email(**email.model_dump())
    db.add(db_email)
    db.commit()
    db.refresh(db_email)
    return db_email


@app.get('/emails', response_model=List[EmailModel])
async def read_emails(db: db_dependency, skip: int = 0, limit: int = 100):
    emails = db.query(models.Email).offset(skip).limit(limit).all()
    return emails