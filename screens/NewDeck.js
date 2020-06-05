import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import TextButton from '../components/TextButton';
import { useDeckContext } from '../context/DeckContex';

const NewDeck = ({ navigation }) => {
  const [title, setTitle] = React.useState('');
  const { addNewDeck } = useDeckContext();

  const reset = () => setTitle('');

  const handleAddNewDeck = () => {
    addNewDeck(title);
    reset();

    navigation.goBack();
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
