import React, {useState} from 'react';
import {Text, View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';

import CustomerService from '../Services/CustomerService'

const AddCustomerForm = ({history, chooseSelectedCustomer, fetchCustomers}) => {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const addCustomer = () => {
        const customerDetails = {
            name: name,
            phoneNumber: phone,
            email: email
        }
        CustomerService.createCustomer(customerDetails)
        .then(response => fetchCustomers())
        .then(response => history.push("/"))
        

    }

    return (
        <View>

    
                    <Text>Name:</Text>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={text => setName(text)}
                        
                    />
                    <Text>Phone:</Text>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={text => setPhone(text)}
                    />
                    <Text>Email:</Text>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={text => setEmail(text)}
                        
                    />

    
                    <TouchableOpacity style={styles.button} 
                    onPress={addCustomer} 
                    >
                        <Text style={styles.buttontext} >
                            Add Customer
                        </Text>
                    </TouchableOpacity>
    
    
                    <TouchableOpacity 
                    onPress={() => history.push("/")} 
                    style={styles.button}>
                        <Text  style={styles.buttontext} >
                            Back
                        </Text>
                    </TouchableOpacity>
        </View>
    
    )

}

styles = StyleSheet.create({
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
    }
})


export default AddCustomerForm;