import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import BookingService from '../Services/BookingService';


const EditBookingForm =({booking}) => {

    [startTime, setStartTime] = useState(booking.startTime);
    [date, setDate] = useState(booking.date);
    [numberOfGuests, setNumberOfGuests] = useState(booking.numberOfGuests);
    [customerId, setCustomerId] = useState(booking.customerId);
    [eatingPlatformId, setEatingPlatformId] = useState(booking.eatingPlatformId);

        const submitBooking = () => {

            const eatingPlatform = 'https://restaurantspringbackend.herokuapp.com/eatingPlatforms/' + eatingPlatformId;
            const customer = 'https://restaurantspringbackend.herokuapp.com/customers/' + customerId;

            const bookingDetails= {
                url: booking._links.self.href,
                startTime: startTime,
                date: date,
                numberOfGuests: numberOfGuests,
                customer: customer,
                eatingPlatform: eatingPlatform,
                duration: 1
            }
            console.log(bookingDetails)
            BookingService.updateBooking(bookingDetails);
        }
    


return (
    <View>

        <Text>This is EditBookingForm</Text>
        <Text>Start Time:</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => setStartTime(text)}
                    value={startTime}
                />
                <Text>Date:</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => setDate(text)}
                    value={date}
                   
                />
                <Text>Table Size:</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => setNumberOfGuests(text)}
                    value={numberOfGuests.toString()}
                    
                />
                <Text>Customer:</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => setCustomerId(text)}
                    value={customerId.toString()}
                />

                <Text>Table:</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => setEatingPlatformId(text)}
                    value={eatingPlatformId.toString()}
                />


                <TouchableOpacity>
                    <Text onPress={submitBooking} style={styles.back} >
                        Submit
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


export default EditBookingForm;