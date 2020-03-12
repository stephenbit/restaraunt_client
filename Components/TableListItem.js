import React from 'react';
import {Text, StyleSheet} from 'react-native';


const TableListItem = ({table}) => {

    return(
        <Text 
        style={styles.text}
        >
        {table.id} {table.numberOfSeats}
        </Text>
    )

}

const styles = StyleSheet.create({
    text:{
        fontSize: 20
    }
})

export default TableListItem;