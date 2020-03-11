import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { NativeRouter, Switch, Route} from 'react-router-native'

import BookingDetails from './Components/BookingDetails';
import Header from './Components/Header';
import BookingsList from './Components/BookingsList';
import AddBookingForm from './Components/AddBookingForm';
import EditBookingForm from './Components/EditBookingForm';
import SearchCustomers from './Components/SearchCustomers';
import AddCustomerForm from './Components/AddCustomerForm'

import CustomerService from './Services/CustomerService';
import BookingsService from './Services/BookingService';
import TableService from './Services/TableService';


const App = () => {

  const [bookings, setBookings] = useState([]);
  const [bookingToEdit, setBookingToEdit] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState({name:''});
  const [tables, setTables] = useState([]);

  useEffect(() => {
    fetchBookings();
    fetchCustomers();
    fetchTables();

  },
    []
  )

  const fetchBookings = () => {
    BookingsService.getAllBookings()
      .then(bookingData => {return bookingData._embedded.bookings})
      // .then(bookingData => (bookingData.map(booking => {booking.arrived=false})))
      .then(response => setBookings(response.sort((a, b) => (a.startTime > b.startTime)? 1: -1)))
    }

    const fetchCustomers = () => {
    CustomerService.getAllCustomers()
      .then(customerData => setCustomers(customerData._embedded.customers))
    } 

    const fetchTables = () => {
    TableService.getAllTables()
      .then(tableData => setTables(tableData._embedded.eatingPlatforms))
    }

  return (

    <NativeRouter>
      <View style={styles.view}>
        <Header title="Bobby Jacob's Bar & Grill" />
        <Switch>
          <Route
          exact path ="/"
          render={(props) => <BookingsList {...props} setBookingToEdit={setBookingToEdit} bookings={bookings} fetchBookings={fetchBookings} />}
          >
          </Route>
          <Route
          exact path ="/addbooking"
          render={(props) => <AddBookingForm {...props} customers={customers}
          selectedCustomer={selectedCustomer}
          fetchBookings={fetchBookings} />}
          >
          </Route>
          <Route
          exact path ="/editbooking"
          render={(props) => <EditBookingForm {...props} booking={bookingToEdit} />}
          >  
          </Route>

          <Route exact path="/searchcustomers"
          render={(props) => <SearchCustomers {...props}
          customers={customers}
          chooseSelectedCustomer={setSelectedCustomer}
          />}
          > 
          </Route>
         
          <Route
          exact path ="/addcustomer"
          render={(props) => 
          <AddCustomerForm 
          {...props}
          fetchCustomers={fetchCustomers}
          
            />}
          >  
          </Route>
          </Switch>
      </View>
    </NativeRouter>

    

  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1
  },
  list: {
    borderWidth: 2,
    height: 500,
    borderColor: 'red',
    padding: 10,
    alignContent: 'center',
    marginHorizontal: 15
  }
})

export default App;
