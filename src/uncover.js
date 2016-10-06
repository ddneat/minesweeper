export default (board) => {
  const cells = board.getCells();

  return (x, y) => {
    if (!board.isInBoard(x, y)) {
      throw new Error('Coordinates not in board');
    }

    const cellsToUncover = [];

    const isAlreadyInArray = coordinate => cellsToUncover.some(
      cell => cell.x === coordinate.x && cell.y === coordinate.y
    );

    const uncoverCoordinate = (coordinate) => {
      cellsToUncover.push({ x: coordinate.x, y: coordinate.y });

      if (cells[coordinate.x][coordinate.y] === 0) {
        board.getSurroundingCoordinates(coordinate.x, coordinate.y)
          .filter(cell => board.isInBoard(cell.x, cell.y) && !isAlreadyInArray(cell))
          .map(cell => uncoverCoordinate(cell));
      }
    };

    uncoverCoordinate({ x, y });

    return cellsToUncover;
  };
};
