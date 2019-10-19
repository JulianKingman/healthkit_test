import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const Button = ({text, onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.wrapper}>
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    marginBottom: 20,
    height: 70,
  },
  text: {
    color: 'white',
  },
});

export default Button;
