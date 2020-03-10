import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import { SearchBar } from 'react-native-elements';
import SearchInput, { createFilter } from 'react-native-search-filter';

const AddBooking =({customers}) => {

    [startTime, setStartTime] = useState();
    [date, setDate] = useState();
    [numberOfGuests, setNumberOfGuests] = useState();
    [customerId, setCustomerId] = useState();
    let date = new Date();
    const todaysDate = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()


return (
    <View>

        <SearchInput />

        <Text>Start Time:</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => setStartTime(text)}
                    value='12:00'
                />
                <Text>Date:</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => setDate(text)}
                    value={todaysDate}
                   
                />
                <Text>Table Size:</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => setNumberOfGuests(text)}
                    
                />
                <Text>Customer:</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => setCustomerId(text)}
                    
                />





                <TouchableOpacity>
                    <Text style={styles.back} >
                        Back
                    </Text>
                </TouchableOpacity>
    </View>

)
  
}

const styles = StyleSheet.create({
    // view:{
    //     alignItems: 'center',
    //     justifyContent: 'center'
    // },
    // title:{
    //     fontSize:40,
    //     textAlignVertical: 'top'
    // },
    back: {
        borderColor: "green",
        backgroundColor: "green",
        borderWidth: 2,
        alignSelf: "flex-end",
        padding: 10,
        fontSize: 15
    },
    text:{
      fontSize: 20,
      color: 'black'
    }
  })


export default AddBooking;