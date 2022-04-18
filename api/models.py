from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from database import Base


class Text(Base):
    __tablename__ = "texts"

    id = Column(String, primary_key=True, index=True)
    en_us = Column(String, index=True)
    no_nb = Column(String, index=True)