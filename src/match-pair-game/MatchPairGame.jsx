import { useEffect, useRef, useState } from 'react';
import './matchpairGame.css';

const CARD_DATA = Array.from({ length: 8 }, (_, index) => index + 1);

const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const generateCards = () => {
  const cards = shuffleArray([...CARD_DATA, ...CARD_DATA]);
  return cards.map((card, index) => ({
    id: `${card}_${index}`,
    value: card,
    revealed: false,
    matched: false,
  }));
};

const MemoryPairGame = () => {
  const [cards, setCards] = useState(generateCards());
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);
  const [disableAllCards, setDisableAllCards] = useState(false);
  const timerRef = useRef(null);

  const checkGameStatus = (first, second) => {
    if (first.value === second.value) {
      setCards(prev => {
        const updatedCards = prev.map(c =>
          c?.value === first?.value ? { ...c, matched: true } : c
        );
        return updatedCards;
      });
      resetCardFlip();
    } else {
      setDisableAllCards(true);
      timerRef.current = setTimeout(() => {
        setCards(prev => {
          const updatedCards = prev.map(c =>
            c?.id === first?.id || c?.id === second?.id
              ? { ...c, revealed: false }
              : c
          );
          return updatedCards;
        });
        resetCardFlip();
      }, 1000);
    }
  };

  const handleClick = card => {
    if (
      disableAllCards ||
      card?.revealed ||
      card?.matched ||
      firstCard?.id === card?.id ||
      secondCard?.id === card?.id
    )
      return;

    setCards(prev => {
      const updatedCards = prev.map(c =>
        c?.id === card?.id ? { ...c, revealed: true } : c
      );
      return updatedCards;
    });

    if (!firstCard) {
      setFirstCard(card);
    } else if (!secondCard) {
      setSecondCard(card);
      setMoves(prev => prev + 1);
    }
  };

  const resetCardFlip = () => {
    setFirstCard(null);
    setSecondCard(null);
    setDisableAllCards(false);
  };

  const handleResetGame = () => {
    setCards(generateCards());
    setMoves(0);
    setWon(false);
    resetCardFlip();
    clearTimeout(timerRef.current);
  };

  useEffect(() => {
    if (firstCard && secondCard) {
      checkGameStatus(firstCard, secondCard);
    }
  }, [firstCard, secondCard]);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    const allMatched = cards.every(card => card.matched);

    if (allMatched) {
      setWon(true);
    }
  }, [cards]);

  return (
    <div className="game-container">
      <h1>Match Pair Game</h1>
      <div className="grid">
        {cards.map(card => (
          <div
            key={card?.id}
            className={`card ${
              card?.matched ? 'matched' : card?.revealed ? 'revealed' : ''
            }`}
            onClick={() => handleClick(card)}
          >
            {(card?.revealed || card?.matched) && card.value}
          </div>
        ))}
      </div>
      <p>Moves: {moves}</p>
      {won && <p className="won">🎉 You won!</p>}
      <button onClick={handleResetGame} className="reset-button">
        Reset
      </button>
    </div>
  );
};

export default MemoryPairGame;
