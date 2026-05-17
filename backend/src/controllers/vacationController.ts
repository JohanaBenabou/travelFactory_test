import { Request, Response } from "express";

import { AppDataSource } from "../config/data-source";

import { VacationRequest } from "../entities/VacationRequest";

import { User } from "../entities/User";

export const createVacationRequest = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      user_id,
      start_date,
      end_date,
      reason,
    } = req.body;

    if (!user_id || !start_date || !end_date) {
      return res.status(400).json({
        message: "Required fields are missing",
      });
    }

    if (new Date(end_date) < new Date(start_date)) {
      return res.status(400).json({
        message: "End date must be after start date",
      });
    }

    const userRepository =
      AppDataSource.getRepository(User);

    const vacationRepository =
      AppDataSource.getRepository(VacationRequest);

    const user = await userRepository.findOne({
      where: { id: user_id },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const vacation =
      vacationRepository.create({
        user,
        start_date,
        end_date,
        reason,
      });

    await vacationRepository.save(vacation);

    return res.status(201).json(vacation);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getAllVacationRequests =
  async (_req: Request, res: Response) => {
    try {
      const repository =
        AppDataSource.getRepository(VacationRequest);

      const vacations =
        await repository.find({
          relations: ["user"],
          order: {
            created_at: "DESC",
          },
        });

      return res.json(vacations);
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        message: "Internal server error",
      });
    }
  };

export const getVacationRequestsByUser =
  async (req: Request, res: Response) => {
    try {
      const userId = Number(req.params.id);

      const repository =
        AppDataSource.getRepository(VacationRequest);

      const vacations =
        await repository.find({
          where: {
            user: {
              id: userId,
            },
          },
          relations: ["user"],
          order: {
            created_at: "DESC",
          },
        });

      return res.json(vacations);
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        message: "Internal server error",
      });
    }
  };

export const updateVacationRequestStatus =
  async (req: Request, res: Response) => {
    try {
      const requestId = Number(req.params.id);

      const {
        status,
        comments,
      } = req.body;

      const repository =
        AppDataSource.getRepository(VacationRequest);

      const vacation =
        await repository.findOne({
          where: {
            id: requestId,
          },
        });

      if (!vacation) {
        return res.status(404).json({
          message: "Vacation request not found",
        });
      }

      if (
        status !== "Approved" &&
        status !== "Rejected"
      ) {
        return res.status(400).json({
          message: "Invalid status",
        });
      }

      if (
        status === "Rejected" &&
        !comments
      ) {
        return res.status(400).json({
          message:
            "Comments are required when rejecting",
        });
      }

      vacation.status = status;

      vacation.comments = comments;

      await repository.save(vacation);

      return res.json(vacation);
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        message: "Internal server error",
      });
    }
  };