import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import "./DeckViewStyles.css"
import CardList from '../Components/CardList/CardList';
import { GoTrashcan } from 'react-icons/go';
import { BsPencil } from 'react-icons/bs';
import { BiBookBookmark } from 'react-icons/bi';
import { IoIosAdd } from "react-icons/io";

const DeckView = ({ currentDeck, cards, deleteThisDeck, deleteThisCard }) => {
  const { url } = useRouteMatch();

  return (
    <div className="cardListWrapper">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><Link to="/">Home</Link></li>
          <li class="breadcrumb-item">Rendering in React</li>
        </ol>
      </nav>
      <div>
        <h3>{currentDeck.name}</h3>
        <p>{currentDeck.description}</p>
      </div>
      <nav className="cardList-btns">
        <Link 
          to={`${url}/edit`}
          className="cardList-deckEditBtn"
        >
          <BsPencil /> Edit
        </Link>
        <Link 
          to={`${url}/study`}
          className="cardList-deckStudyBtn"
        >
          <BiBookBookmark /> Study
        </Link>
        <Link 
          to={`${url}/cards/new`}
          className="cardList-addCardBtn"
          >
            <IoIosAdd />Add Cards
        </Link>
        <button
          onClick={deleteThisDeck}
          className="cardList-deleteDeckBtn"
          >
            <GoTrashcan /> Delete Deck
        </button>
      </nav>
      <div className="deckView-cardListWrapper">
        <h3>Card List</h3>
        {cards ? (
          <CardList deleteThisCard={deleteThisCard} cards={cards} url={url} />
        ) : (
          "No Cards"
        )} 
      </div>
    </div>
  )
}

export default DeckView
