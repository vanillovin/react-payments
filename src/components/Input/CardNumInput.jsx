import React from 'react';

// Controlled & Uncontrolled Components?
// 밖에서 상태가 주입됨. 밖에서 주입되지 않고 state로 관리하지 않는 것.

// 어떨 때 추론? 생각해보기 (깨질수있는것-className, name. 바뀌는가?) -> 안전하고 유연
// 명확하게 마지막이라는 것을. default 값을 많이 넣기. 추론하게 하지 않고 명시적으로!
const CardNumInput = ({ name, value, onChange, final = false }) => {
  return (
    <>
      <input
        id={name}
        type="text"
        name={name}
        value={value}
        minLength={4}
        maxLength={4}
        required={true}
        className="input-basic"
        disabled={false}
        onChange={onChange}
      />
      {!final && (
        <span style={{ color: 'black' }}>{value.length >= 4 && '-'}</span>
      )}
    </>
  );
};

export default CardNumInput;
