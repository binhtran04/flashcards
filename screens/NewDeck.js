import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import TextButton from '../components/TextButton';
import { useDeckContext } from '../context/DeckContex';

const NewDeck = () => {
  const [title, setTitle] = React.useState('');
  const { addNewDeck } = useDeckContext();

  const handleAddNewDeck = () => {
    addNewDeck(title);

    // TODO return home or navigate to the new deck
  };

  return (
    <View>
      <TextInput
        placeholder="Deck title"
        value={title}
        onChangeText={setTitle}
      />
      <TextButton onPress={handleAddNewDeck}>Add Deck</TextButton>
    </View>
  );
};

export default NewDeck;

const styles = StyleSheet.create({});
