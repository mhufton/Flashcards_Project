import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./StudyStyles.css"

const Study = ({ currentDeck, history, cards }) => {
  const [front, setFront] = useState(true);
  const [cardIndex, setCardIndex] = useState(0);
  
  const flipper = () => {
    setFront(!front);
  };

  const next = () => {
    if (cardIndex + 1 < cards.length) {
      setCardIndex(cardIndex + 1);
      setFront(true)
    } else {
      const result = window.confirm(
        "Do you want to restart? To return to the homepage click cancel"
      );
      if (result) {
        setFront(true);
        setCardIndex(0)
      } else {
        history.push("/")
      }
    }
  };

  const studyCards = (
      <div className="cardContainer">
        <div className="cardNum">
          <h5>Card {cardIndex + 1} of {cards.length}</h5>
        </div>
        <div>
          <p className="studyCard">{front ? cards[cardIndex].front : cards[cardIndex].back}</p>
          <div className="btnContainer">
            {front ? 
              null : 
              <button onClick={next} className="nextBtn">
              next
            </button>}
            <button onClick={flipper} className="flipBtn">
              flip
            </button>
          </div>
        </div>
      </div>
  );

  const notEnoughCards = (
      <div>
        <h3>Not enough cards.</h3>
        <p>You need at least 3 cards to study. There are {cards.length} in this deck.</p>
        <button className="addCards">
          <Link to={`/decks/${currentDeck.id}/cards/new`}>
            Add Cards
          </Link>
        </button>
      </div>
  );
  
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><Link to="/">Home</Link></li>
          <li class="breadcrumb-item"><Link to={`/decks/${currentDeck.id}`}>{currentDeck.name}</Link></li>
          <li class="breadcrumb-item">Study</li>
        </ol>
      </nav>
      <div>
        <h2>Study: {currentDeck.name}</h2>
      </div>
      {cards.length <= 2 ? notEnoughCards : studyCards}
    </div>
  );
}

export default Study
