import AsyncStorage from '@react-native-community/async-storage';
import uuid from 'react-native-uuid';

export const DECKS_STORAGE_KEY = 'flashcards:decks';

export const saveDecks = (data) => {
  return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
};

export const getDecks = () => {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((decks) =>
    decks !== null ? JSON.parse(decks) : {},
  );
};

export const getDeck = (deckId) => {
  return getDecks().then((decks) => decks[deckId]);
};

export const saveNewDeck = (deckTitle) => {
  const id = uuid.v4();
  const newDeck = {
    id,
    title: deckTitle,
    cards: [],
  };

  return getDecks().then((decks) => {
    const data = { ...decks, [id]: newDeck };
    return saveDecks(data).then(() => newDeck);
  });
};

export const saveCardToDeck = (deckId, card) => {
  return getDecks().then((decks) => {
    const data = { ...decks };
    const deck = data[deckId];

    deck.cards.push(card);

    return saveDecks(data);
  });
};

export const modifiCardInDeck = (deckId, cardIndex, card) => {
  return getDecks().then((decks) => {
    const data = { ...decks };
    const deck = data[deckId];
    deck.cards[cardIndex] = { ...deck[cardIndex], ...card };

    return saveDecks(data);
  });
};

export default {
  DECKS_STORAGE_KEY,
  saveDecks,
  getDecks,
  getDeck,
  saveNewDeck,
  saveCardToDeck,
  modifiCardInDeck,
};
