import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CardForm from '../CardForm/CardForm'

export const AddCard = ({ currentDeck, addCard, updateCardCount }) => {
  const initialFormState = { front: "", back: "" };
  const [formData, setFormData] = useState({ ...initialFormState });

  const changeHandler = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    })
  };

  const submitHandler = (event) => {
    event.preventDefault();
    addCard(currentDeck.id, formData);
    setFormData({ ...initialFormState })
    updateCardCount(1);
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><Link to="/">Home</Link></li>
          <li class="breadcrumb-item">
            <Link to={`/decks/${currentDeck.id}`}>
              {currentDeck.name}
            </Link></li>
          <li class="breadcrumb-item">Create New</li>
        </ol>
      </nav>
      <CardForm 
        changeHandler={changeHandler}
        submitHandler={submitHandler}
        currentDeck={currentDeck}
        formData={formData}
      />
    </div>
  )
}
