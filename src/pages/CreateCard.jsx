import React, { useState, useRef, useEffect } from 'react';
import CardNumInput from '../components/Input/CardNumInput';
import CardSelectorModal from '../components/CardSelectorModal';

const CreateCard = ({ goToPage }) => {
  const numInputs = useRef(null);
  const expritionInputs = useRef(null);
  const usernameInput = useRef(null);
  const passwordInputs = useRef(null);
  const nextButton = useRef(null);

  // forwradRef
  // Controlled (react) <-> Uncontrolled (vanilla js)
  // 상태가 없는 것과 있는 것
  // 상태를 통해 value를 통제. 값이 바뀔 때마다
  // 서로 다른 상태를 섞어놓지 않기.
  const [inputs, setInputs] = useState({
    cardNum1: '',
    cardNum2: '',
    cardNum3: '',
    cardNum4: '',
    expirationMonth: '',
    expirationYear: '',
    username: '',
    securityCode: '',
    password: {
      first: '',
      second: '',
      third: '',
      fourth: '',
    },
  });
  const {
    cardNum1,
    cardNum2,
    cardNum3,
    cardNum4,
    expirationMonth,
    expirationYear,
    username,
    securityCode,
    password: { first, second, third, fourth },
  } = inputs;
  const [modal, setModal] = useState(true);
  const cards = [
    {
      name: '포코',
      bgColor: '#E24141',
      cardNum: { cardNum1: '1111', cardNum2: '1111' },
    },
    {
      name: '준',
      bgColor: '#547CE4',
      cardNum: { cardNum1: '2222', cardNum2: '2222' },
    },
    {
      name: '공원',
      bgColor: '#73BC6D',
      cardNum: { cardNum1: '3333', cardNum2: '3333' },
    },
    {
      name: '브랜',
      bgColor: '#DE59B9',
      cardNum: { cardNum1: '4444', cardNum2: '4444' },
    },
    {
      name: '로이드',
      bgColor: '#94DACD',
      cardNum: { cardNum1: '5555', cardNum2: '5555' },
    },
    {
      name: '도비',
      bgColor: '#E76E9A',
      cardNum: { cardNum1: '6666', cardNum2: '6666' },
    },
    {
      name: '콜린',
      bgColor: '#F37D3B',
      cardNum: { cardNum1: '7777', cardNum2: '7777' },
    },
    {
      name: '썬',
      bgColor: '#FBCD58',
      cardNum: { cardNum1: '8888', cardNum2: '8888' },
    },
  ];

  // 함수형 사고 - 함수를 리턴하는 함수
  // partial application 부분적용
  // 일부 매개변수를 미리 받아서, 나머지 매개변수를 받는 함수를 만드는 부분적용
  // 두 개의 매개변수(validate, nextElem)만 미리 받아서ㅡ e를 받아서 처리하는 event handler를 반환

  // ate 동사 tion 명사 - validate 검증하다 / validation 검증
  function handleInputChange(validate, nextElem) {
    return e => {
      const { name, value, pattern } = e.target;
      console.log(pattern);
      if (pattern && !RegExp(pattern).test(value)) {
        // 패턴이 있고 통과하지 못하면
        return;
      }
      if (name !== 'username') {
        if (isNaN(value)) return;
      } else {
        if (!isNaN(value)) return;
      }
      // 띄어쓰기 막기
      setInputs(prev => ({
        ...prev,
        [name]: value,
        password: {
          ...prev.password,
          [name]: value,
        },
      }));

      if (validate(value)) {
        nextElem.focus();
      }
    };
  }

  const cardInputElem2 = numInputs.current?.children[2];
  const cardInputElem3 = numInputs.current?.children[4];
  const cardInputElem4 = numInputs.current?.children[6];
  const expirationMonthElem = expritionInputs.current?.children[0];
  const expirationYearElem = expritionInputs.current?.children[1];
  const usernameInputElem = usernameInput.current;
  const passwordElem1 = passwordInputs.current?.children[1];
  const passwordElem2 = passwordInputs.current?.children[2];
  const passwordElem3 = passwordInputs.current?.children[3];
  const passwordElem4 = passwordInputs.current?.children[4];

  // 다음으로
  const test = () => {
    // 모두 입력됐는지 & 유효성 검사
    goToPage(2);
  };

  const pwStateArr = [
    { id: 'first', state: first, nextElem: passwordElem2 },
    { id: 'second', state: second, nextElem: passwordElem3 },
    { id: 'third', state: third, nextElem: passwordElem4 },
    { id: 'fourth', state: fourth, nextElem: nextButton.current },
  ];

  // 낯선것 어려운것-익숙 재미없는것

  // const arr = [
  //   { cardNum1: "1111", cardNum2: "1111", backgroundColor: "#E24141" },
  //   { cardNum1: "2222", cardNum2: "2222", backgroundColor: "#547CE4" },
  // ];
  // arr.forEach(a=>{
  //   if (cardNum1 === a.cardNum1 &&  cardNum2===a.cardNum2){
  //     return a.backgroundColor;
  //   }
  // })

  // 함수형 - 역할을 중복되지 않게 분리하기
  const getCardName = (cardNum1, cardNum2) => {
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

  function getCardColor(cardNum1, cardNum2) {
    const cardName = getCardName(cardNum1, cardNum2);
    if (cardName === '포코')
      return { backgroundColor: '#E24141', color: 'white' };
    if (cardName === '준')
      return { backgroundColor: '#547CE4', color: 'white' };
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
    if (cardName === '썬')
      return { backgroundColor: ' #FBCD58', color: 'black' };
    return { backgroundColor: 'LightGray', color: 'black' };
  }

  // num에 따라 정해지는 파생상태
  const handleCardClick = cardNum => {
    setInputs(prev => ({
      ...prev,
      cardNum1: cardNum.cardNum1,
      cardNum2: cardNum.cardNum2,
    }));
    setModal(false);
  };

  return (
    <div className="CreateCard" style={{ padding: 15 }}>
      {modal && (
        <CardSelectorModal cards={cards} handleCardClick={handleCardClick} />
      )}

      <button onClick={() => goToPage(0)}>{'<'}</button>
      <h2 className="page-title">카드 추가</h2>
      <div className="card-box">
        <div
          className="empty-card"
          style={getCardColor(cardNum1, cardNum2)}
          onClick={() => setModal(true)}
        >
          <div className="card-top">{getCardName(cardNum1, cardNum2)} 카드</div>
          <div className="card-middle">
            <div className="small-card__chip"></div>
          </div>
          <div className="card-bottom">
            <div className="card-bottom__number">
              <span className="card-text">{cardNum1}</span>
              <span className="card-text">{cardNum2}</span>
              <span className="card-text">
                {cardNum3.replace(/[0-9]/g, '⦁')}
              </span>
              <span className="card-text">
                {cardNum4.replace(/[0-9]/g, '⦁')}
              </span>
            </div>
            <div className="card-bottom__info">
              <span className="card-text">{username || 'NAME'}</span>
              <span className="card-text">
                {expirationMonth || 'MM'} / {expirationYear || 'YY'}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="input-container">
        <label htmlFor="cardNum1" className="input-title">
          카드 번호
        </label>
        <div ref={numInputs} className="input-box">
          <CardNumInput
            name="cardNum1"
            value={cardNum1}
            onChange={handleInputChange(
              value => value.length > 3,
              cardInputElem2,
            )}
          />
          <CardNumInput
            name="cardNum2"
            value={cardNum2}
            onChange={handleInputChange(
              value => value.length > 3,
              cardInputElem3,
            )}
          />
          <CardNumInput
            type="password"
            name="cardNum3"
            value={cardNum3}
            onChange={handleInputChange(
              value => value.length > 3,
              cardInputElem4,
            )}
          />
          <CardNumInput
            final={true}
            type="password"
            name="cardNum4"
            value={cardNum4}
            onChange={handleInputChange(
              value => value.length > 3,
              expirationMonthElem,
            )}
          />
        </div>
        <div style={{ color: 'red', fontSize: 12 }}>
          {getCardName(cardNum1, cardNum2) === '유효하지 않은' &&
            '유효하지 않은 카드번호입니다.'}
        </div>
      </div>
      <div className="input-container">
        <label htmlFor="exprition-day" className="input-title">
          만료일
        </label>
        <div className="input-box w-50" ref={expritionInputs}>
          <input
            id="exprition-day"
            className="input-basic"
            type="text"
            placeholder="MM"
            name="expirationMonth"
            value={expirationMonth}
            onChange={handleInputChange(v => v.length > 1, expirationYearElem)}
            minLength={2}
            maxLength={2}
            pattern="^(0[1-9]|1[0-2]|[0-1])$"
          />
          <input
            className="input-basic"
            type="text"
            placeholder="YY"
            name="expirationYear"
            value={expirationYear}
            onChange={handleInputChange(v => v.length > 1, usernameInputElem)}
            minLength={2}
            maxLength={2}
          />
        </div>
      </div>
      <div className="input-container">
        <label htmlFor="username" className="input-title">
          카드 소유자 이름(선택)
        </label>
        <input
          id="username"
          ref={usernameInput}
          type="text"
          name="username"
          value={username}
          minLength={1}
          maxLength={18}
          onChange={handleInputChange(() => false, null)}
          className="input-basic"
          placeholder="카드에 표시된 이름과 동일하게 입력하세요."
        />
      </div>
      <div className="input-container">
        <label htmlFor="security-code" className="input-title">
          보안코드(CVC/CVV)
        </label>
        <input
          id="security-code"
          className="input-basic w-25"
          type="password"
          name="securityCode"
          value={securityCode}
          onChange={handleInputChange(v => v.length > 2, passwordElem1)}
          minLength={3}
          maxLength={3}
        />
      </div>
      <div className="input-container" ref={passwordInputs}>
        <label htmlFor="card-pw" className="input-title">
          카드 비밀번호
        </label>
        {pwStateArr.map(({ id, state, nextElem }) => (
          <input
            id="card-pw"
            key={id}
            className="input-basic w-11"
            type="password"
            minLength={1}
            maxLength={1}
            name={id}
            value={state}
            onChange={handleInputChange(v => v.length > 0, nextElem)}
          />
        ))}
      </div>
      <button ref={nextButton} className="button-box createNext" onClick={test}>
        <span className="button-text">다음</span>
      </button>
    </div>
  );
};

export default CreateCard;
