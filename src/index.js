import createBoard from './board';
import createMines from './mines';

const boardSize = { x: 10, y: 10 };
const amountMines = 20;

const generateRandom = max => Math.floor(Math.random() * (max + 1));

const mines = createMines(boardSize, amountMines, generateRandom);
const board = createBoard(boardSize, mines);
const cells = board.getCells();

const cellNodes = {};
const rootNode = document.createElement('div');
rootNode.className = 'app';
document.body.appendChild(rootNode);

const markCell = (e) => {
  e.preventDefault();
  e.target.setAttribute('class', 'cell-marked');
};

const unveilCell = (e) => {
  const coordinates = e.target.getAttribute('cell');
  const cellNode = cellNodes[coordinates];
  const cellIndices = coordinates.split('|');
  const cellValue = cells[cellIndices[0]][cellIndices[1]];
  cellNode.setAttribute('class', `cell-${cellValue}`);
  cellNode.textContent = cellValue;
  cellNode.removeEventListener('contextmenu', markCell);
};

cells.forEach((row, x) => {
  const rowNode = document.createElement('div');
  row.forEach((cell, y) => {
    const cellNode = document.createElement('button');
    const coordinates = `${x}|${y}`;
    cellNode.setAttribute('cell', coordinates);
    cellNodes[coordinates] = cellNode;
    cellNode.textContent = '?';
    cellNode.addEventListener('click', unveilCell);
    cellNode.addEventListener('contextmenu', markCell);
    rowNode.appendChild(cellNode);
  });
  rootNode.appendChild(rowNode);
});
