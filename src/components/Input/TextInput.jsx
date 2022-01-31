import React from 'react';

const TextInput = ({
  id,
  title,
  name,
  value,
  minMax,
  onChange,
  placeholder,
  ...props
}) => {
  return (
    <input
      id={id}
      type="text"
      name={name}
      value={value}
      minLength={minMax}
      maxLength={minMax}
      onChange={onChange}
      className="input-basic"
      placeholder={placeholder}
      {...props}
    />
  );
};

export default TextInput;
