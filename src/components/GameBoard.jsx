import Card from './Card'

const GameBoard = ({ gameBoard, onCardClick, gameState, currentAttemptCards, attemptsLeft }) => { // контейнер карток
  return (
    <div className="grid grid-cols-4 gap-2 py-4">
      {gameBoard.map((card) => (
        <Card 
          key={card.id} 
          card={card} 
          onCardClick={onCardClick}
          gameState={gameState}
          currentAttemptCards={currentAttemptCards}
          attemptsLeft={attemptsLeft}
        />
      ))}
    </div>
  );
};

export default GameBoard;