import generateCorrectSequence from "./generateCorrectSequence";

const createGameBoard = () => {
  const board = Array(16).fill().map((_, index) => ({
    id: index,
    isCorrect: false,
    isSelected: false,
    isRevealed: false,
    position: { row: Math.floor(index / 4), col: index % 4 }
  }));

  const correctPositions = generateCorrectSequence();
  correctPositions.forEach(pos => {
    const index = pos.row * 4 + pos.col;
    board[index].isCorrect = true;
  });

  return board;
};

export default createGameBoard;