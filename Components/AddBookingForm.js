import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import BookingService from '../Services/BookingService';


const AddBooking =({customers}) => {

    [startTime, setStartTime] = useState();
    [date, setDate] = useState();
    [numberOfGuests, setNumberOfGuests] = useState();
    [customerId, setCustomerId] = useState();
    [eatingPlatformId, setEatingPlatformId] = useState();

    // useEffect(() => {
    //     setItems(customers);
    // },
    // []
    // )

    // let date = new Date();
    // const todaysDate = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()

        const submitBooking = () => {

            const eatingPlatform = 'https://restaurantspringbackend.herokuapp.com/eatingPlatforms/' + eatingPlatformId;
            const customer = 'https://restaurantspringbackend.herokuapp.com/customers/' + customerId;

            const bookingDetails= {
                startTime: startTime,
                date: date,
                numberOfGuests: numberOfGuests,
                customer: customer,
                eatingPlatform: eatingPlatform,
                duration: 1
            }
            console.log(bookingDetails)
            BookingService.createBooking(bookingDetails);
        }
    


return (
    <View>

        <Text>Start Time:</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => setStartTime(text)}
                    // value='12:00'
                />
                <Text>Date:</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => setDate(text)}
                    // value={todaysDate}
                   
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

                <Text>Table:</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => setEatingPlatformId(text)}
                    
                />


                <TouchableOpacity>
                    <Text onPress={submitBooking} style={styles.back} >
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