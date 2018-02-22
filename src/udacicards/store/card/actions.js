import { CARD } from 'store/card/types'

export function addCard(data) {
    return {
        type: CARD.ADD,
        data,
    };
};
