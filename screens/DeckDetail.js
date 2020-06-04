import React from 'react';
import { Text, View, Button } from 'react-native';
import TextButton from '../components/TextButton';
import { useDeckContext } from '../context/DeckContex';

const DeckDetail = ({ navigation, route }) => {
  const { getDeck } = useDeckContext();

  const deck = React.useMemo(() => {
    return getDeck(route.params.id);
  }, [getDeck, route.params.id]);

  React.useEffect(() => {
    navigation.setOptions({
      title: route.params.id,
      headerTitle: deck.title,
    });
  }, [route.params.id]);

  /* const deck = {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer:
          'The combination of a function and the lexical environment within which that function was declared.',
      },
    ],
  }; */
  return (
    <View>
      <View>
        <Text>{route.params.id}</Text>
        <Text>{deck.title}</Text>
        <Text>{deck.cards.length} cards</Text>
      </View>
      <View>
        <TextButton onPress={() => navigation.navigate('Quiz')}>
          Start Quiz
        </TextButton>
        <TextButton
          onPress={() =>
            navigation.navigate('NewCard', { id: route.params.id })
          }
        >
          New Card
        </TextButton>
      </View>
    </View>
  );
};

export default DeckDetail;
