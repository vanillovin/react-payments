import React, { useState, useRef, useEffect } from 'react';
import CardNumInput from '../components/Input/CardNumInput';

const CreateCard = ({ goToPage }) => {
  const numInputs = useRef(null);

  // 서로 다른 상태를 섞어놓지 않기.
  const [inputs, setInputs] = useState({
    cardNum1: '',
    cardNum2: '',
    cardNum3: '',
    cardNum4: '',
    expiration: '',
    username: '',
    cvccode: '',
    password: ''
  })
  const { cardNum1, cardNum2, cardNum3, cardNum4 } = inputs;

  const cardNumChange = (e) => {
    const { name, value } = e.target;
    if (isNaN(value)) return;
    setInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    const cardInputElem2 = numInputs.current.children[2];
    const cardInputElem3 = numInputs.current.children[4];
    const cardInputElem4 = numInputs.current.children[6];
    cardNum1.length > 3 && cardInputElem2.focus();
    cardNum2.length > 3 && cardInputElem3.focus();
    cardNum3.length > 3 && cardInputElem4.focus();
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
              <span className="card-text">{cardNum3.replace(/[0-9]/g, '*')}</span>
              <span className="card-text">{cardNum4.replace(/[0-9]/g, '*')}</span>
						</div>
						<div className="card-bottom__info">
							<span className="card-text">NAME</span>
							<span className="card-text">MM / YY</span>
						</div>
					</div>
				</div>
			</div>
			<div className="input-container">
				<span className="input-title">카드 번호</span>
        <div ref={numInputs} className="input-box">
          <CardNumInput name="cardNum1" value={cardNum1} onChange={cardNumChange}/>
          <CardNumInput name="cardNum2" value={cardNum2} onChange={cardNumChange}/>
          <CardNumInput type="password" name="cardNum3" value={cardNum3} onChange={cardNumChange}/>
          <CardNumInput final={true} type="password" name="cardNum4" value={cardNum4} onChange={cardNumChange}/>         
        </div>
			</div>
			<div className="input-container">
				<span className="input-title">만료일</span>
				<div className="input-box w-50">
					<input className="input-basic" type="text" placeholder="MM" />
					<input className="input-basic" type="text" placeholder="YY" />
				</div>
			</div>
			<div className="input-container">
				<span className="input-title">카드 소유자 이름(선택)</span>
				<input
					type="text"
					className="input-basic"
					placeholder="카드에 표시된 이름과 동일하게 입력하세요."
				/>
			</div>
			<div className="input-container">
				<span className="input-title">보안코드(CVC/CVV)</span>
				<input className="input-basic w-25" type="password" />
			</div>
			<div className="input-container">
				<span className="input-title">카드 비밀번호</span>
				<input className="input-basic w-15" type="password" />
				<input className="input-basic w-15" type="password" />
				<input className="input-basic w-15" type="password" />
				<input className="input-basic w-15" type="password" />
			</div>
			<div className="button-box" onClick={() => goToPage(2)}>
				<span className="button-text">다음</span>
			</div>
		</div>
  );
};

export default CreateCard;
