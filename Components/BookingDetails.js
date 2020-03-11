import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';

const BookingDetails =({booking, backHome})=> {

    const test = () => {
        console.log(name);
        console.log(time);
        console.log(date);
        console.log(table);
    }


    const [name, onChangeName] = useState(booking.customer.name);
    const [time, onChangeTime] = useState(booking.startTime);
    const [date, onChangeDate] = useState(booking.date);
    const [numberOfGuests, onChangeNumberOfGuests] = useState(booking.numberOfGuests);
    const [table, onChangeTable] = useState(booking.eatingPlatformId);


    if(booking){
        return (
            <View>

                <Text>Name:</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => onChangeName(text)}
                    value={name}
                />
                <Text>Time:</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => onChangeTime(text)}
                    value={time}
                />
                <Text>Date:</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => onChangeDate(text)}
                    value={date}
                />
                <Text>Table:</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => onChangeTable(text)}
                    value={table.toString()}
                />
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttontext} onPress={backHome}>
                        Back
                    </Text>
                </TouchableOpacity>


                <Text style={styles.text}>
                Customer name: {booking.customer.name}
                </Text>
                <Text style={styles.text}>
                Date: {booking.date}
                </Text>
                <Text style={styles.text}>
                Time: {booking.startTime}
                </Text>
                <Text style={styles.text}>
                Party size: {booking.numberOfGuests}
                </Text>
                <Text style={styles.text}>
                Table Number: {booking.eatingPlatformId}
                </Text>
                <TouchableOpacity>
                    <Text style={styles.back} onPress={test}>
                        TEST
                    </Text>
                </TouchableOpacity>
           </View>
       ); 
    }
    else{
        return null;
    }


}

const styles = StyleSheet.create({
    // view:{
    //     alignItems: 'center',
    //     justifyContent: 'center'
    // },
    // title:{
    //     fontSize:40,
    //     textAlignVertical: 'top'
    // },
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
    }
  })

export default BookingDetails;