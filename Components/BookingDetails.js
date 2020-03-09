import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const BookingDetails =(props)=> {

    return (
         <View>
 
             <Text style={styles.text}>
             Customer Name: {props.booking.customerName}
             </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    view:{
        alignItems: 'center',
        justifyContent: 'center'
    },
    title:{
        fontSize:40,
        textAlignVertical: 'top'
    },
    text:{
      fontSize: 20,
      color: 'black'
    }
  })

export default BookingDetails;