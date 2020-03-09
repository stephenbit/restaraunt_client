import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const BookingsListItem =() => {


    return (
        <View>
                <Text style={styles.text}>
                Customer name: {booking.customer.name}
                </Text>
                <Text style={styles.text}>
                Customer phone no: {booking.customer.phoneNumber}
                </Text>
                <Text style={styles.text}>
                Date: {booking.date}
                </Text>
                <Text style={styles.text}>
                Time: {booking.startTime}
                </Text>
                <Text style={styles.text}>
                Party size: {booking.numberOfGuests}
                </Text>
                <Text style={styles.text}>
                Table Number: {booking.eatingPlatformId}
                </Text>
           </View>
    )
}



export default BookingsListItem;