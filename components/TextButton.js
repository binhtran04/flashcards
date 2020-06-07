import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const TextButton = ({ children, textColor = 'black', style, ...props }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} {...props}>
      <Text style={[styles.buttonText, { color: textColor }]}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 20,
  },
  buttonText: {
    textAlign: 'center',
  },
});

export default TextButton;
