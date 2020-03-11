import React from 'react';
import {View, Text, StyleSheet, ShadowPropTypesIOS} from 'react-native';

const Header =({title}) => {


    return (
        <View style={styles.header}>
            <Text style={styles.text}>
            {title}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        height: 93,
        paddingTop: 35,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text:{
        fontSize: 32
    }
  })

export default Header;