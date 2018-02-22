import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Animated,
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Back } from 'udacicards/utils/navigation'

class QuizView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0,
      correct: 0,
      incorrect: 0,
      state: 'question',
    };
  };

  finishQuestion = (action) => {
    const { position, state } = this.state;
    this.setState({
      [action]: this.state[action] + 1,
      position: position + 1,
      state: 'question',
    });
  };

  toggleAnswer = () => {
    const { state } = this.state;

    this.setState({
      state: state === 'question' ? 'answer' : 'question',
    });
  };

  restart = () => {
    this.setState({
      position: 0,
      correct: 0,
      incorrect: 0,
      state: 'question',
    });
  };


  renderScore() {
    const { questions } = this.props;
    const { correct } = this.state;
    const questionsCount = questions.length;

    return (
      <View style={styles.center}>
        <Text style={styles.score}>Correct Answers</Text>
        <Text style={styles.score}>{correct} of {questionsCount}</Text>

        <TouchableOpacity style={[styles.SubmitBtn]} onPress={() => this.restart()}>
          <Text style={[styles.submitBtnText]}>Restart Quiz</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.SubmitBtn} onPress={() => this.props.navigation.dispatch(Back())}>
          <Text style={styles.submitBtnText}>Back to Deck</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { questions } = this.props;
    const { position, state } = this.state;
    const questionsCount = questions.length;

    if (position > questionsCount - 1) {
      return this.renderScore();
    }

    const item = questions[position];
    const buttonText = state === 'question' ? 'Answer' : 'Question';
    
    return (
      <View style={styles.container}>
        <Text>{position + 1}/{questionsCount}</Text>

        <View style={styles.center}>

          <Text style={[styles.header]}>
            {item[state]}
          </Text>

          <TouchableOpacity onPress={() => this.toggleAnswer()}>
            <Text style={styles.toggleBtnText}>{buttonText}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.SubmitBtn, { backgroundColor: 'green' }]} onPress={() => this.finishQuestion('correct')}>
            <Text style={styles.submitBtnText}>Correct</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.SubmitBtn, { backgroundColor: 'red' }]} onPress={() => this.finishQuestion('incorrect')}>
            <Text style={styles.submitBtnText}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 48,
    textAlign: 'center',
  },
  score: {
    fontSize: 48,
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
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
  toggleBtnText: {
    color: 'red',
    fontSize: 22,
    textAlign: 'center',
  },
});

function mapStateToProps(state, options) {
  const { questions } = options.navigation.state.params;
  return { state, questions };
};

export default connect(mapStateToProps)(QuizView);
