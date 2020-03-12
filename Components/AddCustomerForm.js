import React, {useState} from 'react';
import {Text, View, TextInput, TouchableOpacity, StyleSheet, Alert} from 'react-native';

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
        Alert.alert("Customer Successfully Added", 
                "", 
                {text: "Ok"})
        CustomerService.createCustomer(customerDetails)
        .then(response => fetchCustomers())
        .then(response => history.push("/"))
        

    }

    return (
        <View>

    
                    <Text style={styles.label} >Name:</Text>
                    <TextInput
                        style={styles.textinput}
                        onChangeText={text => setName(text)}
                        
                    />
                    <Text style={styles.label} >Phone:</Text>
                    <TextInput
                        style={styles.textinput}
                        onChangeText={text => setPhone(text)}
                    />
                    <Text style={styles.label} >Email:</Text>
                    <TextInput
                        style={styles.textinput}
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
    },
    textinput:{
        height: 40,
        marginHorizontal: 15,
        borderColor:'black',
        borderWidth: 2,
        borderRadius: 5
    },
    label:{
        marginHorizontal:15,
        fontSize: 20,
        paddingVertical: 5
        
    }
})


export default AddCustomerForm;