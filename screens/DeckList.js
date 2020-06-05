import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useDeckContext } from '../context/DeckContex';

const DeckList = ({ navigation }) => {
  const { decks } = useDeckContext();

  const handleItemSelect = (id) => {
    navigation.navigate('DeckDetailStackNav', { id });
  };

  return (
    <SafeAreaView>
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
    >
      <View>
        <Text>{deck.title}</Text>
        <Text>{deck.cards.length} cards</Text>
      </View>
    </TouchableOpacity>
  );
};

export default DeckList;
