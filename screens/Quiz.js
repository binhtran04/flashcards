import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TextButton from '../components/TextButton';
import { useDeckContext } from '../context/DeckContex';

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
        <Text>Score: {`${correctNumber} / ${cards.length}`}</Text>
      </View>
    );
  }

  return (
    <View>
      <View>
        <Text>{`${currentIndex + 1} / ${cards.length}`}</Text>
        <Text>{currentCard.question}</Text>
        {showAnswer && <Text>{currentCard.answer}</Text>}
        <TextButton onPress={() => setShowAnswer((prev) => !prev)}>
          Show Answer
        </TextButton>
      </View>
      <View>
        <TextButton onPress={handleIncorrect}>Incorrect</TextButton>
        <TextButton onPress={handleCorrect}>Correct</TextButton>
      </View>
    </View>
  );
};

export default Quiz;

const styles = StyleSheet.create({});
