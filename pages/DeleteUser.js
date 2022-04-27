// Pre-Populated SQLite Database in React Native
// https://aboutreact.com/example-of-pre-populated-sqlite-database-in-react-native
// Screen to delete the user

import React, { useState, useEffect } from 'react';
import { Text, View, Alert, SafeAreaView, StyleSheet, FlatList, Button } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';
import { Picker } from '@react-native-picker/picker'

// Connction to access the pre-populated user_db.db


const DeleteUser = ({ route, navigation }) => {

  const { databaseValue, tableValue } = route.params;
  let [inputUserId, setInputUserId] = useState('');
  // const [pickedValueID, setPickedValueID] = useState("");
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



  //get rows
  useEffect(() => {
    getRows();

  }, []);



  const deleteUser = (item, index) => {

    query = `DELETE FROM  ${tableValue} where `;
    objectLength = Object.keys(item).length;

    Object.entries(item).forEach((entry, index) => {
      const[key, value] = entry;
      query = query + `${key} = "${value}"`;
      if(index !== objectLength - 1) {
        query = query + ` AND `;
      }
  });
  console.log(query)

    db.transaction((tx) => {
      tx.executeSql(
      query, [],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Data is deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => {
                    setRowValue(list => list.filter((_, tempIndex) => index !== tempIndex));
                  },
                },
              ],
              { cancelable: false },
            );
          } else {
            alert('Please insert a valid User Id');
          }
        },
      );
    });
    console.log("DELETE BUTTON CLICKED")

  };

  let listViewItemSeparator = () => {
    return (
      <View style={{ height: 0.5, width: '100%', backgroundColor: '#808080' }} />
    );
  };

  let listItemView = ({item, index}) => {
    return (

      <View style={{ padding: 20 }}>

        {Object.entries(item).map((entry) => {
          const [key, value] = entry;
          return !!value && <View key={key}>
            <Text>{key}: {value}</Text>
          </View>
        })}
     
        <View>
          <Mybutton
            title='DELETE'
            style={styles.button}
            customClick={() => {
              deleteUser(item, index)
            }} />
        </View>

      </View>
    );
  };


  return (
    <SafeAreaView style={{ flex: 1, }}>
      <View style={{ flex: 1, }}>
        <FlatList
          data={rowValue}
          ItemSeparatorComponent={listViewItemSeparator}
          keyExtractor={(_, index) => index.toString()}
          renderItem={listItemView}
        />
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 30,

  },
  button: {
    width: '25%',
    padding: 10,
    marginLeft: 0
  }

});
export default DeleteUser;