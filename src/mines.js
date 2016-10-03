export default (size, amount, generateRandom) => {
  const mines = [];

  while (mines.length < amount) {
    mines.push({
      x: generateRandom(size.x - 1),
      y: generateRandom(size.y - 1)
    });
  }

  return mines;
}
