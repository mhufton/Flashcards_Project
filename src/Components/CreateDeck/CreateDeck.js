import React from 'react';
import { Link } from 'react-router-dom';
import Form from '../Form/Form';

const CreateDeck = ({
  abortController,
  loadDecks,
  createNewDeck,
  history
}) => {
  return (
    <>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><Link to="/">Home</Link></li>
        <li class="breadcrumb-item">Create New</li>
      </ol>
    </nav>
    <div className="formWrapper">
      <Form 
        abortController={abortController}
        createNewDeck={createNewDeck}
        loadDecks={loadDecks}
        history={history}
      />
    </div>
    </>
  )
}

export default CreateDeck
