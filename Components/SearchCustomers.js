import React, {useState, useEffect} from 'react';
import {View, TextInput, FlatList, StyleSheet, TouchableOpacity} from 'react-native';


import CustomerListItem from './CustomerListItem'

const SearchCustomers = ({customers, chooseSelectedCustomer, history}) => {

    const [searchString, setSearchString] = useState('');
    const [filteredCustomers, setFilteredCustomers] = useState();

useEffect(() => {
    setFilteredCustomers(customers)
},[])

    searchFilterFunction = (text) => {
        console.log(text);
        setFilteredCustomers( customers.filter( customer => customer.name.toLowerCase().includes(text.toLowerCase())  ) )
        console.log(filteredCustomers);
    }

    const selectCustomer = (customer) => {
chooseSelectedCustomer(customer)
        history.push("/addbooking")
    }



    return (

        <View>
           
            <TextInput 
            style={styles.textinput}
            onChangeText={text => searchFilterFunction(text)}
            ></TextInput>
            <FlatList
            data={filteredCustomers}
            style={styles.text}
            renderItem={({item}) => 
            <TouchableOpacity 
            onPress={() => selectCustomer(item)}
            >
                <CustomerListItem 
                customer={item} />
            </TouchableOpacity>
            }
            />
        </View>


    )


}

styles = StyleSheet.create({
    textinput:{
        height: 40,
        marginHorizontal: 15,
        borderColor:'black',
        borderWidth: 2,
        borderRadius: 5
    },
    text:{
        fontSize: 20
    }
})

export default SearchCustomers;