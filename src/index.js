import createBoard from './board';
import createMines from './mines';

const boardSize = { x: 10, y: 10 };
const amountMines = 10;

const generateRandom = (max) => Math.floor(Math.random() * (max + 1));

const mines = createMines(boardSize, amountMines, generateRandom);
const board = createBoard(boardSize, mines);


const rootNode = document.createElement('div');
rootNode.className = 'app';
document.body.appendChild(rootNode);

const unveilCell = (cell, cellNode) => {
  cellNode.className = 'cell-' + cell;
  cellNode.textContent = cell;
};

const markCell = (e, cellNode) => {
  e.preventDefault();
  cellNode.className = 'cell-marked';
};

board.forEach((row, x) => {
  const rowNode = document.createElement('div');
  row.forEach((cell, y) => {
    const cellNode = document.createElement('button');
    cellNode.textContent = '?';
    cellNode.addEventListener('click', () => unveilCell(board[x][y], cellNode));
    cellNode.addEventListener('contextmenu', e => markCell(e, cellNode));
    rowNode.appendChild(cellNode);
  });
  rootNode.appendChild(rowNode);
});
