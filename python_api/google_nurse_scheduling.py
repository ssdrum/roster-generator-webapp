# Filename: nurse_scheduling.py
# Description:
# Author: osh
# Date created: 12:49 on Tuesday, the 02nd of January, 2024.
# Last modified: 12:54 on Wednesday, the 03rd of January, 2024.

"""Example of a simple nurse scheduling problem."""
from ortools.sat.python import cp_model


def solve_nurse_scheduling(num_nurses, num_shifts, num_days, solution_limit):
    all_nurses = range(num_nurses)
    all_shifts = range(num_shifts)
    all_days = range(num_days)

    # Creates the model.
    model = cp_model.CpModel()

    # Creates shift variables.
    # shifts[(n, d, s)]: nurse 'n' works shift 's' on day 'd'.
    shifts = {}
    for n in all_nurses:
        for d in all_days:
            for s in all_shifts:
                shifts[(n, d, s)] = model.NewBoolVar(f"shift_n{n}_d{d}_s{s}")

    # Each shift is assigned to exactly one nurse in the schedule period.
    for d in all_days:
        for s in all_shifts:
            model.AddExactlyOne(shifts[(n, d, s)] for n in all_nurses)

    # Each nurse works at most one shift per day.
    for n in all_nurses:
        for d in all_days:
            model.AddAtMostOne(shifts[(n, d, s)] for s in all_shifts)

    # Try to distribute the shifts evenly, so that each nurse works
    # min_shifts_per_nurse shifts. If this is not possible, because the total
    # number of shifts is not divisible by the number of nurses, some nurses will
    # be assigned one more shift.
    min_shifts_per_nurse = (num_shifts * num_days) // num_nurses
    if num_shifts * num_days % num_nurses == 0:
        max_shifts_per_nurse = min_shifts_per_nurse
    else:
        max_shifts_per_nurse = min_shifts_per_nurse + 1
    for n in all_nurses:
        shifts_worked = []
        for d in all_days:
            for s in all_shifts:
                shifts_worked.append(shifts[(n, d, s)])
        model.Add(min_shifts_per_nurse <= sum(shifts_worked))
        model.Add(sum(shifts_worked) <= max_shifts_per_nurse)

    # Creates the solver and solve.
    solver = cp_model.CpSolver()
    solver.parameters.linearization_level = 0
    # Enumerate all solutions.
    solver.parameters.enumerate_all_solutions = True

    class NursesPartialSolutionPrinter(cp_model.CpSolverSolutionCallback):
        """Print intermediate solutions."""

        def __init__(self, shifts, num_nurses, num_days, num_shifts, limit):
            cp_model.CpSolverSolutionCallback.__init__(self)
            self._shifts = shifts
            self._num_nurses = num_nurses
            self._num_days = num_days
            self._num_shifts = num_shifts
            self._solution_count = 0
            self._solution_limit = limit

        def __str__(self):
            return self.on_solution_callback()

        def on_solution_callback(self):
            self._solution_count += 1
            result = ""
            for d in range(self._num_days):
                result += f"Day {d}\n"
                for n in range(self._num_nurses):
                    is_working = False
                    for s in range(self._num_shifts):
                        if self.Value(self._shifts[(n, d, s)]):
                            is_working = True
                            result += f"  Nurse {n} works shift {s}\n"
                    if not is_working:
                        result += f"  Nurse {n} does not work\n"

            if self._solution_count >= self._solution_limit:
                result += "Stop search after {} solutions".format(self._solution_limit)
                self.StopSearch()

            return result

        def solution_count(self):
            return self._solution_count

    # Display the first five solutions.
    solution_printer = NursesPartialSolutionPrinter(
        shifts, num_nurses, num_days, num_shifts, solution_limit
    )

    solver.Solve(model, solution_printer)

    return str(solution_printer)

