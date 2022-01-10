import { ColumnModel } from "*/models/column.model";
import { BoardModel } from "*/models/board.model";

const createNew = async (data) => {
  try {
    // transaction
    // if one doesn work , the rest will return
    const newColumn = await ColumnModel.createNew(data);

    const findColumn = await ColumnModel.findColumn(
      newColumn.insertedId.toString()
    );

    // Update columnOrder
    await BoardModel.pushColumnOrder(
      findColumn.boardId.toString(),
      findColumn._id.toString()
    );

    return newColumn;
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (id, data) => {
  try {
    const updateData = {
      ...data,
      updatedAt: Date.now(),
    };

    const result = await ColumnModel.update(id, updateData);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const ColumnService = { createNew, update };
