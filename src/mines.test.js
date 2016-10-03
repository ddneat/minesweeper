import assert from 'assert';
import sinon from 'sinon';
import createMines from './mines';

suite('mines', () => {
  test('returns an array with the right amount of mines', () => {
    const size = { x: 2, y: 2 };
    const amount = 2;
    const generateRandom = () => {};
    assert.equal(createMines(size, amount, generateRandom).length, 2);
  });

  test('calls generateRandom with the amount of columns and rows', () => {
    const size = { x: 5, y: 2 };
    const amount = 2;
    const generateRandom = sinon.stub();

    createMines(size, amount, generateRandom);
    assert.deepEqual(generateRandom.getCall(0).args, [4]);
    assert.deepEqual(generateRandom.getCall(1).args, [1]);
  });

  test('returns an array with mines containing random coordinates', () => {
    const size = { x: 2, y: 2 };
    const amount = 2;
    const generateRandom = sinon.stub();

    generateRandom.onCall(0).returns(0);
    generateRandom.onCall(1).returns(2);
    generateRandom.onCall(2).returns(1);
    generateRandom.onCall(3).returns(5);

    assert.deepEqual(createMines(size, amount, generateRandom), [
      { x: 0, y: 2 },
      { x: 1, y: 5 }
    ]);
  });
});
