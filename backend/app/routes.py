from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from . import models, schemas
from .database import SessionLocal
from datetime import datetime, timedelta, date

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/availability")
def set_availability(data: schemas.AvailabilityCreate, db: Session = Depends(get_db)):
    try:
        datetime.strptime(data.date, "%Y-%m-%d")
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD.")

    availability = models.Availability(**data.dict())
    db.add(availability)
    db.commit()
    return {"message": "Availability set for date " + data.date}


@router.get("/availability")
def get_availability(db: Session = Depends(get_db)):
    return db.query(models.Availability).all()

@router.get("/appointments")
def get_appointments(db: Session = Depends(get_db)):
    return db.query(models.Appointment).all()

@router.post("/book")
def book_appointment(data: schemas.AppointmentCreate, db: Session = Depends(get_db)):
    exists = db.query(models.Appointment).filter_by(date=data.date, time=data.time).first()
    if exists:
        raise HTTPException(status_code=400, detail="Slot already booked")
    appointment = models.Appointment(**data.dict())
    db.add(appointment)
    db.commit()
    return {"message": "Appointment booked"}


@router.get("/available-slots")
def get_available_slots(date_str: str = Query(...), db: Session = Depends(get_db)):
    try:
        date_obj = datetime.strptime(date_str, "%Y-%m-%d")
        print(f"Checking availability for date: {date_obj.date()}")
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format")

    if date_obj.date() < date.today():
        raise HTTPException(status_code=400, detail="Cannot check availability for past dates")

    availability_blocks = db.query(models.Availability).filter(models.Availability.date == date_str).all()

    if not availability_blocks:
        return {"slots": []}

    booked_appointments = db.query(models.Appointment).filter(models.Appointment.date == date_str).all()
    booked_times = {
        datetime.strptime(appt.time, "%H:%M").time() for appt in booked_appointments
    }

    slots = []

    for block in availability_blocks:
        start = datetime.strptime(block.start_time, "%H:%M").time()
        end = datetime.strptime(block.end_time, "%H:%M").time()

        current = datetime.combine(date_obj, start)
        end_dt = datetime.combine(date_obj, end)

        while current + timedelta(minutes=30) <= end_dt:
            slot_time = current.time()
            if slot_time not in booked_times:
                slots.append(slot_time.strftime("%H:%M"))
            current += timedelta(minutes=30)

    return {"slots": slots}
