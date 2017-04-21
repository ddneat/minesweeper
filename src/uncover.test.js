import test from 'tropic';
import assert from 'assert';
import sinon from 'sinon';
import createUncover from './uncover';

const createBoard = () => {
  const cells = [
    [],
  ];
  return {
    getCells: sinon.stub().returns(cells),
    getSurroundingCoordinates: sinon.stub(),
    isInBoard: sinon.stub().returns(true),
  };
};

test('createUncover calls board.getCells', () => {
  const board = createBoard();
  createUncover(board);
  assert.ok(board.getCells.calledOnce);
});

test('calls board.isInBoard with the passed coordinates', () => {
  const board = createBoard();
  const uncover = createUncover(board);
  const coordinates = { x: 0, y: 0 };
  uncover(coordinates.x, coordinates.y);
  assert.ok(board.isInBoard.calledOnce);
  assert.deepEqual(board.isInBoard.lastCall.args, [coordinates.x, coordinates.y]);
});

test('throws when board.isInBoard returns false', () => {
  const board = createBoard();
  board.isInBoard.returns(false);
  const uncover = createUncover(board);
  assert.throws(() => uncover(), /Coordinates not in board/);
});

test('returns the an array of cells containing the cell with the passed coordinates', () => {
  const board = createBoard();
  const uncover = createUncover(board);
  const coordinates = { x: 0, y: 0 };
  assert.deepEqual(uncover(coordinates.x, coordinates.y), [
    { x: coordinates.x, y: coordinates.y },
  ]);
});

test('calls board.getSurroundingCoordinates when the target cell has the value 0', () => {
  const board = createBoard();
  board.getCells.returns([[0], [0]]);
  board.getSurroundingCoordinates.returns([]);
  const uncover = createUncover(board);
  const coordinates = { x: 0, y: 0 };
  uncover(coordinates.x, coordinates.y);
  assert.ok(board.getSurroundingCoordinates.calledOnce);
  assert.deepEqual(board.getSurroundingCoordinates.lastCall.args, [coordinates.x, coordinates.y]);
});

test('does not call board.getSurroundingCoordinates when the target cell has the value 1', () => {
  const board = createBoard();
  board.getCells.returns([[0], [1]]);
  const uncover = createUncover(board);
  const coordinates = { x: 0, y: 1 };
  uncover(coordinates.x, coordinates.y);
  assert.equal(board.getSurroundingCoordinates.callCount, false);
});

test('returns an array of cells containing all surrounding 0 cells and their surroundings', () => {
  const board = createBoard();
  board.getCells.returns([[0], [1]]);
  board.isInBoard.onCall(3).returns(false);
  board.getSurroundingCoordinates.onCall(0).returns([{ x: 1, y: 0 }]);
  board.getSurroundingCoordinates.onCall(1).returns([{ x: 1, y: 1 }]);
  board.getSurroundingCoordinates.returns([]);
  const uncover = createUncover(board);
  const coordinates = { x: 0, y: 0 };

  assert.deepEqual(uncover(coordinates.x, coordinates.y), [
    { x: coordinates.x, y: coordinates.y },
    { x: 1, y: 0 },
  ]);
});
