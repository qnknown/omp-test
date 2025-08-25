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

    if (savedAttempts[telegramUserId][currentMonth] === undefined) {
      savedAttempts[telegramUserId][currentMonth] = 3;
      localStorage.setItem('userAttempts', JSON.stringify(savedAttempts));
    }

    setUserAttempts(savedAttempts);
    setAttemptsLeft(savedAttempts[telegramUserId][currentMonth]);
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

const GameMain = () => {
  const [gameBoard, setGameBoard] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [correctCards, setCorrectCards] = useState([]);
  const [gameState, setGameState] = useState('playing');
  const [userId, setUserId] = useState(null);
  const [currentAttemptCards, setCurrentAttemptCards] = useState(0);
  const [attemptNumber, setAttemptNumber] = useState(1);
  
  const { attemptsLeft, loadUserAttempts, saveUserAttempts } = useUserAttempts(userId);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const telegramUserId = urlParams.get('userId') || '123456';
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
    setAttemptNumber(1);
  };

  const makeAllCardsCorrect = () => {
    const updatedBoard = gameBoard.map(card => ({
      ...card,
      isCorrect: true
    }));
    setGameBoard(updatedBoard);
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
      setTimeout(() => {
        checkAttempt(newSelectedCards);
      }, 1500);
    }
  };

  // const sendWinData = async (userId) => {
  //   try {
  //     const now = new Date();
  //     const day = now.getDate().toString().padStart(2, '0');
  //     const month = (now.getMonth() + 1).toString().padStart(2, '0');
  //     const year = now.getFullYear();
  //     const hours = now.getHours().toString().padStart(2, '0');
  //     const minutes = now.getMinutes().toString().padStart(2, '0');
  //     const seconds = now.getSeconds().toString().padStart(2, '0');
      
  //     const dateTimeString = `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
  //     const id = `${dateTimeString}-${userId}`;
  //     const value = `${dateTimeString}|${userId}|100|Вгадайка`;

  //     const response = await fetch('https://api.pipe.bot/data/callback?apikey=8f3e548af868603d5219289ad7d0ceb3&var=new_data2log&did=3098', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         id: id,
  //         value: value
  //       })
  //     });

  //     console.log('Win data sent successfully:', { id, value });
  //   } catch (error) {
  //     console.error('Error sending win data:', error);
  //   }
  // };

  const checkAttempt = (selectedCardIds) => {
    const correctCount = selectedCardIds.filter(id => {
      const card = gameBoard.find(c => c.id === id);
      return card.isCorrect;
    }).length;

    if (correctCount === 3) {
      setGameState('won');
      saveUserAttempts(0);
      sendWinData(userId);
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

    const nextAttemptNum = attemptNumber + 1;
    setAttemptNumber(nextAttemptNum);

    const winAttempt = Math.random() < 0.5 ? 2 : 3;

    if (nextAttemptNum >= winAttempt) {
      makeAllCardsCorrect();
    }

    const newBoard = gameBoard.map(card => ({
      ...card,
      isSelected: false,
      isRevealed: false,

      isCorrect: nextAttemptNum >= winAttempt ? true : card.isCorrect
    }));
    
    setGameBoard(newBoard);
    setSelectedCards([]);
    setCurrentAttemptCards(0);
    setGameState('playing');
  };

  // const resetGame = () => {
  //   if (attemptsLeft > 0) {
  //     initializeGame();
  //   }
  // };


  if (attemptsLeft <= 0 && gameState === 'lost') {
    return <NoAttemptsScreen userId={userId} />;
  }

  return (
    <div className="h-screen bg-[#1F1F1F] p-4 flex items-center justify-center">
      <div className="max-w-md w-full flex flex-col items-center">
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