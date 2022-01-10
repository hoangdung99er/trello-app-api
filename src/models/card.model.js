import Joi from "joi";
import { getDB } from "*/config/mongodb";
import { ObjectId } from "bson";

//Define board collection
const cardCollectionName = "cards";

const cardCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  columnId: Joi.string().required(),
  title: Joi.string().required().min(3).max(100).trim(),
  cover: Joi.string().default(null),
  createdAt: Joi.date().timestamp().default(Date.now),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

const validationSchema = async (data) => {
  return await cardCollectionSchema.validateAsync(data, {
    abortEarly: false,
  });
};

const findCard = async (cardId) => {
  try {
    const result = await getDB()
      .collection(cardCollectionName)
      .findOne({ _id: new ObjectId(cardId) });

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const createNew = async (data) => {
  try {
    const value = await validationSchema(data);

    const insertValue = {
      ...value,
      boardId: new ObjectId(value.boardId),
      columnId: new ObjectId(value.columnId),
    };

    const result = await getDB()
      .collection(cardCollectionName)
      .insertOne(insertValue);

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const CardModel = {
  createNew,
  findCard,
  cardCollectionName,
};
