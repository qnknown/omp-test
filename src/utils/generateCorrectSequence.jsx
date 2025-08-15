const generateCorrectSequence = () => {
  const sequences = [];

  // Горизонтальні
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col <= 1; col++) {
      sequences.push([
        { row, col },
        { row, col: col + 1 },
        { row, col: col + 2 }
      ]);
    }
  }

  // Вертикальні
  for (let col = 0; col < 4; col++) {
    for (let row = 0; row <= 1; row++) {
      sequences.push([
        { row, col },
        { row: row + 1, col },
        { row: row + 2, col }
      ]);
    }
  }

  // Діагональні вправо
  for (let row = 0; row <= 1; row++) {
    for (let col = 0; col <= 1; col++) {
      sequences.push([
        { row, col },
        { row: row + 1, col: col + 1 },
        { row: row + 2, col: col + 2 }
      ]);
    }
  }

  // Діагональні вліво
  for (let row = 0; row <= 1; row++) {
    for (let col = 2; col <= 3; col++) {
      sequences.push([
        { row, col },
        { row: row + 1, col: col - 1 },
        { row: row + 2, col: col - 2 }
      ]);
    }
  }

  return sequences[Math.floor(Math.random() * sequences.length)];
};

export default generateCorrectSequence;