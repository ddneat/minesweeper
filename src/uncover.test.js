import assert from 'assert';
import sinon from 'sinon';
import createUncover from './uncover';

suite.only('uncover', () => {
  let board;

  setup(() => {
    board = {
      getCells: sinon.stub(),
      getSurroundingCoordinates: sinon.stub(),
      isInBoard: sinon.stub().returns(true),
    };
  });

  test('createUncover calls board.getCells', () => {
    createUncover(board);
    assert.ok(board.getCells.calledOnce);
  });

  test('uncover calls board.isInBoard with the passed coordinates', () => {
    const uncover = createUncover(board);
    const coordinates = { x: 1, y: 1 };
    uncover(coordinates.x, coordinates.y);
    assert.ok(board.isInBoard.calledOnce);
    assert.deepEqual(board.isInBoard.lastCall.args, [coordinates.x, coordinates.y]);
  });

  test('uncover throws when board.isInBoard returns false', () => {
    board.isInBoard.returns(false);
    const uncover = createUncover(board);
    assert.throws(() => uncover(), /Coordinates not in board/);
  });

  test('uncover calls board.getSurroundingCoordinates with the passed coordinates', () => {
    const uncover = createUncover(board);
    const coordinates = { x: 1, y: 1 };
    uncover(coordinates.x, coordinates.y);
    assert.ok(board.getSurroundingCoordinates.calledOnce);
    assert.deepEqual(board.getSurroundingCoordinates.lastCall.args, [coordinates.x, coordinates.y]);
  });

  test('returns the an array of cells', () => {
    const uncover = createUncover(board);
    const coordinates = { x: 1, y: 1 };
    assert.deepEqual(uncover(coordinates.x, coordinates.y), [
      { x: coordinates.x, y: coordinates.y },
    ]);
  });
});
