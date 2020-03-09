import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

const BookingsListItem = ({ bookings }) => {

    const handlePress = (pressedItem) => {
        console.log(pressedItem)
    }

    const [tableHead, setTableHead] = useState(['time', 'name', 'table', 'arrived?', 'left?'])
    const [tableData, setTableData] = useState([])

    const tableDataNodes = bookings.map((booking) => {
        return (<TouchableOpacity onPress={() => handlePress(booking)} >
            <Row data={[booking.startTime, booking.customer.name, booking.eatingPlatformId, 'button', 'button']} />
        </TouchableOpacity>
        )
    })

    return (
        <View>
            <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                <Row data={tableHead} />
                {tableDataNodes}
            </Table>

            {/* <TouchableOpacity style={styles.container}
                onPress={() => handlePress({ booking })}
            >
                <Text style={styles.text}>
                    {booking.startTime}
                </Text>
                <Text style={styles.text}>
                    {booking.customer.name}
                </Text>
                <Text style={styles.text}>
                    Table {booking.eatingPlatformId}
                </Text>
            </TouchableOpacity> */}
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        color: 'black',
        paddingRight: 10,
        paddingBottom: 10
    },
    container: {
        flexDirection: 'row'

    }
})



export default BookingsListItem;