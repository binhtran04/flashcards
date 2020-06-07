import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TextButton from '../components/TextButton';
import { useDeckContext } from '../context/DeckContex';
import { createStackNavigator } from '@react-navigation/stack';
import { gray, red, white, orange, green } from '../utils/colors';

const Quiz = ({ route, navigation }) => {
  const { getDeck, updateCard } = useDeckContext();
  const deck = getDeck(route.params.id);
  const cards = deck.cards;
  const currentIndex = route.params.currentIndex ?? 0;
  const currentCard = cards[currentIndex];

  const [showAnswer, setShowAnswer] = React.useState(false);

  const toNext = () => {
    navigation.push('Quiz', {
      ...route.params,
      currentIndex: currentIndex + 1,
    });
  };

  const handleIncorrect = () => {
    updateCard(route.params.id, currentIndex, { correctness: false });
    toNext();
  };

  const handleCorrect = () => {
    updateCard(route.params.id, currentIndex, { correctness: true });
    toNext();
  };

  if (currentIndex === cards.length) {
    const correctNumber = cards.filter((c) => c.correctness).length;

    return (
      <View>
        <Text style={styles.score}>
          Score: {`${correctNumber} / ${cards.length}`}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.counter}>{`${currentIndex + 1}/${
        cards.length
      }`}</Text>
      <Text style={styles.question}>{currentCard.question}</Text>
      {showAnswer && <Text style={styles.answer}>{currentCard.answer}</Text>}
      <TextButton
        style={styles.btnShowAnswer}
        onPress={() => setShowAnswer((prev) => !prev)}
        textColor={white}
      >
        Show Answer
      </TextButton>
      <View style={styles.btnWrapper}>
        <TextButton style={styles.btnIncorrect} onPress={handleIncorrect}>
          Incorrect
        </TextButton>
        <TextButton style={styles.btnCorrect} onPress={handleCorrect}>
          Correct
        </TextButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  counter: {
    alignSelf: 'flex-end',
    fontSize: 12,
    color: gray,
  },
  question: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 20,
  },
  answer: {
    fontSize: 16,
    marginTop: 8,
    marginBottom: 8,
    textAlign: 'center',
    padding: 20,
  },
  btnShowAnswer: {
    backgroundColor: orange,
  },
  btnWrapper: {
    flexDirection: 'row',
    marginTop: 24,
    justifyContent: 'space-around',
  },
  btnCorrect: {
    backgroundColor: green,
  },
  btnIncorrect: {
    backgroundColor: red,
  },
  score: {
    fontSize: 48,
    alignSelf: 'center',
  },
});

export default Quiz;
