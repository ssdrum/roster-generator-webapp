from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from .google_nurse_scheduling import solve_nurse_scheduling

app = FastAPI()

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Schedule(BaseModel):
    num_employees: int
    num_shifts: int
    num_days: int
    solution_limit: int


# Update the endpoint to use the Pydantic model
@app.post("/python_api/test-algorithm/")
async def generate_example_schedule(schedule: Schedule):
    return {
        "result": solve_nurse_scheduling(
            schedule.num_employees,
            schedule.num_shifts,
            schedule.num_days,
            schedule.solution_limit,
        )
    }

