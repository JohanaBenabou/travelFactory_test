import {
  Router,
} from "express";

import {
  createVacationRequest,
  getAllVacationRequests,
  getVacationRequestsByUser,
  updateVacationRequestStatus,
} from "../controllers/vacationController";

const router = Router();

router.post(
  "/",
  createVacationRequest
);

router.get(
  "/",
  getAllVacationRequests
);

router.get(
  "/user/:id",
  getVacationRequestsByUser
);

router.patch(
  "/:id",
  updateVacationRequestStatus
);

export default router;