import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const DeckList = ({ navigation }) => {
  const decks = {
    a1: {
      id: 'a1',
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces',
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event',
        },
      ],
    },
    b1: {
      id: 'b1',
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer:
            'The combination of a function and the lexical environment within which that function was declared.',
        },
      ],
    },
  };

  const handleItemSelect = (id) => {
    navigation.navigate('DeckDetail', { id });
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
        <Text>{deck.questions.length} cards</Text>
      </View>
    </TouchableOpacity>
  );
};

export default DeckList;
