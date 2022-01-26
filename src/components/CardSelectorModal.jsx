import React from 'react';

const CardSelectorModal = ({ cards, handleCardClick, closeModal }) => {
  return (
    <div className="modal-dimmed">
      <div className="modal">
        <button className="close-modal-button" onClick={closeModal}>
          ❌
        </button>
        <div className="flex-center">
          {cards.slice(0, 4).map(item => (
            <div
              key={item.name}
              className="modal-item-container"
              onClick={() => handleCardClick(item.cardNum)}
            >
              <div className={`modal-item-dot ${item.name}`}></div>
              <span className="modal-item-name">{item.name} 카드</span>
            </div>
          ))}
        </div>

        <div className="flex-center">
          {cards.slice(4, cards.length).map(item => (
            <div
              key={item.name}
              className="modal-item-container"
              onClick={() => handleCardClick(item.cardNum)}
            >
              <div className={`modal-item-dot ${item.name}`}></div>
              <span className="modal-item-name">{item.name} 카드</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardSelectorModal;
