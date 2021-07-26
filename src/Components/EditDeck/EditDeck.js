import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Form from '../Form/Form';

const EditDeck = ({
  currentDeck,
  updateThisDeck,
  abortController,
  loadDecks,
  cards,
  history,
  updateCardCount,
  addNewDeck,
}) => {
  return (
    <div>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><Link to="/">Home</Link></li>
          <li class="breadcrumb-item">
            <Link to={`/decks/${currentDeck.id}`}>{currentDeck.name}</Link>
          </li>
          <li className="breadcrumb-item active">Edit Deck</li>
        </ol>
      </nav>
      <Switch>
        <Route>
          <Form 
            abortController={abortController}
            currentDeck={currentDeck}
            loadDecks={loadDecks}
            cards={cards}
            updateCardCount={updateCardCount}
            updateThisDeck={updateThisDeck}
            history={history}
            addNewDeck={addNewDeck}
          />
        </Route>
      </Switch>
    </div>
  )
}

export default EditDeck
