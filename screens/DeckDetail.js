import React from 'react';
import { Text, View } from 'react-native';
import TextButton from '../components/TextButton';

const DeckDetail = () => {
  const deck = {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer:
          'The combination of a function and the lexical environment within which that function was declared.',
      },
    ],
  };
  return (
    <View>
      <View>
        <Text>{deck.title}</Text>
        <Text>{deck.questions.length} cards</Text>
      </View>
      <View>
        <TextButton>Start Quiz</TextButton>
        <TextButton>New Card</TextButton>
      </View>
    </View>
  );
};

export default DeckDetail;
