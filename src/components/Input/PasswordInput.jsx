import React from 'react';

// 컴포넌트는 interface
const PasswordInput = ({ name, value, onChange, minMax, className }) => {
  return (
    <input
      id={name + '-pw'}
      className={`input-basic ${className}`}
      type="password"
      name={name}
      value={value}
      onChange={onChange}
      minLength={minMax}
      maxLength={minMax}
    />
  );
};

export default PasswordInput;
