import React from 'react';
import { Text, View } from 'react-native';
import TextButton from '../components/TextButton';

const DeckDetail = ({ navigation, route }) => {
  React.useEffect(() => {
    navigation.setOptions({ title: route.params.id });
  }, [route.params.id]);

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
        <Text>{route.params.id}</Text>
        <Text>{deck.title}</Text>
        <Text>{deck.questions.length} cards</Text>
      </View>
      <View>
        <TextButton onPress={() => navigation.navigate('Quiz')}>
          Start Quiz
        </TextButton>
        <TextButton onPress={() => navigation.navigate('NewCard')}>
          New Card
        </TextButton>
      </View>
    </View>
  );
};

export default DeckDetail;
