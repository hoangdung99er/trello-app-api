import express from "express";
import { HttpStatusCode } from "*/utils/constants";
import { BoardRoute } from "./board.route";
import { ColumnRoute } from "./column.route";
import { CardRoute } from "./card.route";

const router = express.Router();

/**
 * Get v1/status
 */
router.get("/status", (req, res) =>
  res.status(200).json({
    status: HttpStatusCode.OK,
  })
);

/** Boards route */
router.use("/boards", BoardRoute);

/** Columns route */
router.use("/columns", ColumnRoute);

/** Cards route */
router.use("/cards", CardRoute);

/**
 * Board API
 *
 */

export const apiV1 = router;
