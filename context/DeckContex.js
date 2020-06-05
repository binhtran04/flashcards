import React from 'react';
import uuid from 'react-native-uuid';

const ADD_DECK = 'ADD_DECK';
const ADD_CARD = 'ADD_CARD';

const DeckContext = React.createContext();

const deckReducer = (state = {}, action) => {
  switch (action.type) {
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
    default:
      throw new Error(`Action type ${action.type} is not supported`);
  }
};

const initialState = {
  status: 'initializing',
  decks: {
    a1: {
      id: 'a1',
      title: 'React',
      cards: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces',
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event',
        },
        {
          question: 'React question',
          answer: 'The answer',
        },
      ],
    },
    b1: {
      id: 'b1',
      title: 'JavaScript',
      cards: [
        {
          question: 'What is a closure?',
          answer:
            'The combination of a function and the lexical environment within which that function was declared.',
        },
        {
          question: 'What is a const?',
          answer: 'const is constant',
        },
      ],
    },
  },
};

export const DeckProvider = (props) => {
  const [state, dispatch] = React.useReducer(deckReducer, initialState);

  // TODO initialize the state by getting the data from AsyncStore
  // React.useEffect

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
    (deckTitle) => {
      const id = uuid.v4();
      const newDeck = {
        id,
        title: deckTitle,
        cards: [],
      };
      dispatch({ type: ADD_DECK, deck: newDeck });
    },
    [dispatch],
  );

  const addNewCard = React.useCallback(
    (deckId, card) => {
      dispatch({ type: ADD_CARD, payload: { deckId, card } });
    },
    [dispatch],
  );

  return { status, decks, getDeck, addNewDeck, addNewCard };
};
