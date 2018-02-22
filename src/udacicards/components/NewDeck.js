import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { addDeck } from 'store/deck/actions';
import { saveDeckTitle } from 'storage/UdaciCards';
import { NavigationActions } from 'react-navigation';
import { ToDeckView } from 'udacicards/utils/navigation';

class NewDeck extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '' };
  };

  submit = () => {
    const { title } = this.state;
    this.setState(() => ({ title: '' }));

    this.props.addDeck({ title });
    this.props.navigation.dispatch(ToDeckView(title));

    saveDeckTitle(title);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>What is the title of your new deck?</Text>
        <TextInput style={styles.text} onChangeText={(title) => this.setState({ title })} value={this.state.title} />
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
    height: 40
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

function mapStateToProps(state) {
  return state;
};

export default connect(mapStateToProps, { addDeck })(NewDeck);
