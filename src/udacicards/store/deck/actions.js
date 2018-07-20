import { DECK } from 'store/deck/types'

export function addDeck(data) {
    return {
        type: DECK.ADD,
        data,
    };
};

export function fetchDecks(data) {
    return {
        type: DECK.GET_ALL,
        data,
    };
};

export function fetchDeck(key, data) {
    return {
        type: DECK.GET,
        key,
        data,
    };
};