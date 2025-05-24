from pydantic import BaseModel

class AvailabilityCreate(BaseModel):
    date: str  # YYYY-MM-DD
    start_time: str  # HH:MM
    end_time: str  # HH:MM


class AppointmentCreate(BaseModel):
    date: str
    time: str
    name: str
