// Pre-Populated SQLite Database in React Native
// https://aboutreact.com/example-of-pre-populated-sqlite-database-in-react-native
// Screen to register the user

import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
  FlatList,
  StyleSheet,
  TextInput
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';

// Connction to access the pre-populated user_db.db


const RegisterUser = ({ route, navigation }) => {

  const { databaseValue, tableValue } = route.params;
  const [rowValue, setRowValue] = useState([]);
  const db = openDatabase({ name: databaseValue, createFromLocation: 1 });




  const getRows = () => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM '${tableValue}'`,
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setRowValue(temp);
        });
    });

  }

  //get rows of table
  useEffect(() => {
    getRows();

  }, []);

  console.log(rowValue)


  //register in sql database
  let [userName, setUserName] = useState('');
  let [userContact, setUserContact] = useState('');
  let [userAddress, setUserAddress] = useState('');

  let register_user = () => {
    console.log(userName, userContact, userAddress);

    if (!userName) {
      alert('Please fill names');
      return;
    }
    if (!userContact) {
      alert('Please fill Contact Number');
      return;
    }
    if (!userAddress) {
      alert('Please fill Address');
      return;
    }


    db.transaction(function (tx) {
      tx.executeSql(
        `INSERT INTO "${tableValue}" (user_name, user_contact, user_address) VALUES (?,?,?)`,
        [userName, userContact, userAddress],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You are Registered Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false },
            );
          } else alert('Registration Failed');
        },
      );
    });
  };

  let listItemView = ({ item, index }) => {
    return (

      <View style={{ padding: 20 }}>

        {Object.entries(item).map((entry) => {
          const [key, value] = entry;
          return !!value && <View key={key} style={styles.textInputContainer}>
            <Text>{key}: {value}</Text>
            <TextInput style={styles.textInput} />
          </View>
        })}

        <View>

        </View>

      </View>
    );
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>

      <Text style>DATABASE:{JSON.stringify(databaseValue)} </Text>
      <Text style>TABLE:{JSON.stringify(tableValue)} </Text>

      <View style={{ flex: 1, backgroundColor: 'white' }}>

        <ScrollView keyboardShouldPersistTaps="handled" style={{ flex: 1, backgroundColor: 'red' }}>
          <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1, justifyContent: 'space-between' }}>

            <Mytextinput
              placeholder="Enter Name"
              onChangeText={
                (userName) => setUserName(userName)
              }
              style={{ padding: 10 }}
            />

            <Mytextinput
              placeholder="Enter Contact No"
              onChangeText={
                (userContact) => setUserContact(userContact)
              }
              maxLength={10}
              keyboardType="numeric"
              style={{ padding: 10 }}
            />

            <Mytextinput
              placeholder="Enter Address"
              onChangeText={
                (userAddress) => setUserAddress(userAddress)
              }
              maxLength={225}
              numberOfLines={5}
              multiline={true}
              style={{ textAlignVertical: 'top', padding: 10 }}
            />



            <Mybutton title="Submit" customClick={register_user} />

          </KeyboardAvoidingView>
        </ScrollView>

        <View style={{ flex: 1, }}>
          <FlatList
            data={rowValue}
            // ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(_, index) => index.toString()}
            renderItem={listItemView}
          />
        </View>
      </View>


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textInputContainer:{
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput:{
    borderWidth: 1,
    borderColor: 'black',
    width: '50%',
    padding: 5,
    margin: 5
  }
});

export default RegisterUser;