import { AsyncStorage } from 'react-native';

export const STORAGE_KEY = {
  DECKS: 'UdaciCards:decks',
  NOTIFICATION: 'UdaciCards:notifications'
};

/**
 * return all of the decks along with their titles, questions, and answers. 
*/
export function getDecks() {
  return AsyncStorage.getItem(STORAGE_KEY.DECKS).then((data) => {
    return JSON.parse(data);
  });
};

/**
 * take in a single id argument and return the deck associated with that id.
*/
export function getDeck(id) {
  return AsyncStorage.getItem(STORAGE_KEY.DECKS).then((data) => {
    return JSON.parse(data)[id];
  });
};

/**
 * take in a single title argument and add it to the decks. 
*/
export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(STORAGE_KEY.DECKS,
    JSON.stringify({
      [title]: {
        title,
        questions: [],
      },
    }));
};

/**
 * take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.
*/
export function addCardToDeck(data) {
  const { question, answer, deck } = data;

  return getDeck(deck).then((data) => {
    data.questions.push({
      question,
      answer,
    });
    saveDeck(deck, data);
  });
};

export function saveDeck(deck, data) {
  return AsyncStorage.mergeItem(STORAGE_KEY.DECKS,
    JSON.stringify({
      [deck]: data,
    }));
};
