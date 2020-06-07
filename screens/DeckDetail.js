import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import TextButton from '../components/TextButton';
import { useDeckContext } from '../context/DeckContex';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import Quiz from './Quiz';
import NewCard from './NewCard';
import { pink, orange, green } from '../utils/colors';

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

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.cardNumber}>{deck.cards.length} cards</Text>
      </View>
      <View style={styles.btnContainer}>
        <TextButton
          style={[styles.button, { backgroundColor: orange }]}
          onPress={() => navigation.navigate('Quiz', { id: route.params.id })}
        >
          Start Quiz
        </TextButton>
        <TextButton
          style={[styles.button, { backgroundColor: green }]}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    alignItems: 'center',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  cardNumber: {
    fontSize: 16,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    padding: 20,
  },
});

const Stack = createStackNavigator();

const DeckDetailStackNav = ({ route, navigation }) => (
  <Stack.Navigator
    initialRouteName="DeckDetail"
    mode="modal"
    screenOptions={{}}
  >
    <Stack.Screen
      name="DeckDetail"
      component={DeckDetail}
      initialParams={{ id: route.params.id }}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Quiz"
      component={Quiz}
      options={{
        headerStatusBarHeight: 0,
        headerLeft: () => (
          <Ionicons
            name="ios-close"
            size={24}
            onPress={() => navigation.navigate('DeckDetail')}
          />
        ),
      }}
    />
    <Stack.Screen
      name="NewCard"
      component={NewCard}
      options={{
        headerTitle: 'Card',
        headerStatusBarHeight: 0,
        headerLeft: () => (
          <Ionicons
            name="ios-close"
            size={24}
            onPress={() => navigation.navigate('DeckDetail')}
          />
        ),
      }}
    />
  </Stack.Navigator>
);

export default DeckDetailStackNav;
