import React, { useState, useEffect } from 'react';
import uuid from '../uuid';
import { useCardInMaking, useSetCardInMaking } from '../context';
import CardNumInput from '../components/Input/CardNumInput';
import CardSelectorModal from '../components/CardSelectorModal';
import ErrorMessage from '../components/ErrorMessage';

import { cards } from '../components/cards';
import { getCardName } from '../components/getCardName';
import { getCardColor } from '../components/getCardColor';

import PasswordInput from '../components/Input/PasswordInput';
import TextInput from '../components/Input/TextInput';

const CreateCard = ({ goToPage }) => {
  const cardInMaking = useCardInMaking();
  const setCardInMaking = useSetCardInMaking();
  console.log('CreateCard cardInaMaking', cardInMaking);

  // forwradRef
  // Controlled (react) <-> Uncontrolled (vanilla js)
  // 상태가 없는 것과 있는 것
  // 상태를 통해 value를 통제. 값이 바뀔 때마다
  // 서로 다른 상태를 섞어놓지 않기.

  // 페이지 내의 상태 - 지역상태
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
    password,
  } = inputs;
  const [modal, setModal] = useState(true);

  function handleInputChange(validate, nextElemId) {
    return e => {
      const { name, value, pattern } = e.target;

      const onlyText = text => {
        const pattern = /[0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
        return !pattern.test(text);
      };

      if (pattern && !RegExp(pattern).test(value)) return;

      const isNumberText = text => !isNaN(text);
      if (name === 'username') {
        if (!onlyText(value)) return;
      } else {
        if (!isNumberText(value)) return;
      }

      setInputs(prev => ({
        ...prev,
        [name]: value,
        password: {
          ...prev.password,
          [name]: value,
        },
      }));

      const nextElem = document.getElementById(nextElemId);
      if (validate(value)) {
        nextElem.focus();
      }
    };
  }

  const numStateArr = [
    { name: 'cardNum1', nextId: 'cardNum2' },
    { name: 'cardNum2', nextId: 'cardNum3' },
    { name: 'cardNum3', nextId: 'cardNum4' },
    { name: 'cardNum4', nextId: 'expiration-month' },
  ];
  const pwStateArr = [
    { name: 'first', nextId: 'second-pw' },
    { name: 'second', nextId: 'third-pw' },
    { name: 'third', nextId: 'fourth-pw' },
    { name: 'fourth', nextId: 'nextButton' },
  ];

  const handleCardClick = cardNum => {
    setInputs(prev => ({
      ...prev,
      cardNum1: cardNum.cardNum1,
      cardNum2: cardNum.cardNum2,
    }));
    setModal(false);
  };

  useEffect(() => {
    if (getCardName(cardNum1, cardNum2) === '유효하지 않은') {
      setModal(true);
    }
  }, [cardNum1, cardNum2, cardNum3, cardNum4]);

  const [errors, setErrors] = useState('');

  // state를 받아서... 그 state를 이용한 maxLength 함수를 생성해서 반환!
  // partial application 부분 적용
  const createMaxLength = state => (id, name, max) => {
    if (state[name].length < max) {
      return [id, name];
    }
    return true;
  };
  const maxLength = createMaxLength(inputs);
  const maxPWLength = createMaxLength(password);

  // 부수효과를 일으키면 함수명 대부분 동사로
  const validate = () => {
    // some every find
    // 드모르간 법칙
    const [errorId, errorName] =
      [
        maxLength('cardNum1', 'cardNum1', 4),
        maxLength('cardNum2', 'cardNum2', 4),
        maxLength('cardNum3', 'cardNum3', 4),
        maxLength('cardNum4', 'cardNum4', 4),
        maxLength('expiration-month', 'expirationMonth', 2),
        maxLength('expiration-year', 'expirationYear', 2),
        maxLength('username', 'username', 1),
        maxLength('security-code', 'securityCode', 3),

        maxPWLength('first-pw', 'first', 1),
        maxPWLength('second-pw', 'second', 1),
        maxPWLength('third-pw', 'third', 1),
        maxPWLength('fourth-pw', 'fourth', 1),
      ].find(v => v !== true) || [];

    if (errorId) {
      document.getElementById(errorId).focus();
      setErrors(errorName);
      return false;
    }

    return true;
  };

  const onNextPage = () => {
    if (!validate()) return;

    setCardInMaking({
      id: uuid(),
      cardNums: `${cardNum1}-${cardNum2}-${cardNum3}-${cardNum4}`,
      username,
      expirationMonth,
      expirationYear,
      securityCode,
      // validation 함수 땜에 password['name'] 반복 돌려서 구조분해 안 했음
      password: `${password[0]}${password[1]}${password[2]}${password[3]}`,
      cardNickname: getCardName(cardNum1, cardNum2),
    });
    goToPage(2);
  };

  return (
    <div className="CreateCard" style={{ padding: '10px  15px' }}>
      {modal && (
        <CardSelectorModal
          cards={cards}
          handleCardClick={handleCardClick}
          closeModal={() => setModal(false)}
        />
      )}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <button className="back-button" onClick={() => goToPage(0)}>
          {'<'}
        </button>
        <h2 className="page-title">카드 추가</h2>
      </div>
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
        <div className="input-box">
          {numStateArr.map(({ name, nextId }) => (
            <CardNumInput
              key={name}
              name={name}
              value={inputs[name]}
              onChange={handleInputChange(value => value.length === 4, nextId)}
              // 신경쓸곳?
              final={name === 'cardNum4'}
            />
          ))}
        </div>
        <ErrorMessage
          text="유효하지 않은 카드번호 입니다."
          cond={getCardName(cardNum1, cardNum2) === '유효하지 않은'}
        />
        {numStateArr.map(({ name }) => (
          <ErrorMessage
            key={name}
            text="카드 번호를 4글자씩 입력해주세요."
            cond={errors === name}
          />
        ))}
      </div>

      <div className="input-container">
        <label htmlFor="expiration-month" className="input-title">
          만료일
        </label>
        <div className="input-box w-50">
          <TextInput
            id="expiration-month"
            name="expirationMonth"
            value={expirationMonth}
            minMax={2}
            onChange={handleInputChange(v => v.length === 2, 'expiration-year')}
            placeholder="MM"
            pattern="^(0[1-9]|1[0-2]|[0-1])$"
          />
          <span style={{ color: 'black' }}>
            {expirationMonth.length > 1 && '/'}
          </span>
          <TextInput
            id="expiration-year"
            name="expirationYear"
            minMax={2}
            placeholder="YY"
            value={expirationYear}
            onChange={handleInputChange(v => v.length === 2, 'username')}
          />
        </div>
      </div>

      <div className="input-container">
        <label htmlFor="username" className="input-title">
          카드 소유자 이름(선택)
        </label>
        <input
          id="username"
          type="text"
          name="username"
          value={username}
          minLength={1}
          maxLength={30}
          onChange={handleInputChange(() => false, null)}
          className="input-basic"
          placeholder="카드에 표시된 이름과 동일하게 입력하세요."
        />
        <ErrorMessage
          text={`이름은 최대 30자리까지 입력할 수 있습니다. (현재 ${username.length} 자리)`}
          cond={username.length > 0}
        />
      </div>

      {/* getElementById 문제점 - id가 바뀌었을 때 헷갈림 */}
      <div className="input-container">
        <label htmlFor="security-code" className="input-title">
          보안코드(CVC/CVV)
        </label>
        <PasswordInput
          id="security-code"
          className="w-25"
          name="securityCode"
          value={securityCode}
          onChange={handleInputChange(v => v.length === 3, 'first-pw')}
          minMax={3}
        />
        {/* <div class="tooltip">
          Hover over me
          <span class="tooltiptext">Tooltip text</span>
        </div> */}
      </div>

      <div className="input-container">
        <label className="input-title">카드 비밀번호</label>
        {pwStateArr.map(({ name, nextId }) => (
          <PasswordInput
            key={name}
            name={name}
            className="w-11"
            value={password[name]}
            onChange={handleInputChange(v => v.length === 1, nextId)}
            minMax={1}
          />
        ))}
      </div>

      <button id="nextButton" className="button-box" onClick={onNextPage}>
        <span className="button-text">다음</span>
      </button>
    </div>
  );
};

export default CreateCard;
