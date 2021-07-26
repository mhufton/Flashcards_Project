import React from 'react';
import { Link } from 'react-router-dom';
import "./CardFormStyles.css"

const CardForm = ({ submitHandler, changeHandler, formData, currentDeck }) => {

  return (
    <form onSubmit={submitHandler} className="newCardForm-infoWrapper">
      <div className="newCardForm-frontWrapper">
        <label htmlFor="front">Front</label>
        <textarea
          id="front"
          value={formData.front}
          required
          onChange={changeHandler}
          name="front"
          className="newCardForm-frontTextArea"
        ></textarea>
      </div>
      <div className="newCardForm-backWrapper">
        <label htmlFor="back">Back</label>
        <textarea
          id="back"
          value={formData.back}
          required
          onChange={changeHandler}
          name="back"
          className="newCardForm-backTextArea"
        ></textarea>
      </div>
      <div className="newCardForm-btnWrapper">
        <Link
          to={`/decks/${currentDeck.id}`}
          className="newCardForm-doneBtn">
            Done
          </Link>
        <button 
          type="submit"
          className="newCardForm-submitBtn"
        >
          Save
        </button>
      </div>
    </form>
  )
}

export default CardForm
