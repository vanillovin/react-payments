import React from 'react';
import {
  useCardInMaking,
  useSetCardInMaking,
  useCompletedCards,
  useSetCompletedCards,
} from '../context';

const CardList = ({ goToPage }) => {
  const cardInMaking = useCardInMaking();
  const setCardInMaking = useSetCardInMaking();
  const cards = useCompletedCards();
  const setCards = useSetCompletedCards();
  console.log('CardList cardInMaking', cardInMaking);

  const deleteCard = id => {
    setCards(prev => prev.filter(card => card.id !== id));
  };

  const test = card => {
    setCardInMaking({
      ...card,
    });
    goToPage(2);
  };

  return (
    <div className="app flex-column-center">
      <div className="flex-center">
        <h2 className="page-title mb-10">보유 카드</h2>
      </div>

      {cards.map(card => (
        <div key={card.id} style={{ textAlign: 'center' }}>
          <div
            className="card-box"
            onClick={() => test(card)}
            style={{ cursor: 'pointer' }}
          >
            <div className={`small-card ${card.cardNickname}`}>
              <div className="card-top">
                <span className="card-text">{card.cardNickname}카드</span>
              </div>
              <div className="card-middle">
                <div className="small-card__chip"></div>
              </div>
              <div className="card-bottom">
                <div className="card-bottom__number">
                  <span
                    className="card-text"
                    style={{ letterSpacing: 2, wordSpacing: 2 }}
                  >
                    {`${card.cardNums.split('-')[0]} ${
                      card.cardNums.split('-')[1]
                    } ⦁⦁⦁⦁ ⦁⦁⦁⦁`}
                  </span>
                </div>
                <div className="card-bottom__info">
                  <span className="card-text">{card.username}</span>
                  <span className="card-text">
                    {card.expirationMonth} / {card.expirationYear}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <span className="card-nickname">{card.cardname}카드</span>
          <button
            className="delete-card-btn"
            onClick={() => deleteCard(card.id)}
          >
            ❌
          </button>
        </div>
      ))}

      <div className="card-box" onClick={() => goToPage(1)}>
        <div className="empty-card">+</div>
      </div>
    </div>
  );
};

export default CardList;
