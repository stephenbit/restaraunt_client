import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import BookingDetails from './Components/BookingDetails';
import Header from './Components/Header';


const App = () => {

  useEffect(() => {
    getBookingsData()
  },
  []
  )

  const [bookings, setBookings] = useState([])

  const getBookingsData = () => {
    fetch('https://restaurantspringbackend.herokuapp.com/bookings')
      .then(res => res.json())
      .then(bookingData => setBookings(bookingData._embedded.bookings))
      // .then(() => console.log(bookings[0].date))
  }

  return (
    <View style={styles.view}>

      <Header title="Header" />
      <FlatList
      data= {bookings}
      renderItem={({item}) =>
      <BookingDetails booking={item}/>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  }
})

export default App;
