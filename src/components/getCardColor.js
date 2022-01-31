import { getCardName } from './getCardName';

export function getCardColor(cardNum1, cardNum2) {
  const cardName = getCardName(cardNum1, cardNum2);

  if (cardName === '포코')
    return { backgroundColor: '#E24141', color: 'white' };
  if (cardName === '준') return { backgroundColor: '#547CE4', color: 'white' };
  if (cardName === '공원')
    return { backgroundColor: '#73BC6D', color: 'black' };
  if (cardName === '브랜')
    return { backgroundColor: '#DE59B9', color: 'white' };
  if (cardName === '로이드')
    return {
      background:
        'radial-gradient(50% 50% at 50% 50%, rgba(4, 192, 158, 0.31) 0%, rgba(4, 192, 158, 0.457344) 65.1%, #04C09E 100%)',
      color: 'black',
    };
  if (cardName === '도비')
    return { backgroundColor: '#E76E9A', color: 'black' };
  if (cardName === '콜린')
    return { backgroundColor: '#F37D3B', color: 'black' };
  if (cardName === '썬') return { backgroundColor: ' #FBCD58', color: 'black' };
  return { backgroundColor: 'LightGray', color: 'black' };
}
