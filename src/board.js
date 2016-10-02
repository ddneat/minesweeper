export default (size, mines) => {
  const board = [];

  while (board.length < size.x) {
    board.push([]);
    while (board[board.length - 1] <= size.y) {
      board[board.length - 1].push(0);
    }
  }

  const isMine = ({ x, y }) => board[x][y] === 'mine';
  const isInBoard = ({ x, y }) => (
    x >= 0 && x < size.x &&
    y >= 0 && y < size.y
  );

  mines.forEach(({ x, y }) => {
    board[x][y] = 'mine';

    const adjacentCells = [
      { x: x - 1, y },
      { x: x + 1, y },
      { x, y: y + 1 },
      { x, y: y - 1 },
      { x: x - 1, y: y + 1 },
      { x: x + 1, y: y + 1 },
      { x: x - 1, y: y - 1 },
      { x: x + 1, y: y - 1 },
    ];

    adjacentCells
      .filter(cell => isInBoard(cell) && !isMine(cell))
      .map(cell => (board[cell.x][cell.y] += 1));
  });

  return board;
};
