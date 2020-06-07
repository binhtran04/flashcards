import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import TextButton from '../components/TextButton';
import { useDeckContext } from '../context/DeckContex';
import { green, white, gray } from '../utils/colors';
import storage from '../utils/storage';

const NewCard = ({ route, navigation }) => {
  const [question, setQuestion] = React.useState('');
  const [answer, setAnswer] = React.useState('');
  const { addNewCard } = useDeckContext();

  const handleAddNewCard = async () => {
    const card = { question, answer };
    await storage.saveCardToDeck(route.params.id, card);
    addNewCard(route.params.id, card);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Questions ...?"
        value={question}
        onChangeText={setQuestion}
      />
      <TextInput
        style={styles.input}
        placeholder="Answer ..."
        value={answer}
        onChangeText={setAnswer}
      />
      <TextButton
        style={!question || !answer ? styles.btnDisabled : styles.btnEnabled}
        onPress={handleAddNewCard}
        disabled={!question || !answer}
        textColor={white}
      >
        Add new Card
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

export default NewCard;
