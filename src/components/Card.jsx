const Card = ({ card, onCardClick, gameState, currentAttemptCards, attemptsLeft }) => { // карточки
  const isRevealed = card.isRevealed;
  const showCorrectImage = isRevealed && card.isCorrect;

  return (
    <div
      className={`
        w-20 h-20 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105
        ${isRevealed ? 'bg-white shadow-lg' : 'bg-gradient-to-br from-blue-500 to-blue-900 shadow-md'}
        ${gameState !== 'playing' || currentAttemptCards >= 3 || attemptsLeft <= 0 ? 'cursor-not-allowed' : ''}
        ${!isRevealed && gameState === 'playing' && currentAttemptCards < 3 ? 'hover:shadow-xl' : ''}
      `}
      onClick={() => onCardClick(card.id)}
    >
      <div className="w-full h-full flex items-center justify-center rounded-lg overflow-hidden">
        {!isRevealed ? (
          <div className="text-white text-2xl font-bold"></div>
        ) : showCorrectImage ? (
          <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
            <div className="text-white text-sm font-bold text-center">✓<br/>МОЄ<br/>ФОТО</div>
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
            <div className="text-white text-xs font-bold">УПС!</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;