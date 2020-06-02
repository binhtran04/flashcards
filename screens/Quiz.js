import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TextButton from '../components/TextButton';

const Quiz = () => {
  return (
    <View>
      <View>
        <Text>2/6</Text>
        <Text>What is closure?</Text>
        <TextButton>Show Answer</TextButton>
      </View>
      <View>
        <TextButton>Incorrect</TextButton>
        <TextButton>Correct</TextButton>
      </View>
    </View>
  );
};

export default Quiz;

const styles = StyleSheet.create({});
