import React, {useState} from 'react';
import {Text, View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';

import TableListItem from './TableListItem';


const ChooseTable = ({tables, setSelectedTable, history, setPress}) => {

    const selectTable = (table) => {
        setSelectedTable(table);
        console.log(table);
        setPress(false)
    }

    return(
        <View>
            <Text> Select a Table</Text>
            <FlatList
            data={tables}
            style={styles.flatlist}
            renderItem={({item}) => 
            <TouchableOpacity 
            onPress={() => selectTable(item)}
            >
                <TableListItem 
                table={item} />
            </TouchableOpacity> 
            }
            />

        </View>
    )


}

styles = StyleSheet.create({
    textinput:{
        height: 40,
        marginHorizontal: 15,
        borderColor:'black',
        borderWidth: 2,
        borderRadius: 5
    },
    flatlist:{
        fontSize: 20,
        height: 500,
        paddingTop: 10
    },
    button:{
        marginHorizontal: 15,
        fontSize: 24,
        backgroundColor: 'cornflowerblue',
        marginTop: 20,
        height: 40,
        borderRadius:5
    },
    buttontext:{
        paddingTop: 8,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        textAlign:'center'
    }, 
    container:{
        paddingTop: 10
    }
})

export default ChooseTable