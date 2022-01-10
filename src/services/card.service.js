import { CardModel } from "*/models/card.model";
import { ColumnModel } from "*/models/column.model";

const createNew = async (data) => {
  try {
    const newCard = await CardModel.createNew(data);

    const findCard = await CardModel.findCard(newCard.insertedId.toString());

    console.log(findCard);

    // Update columnOrder
    const updatedCard = await ColumnModel.pushCardOrder(
      findCard.columnId.toString(),
      findCard._id.toString()
    );

    return newCard;
  } catch (error) {
    throw new Error(error);
  }
};

export const CardService = { createNew };
