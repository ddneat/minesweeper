(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (size, mines) {
  var board = [];

  while (board.length < size.y) {
    board.push([]);
    while (board[board.length - 1].length < size.x) {
      board[board.length - 1].push(0);
    }
  }

  var setMine = function setMine(x, y) {
    return board[x][y] = 'm';
  };
  var isMine = function isMine(x, y) {
    return board[x][y] === 'm';
  };
  var isInBoard = function isInBoard(x, y) {
    return x >= 0 && x < size.x && y >= 0 && y < size.y;
  };
  var getSurroundingCoordinates = function getSurroundingCoordinates(x, y) {
    return [{ x: x - 1, y: y }, { x: x + 1, y: y }, { x: x, y: y + 1 }, { x: x, y: y - 1 }, { x: x - 1, y: y + 1 }, { x: x + 1, y: y + 1 }, { x: x - 1, y: y - 1 }, { x: x + 1, y: y - 1 }];
  };

  mines.forEach(function (_ref, index) {
    var x = _ref.x;
    var y = _ref.y;

    if (!isInBoard(x, y)) {
      throw new Error('Mine ' + index + ' outside the board');
    }

    setMine(x, y);
    getSurroundingCoordinates(x, y).filter(function (cell) {
      return isInBoard(cell.x, cell.y) && !isMine(cell.x, cell.y);
    }).map(function (cell) {
      return board[cell.x][cell.y] += 1;
    });
  });

  return {
    getCells: function getCells() {
      return board;
    },
    isMine: isMine,
    isInBoard: isInBoard,
    getSurroundingCoordinates: getSurroundingCoordinates
  };
};

},{}],2:[function(require,module,exports){
'use strict';

var _board = require('./board');

var _board2 = _interopRequireDefault(_board);

var _mines = require('./mines');

var _mines2 = _interopRequireDefault(_mines);

var _uncover = require('./uncover');

var _uncover2 = _interopRequireDefault(_uncover);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var boardSize = { x: 20, y: 20 };
var amountMines = parseInt(boardSize.x * boardSize.y * 0.2, 10);

var generateRandom = function generateRandom(max) {
  return Math.floor(Math.random() * (max + 1));
};

var mines = (0, _mines2.default)(boardSize, amountMines, generateRandom);
var board = (0, _board2.default)(boardSize, mines);
var uncover = (0, _uncover2.default)(board);
var cells = board.getCells();

var cellNodes = {};
var rootNode = document.createElement('div');
rootNode.className = 'app';
document.body.appendChild(rootNode);

var scoreNode = document.createElement('div');
scoreNode.className = 'score';
rootNode.appendChild(scoreNode);

var markedCount = 0;
scoreNode.textContent = markedCount;

var markCell = function markCell(e) {
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

var gameOver = function gameOver() {
  var overlayNode = document.createElement('div');
  var headerNode = document.createElement('div');
  var textNode = document.createElement('h1');
  var buttonNode = document.createElement('button');
  overlayNode.setAttribute('class', 'game-over');
  textNode.textContent = 'Boooom! Game Over.';
  buttonNode.textContent = 'Replay';
  buttonNode.addEventListener('click', function () {
    return document.location.reload();
  });
  headerNode.appendChild(textNode);
  headerNode.appendChild(buttonNode);
  overlayNode.appendChild(headerNode);
  rootNode.appendChild(overlayNode);
};

var unveilCell = function unveilCell(e) {
  if (e.target.className === 'cell-marked') return;
  var coordinates = e.target.getAttribute('cell');
  var cellIndices = coordinates.split('|');
  var cellsToUncover = uncover(parseInt(cellIndices[0], 10), parseInt(cellIndices[1], 10));
  cellsToUncover.forEach(function (cell) {
    var cellValue = cells[cell.x][cell.y];
    var cellNode = cellNodes[cell.x + '|' + cell.y];
    if (cellNode.className === 'cell-marked') return;
    var cellType = cellValue === 'm' ? gameOver() && 'mine' : cellValue;
    cellNode.setAttribute('class', 'cell-' + cellType);
    cellNode.textContent = cellValue;
  });
};

cells.forEach(function (row, x) {
  var rowNode = document.createElement('div');
  row.forEach(function (cell, y) {
    var cellNode = document.createElement('button');
    var coordinates = x + '|' + y;
    cellNodes[coordinates] = cellNode;
    cellNode.setAttribute('cell', coordinates);
    cellNode.textContent = '?';
    cellNode.addEventListener('click', unveilCell);
    cellNode.addEventListener('contextmenu', markCell);
    rowNode.appendChild(cellNode);
  });
  rootNode.appendChild(rowNode);
});

},{"./board":1,"./mines":3,"./uncover":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (size, amount, generateRandom) {
  var mines = [];

  var isNotUnique = function isNotUnique(mine) {
    return mines.some(function (_ref) {
      var x = _ref.x;
      var y = _ref.y;
      return x === mine.x && y === mine.y;
    });
  };

  var candidate = void 0;
  while (mines.length < amount) {
    do {
      candidate = {
        x: generateRandom(size.x - 1),
        y: generateRandom(size.y - 1)
      };
    } while (isNotUnique(candidate));
    mines.push(candidate);
  }

  return mines;
};

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (board) {
  var cells = board.getCells();

  return function (x, y) {
    if (!board.isInBoard(x, y)) {
      throw new Error('Coordinates not in board');
    }

    var cellsToUncover = [];

    var isAlreadyInArray = function isAlreadyInArray(coordinate) {
      return cellsToUncover.some(function (cell) {
        return cell.x === coordinate.x && cell.y === coordinate.y;
      });
    };

    var uncoverCoordinate = function uncoverCoordinate(coordinate) {
      cellsToUncover.push({ x: coordinate.x, y: coordinate.y });

      if (cells[coordinate.x][coordinate.y] === 0) {
        board.getSurroundingCoordinates(coordinate.x, coordinate.y).filter(function (cell) {
          return board.isInBoard(cell.x, cell.y) && !isAlreadyInArray(cell);
        }).map(function (cell) {
          return uncoverCoordinate(cell);
        });
      }
    };

    uncoverCoordinate({ x: x, y: y });

    return cellsToUncover;
  };
};

},{}]},{},[2]);
