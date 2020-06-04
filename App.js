import 'react-native-gesture-handler';
import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DeckList from './screens/DeckList';
import DeckDetail from './screens/DeckDetail';
import Quiz from './screens/Quiz';
import NewCard from './screens/NewCard';
import NewDeck from './screens/NewDeck';
import { DeckProvider } from './context/DeckContex';

const Tab = createBottomTabNavigator();

const Home = () => (
  <Tab.Navigator>
    <Tab.Screen name="DeckList" component={DeckList} />
    <Tab.Screen name="NewDeck" component={NewDeck} />
  </Tab.Navigator>
);

const Stack = createStackNavigator();

const DeckStackNav = () => (
  <Stack.Navigator initialRouteName="DeckList">
    <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }} />
    <Stack.Screen name="DeckDetail" component={DeckDetail} />
    <Stack.Screen name="Quiz" component={Quiz} />
    <Stack.Screen name="NewCard" component={NewCard} />
  </Stack.Navigator>
);

function App() {
  return (
    <NavigationContainer style={styles.container}>
      <DeckProvider>
        <DeckStackNav />
      </DeckProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default App;
