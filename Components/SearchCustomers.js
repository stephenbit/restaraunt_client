import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity} from 'react-native';


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

    const gotoAddCustomer = () => {
        history.push("/addcustomer")
    }



    return (

        <View style={styles.container}>
           
            <TextInput 
            style={styles.textinput}
            onChangeText={text => searchFilterFunction(text)}
            placeholder=" Search"
            ></TextInput>
            <FlatList
            data={filteredCustomers}
            style={styles.flatlist}
            renderItem={({item}) => 
            <TouchableOpacity 
            onPress={() => selectCustomer(item)}
            >
                <CustomerListItem 
                customer={item} />
            </TouchableOpacity>
            }
            />
             <TouchableOpacity style={styles.button} onPress={gotoAddCustomer} >
                <Text style={styles.buttontext} >
                    Add Customer
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => history.push('/')} >
                <Text style={styles.buttontext} >
                    Back
                </Text>
            </TouchableOpacity>
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
    flatlist:{
        fontSize: 20,
        height: 500,
        paddingTop: 10
    },
    button:{
        marginHorizontal: 15,
        fontSize: 24,
        backgroundColor: 'cornflowerblue',
        marginTop: 20,
        height: 40,
        borderRadius:5
    },
    buttontext:{
        paddingTop: 8,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        textAlign:'center'
    }, 
    container:{
        paddingTop: 10
    }
})

export default SearchCustomers;