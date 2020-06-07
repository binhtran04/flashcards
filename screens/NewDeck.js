import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import TextButton from '../components/TextButton';
import { useDeckContext } from '../context/DeckContex';
import { green, gray } from '../utils/colors';
import storage from '../utils/storage';

const NewDeck = ({ navigation }) => {
  const [title, setTitle] = React.useState('');
  const { addNewDeck } = useDeckContext();

  const reset = () => setTitle('');

  const handleAddNewDeck = () => {
    storage.saveNewDeck(title).then((newDeck) => {
      addNewDeck(newDeck);
      reset();

      navigation.goBack();
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Deck title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextButton
        disabled={!title}
        style={title ? styles.btnEnabled : styles.btnDisabled}
        onPress={handleAddNewDeck}
      >
        Add Deck
      </TextButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    padding: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#000',
  },
  btnEnabled: {
    backgroundColor: green,
  },
  btnDisabled: {
    backgroundColor: gray,
  },
});

export default NewDeck;
