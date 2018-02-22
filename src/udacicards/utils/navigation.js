import { NavigationActions } from 'react-navigation';

export const ToDeck = (deck) => NavigationActions.navigate({
    routeName: 'IndividualDeckNavigator',
    action: NavigationActions.navigate({
        routeName: 'DeckView',
        params: { deck },
    }),
});

export const ToQuiz = (questions) => NavigationActions.navigate({
    routeName: 'QuizView',
    params: { questions },
});

export const ToAddQuiz = (deck) => NavigationActions.navigate({
    routeName: 'NewQuestion',
    params: { deck },
});

export const ToDeckView = (title) => NavigationActions.navigate({
    routeName: 'IndividualDeckNavigator',

    action: NavigationActions.navigate({
        routeName: 'DeckView',
        params: { deck: title },
    }),
});

export const Back = () => NavigationActions.back({ key: null });