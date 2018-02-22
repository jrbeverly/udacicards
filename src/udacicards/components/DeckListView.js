import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';

import { fetchDecks } from 'store/deck/actions';
import { getDecks } from 'storage/UdaciCards';

import { AppLoading } from 'expo';

import { NavigationActions } from 'react-navigation';
import { ToDeck } from 'udacicards/utils/navigation';

class DeckListView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ready: false,
    };
  };

  componentDidMount() {
    getDecks()
      .then((entries) => {
        return this.props.fetchDecks(entries);
      })
      .then(() => this.setState(() => ({ ready: true })));
  };

  render() {
    const { ready } = this.state;

    if (ready === false) {
      return (<AppLoading />);
    }

    const { decks, state } = this.props;

    if (decks && decks.length === 0) {
      return (
        <View style={styles.center}>
          <Text>There are no decks.</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {decks.map((item) => (
          <TouchableHighlight key={item} style={styles.deck} onPress={() => this.props.navigation.dispatch(ToDeck(item))}>
            <View>
              <Text style={styles.title}>{item}</Text>
              {state[item].questions.length 
                  ? (
                    <Text style={styles.cards}>{state[item].questions.length} Cards</Text>
                  ) 
                  : (
                    <Text style={styles.cards}>No Cards</Text>
                  ) 
              }              
            </View>
          </TouchableHighlight>
        ))}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: { },
  deck: {
    borderWidth: 1,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 32,
    color: 'black',
    textAlign: 'center',
  },
  cards: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
});

function mapStateToProps(state) {
  const decks = Object.keys(state) || [];
  return { decks, state };
};

export default connect(mapStateToProps, {fetchDecks})(DeckListView);
