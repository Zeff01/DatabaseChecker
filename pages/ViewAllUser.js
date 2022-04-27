

import React, {useState, useEffect} from 'react';
import {FlatList, Text, View, SafeAreaView} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';



const ViewAllUser = ({route, navigation}) => {


  const { databaseValue, tableValue } = route.params;
  const db = openDatabase({name: databaseValue, createFromLocation: 1});

  let [flatListItems, setFlatListItems] = useState([]);


  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM '${tableValue}'`,
      [],
      (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setFlatListItems(temp);
        // console.log(temp)
    
      });
    });
  }, []);


  let listViewItemSeparator = () => {
    return (
      <View style={{height: 0.5, width: '100%', backgroundColor: '#808080'}} />
    );
  };

  let listItemView = (item) => {
    return (
      <View 
        // key={item.colorHex} doesnt need key
        style={{backgroundColor: 'white', padding: 20}}>
      
        {Object.entries(item).map((entry) => {
          const [key, value] = entry;
          return !!value && <Text key={key}>{key}: {value}</Text>
        })}

      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
      <Text style>DATABASE:{JSON.stringify(databaseValue)} </Text>
      <Text style>TABLE:{JSON.stringify(tableValue)} </Text>

        <View style={{flex: 1,}}>
          <FlatList
            data={flatListItems}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => listItemView(item)}
          />
        </View>
       
      </View>
    </SafeAreaView>
  );
};

export default ViewAllUser;