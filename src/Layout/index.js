import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useHistory } from "react-router"
import Header from "../Layout/Header";
import NotFound from "./NotFound";
import DeckList from "../Components/DeckList/DeckList";
import CreateDeck from "../Components/CreateDeck/CreateDeck";
import DeckRouter from "../Components/DeckRouter/DeckRouter";
import { 
  listDecks,
  createCard,
  createDeck,
  deleteCard,
  deleteDeck,
  readDeck,
  updateDeck,
  updateCard
} from "../utils/api";


function Layout() {
  const [decks, setDecks] = useState([]);
  const [currentDeck, setCurrentDeck] = useState([]);
  const [cards, setCards] = useState([]);

  const [numOfDecks, setNumOfDecks] = useState(0);
  const [numOfCards, setNumbOfCards] = useState(0);

  const abortController = new AbortController();
  const signal = abortController.signal;
  const history = useHistory();

  const updateCardCount = (number) => {
    setNumbOfCards(() => numOfCards + number);
  }

  const updateDeckCount = (number) => {
    setNumOfDecks(() => numOfDecks + number);
  }

  useEffect(() => { 
    loadDecks(); 

    return () => {
      abortController.abort();
    };
  }, [numOfDecks]);


  async function loadDecks() {
    try {
      const response = await listDecks(signal);
      setDecks(() => response);
    } catch (error) {
      if (error.name !== "AbortError") {
        throw error;
      }
    }
  }

  async function createNewDeck() {
    try {
      const response = await createDeck(signal);
      setDecks(() => response);
    } catch (error) {
      if (error.name !== 'AbortError') {
        throw error;
      }
    }
  }

  async function updateThisDeck(updatedDeck) {
    try {
      updateDeck(updatedDeck, signal)
    } catch (error) {  
      if (error.name !== "AbortError") {
        throw error;
      }
    }
  }

  async function deleteThisDeck(id) {
    try {
      if (
        window.confirm(
          "Delete this deck?\n\nYou will not be able to recover it."
        )
      ) {
        await deleteDeck(id, signal);
        updateDeckCount(-1);
        history.push("/")
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        throw error;
      }
    }
  }

  async function deleteThisCard(id) {
    try {
      if (
        window.confirm(
          "Delete this card?\n\nYou will not be able to recover it."
        ) 
      ) {
        await deleteCard(id, signal);
        updateCardCount(-1);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        throw error;
      }
    }
  }

  async function getDeck(id) {
    try {
      const deck = await readDeck(id, signal);
      setCurrentDeck(deck);
      setCards(deck.cards)
    } catch (error) {
      if (error.name !== "AbortError") {
        throw error;
      }
    }
  }

  async function addCard(deckId, card) {
    try {
      createCard(deckId, card, signal);
      updateCardCount(1);
    } catch (error) {
      if (error.name !== "AbortError") {
        throw error;
      }
    }
  }

  return (
    <div>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
      <Switch>
        <Route exact path="/">
          <DeckList 
            decks={decks}
            abortController={abortController}
            deleteThisDeck={deleteThisDeck}
            history={history}
            createNewDeck={createNewDeck}
            addCard={addCard}
            updateThisDeck={updateThisDeck}
          />
        </Route>

        <Route path="/decks/new">
          <CreateDeck 
            createNewDeck={createNewDeck}
            abortController={abortController}
            loadDecks={loadDecks}
            addCard={addCard}
            history={history}
            cards={cards}
            currentDeck={currentDeck}
          />
        </Route>

        <Route path="/decks/:deckId">
          <DeckRouter
            currentDeck={currentDeck}
            setCurrentDeck={setCurrentDeck}
            deleteThisDeck={deleteThisDeck}
            updateThisDeck={updateThisDeck}
            addCard={addCard}
            updateCardCount={updateCardCount}
            abortController={abortController}
            loadDecks={loadDecks}
            numOfCards={numOfCards}
            cards={cards}
            getDeck={getDeck}
            history={history}
            createNewDeck={createNewDeck}
            deleteThisCard={deleteThisCard}
          />
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
      </div>
    </div>
  );
}

export default Layout;
