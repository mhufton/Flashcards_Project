import React from 'react';
import { Link } from 'react-router-dom';
import './DeckListStyles.css';
import { AiOutlineEye } from 'react-icons/ai';
import { BiBookBookmark } from 'react-icons/bi';
import { GoTrashcan } from 'react-icons/go';
import { IoIosAdd } from "react-icons/io";

const Deck = ({ decks, deleteThisDeck }) => {
  const list = decks.map((deck, index) => {
    return (
      <div className="deckWrapper">
        <div className="deckHeader">
          <h2>{deck.name}</h2>
          <p className="deckSubText">{deck.cards.length} cards</p>
        </div>
        <p className="deckDescription">{deck.description}</p>
        <div className="deckButtonsWrapper">
          <Link to={`/decks/${deck.id}`}
            className="viewBtn"
            >
              <AiOutlineEye /> View
            </Link>
          <Link to={`/decks/${deck.id}/study`}
            className="studyBtn"
            >
              <BiBookBookmark /> Study
            </Link>
          <button onClick={() => deleteThisDeck(deck.id)}
            className="trashBtn"
            >
              <GoTrashcan />
            </button>
        </div>
      </div>
    )
  })

  return (
    <>
      <div className="createBtnWrapper">
        <Link to="/decks/new" className="createNewBtn">
          <IoIosAdd /> Create New
        </Link>
      </div>
      <div className="listWrapper">
        {list}
      </div>
    </>
  )
}

export default Deck;
