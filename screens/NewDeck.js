import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import TextButton from '../components/TextButton';

const NewDeck = () => {
  return (
    <View>
      <TextInput placeholder="Deck title" />
      <TextButton>Add Deck</TextButton>
    </View>
  );
};

export default NewDeck;

const styles = StyleSheet.create({});
