import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList, ScrollView, TextInput } from 'react-native';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import { openDatabase } from 'react-native-sqlite-storage';
import { Picker } from '@react-native-picker/picker'
import Mytextinput from './components/Mytextinput';




const PreForm = ({ route, navigation }) => {
  const [databaseValue, setDatabaseValue] = useState('NO DATABASE SELECTED');
  const [tableValue, setTableValue] = useState([]);
  const [textValue, setTextValue] = useState("");
  const [pickedValue, setPickedValue] = useState("");



  const fetchSQL = () => {
    console.log(textValue);
    const db = openDatabase({ name: databaseValue, createFromLocation: 1 });
   

    db.transaction((tx) => {
      tx.executeSql(textValue,
        [],
        (tx, results) => {

          const temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
            
          }
          setTableValue(temp)
          alert('Data has been successfully updated!');
          resolve(result);
        },
        (_, err) =>{
          reject(err);
        }
        
        );

    });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>

            <Mytext
              text="NOAH DATABASE CHECKER"
            />


            {/* //PICKER 1  */}
            <View style={styles.pickerTitle}>
            <Text>PICKED DATABASE: {databaseValue}</Text>
            </View>
            <View style={styles.pickerContainer}>


              <Picker
                style={styles.picker}

                mode='dropdown'
                dropdownIconColor='blue'
                selectedValue={databaseValue}
                onValueChange={(itemValue, itemIndex) =>
                  setDatabaseValue(itemValue)
                }>
                <Picker.Item label="Select Database" value="0" color='red' />
                <Picker.Item label="GENERAL" value="GeneralDB.db" />
                <Picker.Item label="DATA" value="DDB" />
                <Picker.Item label="ATTRIBUTE" value="ADB" />
                <Picker.Item label="user_db" value="user_db.db" />
              </Picker>
            </View>
            
            <View>
              <TextInput
                style={styles.sqlInput}
                placeholder='Enter SQL QUERY'
                onChangeText={(value) => setTextValue(value)}
                value={textValue}
                multiline={true}
                numberOfLines={3} 
              />

              <Mybutton title='Execute' customClick={fetchSQL} />
            </View>

            {/* //BUTTON */}
      
            {/* <Mybutton
              title="View All"
              customClick={() => navigation.navigate('ViewAll', { databaseValue: databaseValue, tableValue: pickedValue })}
            /> */}
     
          </View>



        </View>

        <View style={styles.sqlView}>
          {tableValue.map((entry, key) => {
            return (<View  key={key} style={styles.sqlItem}>
              <Text > {entry.name}</Text>
            </View>)
          })}
        </View>

      </ScrollView>

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
    marginTop: 10,
    marginBottom: 20,

  },
  sqlInput:{
    borderWidth: 1,
    borderColor: 'black',
    marginLeft: 25,
    marginRight: 25,
    height: 100
  },
  pickerTitle: {
    marginLeft: 20,
    marginTop: 20
  },
  sqlView:{
    borderColor: 'black',
    borderWidth: 1,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 20,

  },
  sqlItem:{
    padding: 5,
  }
});

export default PreForm;