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
        <Text style={styles.label} >Start Time:</Text>
                <TextInput
                    style={styles.textinput}
                    onChangeText={text => setStartTime(text)}
                    value={startTime}
                />
                <Text style={styles.label} >Date:</Text>
                <TextInput
                    style={styles.textinput}
                    onChangeText={text => setDate(text)}
                    value={date}
                   
                />
                <Text style={styles.label} >Table Size:</Text>
                <TextInput
                    style={styles.textinput}
                    onChangeText={text => setNumberOfGuests(text)}
                    value={numberOfGuests.toString()}
                    
                />
                <Text style={styles.label} >Customer:</Text>
                <TextInput
                    style={styles.textinput}                    
                    onChangeText={text => setCustomerId(text)}
                    value={customerId.toString()}
                />

                <Text style={styles.label} >Table:</Text>
                <TextInput
                    style={styles.textinput}
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
    },
    textinput:{
        height: 40,
        marginHorizontal: 15,
        borderColor:'black',
        borderWidth: 2,
        borderRadius: 5
    },
    label:{
        marginHorizontal:15,
        fontSize: 20,
        paddingVertical: 5
        
    }
  })


export default EditBookingForm;