import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BookingDetails from './BookingDetails';
import { Overlay } from 'react-native-elements'

const BookingsListItem = ({ booking }) => {

    const [press, setPress] = useState(false)

    const handlePress = () => {
        setPress(true)
    }

    const handleAnotherPress = () => {
        setPress(false)
    }

    // const handlePress = (pressedItem) => {
    //     return <BookingDetails booking={pressedItem}/>
    // }

    return (
        <TouchableOpacity style={styles.container}
        onPress={()=> handlePress()}
        >
            <Overlay isVisible={press}>
                <Text>Hello from Overlay!</Text>
                <TouchableOpacity onPress={handleAnotherPress}>
                    <BookingDetails booking={booking}/>
                </TouchableOpacity>
            </Overlay>
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