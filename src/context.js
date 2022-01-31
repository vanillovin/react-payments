// 추가가 아니라 업데이트?!
// 업데이트된 데이터를 넘긴다
import React, { createContext, useState, useContext } from 'react';
import uuid from './uuid';

const MyContext = createContext(null);

export function MyProvider({ children }) {
  const [cardInMaking, setCardInMaking] = useState(null);
  const [completedCards, setCompletedCards] = useState([
    {
      id: uuid(),
      cardNickname: '포코',
      cardNums: '1111-2222-3333-4444',
      expirationMonth: '04',
      expirationYear: '21',
      username: 'SUN',
      securityCode: '',
      password: '',
      cardname: '법카',
    },
  ]);

  return (
    <MyContext.Provider
      value={{
        completedCards,
        cardInMaking,
        setCompletedCards,
        setCardInMaking,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export function useCompletedCards() {
  const { completedCards } = useContext(MyContext);
  return completedCards;
}

export function useSetCompletedCards() {
  const { setCompletedCards } = useContext(MyContext);
  return setCompletedCards;
}

export function useCardInMaking() {
  const { cardInMaking } = useContext(MyContext);
  return cardInMaking;
}

export function useSetCardInMaking() {
  const { setCardInMaking } = useContext(MyContext);
  return setCardInMaking;
}
