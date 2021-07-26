import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { readDeck } from '../../utils/api';
import "./FormStyles.css";

function Form({
  currentDeck,
  createNewDeck,
  history,
  updateThisDeck,
  loadDecks,
  updateCardCount,
  abortController
}) {
  const { url } = useRouteMatch();
  const initialFormState = {
    name: currentDeck ? currentDeck.name : "",
    description: currentDeck ? currentDeck.description : "",
  };
  const [formData, setFormData] = useState({ ...initialFormState })

  useEffect(() => {
    const loadDeck = async () => {
      const loadedDeck = await readDeck(currentDeck.id, abortController.signal);
      setFormData({
        id: currentDeck.id,
        name: loadedDeck.name,
        description: loadedDeck.description,
      })
    };

    if (currentDeck) {
      loadDeck();
    }

    return () => abortController.abort();
  }, [currentDeck])

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (url === "/decks/new") {
      formData.cards = [];
      const newDeckId = await createNewDeck(formData);
      history.push(`/decks/${newDeckId}`);
    } else {
      formData.id = currentDeck.id;
      updateThisDeck(formData);
      loadDecks();
      updateCardCount(1);
      history.push(`/decks/${currentDeck.id}`)
    }
  }

  return (
    <div className="createNewDeck-formWrapper">
      <h2 className="createNewDeck-h2">Create Deck</h2>
      <form onSubmit={handleSubmit}>
        <div className="createNewDeck-nameWrapper">
          <label 
            htmlFor="name"
            className="createNewDeck-nameText">Name:</label>
          <input 
            id="name"
            placeholder="Deck Name"
            value={formData.name}
            required
            type="text"
            onChange={handleChange}
            name="name"
            className="createNewDeck-nameField"
          />
        </div>
        <div className="createNewDeck-descWrapper">
          <label 
            htmlFor="description" 
            className="createNewDeck-descriptionText">Description:</label>
          <textarea
            id="decsription"
            placeholder="Brief desciption of the deck"
            value={formData.description}
            required
            onChange={handleChange}
            name="description"
            className="createNewDeck-descriptionField"
          />
        </div>
        <Link
          to="#"
          onClick={() => {
            url === "/decks/new"
              ? history.push("/")
              : history.push(`/decks/${currentDeck.id}`)
          }}
          className="createNewDeck-cancelBtn"
          >
            Cancel
        </Link> 
        <button type="submit" className="createNewDeck-submitButton">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Form;
