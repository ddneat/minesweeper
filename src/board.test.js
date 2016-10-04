import assert from 'assert';
import createBoard from './board';

suite('board', () => {
  test('generate size', () => {
    const size = { x: 5, y: 4 };
    const mines = [];
    const board = createBoard(size, mines);
    assert.deepEqual(board.getCells(), [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
  });

  test('place mines', () => {
    const size = { x: 2, y: 2 };
    const mines = [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 0 }];
    const board = createBoard(size, mines);
    assert.deepEqual(board.getCells(), [
      ['mine', 'mine'],
      ['mine', 'mine'],
    ]);
  });

  test('adjacent cell count with one mine', () => {
    const size = { x: 2, y: 2 };
    const mines = [{ x: 1, y: 0 }];
    const board = createBoard(size, mines);
    assert.deepEqual(board.getCells(), [
      [1, 1],
      ['mine', 1],
    ]);
  });

  test('adjacent cell count with multiple mines', () => {
    const size = { x: 2, y: 2 };
    const mines = [{ x: 1, y: 0 }, { x: 0, y: 1 }];
    const board = createBoard(size, mines);
    assert.deepEqual(board.getCells(), [
      [2, 'mine'],
      ['mine', 2],
    ]);
  });

  test('throws an error when mine position x is higher than the board size', () => {
    const size = { x: 2, y: 2 };
    const mines = [{ x: 5, y: 0 }];
    assert.throws(() => createBoard(size, mines), /Mine 0 outside the board/);
  });

  test('throws an error when mine position y is higher than the board size', () => {
    const size = { x: 2, y: 2 };
    const mines = [{ x: 1, y: 2 }];
    assert.throws(() => createBoard(size, mines), /Mine 0 outside the board/);
  });
});
