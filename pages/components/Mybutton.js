// Pre-Populated SQLite Database in React Native
// https://aboutreact.com/example-of-pre-populated-sqlite-database-in-react-native
// Custom Button

import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const Mybutton = (props) => {
  return (
    <TouchableOpacity
      style={[styles.button,{...props.style}]}
      onPress={props.customClick}>
      <Text style={styles.text}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f05555',
    color: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginTop: 30,
    marginLeft: 25,
    marginRight: 25,
    elevation: 10,
  },
  text: {
    color: '#ffffff',
  },
});

export default Mybutton;