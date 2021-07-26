import React, { useEffect } from 'react';
import { Switch, Route, useParams } from 'react-router-dom';
import DeckView from '../../DeckView/DeckView';
import Study from '../Study/Study';
import EditCard from '../EditCard/EditCard'
import EditDeck from '../EditDeck/EditDeck';
import { AddCard } from '../AddCard/AddCard';

const DeckRouter = ({
  currentDeck,
  setCurrentDeck,
  deleteThisDeck,
  updateThisDeck,
  addCard,
  updateCardCount,
  abortController,
  loadDecks,
  numOfCards,
  cards,
  getDeck,
  history,
  createNewDeck,
  deleteThisCard
}) => {
  const { deckId } = useParams();
  
  useEffect(() => {
    getDeck(deckId);
    loadDecks();

    return () => {
      abortController.abort();
    }
  }, [deckId, numOfCards])

  return (
    <Switch>
      <Route path="/decks/:deckId/cards/:cardId/edit">
        <EditCard
          currentDeck={currentDeck}
          updateCardCount={updateCardCount}
          abortController={abortController}
        />
      </Route>

      <Route path="/decks/:deckId/edit">
        <EditDeck
          abortController={abortController}
          currentDeck={currentDeck}
          addCard={addCard}
          loadDecks={loadDecks}
          updateCardCount={updateCardCount}
          cards={cards}
          history={history}
          updateThisDeck={updateThisDeck}
          createNewDeck={createNewDeck}
        />
      </Route>

      <Route path="/decks/:deckId/study">
        <Study
          currentDeck={currentDeck}
          addCard={addCard}
          cards={cards}
          history={history}
        />
      </Route>

      <Route path='/decks/:deckId/cards/new'>
        <AddCard 
          currentDeck={currentDeck}
          addCard={addCard}
          abortController={abortController}
          updateCardCount={updateCardCount}
          cards={cards}
          loadDecks={loadDecks}
        />
      </Route>
      
      <Route path='/decks/:deckId/'>
        <DeckView 
          currentDeck={currentDeck}
          setCurrentDeck={setCurrentDeck}
          deleteThisDeck={deleteThisDeck}
          updateThisDeck={updateThisDeck}
          addCard={addCard}
          abortController={abortController}
          loadDecks={loadDecks}
          cards={cards}
          deleteThisCard={deleteThisCard}
        />
      </Route>
    </Switch>
  );
}

export default DeckRouter
