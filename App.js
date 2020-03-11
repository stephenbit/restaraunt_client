import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { NativeRouter, Switch, Route} from 'react-router-native'

import BookingDetails from './Components/BookingDetails';
import Header from './Components/Header';
import BookingsList from './Components/BookingsList';
import AddBookingForm from './Components/AddBookingForm';
import EditBookingForm from './Components/EditBookingForm'

import CustomerService from './Services/CustomerService';
import BookingsService from './Services/BookingService';
import TableService from './Services/TableService';


const App = () => {

  const [bookings, setBookings] = useState([]);
  const [bookingToEdit, setBookingToEdit] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [tables, setTables] = useState([]);

  useEffect(() => {

    BookingsService.getAllBookings()
      .then(bookingData => setBookings(bookingData._embedded.bookings))
    CustomerService.getAllCustomers()
      .then(customerData => setCustomers(customerData._embedded.customers))
    TableService.getAllTables()
      .then(tableData => setTables(tableData._embedded.eatingPlatforms))
  },
    []
  )


  const backHome = () => {
    setBookingToEdit(null)

  }

  return (

    <NativeRouter>
      <View style={styles.view}>
        <Header title="setHeader(header)" />
        <Switch>
          <Route
          exact path ="/"
          render={(props) => <BookingsList {...props} setBookingToEdit={setBookingToEdit} bookings={bookings} />}
          >
          </Route>
          <Route
          exact path ="/addbooking"
          >
            <AddBookingForm customers={customers} />
          </Route>
          <Route
          exact path ="/editbooking"
          >
            <EditBookingForm booking={bookingToEdit}/>
          </Route>
        </Switch>
      </View>
    </NativeRouter>

    
    // <View style={styles.view}>
    //   <Header title="setHeader(header)" />
    //   {/* <AddBookingForm customers={customers} ></AddBookingForm> */}
    //   {/* <EditBookingForm booking={bookingToEdit} /> */}
    //   {!bookingToEdit && <View style={styles.list}>
    //     <BookingsList bookings={bookings} loadEditPage={loadEditPage} />
    //   </View>}
    //   {bookingToEdit && <EditBookingForm booking={bookingToEdit} backHome={backHome}/>} 
    // </View>

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
