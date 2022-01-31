import React, { useState } from 'react';
import {
  useCardInMaking,
  useCompletedCards,
  useSetCompletedCards,
} from '../context';

const CompleteCard = ({ goToPage }) => {
  const cardInMaking = useCardInMaking();
  const cards = useCompletedCards();
  const setCards = useSetCompletedCards();
  console.log('CompleteCard cardInaMaking', cardInMaking, '/ cards', cards);

  const {
    id,
    cardNums, // "4444-4444-1111-1111"
    expirationMonth, // "11"
    expirationYear, //"11"
    username, // "ㅇㅇㅇ"
    cardNickname, // 카드사이름
  } = cardInMaking;

  const [cardname, setCardname] = useState('');

  const complete = () => {
    // prev돌면서 inmakingId 와 prev.id와 같으면 그 id에 해당하는 객체의 cardname을 수정하고 아니면 추가

    // if 선언적 왜안좋은지생각
    if (cards.some(card => card.id === id)) {
      // id가 같은 기존 카드의 cardname을 수정
      setCards(prev =>
        prev.map(card =>
          card.id === id
            ? { ...card, cardname: cardname || cardNickname }
            : card,
        ),
      );
    } else {
      // 카드를 생성
      setCards(prev => [
        ...prev,
        { ...cardInMaking, cardname: cardname || cardNickname },
      ]);
    }

    goToPage(0);
  };

  return (
    <div className="app flex-column-center">
      <button onClick={() => goToPage(1)}>{'<'}</button>
      <div className="flex-center">
        <h2 className="page-title mb-10">카드등록이 완료되었습니다.</h2>
      </div>
      <div className="card-box">
        <div className={`big-card ${cardNickname}`}>
          <div className="card-top">
            <span className="card-text__big">{cardNickname}카드</span>
          </div>
          <div className="card-middle">
            <div className="big-card__chip"></div>
          </div>
          <div className="card-bottom">
            <div className="card-bottom__number">
              <span
                className="card-text__big"
                style={{ letterSpacing: 3, wordSpacing: 5 }}
              >
                {cardNums.split('-')[0]} {cardNums.split('-')[1]} ⦁⦁⦁⦁ ⦁⦁⦁⦁
              </span>
            </div>
            <div className="card-bottom__info">
              <span className="card-text__big">{username}</span>
              <span className="card-text__big">
                {expirationMonth} / {expirationYear}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="input-container flex-center w-100">
        <input
          value={cardname}
          onChange={e => setCardname(e.target.value)}
          className="input-underline w-75"
          type="text"
          placeholder="카드의 별칭을 입력해주세요."
          maxLength={10}
        />
      </div>

      <div className="button-box mt-50" onClick={complete}>
        <span className="button-text">다음</span>
      </div>
    </div>
  );
};

export default CompleteCard;
