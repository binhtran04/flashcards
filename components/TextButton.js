import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const TextButton = ({ children, ...props }) => {
  return (
    <TouchableOpacity {...props}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    textAlign: 'center',
  },
});

export default TextButton;
