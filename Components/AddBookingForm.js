import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import { NativeRouter, Switch, Route} from 'react-router-native'
import BookingService from '../Services/BookingService';
import { Overlay } from 'react-native-elements';
import ChooseTable from './ChooseTable';



const AddBooking =({customers, history , selectedCustomer, fetchBookings, selectedTable, tables, setSelectedTable }) => {

    [startTime, setStartTime] = useState();
    [date, setDate] = useState();
    [numberOfGuests, setNumberOfGuests] = useState(0);
    [customerId, setCustomerId] = useState();
    [eatingPlatformId, setEatingPlatformId] = useState();
    [press, setPress] = useState(false);
    [validTables, setValidTables] = useState([]);


    const filterTables = () => {
        let arrayOfTables = tables
        let filteredTables = arrayOfTables.filter(table =>{
            return table.numberOfSeats >= numberOfGuests
        })
        setValidTables(filteredTables)
    }



        const submitBooking = () => {

            const eatingPlatform = 'https://restaurantspringbackend.herokuapp.com/eatingPlatforms/' + eatingPlatformId;
            const customer = 'https://restaurantspringbackend.herokuapp.com/customers/' + customerId;

            const bookingDetails= {
                startTime: startTime,
                date: date,
                numberOfGuests: numberOfGuests,
                customer: selectedCustomer._links.self.href,
                eatingPlatform: eatingPlatform,
                duration: 1,
                hasArrived: false,
                hasLeft: false
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

        const gotoChooseTable = () => {
            filterTables();
            setPress(true);
        }

        
    


return (
    <View>

        <Text style={styles.label} >Customer:</Text>
        <Text style={styles.label}>{selectedCustomer.name}</Text>
        <TouchableOpacity onPress={gotoCustomerSearch} style={styles.button}>
                    <Text  style={styles.buttontext} >
                        Search for Customer
                    </Text>
                </TouchableOpacity>

                <Text style={styles.label} >Start Time:</Text>
                <TextInput
                    style={styles.textinput}
                    onChangeText={text => setStartTime(text)}
                    // value='12:00'
                />
                <Text style={styles.label} >Date:</Text>
                <TextInput
                    style={styles.textinput}
                    onChangeText={text => setDate(text)}
                    // value={todaysDate}
                   
                />
                <Text style={styles.label} >Table Size:</Text>
                <TextInput
                    style={styles.textinput}
                    onChangeText={text => setNumberOfGuests(text)}
                    
                />


                <Text style={styles.label} >Table:</Text>
                <Text style={styles.label}>{selectedTable.id}</Text>
                {/* <TextInput
                    style={styles.textinput}
                    onChangeText={text => setEatingPlatformId(text)}
                    
                /> */}

                <TouchableOpacity style={styles.button} onPress={gotoChooseTable} >
                    <Text style={styles.buttontext} >
                        Choose Table
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
                borderRadius={10}>

                    <ChooseTable
                    tables={validTables}
                    setSelectedTable={setSelectedTable}
                    setPress={setPress}
                    numberOfGuests={numberOfGuests}
                    ></ChooseTable>
                </Overlay>
            }




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


export default AddBooking;