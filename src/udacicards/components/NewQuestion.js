import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import { Text, View, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';

import { addCard } from 'store/card/actions';
import { addDeck } from 'store/deck/actions';
import { saveDeckTitle, addCardToDeck } from 'storage/UdaciCards';
import { Back } from 'udacicards/utils/navigation';

class NewQuestion extends Component {

  constructor(props) {
    super(props);

    this.state = {
      question: '',
      answer: ''
    };
  };

  submit = () => {
    const { question, answer } = this.state;
    const { deck, addCard } = this.props;

    addCard({ question, answer, deck });
    addCardToDeck({ question, answer, deck });

    this.setState(() => ({ question: '', answer: '' }));

    this.props.navigation.dispatch(Back());
  };

  render() {
    return (
      <View style={styles.container}>

        <Text>Enter your question</Text>
        <TextInput style={styles.text} onChangeText={(question) => this.setState({ question })} value={this.state.question} />

        <Text>Enter the answer</Text>
        <TextInput style={styles.text} onChangeText={(answer) => this.setState({ answer })} value={this.state.answer} />

        <TouchableOpacity style={styles.SubmitBtn} onPress={this.submit}>
          <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  text: {
    height: 40,
  },
  SubmitBtn: {
    backgroundColor: '#0896D8',
    padding: 30,
    height: 45,
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
    alignItems: 'center',
    margin: 10,
  },
});

function mapStateToProps(state, options) {
  const { deck } = options.navigation.state.params;
  return { deck, state };
};

export default connect(mapStateToProps, { addCard })(NewQuestion);
