import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Table, Row} from 'react-native-table-component';
import { Overlay } from 'react-native-elements'

import Calendar from './Calendar';

import BookingService from '../Services/BookingService'

const BookingsList = ({ bookings, setBookings, history, setBookingToEdit, fetchBookings}) => {

    const [tableHead, setTableHead] = useState(['Time', 'Name', 'Party Size'])
    const [tableData, setTableData] = useState([])
    const [press, setPress] = useState(false)
    const [selectedBooking, setSelectedBooking] = useState(null)
    const [todaysDate, setTodaysDate] = useState('');
    const [displayedDate, setDisplayedDate] = useState('');
    const [displayedDateAsDate, setdisplayedDateAsDate] = useState({});
    const [viewCalendar, setViewCalendar] = useState(false);

    useEffect(() => {
        getDateAsDate();
    },[])

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
     
        BookingService.updateBooking(updatedDetails)
        setBookings(bookings);
        setPress(false);
    }

    const handleLeaving = () => {
        for(booking of bookings)
            if(booking = selectedBooking){
                booking.hasLeft = true
            }
            const updatedDetails = {
                hasLeft: 'true',
                url: selectedBooking._links.self.href
            }
         
            BookingService.updateBooking(updatedDetails)
            setBookings(bookings);
            setPress(false);
    }



    const getTableRows = () => {
        const filteredBookings = bookings.filter(booking => booking.hasLeft != true)
        const tableDataNodes = filteredBookings.map((booking) => {
                if (booking.hasArrived){
                    return (<TouchableOpacity onPress={() => handlePress(booking)} >
                        <Row style={styles.rowarrived} textStyle={styles.rowtext} flexArr={[1, 3, 1.5]} data={[booking.startTime, booking.customer.name, booking.numberOfGuests]} />
                    </TouchableOpacity>
                    )
                } else {
                    return (<TouchableOpacity onPress={() => handlePress(booking)} >
                        <Row style={styles.row} textStyle={styles.rowtext} flexArr={[1, 3, 1.5]} data={[booking.startTime, booking.customer.name, booking.numberOfGuests]} />
                    </TouchableOpacity>
                )
                }
            })
            return tableDataNodes
    }


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

        function getDateAsDate() {
            let today = new Date();
            setdisplayedDateAsDate(today);
            turnDateToString(today);
          }
        
         const turnDateToString = (date) => {
            let dd = String(date.getDate()).padStart(2, '0');
            let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = date.getFullYear();
            stringdate = dd + '/' + mm + '/' + yyyy;
            setDisplayedDate(stringdate)
         }
        
        
          const goForwardOneDay = () => {
            displayedDateAsDate.setDate(displayedDateAsDate.getDate() +1)
            setdisplayedDateAsDate(displayedDateAsDate)
            turnDateToString(displayedDateAsDate)
          }
        
          const goBackOneDay = () => {
            displayedDateAsDate.setDate(displayedDateAsDate.getDate() -1)
            setdisplayedDateAsDate(displayedDateAsDate)
            turnDateToString(displayedDateAsDate)
          }

          const showCalendar = () => {
              setViewCalendar(true)
          }

          const closeCalendar = () => {
              setViewCalendar(false)
          }

    return (
        <View>

{viewCalendar && <Overlay isVisible={viewCalendar} style={styles.overlay} height={500} width={360} borderRadius={10}>
                <Calendar closeCalendar={closeCalendar}  setDisplayedDate={setDisplayedDate} setdisplayedDateAsDate={setdisplayedDateAsDate} />
            </Overlay>}

            <TouchableOpacity onPress={goBackOneDay} >
                <Text style={styles.dateNav} >Back</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={showCalendar} >
                <Text style={styles.dateNav}>{displayedDate}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={goForwardOneDay} >
                <Text style={styles.dateNav}>Forward</Text>
            </TouchableOpacity>

            {press && <Overlay isVisible={press} style={styles.overlay} height={510} borderRadius={10}>
                <View>
                    <Text style={styles.title}>Booking Details</Text>
                    <Text style={styles.text}>Date: {selectedBooking.date}</Text>
                    <Text style={styles.text}>Time: {selectedBooking.startTime}</Text>
                    <Text style={styles.text}>Name: {selectedBooking.customer.name}</Text>
                    <Text style={styles.text}>Phone: {selectedBooking.customer.phoneNumber}</Text>
                    <Text style={styles.text}>Table: {selectedBooking.eatingPlatformId}</Text>

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
    
                <Row textStyle={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}} data={tableHead} flexArr={[1, 3, 1.5]}/>
               <ScrollView>
                {/* {tableDataNodes} */}
                {getTableRows()}
                </ScrollView>
            </Table>
            

            <TouchableOpacity style={styles.button} onPress={gotoAddBooking} >
                <Text style={styles.buttontext} >
                    Add Booking
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={gotoSearchCustomers} >
                <Text style={styles.buttontext} >
                    Search Customers
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={gotoAddCustomer} >
                <Text style={styles.buttontext} >
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
        fontWeight: "bold",
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
        fontSize: 20,
        textAlign: 'center'
    },
    table:{
        height: 400, 
        overflow: 'scroll', 
        marginTop: 20, 
        marginHorizontal: 15
    },    
    dateNav: {
        fontSize: 20,
        textAlign: 'center'
    }

})



export default BookingsList;