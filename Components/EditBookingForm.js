import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import BookingService from '../Services/BookingService';


const EditBookingForm =({booking, history}) => {

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

        const gotoHome = () => {
            history.push("/")
        }
    


return (
    <View>
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


                <TouchableOpacity style={styles.button} onPress={submitBooking} >
                    <Text style={styles.buttontext} >
                        Edit Booking
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
    text:{
      fontSize: 20,
      color: 'black'
    }
  })


export default EditBookingForm;