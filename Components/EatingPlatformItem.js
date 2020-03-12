import React from 'react';
import {View, Text} from 'react-native';


const EatingPlatformItem = ({item}) => {

    return (
        <View>
            <Text>
                {/* Table Number: {item.id}, Number of Seats: {item.numberOfSeats} */}
                {item.id},                        {item.numberOfSeats}

            </Text>
        </View>
    )

}

export default EatingPlatformItem