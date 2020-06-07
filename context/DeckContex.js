import React from 'react';
import uuid from 'react-native-uuid';
import { getDecks } from '../utils/storage';
import AsyncStorage from '@react-native-community/async-storage';

const LOAD_DECKS = 'LOAD_DECKS';
const ADD_DECK = 'ADD_DECK';
const ADD_CARD = 'ADD_CARD';
const UPDATE_CARD = 'UPDATE_CARD';

const DeckContext = React.createContext();

const deckReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_DECKS: {
      return {
        ...state,
        status: 'initialized',
        decks: action.payload,
      };
    }
    case ADD_DECK: {
      const newDeck = action.deck;
      return {
        ...state,
        decks: { ...state.decks, [newDeck.id]: { ...newDeck } },
      };
    }
    case ADD_CARD: {
      const { deckId, card } = action.payload;
      const deck = { ...state.decks[deckId] };
      deck.cards.push(card);
      return {
        ...state,
        decks: { ...state.decks, [deckId]: deck },
      };
    }
    case UPDATE_CARD: {
      const { deckId, cardIndex, card } = action.payload;
      const deck = { ...state.decks[deckId] };
      deck.cards[cardIndex] = { ...deck.cards[cardIndex], ...card };

      return {
        ...state,
        decks: { ...state.decks, [deckId]: deck },
      };
    }
    default:
      throw new Error(`Action type ${action.type} is not supported`);
  }
};

const initialState = {
  status: 'initializing',
  decks: {},
};

export const DeckProvider = (props) => {
  const [state, dispatch] = React.useReducer(deckReducer, initialState);

  React.useEffect(() => {
    /* getDecks().then((decks) => {
      dispatch({ type: LOAD_DECKS, payload: decks });
    }); */
    AsyncStorage.clear();
  }, []);

  const value = React.useMemo(() => {
    return { state, dispatch };
  }, [state]);

  return <DeckContext.Provider value={value} {...props} />;
};

export const useDeckContext = () => {
  const context = React.useContext(DeckContext);

  if (!context) {
    throw new Error('useDeckContext must be used inside a DeckProvider');
  }

  const { state, dispatch } = context;
  const { status, decks } = state;

  const getDeck = React.useCallback(
    (id) => {
      return decks[id];
    },
    [decks],
  );

  const addNewDeck = React.useCallback(
    (deck) => {
      dispatch({ type: ADD_DECK, deck });
    },
    [dispatch],
  );

  const addNewCard = React.useCallback(
    (deckId, card) => {
      dispatch({ type: ADD_CARD, payload: { deckId, card } });
    },
    [dispatch],
  );

  const updateCard = React.useCallback(
    (deckId, cardIndex, card) => {
      dispatch({ type: UPDATE_CARD, payload: { deckId, cardIndex, card } });
    },
    [dispatch],
  );

  return { status, decks, getDeck, addNewDeck, addNewCard, updateCard };
};
