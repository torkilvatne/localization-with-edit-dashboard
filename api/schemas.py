from typing import List, Optional

from pydantic import BaseModel

class TextBase(BaseModel):
    id:str
    en_us:str
    no_nb:str

class Text(TextBase):

    class Config:
        orm_mode = True