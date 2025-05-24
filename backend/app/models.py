from sqlalchemy import Column, Integer, String, DateTime
from .database import Base

class Availability(Base):
    __tablename__ = "availabilities"
    id = Column(Integer, primary_key=True, index=True)
    date = Column(String, index=True) 
    start_time = Column(String)
    end_time = Column(String)


class Appointment(Base):
    __tablename__ = "appointments"
    id = Column(Integer, primary_key=True, index=True)
    date = Column(String)
    time = Column(String)
    name = Column(String)
