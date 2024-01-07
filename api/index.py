from fastapi import FastAPI, Form
from .google_nurse_scheduling import solve_nurse_scheduling

app = FastAPI()

# nurse scheduling
@app.post("/api/test-algorithm/")
async def generate_example_schedule(num_employees: int = Form(), num_shifts: int = Form(), num_days: int = Form(), solution_limit: int = Form()):
    return {"result": solve_nurse_scheduling(num_employees, num_shifts, num_days, solution_limit)}