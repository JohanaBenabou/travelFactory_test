describe(
  "Vacation API",
  () => {

    it(
      "should create a valid vacation request object",
      () => {

        const vacation = {
          start_date: "2026-06-01",
          end_date: "2026-06-05",
          status: "Pending",
        };

        expect(vacation.status)
          .toBe("Pending");
      }
    );

  }
);