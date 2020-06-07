import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useDeckContext } from '../context/DeckContex';
import { lightPurp, pink } from '../utils/colors';

const DeckList = ({ navigation }) => {
  const { decks } = useDeckContext();

  const handleItemSelect = (id) => {
    navigation.navigate('DeckDetailStackNav', { id });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Decks</Text>
      <FlatList
        data={Object.values(decks)}
        renderItem={({ item }) => {
          return <DeckItem deck={item} onSelect={handleItemSelect} />;
        }}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const DeckItem = ({ deck, onSelect }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onSelect(deck.id);
      }}
      style={styles.item}
    >
      <Text style={styles.title}>{deck.title}</Text>
      <Text style={styles.cardNumber}>{deck.cards.length} cards</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 48,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  item: {
    padding: 20,
    backgroundColor: pink,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  cardNumber: {
    fontSize: 16,
  },
});

export default DeckList;
