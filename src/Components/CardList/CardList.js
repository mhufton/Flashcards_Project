import React from 'react';
import { Link } from 'react-router-dom';
import './CardListStyles.css'
import { GoTrashcan } from 'react-icons/go';
import { BsPencil } from 'react-icons/bs';

const CardList = ({ url, cards, deleteThisCard }) => {
  const listOfCards = cards.map((card, index) => {
    return (
      <div className="cardList-container" key={index}>
        <div className="cardList-details">
          <h3>Front:</h3>
          <div className="cardList-cardFront">{card.front}</div>
          <h3>Back:</h3>
          <div className="cardList-cardBack">{card.back}</div>
        </div>
        <div className="cardList-btnWrapper">
          <Link 
            to={`${url}/cards/${card.id}/edit`}
            className="cardList-editBtn"
          >
            <BsPencil /> Edit
          </Link>
          <button
            onClick={() => deleteThisCard(card.id)}
            className="cardList-deleteBtn"
          >
            <GoTrashcan />
          </button>
        </div>
      </div>
    )
  })

  return <div>{listOfCards}</div>
}

export default CardList
