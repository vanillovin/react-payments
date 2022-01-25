import React from 'react';

const Message = ({ type, text, cond }) => {
  const getTextColor = type => {
    if (type === 'error') return 'rosybrown';
  };

  // inlinestyle -> className
  return (
    cond && (
      <p
        style={{
          fontSize: 12,
          color: getTextColor(type),
        }}
      >
        {text}
      </p>
    )
  );
};

export default Message;
