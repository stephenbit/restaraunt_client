import React from 'react';
import {Text, StyleSheet} from 'react-native';

const logout = (data) => {
    console.log(data.name);
    
}

const CustomerListItem = ({customer}) => {

    return(
        <Text 
        style={styles.text}
        >
        {customer.name}
        </Text>
    )

}

const styles = StyleSheet.create({
    text:{
        fontSize: 25,
    }
})

export default CustomerListItem;