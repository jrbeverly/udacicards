import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { TabNavigator, StackNavigator } from 'react-navigation';
import { View } from 'react-native';

import DeckListView from 'components/DeckListView';
import NewDeck from 'components/NewDeck';
import DeckView from 'components/DeckView';
import NewQuestion from 'components/NewQuestion';
import QuizView from 'components/QuizView';

import configureStore from 'store';

import { setNotification } from './utils/notifications';

const store = configureStore();

const Tabs = TabNavigator(
  {
    DeckListView: {
      screen: DeckListView,
      navigationOptions: {
        tabBarLabel: 'DECKS'
      },
    },
    NewDeck: {
      screen: NewDeck,
      navigationOptions: {
        tabBarLabel: 'New Deck'
      },
    },
  },
  {
    tabBarOptions: {
      showIcon: true,
    },
  });

const navigationOptions = {
  headerTintColor: 'white',
  headerStyle: {
    backgroundColor: 'lightblue',
  },
};

const IndividualDeckNavigator = StackNavigator({
  DeckView: {
    screen: DeckView,
    navigationOptions,
  },
  NewQuestion: {
    screen: NewQuestion,
    navigationOptions,
  },
  QuizView: {
    screen: QuizView,
    navigationOptions,
  },
}, {
    headerMode: 'none',
  });

const MainNavigator = StackNavigator(
  {
    Home: {
      screen: Tabs,
      navigationOptions,
    },
    IndividualDeckNavigator: {
      screen: IndividualDeckNavigator,
      navigationOptions,
    },
  },
  {
    headerTintColor: 'white',
    headerTitleStyle: { color: 'white' },
  });

export default class App extends React.Component {
  componentDidMount() {
    setNotification();
  };

  render() {
    return (
      <Provider store={store}>
        <View style={[{ flex: 1 }]}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}