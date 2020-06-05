import React from 'react';
import { Text, View, Button } from 'react-native';
import TextButton from '../components/TextButton';
import { useDeckContext } from '../context/DeckContex';
import { createStackNavigator } from '@react-navigation/stack';
import Quiz from './Quiz';
import NewCard from './NewCard';

const DeckDetail = ({ navigation, route }) => {
  const { getDeck } = useDeckContext();

  const deck = React.useMemo(() => {
    return getDeck(route.params.id);
  }, [getDeck, route.params.id]);

  React.useEffect(() => {
    navigation.setOptions({
      title: deck.title,
      headerTitle: deck.title,
    });
  }, [deck.title, navigation, route.params.id]);

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
        <TextButton
          onPress={() => navigation.navigate('Quiz', { id: route.params.id })}
        >
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

const Stack = createStackNavigator();

const DeckDetailStackNav = ({ route }) => (
  <Stack.Navigator initialRouteName="DeckDetail" mode="modal">
    <Stack.Screen
      name="DeckDetail"
      component={DeckDetail}
      initialParams={{ id: route.params.id }}
    />
    <Stack.Screen name="Quiz" component={Quiz} />
    <Stack.Screen name="NewCard" component={NewCard} />
  </Stack.Navigator>
);

export default DeckDetailStackNav;
