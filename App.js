import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DeckList from './screens/DeckList';
import DeckDetailStackNav from './screens/DeckDetail';
import NewDeck from './screens/NewDeck';
import { DeckProvider } from './context/DeckContex';
import { blue, white } from './utils/colors';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const Home = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: blue,
      style: {
        height: 86,
        backgroundColor: white,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 1,
      },
    }}
  >
    <Tab.Screen
      name="DeckList"
      component={DeckList}
      options={{
        tabBarLabel: 'Deck List',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-list" size={30} color={tintColor} />
        ),
      }}
    />
    <Tab.Screen
      name="NewDeck"
      component={NewDeck}
      options={{
        tabBarLabel: 'New Deck',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-add" size={30} color={tintColor} />
        ),
      }}
    />
  </Tab.Navigator>
);

const Stack = createStackNavigator();

const DeckStackNav = () => (
  <Stack.Navigator
    initialRouteName="DeckList"
    screenOptions={{
      headerStyle: { backgroundColor: blue },
      headerTintColor: white,
    }}
  >
    <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }} />
    <Stack.Screen
      name="DeckDetailStackNav"
      component={DeckDetailStackNav}
      options={{
        headerTitle: null,
      }}
    />
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
