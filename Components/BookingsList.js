import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { Overlay } from 'react-native-elements'

const BookingsList = ({ bookings, loadEditPage, history, setBookingToEdit }) => {

    const [tableHead, setTableHead] = useState(['time', 'name', 'table', 'arrived?', 'left?'])
    const [tableData, setTableData] = useState([])
    const [press, setPress] = useState(false)
    const [selectedBooking, setSelectedBooking] = useState(null)


    const handlePress = (pressedItem) => {
        setPress(true)
        setSelectedBooking(pressedItem)
        console.log(pressedItem)
    }

    const handleEdit = () => {
        setBookingToEdit(selectedBooking)
        history.push("/editbooking")
    }
    
    const handleClose = () => {
        setPress(false)
    }

    const gotoAddBooking = () => {
        history.push("/addbooking")
    }

 

    const tableDataNodes = bookings.map((booking) => {
        return (<TouchableOpacity onPress={() => handlePress(booking)} >
            <Row data={[booking.startTime, booking.customer.name, booking.eatingPlatformId, 'button', 'button']} />
        </TouchableOpacity>
        )
    })

    return (
        <View>
            {press && <Overlay 
            isVisible={press} 
            style={styles.overlay} 
            height={400} 
            borderRadius={10}
            >
                <View>
                    <Text style={styles.title}>Booking Details</Text>
                    <Text style={styles.text}>
                        Date: {selectedBooking.date}
                    </Text>
                    <Text style={styles.text}>
                        Time: {selectedBooking.startTime}
                    </Text>
                    <Text style={styles.text}>
                        Name: {selectedBooking.customer.name}
                    </Text>
                    <Text style={styles.text}>
                        Phone: {selectedBooking.customer.phoneNumber}
                    </Text>
                    <Text style={styles.text}>
                        Table: {selectedBooking.eatingPlatformId}
                    </Text>
                    <TouchableOpacity style={styles.button} onPress={handleEdit}>
                        <Text style={styles.buttontext}>
                            Edit Booking
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleClose}>
                        <Text style={styles.buttontext}>
                            Close
                        </Text>
                    </TouchableOpacity>
                    </View>
            </Overlay>}
            <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                <Row data={tableHead} />
                {tableDataNodes}
            </Table>

            <TouchableOpacity
            style={styles.button}
            onPress={gotoAddBooking}
            >
                <Text
                style={styles.buttontext}
                >
                    Add Booking
                </Text>
            </TouchableOpacity>
    
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        color: 'black',
        paddingRight: 10,
        paddingBottom: 15
    },
    overlay: {
        flexDirection: 'row',
        // display: "flex",
        flex: 1,
        justifyContent: "center"
      
    },
    title: {
        fontSize: 25,
        paddingBottom: 20,
        fontWeight: "bold"
    },
    close: {
        textAlign: "center",
        borderColor: "green",
        borderWidth: 2,
        paddingVertical: 20,
        backgroundColor: "green",
        fontSize: 25,
    },
    edit: {
        borderColor: "red",
        backgroundColor: "red",
        borderWidth: 2,
        alignSelf: "flex-end",
        padding: 10,
        fontSize: 15

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



export default BookingsList;