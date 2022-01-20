import React, { useState, useRef, useEffect } from 'react';
import CardNumInput from '../components/Input/CardNumInput';

const CreateCard = ({ goToPage }) => {
  const numInputs = useRef(null);
  const expritionInputs = useRef(null);
  const usernameInput = useRef(null);

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
    password: ''
  })
  const { cardNum1, cardNum2, cardNum3, cardNum4, expirationMonth, expirationYear, username, securityCode, password } = inputs;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    if (name !== 'username' && isNaN(value)) return;
    if (value === ' ') return;
    setInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    const cardInputElem2 = numInputs.current.children[2];
    const cardInputElem3 = numInputs.current.children[4];
    const cardInputElem4 = numInputs.current.children[6];
    const expirationMonthElem = expritionInputs.current.children[0];
    const expirationYearElem = expritionInputs.current.children[1];
    const usernameInputElem = usernameInput.current;

    const validationList = [
      [cardNum1.length > 3, cardInputElem2],
      [cardNum2.length > 3, cardInputElem3],
      [cardNum3.length > 3, cardInputElem4],
      [cardNum4.length > 3, expirationMonthElem],
      [expirationMonth.length > 1, expirationYearElem],
      [expirationYear.length > 1, usernameInputElem],
    ];

    let target = null;
    for (const [result, elem] of validationList) {
      if (result) {
        target = elem;
      } else {
        break;
      }
    }
    target && target.focus();
  }, [inputs]);

  return (
    <div className="CreateCard">
      <button onClick={() => goToPage(0)}>{'<'}</button>
			<h2 className="page-title">카드 추가</h2>
			<div className="card-box">
				<div className="empty-card">
					<div className="card-top"></div>
          <div className="card-middle">
            
						<div className="small-card__chip"></div>
					</div>
          <div className="card-bottom">
            <div className="card-bottom__number">
              <span className="card-text">{cardNum1}</span>
              <span className="card-text">{cardNum2}</span>
              <span className="card-text">{cardNum3.replace(/[0-9]/g, '●')}</span>
              <span className="card-text">{cardNum4.replace(/[0-9]/g, '●')}</span>
						</div>
						<div className="card-bottom__info">
							<span className="card-text">{username || 'NAME'}</span>
              <span className="card-text">{expirationMonth || 'MM'} / {expirationYear || 'YY'}</span>
						</div>
					</div>
				</div>
			</div>
			<div className="input-container">
				<span className="input-title">카드 번호</span>
        <div ref={numInputs} className="input-box">
          <CardNumInput name="cardNum1" value={cardNum1} onChange={handleInputChange}/>
          <CardNumInput name="cardNum2" value={cardNum2} onChange={handleInputChange}/>
          <CardNumInput type="password" name="cardNum3" value={cardNum3} onChange={handleInputChange}/>
          <CardNumInput final={true} type="password" name="cardNum4" value={cardNum4} onChange={handleInputChange}/>         
        </div>
			</div>
			<div className="input-container">
        <label htmlFor='test' className="input-title">만료일</label>
				<div  className="input-box w-50" ref={expritionInputs}>
          <input 
            id='test'
            className="input-basic" 
            type="text" 
            placeholder="MM" 
            name='expirationMonth' 
            value={expirationMonth}
            onChange={handleInputChange} 
            minLength={2}
            maxLength={2}
          />
					<input 
            className="input-basic" 
            type="text" 
            placeholder="YY"
            name='expirationYear' 
            value={expirationYear}
            onChange={handleInputChange} 
            minLength={2}
            maxLength={2}
          />
				</div>
			</div>
			<div className="input-container">
				<span className="input-title">카드 소유자 이름(선택)</span>
				<input
          ref={usernameInput}
          type="text"
          name='username'
          value={username}
          onChange={handleInputChange}
          className="input-basic"
					placeholder="카드에 표시된 이름과 동일하게 입력하세요."
				/>
			</div>
			<div className="input-container">
				<span className="input-title">보안코드(CVC/CVV)</span>
        <input
          className="input-basic w-25"
          type="password"
          name='securityCode'
          value={securityCode}
          onChange={handleInputChange}
          minLength={3}
          maxLength={3}
        />
			</div>
			<div className="input-container">
				<span className="input-title">카드 비밀번호</span>
				<input 
          className="input-basic w-15" 
          type="password" 
        />
				<input 
          className="input-basic w-15" 
          type="password" 
        />
				<input 
          className="input-basic w-15" 
          type="password" 
        />
				<input 
          className="input-basic w-15" 
          type="password" 
        />
			</div>
			<div className="button-box" onClick={() => goToPage(2)}>
				<span className="button-text">다음</span>
			</div>
		</div>
  );
};

export default CreateCard;
