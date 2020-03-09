import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import BookingDetails from './Components/BookingDetails';
import Header from './Components/Header';
import BookingsListItem from './Components/BookingsListItem';


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
      <View style={styles.list}>
      <FlatList
      data= {bookings}
      renderItem={({item}) =>
      <BookingsListItem booking={item}/>}
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1
  },
  list:{
    borderWidth: 2,
    height: 500,
    borderColor: 'red',
    padding: 10,
    alignContent: 'center',
    marginHorizontal: 15
  }
})

export default App;
