import React, {useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BookingDetails from './Components/BookingDetails';
import Header from './Components/Header';


const App = () => {

  const [bookings, setBookings] = useState ([
    {id: 0,
    tableNumber: 89,
    customerName: "Bobby Jacob",
    customerPhoneNumber: "01189998819901197253"
  }
  ])

  return (
    <View style={styles.view}>

    <Header title="Header"/>
      <BookingDetails booking={bookings[0]}/>

      
    </View>
  );
};

const styles = StyleSheet.create({
  view:{
    flex: 1,
  }
})

export default App;
