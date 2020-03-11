import React, {useState, useEffect} from 'react';
import {View, TextInput, FlatList, StyleSheet} from 'react-native';


import CustomerListItem from './CustomerListItem'

const SearchCustomers = ({customers}) => {

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

    return (

        <View>
           
            <TextInput 
            style={styles.textinput}
            onChangeText={text => searchFilterFunction(text)}
            ></TextInput>
            <FlatList
            data={filteredCustomers}
            renderItem={({item}) => <CustomerListItem customer={item} />}
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
    }
})

export default SearchCustomers;