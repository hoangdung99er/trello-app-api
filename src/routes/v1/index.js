import express from "express";
import { HttpStatusCode } from "*/utils/constants";
import { BoardRoute } from "./board.route";

const router = express.Router();

/**
 * Get v1/status
 */
router.get("/status", (req, res) =>
  res.status(200).json({
    status: HttpStatusCode.OK,
  })
);

router.use("/boards", BoardRoute);

/**
 * Board API
 *
 */

export const apiV1 = router;
