import React from 'react';
import { Text, View, SafeAreaView, FlatList } from 'react-native';

const DeckList = () => {
  const decks = {
    React: {
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
    JavaScript: {
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

  return (
    <SafeAreaView>
      <FlatList
        data={Object.values(decks)}
        renderItem={({ item }) => {
          return <DeckItem deck={item} />;
        }}
        keyExtractor={(item) => item.title}
      />
    </SafeAreaView>
  );
};

const DeckItem = ({ deck }) => {
  return (
    <View>
      <Text>{deck.title}</Text>
      <Text>{deck.questions.length} cards</Text>
    </View>
  );
};

export default DeckList;
