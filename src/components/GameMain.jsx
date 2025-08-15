import React, { useState, useEffect } from 'react';
import GameBoard from './GameBoard'
import GameHeader from './GameHeader'
import LoseModal from './LoseModal'
import NoAttemptsScreen from './NoAttemptsScreen'
import UserInfo from './UserInfo'
import WinModal from './WinModal'
import createGameBoard from '../utils/createGameBoard';

const useUserAttempts = (userId) => {
  const [userAttempts, setUserAttempts] = useState({});
  const [attemptsLeft, setAttemptsLeft] = useState(3);

  const loadUserAttempts = (telegramUserId) => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    const savedAttempts = JSON.parse(localStorage.getItem('userAttempts') || '{}');
    
    if (!savedAttempts[telegramUserId]) {
      savedAttempts[telegramUserId] = {};
    }
    
    if (!savedAttempts[telegramUserId][currentMonth]) {
      savedAttempts[telegramUserId][currentMonth] = 3;
    }
    
    setUserAttempts(savedAttempts);
    setAttemptsLeft(savedAttempts[telegramUserId][currentMonth]);
    localStorage.setItem('userAttempts', JSON.stringify(savedAttempts));
  };

  const saveUserAttempts = (newAttemptsLeft) => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    const updatedAttempts = {
      ...userAttempts,
      [userId]: {
        ...userAttempts[userId],
        [currentMonth]: newAttemptsLeft
      }
    };
    setUserAttempts(updatedAttempts);
    setAttemptsLeft(newAttemptsLeft);
    localStorage.setItem('userAttempts', JSON.stringify(updatedAttempts));
  };

  return { attemptsLeft, loadUserAttempts, saveUserAttempts };
};

// Основний компонент гри
const GameMain = () => {
  const [gameBoard, setGameBoard] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [correctCards, setCorrectCards] = useState([]);
  const [gameState, setGameState] = useState('playing');
  const [userId, setUserId] = useState(null);
  const [currentAttemptCards, setCurrentAttemptCards] = useState(0);
  
  const { attemptsLeft, loadUserAttempts, saveUserAttempts } = useUserAttempts(userId);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    tg?.ready();

    console.log("InitDataUnsafe:", tg?.initDataUnsafe);
    console.log("User ID:", tg?.initDataUnsafe?.user?.id);
    
    const telegramUserId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id || '123456';
    setUserId(telegramUserId);
    loadUserAttempts(telegramUserId);
    initializeGame();
  }, []);

  const initializeGame = () => {
    const board = createGameBoard();
    setGameBoard(board);
    setSelectedCards([]);
    setCorrectCards([]);
    setCurrentAttemptCards(0);
    setGameState('playing');
  };

  const handleCardClick = (cardId) => {
    if (gameState !== 'playing' || attemptsLeft <= 0) return;
    if (currentAttemptCards >= 3) return;
    
    const card = gameBoard.find(c => c.id === cardId);
    if (card.isSelected || card.isRevealed) return;

    const newBoard = gameBoard.map(c => 
      c.id === cardId ? { ...c, isSelected: true, isRevealed: true } : c
    );
    setGameBoard(newBoard);
    
    const newSelectedCards = [...selectedCards, cardId];
    setSelectedCards(newSelectedCards);
    setCurrentAttemptCards(currentAttemptCards + 1);

    if (newSelectedCards.length === 3) {

      checkAttempt(newSelectedCards);

    }
  };

  const checkAttempt = (selectedCardIds) => {
    const correctCount = selectedCardIds.filter(id => {
      const card = gameBoard.find(c => c.id === id);
      return card.isCorrect;
    }).length;


    if (correctCount === 3) {
      setGameState('won');
    } else {
      const newAttemptsLeft = attemptsLeft - 1;
      saveUserAttempts(newAttemptsLeft);

      if (newAttemptsLeft === 0) {
        setGameState('lost');
      } else {
        setGameState('attempt_failed');
      }
    }

  };

  const nextAttempt = () => {
    const newBoard = gameBoard.map(card => ({
      ...card,
      isSelected: false,
      isRevealed: false
    }));
    setGameBoard(newBoard);
    setSelectedCards([]);
    setCurrentAttemptCards(0);
    setGameState('playing');
  };

  const resetGame = () => {
    if (attemptsLeft > 0) {
      initializeGame();
    }
  };

  // Якщо спроби закінчились
  if (attemptsLeft <= 0 && gameState === 'lost') {
    return <NoAttemptsScreen userId={userId} />;
  }

  return (
    <div className="min-h-screen bg-[#1F1F1F] p-4">
      <div className="max-w-md mx-auto flex flex-col items-center">
        <GameHeader attemptsLeft={attemptsLeft} />
        <GameBoard 
          gameBoard={gameBoard}
          onCardClick={handleCardClick}
          gameState={gameState}
          currentAttemptCards={currentAttemptCards}
          attemptsLeft={attemptsLeft}
        />
        <UserInfo userId={userId} />

        <WinModal 
          isVisible={gameState === 'won'}
          onNewGame={resetGame}
        />
        <LoseModal 
          isVisible={gameState === 'attempt_failed'}
          attemptsLeft={attemptsLeft}
          onRetry={nextAttempt}
        />
      </div>
    </div>
  );
};

export default GameMain;