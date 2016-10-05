export default (board) => {
  board.getCells();

  return (x, y) => {
    if (!board.isInBoard(x, y)) {
      throw new Error('Coordinates not in board');
    }

    const cellsToUncover = [{ x, y }];
    board.getSurroundingCoordinates(x, y);

    return cellsToUncover;
  };
};
