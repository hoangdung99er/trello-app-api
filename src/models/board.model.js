import Joi from "joi";
import { getDB } from "*/config/mongodb";
import { ObjectId } from "mongodb";
import { ColumnModel } from "./column.model";
import { CardModel } from "./card.model";

//Define board collection
const boardCollectionName = "boards";

const boardCollectionSchema = Joi.object({
  title: Joi.string().required().min(3).max(20).trim(),
  columnOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

const validationSchema = async (data) => {
  return await boardCollectionSchema.validateAsync(data, { abortEarly: false });
};

const createNew = async (data) => {
  try {
    const value = await validationSchema(data);

    const result = await getDB()
      .collection(boardCollectionName)
      .insertOne(value);

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 *
 * @param {string} boardId
 * @param {string} columnId
 */
const pushColumnOrder = async (boardId, columnId) => {
  try {
    const result = await getDB()
      .collection(boardCollectionName)
      .findOneAndUpdate(
        {
          _id: new ObjectId(boardId),
        },
        {
          $push: {
            columnOrder: new ObjectId(columnId),
          },
        },
        {
          returnDocument: "after",
        }
      );

    return result.value;
  } catch (error) {
    throw new Error(error);
  }
};

const getFullBoard = async (boardId) => {
  try {
    const result = await getDB()
      .collection(boardCollectionName)
      .aggregate([
        {
          $match: {
            _id: new ObjectId(boardId),
          },
        },
        // {
        //   $addFields: {
        //     _id: { $toString: "$_id" },
        //   },
        // },
        {
          $lookup: {
            from: ColumnModel.columnCollectionName, // collection name
            localField: "_id",
            foreignField: "boardId",
            as: "columns",
          },
        },
        {
          $lookup: {
            from: CardModel.cardCollectionName, // collection name
            localField: "_id",
            foreignField: "boardId",
            as: "cards",
          },
        },
      ])
      .toArray();

    return result[0] || {};
  } catch (error) {
    throw new Error(error);
  }
};

export const BoardModel = {
  createNew,
  getFullBoard,
  pushColumnOrder,
};
