import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BookingDetails from './BookingDetails';

const BookingsListItem = ({ booking }) => {

    const handlePress = (pressedItem) => {
        return <BookingDetails booking={pressedItem}/>
    }

    return (
        <TouchableOpacity style={styles.container}
        onPress={()=> handlePress({booking})}
        >
            <Text style={styles.text}>
                {booking.startTime}
            </Text>
            <Text style={styles.text}>
                {booking.customer.name}
            </Text>
            <Text style={styles.text}>
                Table {booking.eatingPlatformId}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        color: 'black',
        paddingRight: 10,
        paddingBottom: 10
    },
    container: {
        flexDirection: 'row'

    }
})



export default BookingsListItem;