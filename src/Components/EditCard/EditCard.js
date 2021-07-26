import React, { useState, useEffect } from 'react'
import CardForm from '../CardForm/CardForm';
import { Link, useParams } from 'react-router-dom';
import { readCard, updateCard } from '../../utils/api';

const EditCard = ({ currentDeck, updateCardCount, abortController }) => {
  const { cardId } = useParams();
  const initialFormState = { front: "", back: "" };
  const [formData, setFormData] = useState({ ...initialFormState });
  

  const changeHandler = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  useEffect(() => {
    console.log("useEffect EditCard");
    async function getCard(id) {
      const cardData = await readCard(id, abortController.signal);
      console.log("cardData:", cardData);
      setFormData({
        front: cardData.front,
        back: cardData.back,
      });
    }
    getCard(cardId);

    return () => abortController.abort();
  }, [cardId]);

  const submitHandler = (event) => {
    event.preventDefault();
    formData.id = cardId;
    formData.deckId = currentDeck.id;
    updateCard(formData, abortController.signal);
    updateCardCount(1);
  };


  return (
    <div>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><Link to="/">Home</Link></li>
          <li class="breadcrumb-item">
            <Link to={`/decks/${currentDeck.id}`}>{currentDeck.name}</Link>
          </li>
          <li className="breadcrumb-item active">{`Edit Card ${cardId}`}</li>
        </ol>
      </nav>
      <h2>Edit Card</h2>
      <div>
        <CardForm 
          changeHandler={changeHandler}
          submitHandler={submitHandler}
          currentDeck={currentDeck}
          formData={formData}
        />
      </div>
    </div>
  )
}

export default EditCard
