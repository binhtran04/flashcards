import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import TextButton from '../components/TextButton';

const NewCard = () => {
  return (
    <View>
      <TextInput placeholder="Questions ...?" />
      <TextInput placeholder="Answer ..." />
      <TextButton>Add</TextButton>
    </View>
  );
};

export default NewCard;

const styles = StyleSheet.create({});
