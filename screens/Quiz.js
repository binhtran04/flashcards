import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TextButton from '../components/TextButton';
import { useDeckContext } from '../context/DeckContex';
import { gray, red, white, orange, green } from '../utils/colors';
import storage from '../utils/storage';
import {
  clearLocalNotification,
  setLocalNotification,
} from '../utils/notification';

const Quiz = ({ route, navigation }) => {
  const { getDeck, updateCard } = useDeckContext();
  const deck = getDeck(route.params.id);
  const cards = deck.cards;
  const currentIndex = route.params.currentIndex ?? 0;
  const currentCard = cards[currentIndex];

  const [showAnswer, setShowAnswer] = React.useState(false);

  React.useEffect(() => {
    if (isQuizCompleted()) {
      clearLocalNotification().then(setLocalNotification);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isQuizCompleted = () => currentIndex === cards.length;

  const toNext = () => {
    navigation.push('Quiz', {
      ...route.params,
      currentIndex: currentIndex + 1,
    });
  };

  const handleIncorrect = async () => {
    await storage.modifiCardInDeck(route.params.id, currentIndex, {
      correctness: false,
    });
    updateCard(route.params.id, currentIndex, { correctness: false });
    toNext();
  };

  const handleCorrect = async () => {
    await storage.modifiCardInDeck(route.params.id, currentIndex, {
      correctness: true,
    });
    updateCard(route.params.id, currentIndex, { correctness: true });
    toNext();
  };

  if (isQuizCompleted()) {
    const correctNumber = cards.filter((c) => c.correctness).length;

    return (
      <View>
        <Text style={styles.score}>
          Score: {`${correctNumber} / ${cards.length}`}
        </Text>
        <View style={styles.btnWrapper}>
          <TextButton
            style={{ backgroundColor: red }}
            textColor={white}
            onPress={() => {
              navigation.navigate('DeckDetail');
            }}
          >
            Close
          </TextButton>
          <TextButton
            style={{ backgroundColor: orange }}
            textColor={white}
            onPress={() => {
              navigation.replace('Quiz', {
                ...route.params,
                currentIndex: 0,
              });
            }}
          >
            Try again
          </TextButton>
        </View>
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
