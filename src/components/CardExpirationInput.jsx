import React from 'react';

const CardExpirationInput = ({
  expirationMonth,
  expirationYear,
  handleInputChange,
}) => {
  return (
    <div className="input-container">
      <label htmlFor="expiration-month" className="input-title">
        만료일
      </label>
      <div className="input-box w-50">
        <input
          id="expiration-month"
          className="input-basic"
          type="text"
          placeholder="MM"
          name="expirationMonth"
          value={expirationMonth}
          onChange={handleInputChange(v => v.length > 1, 'expiration-year')}
          minLength={2}
          maxLength={2}
          pattern="^(0[1-9]|1[0-2]|[0-1])$"
        />
        <span style={{ color: 'black' }}>
          {expirationMonth.length > 1 && '/'}
        </span>
        <input
          id="expiration-year"
          className="input-basic"
          type="text"
          placeholder="YY"
          name="expirationYear"
          value={expirationYear}
          onChange={handleInputChange(v => v.length > 1, 'username')}
          minLength={2}
          maxLength={2}
        />
      </div>
    </div>
  );
};

export default CardExpirationInput;
