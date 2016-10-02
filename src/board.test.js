import assert from 'assert';
import createBoard from './board';

suite('board', () => {
  test('generate size', () => {
    const size = { x: 2, y: 2 };
    const mines = [];
    assert.deepEqual(createBoard(size, mines), [
      [0, 0],
      [0, 0],
    ]);
  });

  test('place mines', () => {
    const size = { x: 2, y: 2 };
    const mines = [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 0 }];
    assert.deepEqual(createBoard(size, mines), [
      ['mine', 'mine'],
      ['mine', 'mine'],
    ]);
  });

  test('adjacent cell count with one mine', () => {
    const size = { x: 2, y: 2 };
    const mines = [{ x: 1, y: 0 }];
    assert.deepEqual(createBoard(size, mines), [
      [1, 1],
      ['mine', 1],
    ]);
  });

  test('adjacent cell count with multiple mines', () => {
    const size = { x: 2, y: 2 };
    const mines = [{ x: 1, y: 0 }, { x: 0, y: 1 }];
    assert.deepEqual(createBoard(size, mines), [
      [2, 'mine'],
      ['mine', 2],
    ]);
  });
});
