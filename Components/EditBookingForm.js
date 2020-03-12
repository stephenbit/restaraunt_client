import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, } from 'react-native';
import {Overlay} from 'react-native-elements';

import BookingService from '../Services/BookingService';
import ChooseTable from './ChooseTable';


const EditBookingForm =({booking, history, selectedCustomer, setSelectedCustomer, customers, setCustomers, setSelectedTable, selectedTable, tables}) => {

    [startTime, setStartTime] = useState(booking.startTime);
    [date, setDate] = useState(booking.date);
    [numberOfGuests, setNumberOfGuests] = useState(booking.numberOfGuests);
    [customerId, setCustomerId] = useState(booking.customerId);
    [customerName, setCustomerName] = useState(booking.customer.name);
    [eatingPlatformId, setEatingPlatformId] = useState(booking.eatingPlatformId);
    [press, setPress] = useState(false);
    [validTables, setValidTables] = useState([]);

    useEffect(() => {
        setCustomer()
        setTable()
    },[])

    const filterTables = () => {
        let arrayOfTables = tables
        let filteredTables = arrayOfTables.filter(table =>{
            return table.numberOfSeats >= numberOfGuests
        })
        setValidTables(filteredTables)
    }
    

    const setCustomer = () => {         
        if(customerId != selectedCustomer.id && selectedCustomer.name != ''){
            setCustomerId(selectedCustomer.id)
            setCustomerName(selectedCustomer.name)
        }   
    }

    const setTable = () => {
        if(eatingPlatformId != selectedTable.id && selectedTable.id != ''){
            setEatingPlatformId(selectedTable.id)
        }
    }

    const gotoChooseTable = () => {
        filterTables()
        setPress(true)
    }    
    


    const submitBooking = () => {

        const eatingPlatform = 'https://restaurantspringbackend.herokuapp.com/eatingPlatforms/' + eatingPlatformId;
        const customer = 'https://restaurantspringbackend.herokuapp.com/customers/' + selectedCustomer.id;

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
        gotoHome();
    }

        const gotoHome = () => {
            setSelectedCustomer({name:''})
            history.push("/")
        }
    
        const gotoCustomerSearch = () => {
            history.push("/searchcustomers")
        }


return (
    <View>
        <Text style={styles.label} >Customer:</Text>
        <Text style={styles.label}>{customerName}</Text>
        <TouchableOpacity onPress={gotoCustomerSearch} style={styles.button}>
            <Text  style={styles.buttontext} >
                Search for Customer
            </Text>
        </TouchableOpacity>


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
 

        <Text style={styles.label} >Table:</Text>
        <Text style={styles.label}>{eatingPlatformId}</Text>
            

        <TouchableOpacity style={styles.button} onPress={gotoChooseTable} >
            <Text style={styles.buttontext} >
                Choose Table
            </Text>
        </TouchableOpacity>


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

        {press && <Overlay
                isVisible={press}
                height={510}
                borderRadius={10}>

                    <ChooseTable
                    tables={validTables}
                    setSelectedTable={setSelectedTable}
                    setTable={setTable}
                    setPress={setPress}
                    numberOfGuests={numberOfGuests}
                    ></ChooseTable>
                </Overlay>
        }
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