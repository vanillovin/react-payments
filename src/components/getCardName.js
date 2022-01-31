export const getCardName = (cardNum1, cardNum2) => {
  if (cardNum1 === '1111' && cardNum2 === '1111') return '포코';
  if (cardNum1 === '2222' && cardNum2 === '2222') return '준';
  if (cardNum1 === '3333' && cardNum2 === '3333') return '공원';
  if (cardNum1 === '4444' && cardNum2 === '4444') return '브랜';
  if (cardNum1 === '5555' && cardNum2 === '5555') return '로이드';
  if (cardNum1 === '6666' && cardNum2 === '6666') return '도비';
  if (cardNum1 === '7777' && cardNum2 === '7777') return '콜린';
  if (cardNum1 === '8888' && cardNum2 === '8888') return '썬';
  return '유효하지 않은';
};
