import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, FlatList} from 'react-native';
import { Overlay, ListItem } from 'react-native-elements'
import { NativeRouter, Switch, Route} from 'react-router-native'
import BookingService from '../Services/BookingService';
import TableService from '../Services/TableService'
import EatingPlatformItem from './EatingPlatformItem';


const AddBooking =({customers, history , selectedCustomer, fetchBookings }) => {

    [startTime, setStartTime] = useState();
    [date, setDate] = useState();
    [numberOfGuests, setNumberOfGuests] = useState(0);
    [customerId, setCustomerId] = useState();
    [eatingPlatformId, setEatingPlatformId] = useState();
    [press, setPress] = useState(false);
    [validTables, setValidTables] = useState([]);




        const submitBooking = () => {

            const eatingPlatform = 'https://restaurantspringbackend.herokuapp.com/eatingPlatforms/' + eatingPlatformId;
            const customer = 'https://restaurantspringbackend.herokuapp.com/customers/' + customerId;

            const bookingDetails= {
                startTime: startTime,
                date: date,
                numberOfGuests: numberOfGuests,
                customer: selectedCustomer._links.self.href,
                eatingPlatform: eatingPlatform,
                duration: 1
            }
            console.log(bookingDetails)
            BookingService.createBooking(bookingDetails)
            .then(() => fetchBookings())
            .then(() => history.push("/"))
            
        }

        const gotoHome = () => {
            history.push("/")
        }

        const gotoCustomerSearch = () => {
            history.push("/searchcustomers")
        }

        const gotoTableSelect = () => {
            TableService.getAllTables()
                .then(response => filterTables(response))
                .then(() => console.log("valid tables", validTables))
            
            // BookingService.getAllBookings()
            //     .then(response => filterTablesBetter(response))

            setPress(true)
        }

        const filterTablesBetter = (response) => {
            console.log("res", response._embedded.bookings[0].eatingPlatformId)
            let arrayOfBookings = response._embedded.bookings
            console.log("arrayOfBookings", arrayOfBookings)
            let filteredBookings = arrayOfBookings.filter(booking => {
                return booking.date != date
                // and not equal to starttime = now or inside of duration
            })
            let filteredTables = filteredBookings.map(booking => bookings.eatingPlatformId)
            setValidTables(filteredTables)
        }

        const filterTables = (response) => {
            // console.log("response", response._embedded.eatingPlatforms)
            // console.log("numberOfSeats", response._embedded.eatingPlatforms[0].numberOfSeats)
            let arrayOfTables = response._embedded.eatingPlatforms
            let filteredTables = arrayOfTables.filter(table =>{
                return table.numberOfSeats >= numberOfGuests
            })
            setValidTables(filteredTables)
        } 

        const selectTable = (item) => {
            setEatingPlatformId(item.id)
            setPress(false)
        }
        
        
    


return (
    <View>
        <Text>Customer:</Text>
        <Text style={styles.text}>{selectedCustomer.name}</Text>
        <TouchableOpacity onPress={gotoCustomerSearch} style={styles.button}>
            <Text  style={styles.buttontext} >
                Search for Customer
            </Text>
        </TouchableOpacity>

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


        <Text>Table:</Text>
        <Text style={styles.text}>{eatingPlatformId}</Text>

        {/* <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => setEatingPlatformId(text)}
            
        /> */}
        
        <TouchableOpacity onPress={gotoTableSelect} style={styles.button}>
            <Text  style={styles.buttontext} >
                Search for Table
            </Text>
        </TouchableOpacity>

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

            {press && <Overlay 
            isVisible={press}
            height={510} 
            borderRadius={10}
            >
                <View>
                    <Text>Table Select</Text>
                    <Text>
                        Table Number, Number of Seats
                    </Text>
                    <FlatList
                        data={validTables}
                        renderItem={({ item }) => 
                            <TouchableOpacity 
                            onPress={() => selectTable(item)}
                            >
                                <EatingPlatformItem item={item} />
                            </TouchableOpacity>
                        }
                    />
                    <TouchableOpacity  style={styles.button}  onPress={() => setPress(false)}>
                        <Text style={styles.buttontext}>
                            Close
                        </Text>
                    </TouchableOpacity>
                </View>
            </Overlay>}
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