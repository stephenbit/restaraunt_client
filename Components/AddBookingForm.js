import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import { NativeRouter, Switch, Route} from 'react-router-native'
import BookingService from '../Services/BookingService';


const AddBooking =({customers, history }) => {

    [startTime, setStartTime] = useState();
    [date, setDate] = useState();
    [numberOfGuests, setNumberOfGuests] = useState();
    [customerId, setCustomerId] = useState();
    [eatingPlatformId, setEatingPlatformId] = useState();


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

        const gotoHome = () => {
            history.push("/")
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

                <TouchableOpacity style={styles.button} onPress={submitBooking} >
                    <Text style={styles.buttontext} >
                        Add Booking
                    </Text>
                </TouchableOpacity>


                <TouchableOpacity onPress={gotoHome} style={styles.button}>
                    <Text  style={styles.buttontext} >
                        Back
                    </Text>
                </TouchableOpacity>
    </View>

)
  
}

const styles = StyleSheet.create({

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
    }
  })


export default AddBooking;