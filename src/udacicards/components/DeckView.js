import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import { fetchDeck } from 'store/deck/actions';
import { getDeck } from 'storage/UdaciCards';

import { AppLoading } from 'expo';

import { StackNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation';
import { clearNotification, setNotification } from 'udacicards/utils/notifications';
import { ToQuiz, ToAddQuiz } from 'udacicards/utils/navigation';

class DeckView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
    };
  };

  componentDidMount() {
    const { dispatch, deck } = this.props;
    getDeck(deck)
      .then((entries) => this.props.fetchDeck(deck, entries))
      .then((entries) => this.setState(() => ({
        deck: entries.data,
        ready: true,
      })));
  };

  addCard = () => {
    const { deck } = this.props;
    this.props.navigation.dispatch(ToAddQuiz(deck));
  };

  start = () => {
    const { deck } = this.state;
    this.props.navigation.dispatch(ToQuiz(deck.questions));

    clearNotification()
      .then(setNotification);
  };

  render() {
    const { ready } = this.state;

    if (ready === false) {
      return (<AppLoading />);
    }

    const { deck } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.header}>{deck.title}</Text>
          <Text style={styles.counter}>
            {deck.questions.length} cards
          </Text>

          <TouchableOpacity style={styles.SubmitBtn} onPress={() => this.addCard()}>
            <Text style={styles.submitBtnText}>Add Card</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.SubmitBtn} onPress={() => this.start()}>
            <Text style={styles.submitBtnText}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.deck,
  });
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontSize: 48,
    textAlign: 'center',
  },
  counter: {
    fontSize: 32,
    color: 'grey',
    textAlign: 'center',
  },
  SubmitBtn: {
    padding: 20,
    backgroundColor: '#0896D8',
    borderColor: 'black',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
});

function mapStateToProps(state, options) {
  const { deck } = options.navigation.state.params;
  return { deck, state };
};

export default connect(mapStateToProps, { fetchDeck })(DeckView);
