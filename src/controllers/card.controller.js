import { CardService } from "*/services/card.service";
import { HttpStatusCode } from "*/utils/constants";

const createNew = async (req, res) => {
  try {
    const result = await CardService.createNew(req.body);
    res.status(HttpStatusCode.CREATED_SUCCESS).json(result);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message,
    });
  }
};

export const CardController = { createNew };
