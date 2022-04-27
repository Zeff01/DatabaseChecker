// Pre-Populated SQLite Database in React Native
// https://aboutreact.com/example-of-pre-populated-sqlite-database-in-react-native

import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList, ScrollView, TextInput, Platform } from 'react-native';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import { openDatabase } from 'react-native-sqlite-storage';
import { Picker } from '@react-native-picker/picker'
import Mytextinput from './components/Mytextinput';
import RNFetchBlob from 'rn-fetch-blob';
import { Dirs, FileSystem } from 'react-native-file-access';

import ISQLite from 'react-native-quick-sqlite'

const dirs = RNFetchBlob.fs.dirs;

// for internal storage
//console.log(dirs.MainBundleDir + '/databases');

// for external storage
//console.log(dirs.SDCardApplicationDir + '/databases');

// show database list
// RNFetchBlob.fs.ls(dirs.MainBundleDir + '/databases').then((files) => {
//     console.log(files)
// });
// Connction to access the pre-populated user_db.db




const HomeScreen = ({ navigation }) => {
  const [databaseValue, setDatabaseValue] = useState('NO DATABASE SELECTED');
  const [tableValue, setTableValue] = useState([]);
  const [pickedValue, setPickedValue] = useState("");
  const [textValue, setTextValue] = useState("");

  // interface ISQLite {
  //   open: (dbName: string, location?: string) => any;
  //   close: (dbName: string, location?: string) => any;
  //   executeSql: (
  //     dbName: string,
  //     query: string,
  //     params: any[] | undefined
  //   ) => {
  //     rows: any[];
  //     insertId?: number;
  //   };
  // }


  const chooseDatabase = () => {




    // ...
    // 1.SQLite.openDatabase({name : "testDB", createFromLocation : 1}, okCallback,errorCallback);
    // // default - if your folder is called www and data file is named the same as the dbName - testDB in this example
    // 2.SQLite.openDatabase({name : "testDB", createFromLocation : "~data/mydbfile.sqlite"}, okCallback,errorCallback);
    // // if your folder is called data rather than www or your filename does not match the name of the db
    // 3.SQLite.openDatabase({name : "testDB", createFromLocation : "/data/mydbfile.sqlite"}, okCallback,errorCallback);
    // // if your folder is not in app bundle but in app sandbox i.e. downloaded from some remote location.
    // ...
    const db = openDatabase({ name: "GeneralDB.db ", createFromLocation: 1 }, () => {
      console.log(`Database opened successfully`);
    }, (e) => {
      console.log(`Failed to open the database: `, e);
    });

    console.log(db)
    db.transaction((tx) => {
      tx.executeSql('SELECT name FROM sqlite_master WHERE type="table" AND name NOT LIKE "sqlite_%"',
        [],
        (tx, results) => {
          const temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }

          setTableValue(temp)

        });

    });
  }

  useEffect(() => {
    chooseDatabase();

  }, [databaseValue]);


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

            {/* //PICKER 2 */}
            <View style={styles.pickerTitle}>
              <Text>PICKED TABLE: {pickedValue}</Text>
            </View>
            <View style={styles.pickerContainer}>

              <Picker
                style={styles.picker}

                mode='dropdown'
                dropdownIconColor='blue'
                selectedValue={pickedValue}
                onValueChange={(itemValue, itemIndex) =>
                  setPickedValue(itemValue)
                }>


                {tableValue && tableValue.length > 0 && tableValue.map((item) => {
                  const { name } = item;
                  return (<Picker.Item label={name} value={name} key={name} />);
                })}

              </Picker>
            </View>





            <Mybutton title='Free Form SQL'
              // customClick={fetchSQL}
              customClick={() => navigation.navigate('FreeForm', { databaseValue: databaseValue, tableVal: pickedValue })}
            />


            {/* //BUTTON */}
            {/* <Mybutton
              title="Register"
              customClick={() => navigation.navigate('Register', { databaseValue: databaseValue, tableValue: pickedValue })}
            />
            <Mybutton
              title="Update"
              customClick={() => navigation.navigate('Update', { databaseValue: databaseValue, tableValue: pickedValue })}
            />
            <Mybutton
              title="View"
              customClick={() => navigation.navigate('View', { databaseValue: databaseValue, tableValue: pickedValue })}
            /> */}
            <Mybutton
              title="View All"
              customClick={() => navigation.navigate('ViewAll', { databaseValue: databaseValue, tableValue: pickedValue })}
            />
            {/* <Mybutton
              title="Delete"
              customClick={() => navigation.navigate('Delete', { databaseValue: databaseValue, tableValue: pickedValue })}
            /> */}
          </View>



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

  },
  pickerTitle: {
    marginLeft: 20,
    marginTop: 20
  }
});

export default HomeScreen;