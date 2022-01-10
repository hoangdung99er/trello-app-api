import { BoardService } from "*/services/board.service";
import { HttpStatusCode } from "*/utils/constants";

const createNew = async (req, res) => {
  try {
    const result = await BoardService.createNew(req.body);
    res.status(HttpStatusCode.CREATED_SUCCESS).json(result);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message,
    });
  }
};

const getFullBoard = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await BoardService.getFullBoard(id);
    res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message,
    });
  }
};

export const BoardController = { createNew, getFullBoard };
