import createBoard from './board';
import createMines from './mines';
import createUncover from './uncover';

const boardSize = { x: 20, y: 20 };
const amountMines = parseInt(boardSize.x * boardSize.y * 0.2, 10);

const generateRandom = max => Math.floor(Math.random() * (max + 1));

const mines = createMines(boardSize, amountMines, generateRandom);
const board = createBoard(boardSize, mines);
const uncover = createUncover(board);
const cells = board.getCells();

const cellNodes = {};
const rootNode = document.createElement('div');
rootNode.className = 'app';
document.body.appendChild(rootNode);

const scoreNode = document.createElement('div');
scoreNode.className = 'score';
rootNode.appendChild(scoreNode);

let markedCount = 0;
scoreNode.textContent = markedCount;

const markCell = (e) => {
  e.preventDefault();
  if (e.target.className === 'cell-marked') {
    markedCount -= 1;
    scoreNode.textContent = markedCount;
    e.target.setAttribute('class', '');
  } else if (e.target.className === '') {
    markedCount += 1;
    scoreNode.textContent = markedCount;
    e.target.setAttribute('class', 'cell-marked');
  }
};

const gameOver = () => {
  const overlayNode = document.createElement('div');
  const headerNode = document.createElement('div');
  const textNode = document.createElement('h1');
  const buttonNode = document.createElement('button');
  overlayNode.setAttribute('class', 'game-over');
  textNode.textContent = 'Boooom! Game Over.';
  buttonNode.textContent = 'Replay';
  buttonNode.addEventListener('click', () => document.location.reload());
  headerNode.appendChild(textNode);
  headerNode.appendChild(buttonNode);
  overlayNode.appendChild(headerNode);
  rootNode.appendChild(overlayNode);
};

const unveilCell = (e) => {
  if (e.target.className === 'cell-marked') return;
  const coordinates = e.target.getAttribute('cell');
  const cellIndices = coordinates.split('|');
  const cellsToUncover = uncover(parseInt(cellIndices[0], 10), parseInt(cellIndices[1], 10));
  cellsToUncover.forEach((cell) => {
    const cellValue = cells[cell.x][cell.y];
    const cellNode = cellNodes[`${cell.x}|${cell.y}`];
    if (cellNode.className === 'cell-marked') return;
    const cellType = cellValue === 'm' ? gameOver() && 'mine' : cellValue;
    cellNode.setAttribute('class', `cell-${cellType}`);
    cellNode.textContent = cellValue;
  });
};

cells.forEach((row, x) => {
  const rowNode = document.createElement('div');
  row.forEach((cell, y) => {
    const cellNode = document.createElement('button');
    const coordinates = `${x}|${y}`;
    cellNodes[coordinates] = cellNode;
    cellNode.setAttribute('cell', coordinates);
    cellNode.textContent = '?';
    cellNode.addEventListener('click', unveilCell);
    cellNode.addEventListener('contextmenu', markCell);
    rowNode.appendChild(cellNode);
  });
  rootNode.appendChild(rowNode);
});
