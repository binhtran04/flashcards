import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import TextButton from '../components/TextButton';
import { useDeckContext } from '../context/DeckContex';

const NewCard = ({ route, navigation }) => {
  const [question, setQuestion] = React.useState('');
  const [answer, setAnswer] = React.useState('');
  const { addNewCard } = useDeckContext();

  const handleAddNewCard = () => {
    addNewCard(route.params.id, { question, answer });
    navigation.goBack();
  };

  return (
    <View>
      <TextInput
        placeholder="Questions ...?"
        value={question}
        onChangeText={setQuestion}
      />
      <TextInput
        placeholder="Answer ..."
        value={answer}
        onChangeText={setAnswer}
      />
      <TextButton onPress={handleAddNewCard}>Add new Card</TextButton>
    </View>
  );
};

export default NewCard;

const styles = StyleSheet.create({});
