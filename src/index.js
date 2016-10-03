import createBoard from './board';
import createMines from './mines';

const rootNode = document.createElement('div');
document.body.appendChild(rootNode);

const boardSize = { x: 10, y: 10 };
const amountMines = 4;

const generateRandom = (max) => Math.floor(Math.random() * (max + 1));

const mines = createMines(boardSize, amountMines, generateRandom);
const board = createBoard(boardSize, mines);

board.forEach(row => {
  const rowNode = document.createElement('div');
  row.forEach(cell => {
    const cellNode = document.createElement('button');
    cellNode.textContent = cell;
    rowNode.appendChild(cellNode);
  });
  rootNode.appendChild(rowNode);
});
