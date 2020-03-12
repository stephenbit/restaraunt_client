import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { Overlay } from 'react-native-elements'

import BookingsListItem from './BookingsListItem'

import BookingService from '../Services/BookingService'


const BookingsList = ({ bookings, setBookings, history, setBookingToEdit, fetchBookings}) => {

    const [tableHead, setTableHead] = useState(['Time', 'Name', 'Table'])
    const [tableData, setTableData] = useState([])
    const [press, setPress] = useState(false)
    const [selectedBooking, setSelectedBooking] = useState(null)


    const handlePress = (booking) => {
        setPress(true)
        setSelectedBooking(booking)
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

    const gotoSearchCustomers = () => {
        history.push('/searchcustomers')
    }

    const gotoAddCustomer = () => {
        history.push("/addcustomer")
    }

    const handleArrival = () => {
        let updatedDetails = {}
        for(booking of bookings){
            if(booking == selectedBooking){
                if (booking.hasArrived === false){
                    booking.hasArrived = true
                } else {
                    booking.hasArrived = false
                }
                updatedDetails = {
                    hasArrived: booking.hasArrived,
                    url: selectedBooking._links.self.href
                }
            }
        }
        // const updatedDetails = {
        //     hasArrived: 'true',
        //     url: selectedBooking._links.self.href
        // }
        BookingService.updateBooking(updatedDetails)
        // fetch isn't instant so this isn't a very good way to do it. need to trigger a re-render somehow?

        // loops through bookings to find selectedBooking and then
        // set the has arrived to true before setting bookings in app
        // via function pass down as a prop
        


        setBookings(bookings);
        // fetchBookings();
        setPress(false);
    }

    const handleLeaving = () => {
        const updatedDetails = {
            hasLeft: 'true',
            url: selectedBooking._links.self.href
        }
        BookingService.updateBooking(updatedDetails)
    }

 

    const tableDataNodes = bookings.map((booking, index) => {
        if (booking.hasArrived){
            return (<TouchableOpacity onPress={() => handlePress(booking)} >
                <Row   style={styles.rowarrived} textStyle={styles.rowtext} data={[booking.startTime, booking.customer.name, booking.eatingPlatformId]} />
            </TouchableOpacity>
            )
        } else {
            return (<TouchableOpacity onPress={() => handlePress(booking)} >
                <Row  style={styles.row} textStyle={styles.rowtext} data={[booking.startTime, booking.customer.name, booking.eatingPlatformId]} />
            </TouchableOpacity>
            )
        }
    })

    const arrivedButtonStyling = () => {
        if (selectedBooking.hasArrived === true){
            return (
                <TouchableOpacity style={styles.arrivedbutton} onPress={handleArrival}>
                    <Text style={styles.buttontext}>
                        Arrived
                    </Text>
                </TouchableOpacity>
            )
            } else {
            return (
                <TouchableOpacity style={styles.button} onPress={handleArrival}>
                    <Text style={styles.buttontext}>
                        Arrived
                    </Text>
                </TouchableOpacity>
            )
            }
        }

    return (
        <View>
            {press && <Overlay 
            isVisible={press} 
            style={styles.overlay} 
            height={510} 
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

                    {arrivedButtonStyling()}

                    <TouchableOpacity style={styles.button} onPress={handleLeaving}>
                        <Text style={styles.buttontext}>
                            Left
                        </Text>
                    </TouchableOpacity>




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

            <Table 
            style={styles.table}>
    
                <Row textStyle={{fontSize: 20, fontWeight: 'bold'}} data={tableHead} />
               <ScrollView>
                {tableDataNodes}
                </ScrollView>
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

            <TouchableOpacity
            style={styles.button}
            onPress={gotoSearchCustomers}
            >
                <Text
                style={styles.buttontext}
                >
                    Search Customers
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={styles.button}
            onPress={gotoAddCustomer}
            >
                <Text
                style={styles.buttontext}
                >
                    Add Customer
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
    arrivedbutton:{
        marginHorizontal: 15,
        fontSize: 24,
        backgroundColor: 'green',
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
    row:{
        height: 40,
    },
    rowarrived:{
        height: 40,
        backgroundColor: 'rgba(152,251,152,0.5)'
    },
    rowtext:{
        fontSize: 20
    },
    table:{
        height: 400, 
        overflow: 'scroll', 
        marginTop: 20, 
        marginHorizontal: 15
    }

})



export default BookingsList;