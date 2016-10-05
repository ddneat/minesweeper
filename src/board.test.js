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

  test('isMine returns true when coordinates match a mine', () => {
    const size = { x: 2, y: 2 };
    const mines = [{ x: 0, y: 0 }];
    const board = createBoard(size, mines);
    assert.equal(board.isMine(0, 0), true);
  });

  test('isMine returns false when coordinates do not match a mine', () => {
    const size = { x: 2, y: 2 };
    const mines = [{ x: 0, y: 0 }];
    const board = createBoard(size, mines);
    assert.equal(board.isMine(0, 1), false);
  });

  test('isCellInBoard returns true when coordinate x and y are inside the board', () => {
    const size = { x: 2, y: 2 };
    const mines = [];
    const board = createBoard(size, mines);
    assert.equal(board.isCellInBoard(0, 1), true);
  });

  test('isCellInBoard returns false when coordinate x is less than size', () => {
    const size = { x: 2, y: 2 };
    const mines = [];
    const board = createBoard(size, mines);
    assert.equal(board.isCellInBoard(-1, 1), false);
  });

  test('isCellInBoard returns false when coordinate y is less than size', () => {
    const size = { x: 2, y: 2 };
    const mines = [];
    const board = createBoard(size, mines);
    assert.equal(board.isCellInBoard(0, -1), false);
  });

  test('isCellInBoard returns false when coordinate x is higher than size', () => {
    const size = { x: 2, y: 2 };
    const mines = [];
    const board = createBoard(size, mines);
    assert.equal(board.isCellInBoard(2, 1), false);
  });

  test('isCellInBoard returns false when coordinate y is higher than size', () => {
    const size = { x: 2, y: 2 };
    const mines = [];
    const board = createBoard(size, mines);
    assert.equal(board.isCellInBoard(1, 2), false);
  });

  test('getSurroundingCoordinates returns an array of cells', () => {
    const size = { x: 2, y: 2 };
    const mines = [];
    const board = createBoard(size, mines);
    assert.deepEqual(board.getSurroundingCoordinates(1, 2), [
      { x: 0, y: 2 },
      { x: 2, y: 2 },
      { x: 1, y: 3 },
      { x: 1, y: 1 },
      { x: 0, y: 3 },
      { x: 2, y: 3 },
      { x: 0, y: 1 },
      { x: 2, y: 1 },
    ]);
  });
});
