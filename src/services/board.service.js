import { BoardModel } from "*/models/board.model";

const createNew = async (data) => {
  try {
    const result = await BoardModel.createNew(data);

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getFullBoard = async (boardId) => {
  try {
    const newBoard = await BoardModel.getFullBoard(boardId);

    newBoard.columns.forEach((column) => {
      column.cards = newBoard.cards.filter(
        (c) => c.columnId.toString() === column._id.toString()
      );
    });

    delete newBoard.cards;

    return newBoard;
  } catch (error) {
    throw new Error(error);
  }
};

export const BoardService = { createNew, getFullBoard };
