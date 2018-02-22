import { DECK } from 'store/deck/types'
import { CARD } from 'store/card/types'

function decks(state = {}, action) {
  const { data, key } = action;

  switch (action.type) {
    case DECK.GET_ALL: {
      return {
        ...state,
        ...data,
      };
    }

    case DECK.GET: {
      return {
        ...state,
        [key]: data,
      };
    }

    case DECK.ADD: {
      const { title } = data;
      return {
        ...state,
        [title]: {
          title,
          questions: [],
        },
      };
    }

    case CARD.ADD: {
      const { question, answer, deck } = data;

      let questions = { ...state }[deck].questions;
      questions.push({ question, answer });

      return {
        ...state,
        [deck]: {
          title: { ...state }[deck].title,
          questions,
        },
      };
    }

    default:
      return state;
  };
};

export default decks;
