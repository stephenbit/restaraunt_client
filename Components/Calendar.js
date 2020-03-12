import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';


 const Calendar = ({closeCalendar, setPickedDate, setDisplayedDate}) =>  {
 

    const pickDate = (date) => {
        setPickedDate(date);
        pickedDateToString(date);
        console.log(date);
        closeCalendar();
    }

    const pickedDateToString = (date) => {   
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const year = date.toString().slice(11,15);
        let month = date.toString().slice(4,7);
        month = (months.indexOf(month) + 1).toString().padStart(2, '0')
        const day = date.toString().slice(8,10);
        const dateString = day + '/' + month + '/' + year
        setDisplayedDate(dateString)
      }

        return (
            <View style={styles.container}>
                <CalendarPicker onDateChange={pickDate} />
            </View>
        )
    }


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginTop: 100,
    },
});

export default Calendar;