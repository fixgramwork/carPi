from fastapi import FastAPI, Depends, Path, HTTPException
from pydantic import BastModel
from database import engineconn
from models import Test

app = FastAPI()

engine = EngineConn()
session = Conn()

class Item(baseModel):

@app.get("/")
async def first_get():
  example = session.query(Test).all()
  return example