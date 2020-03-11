const baseUrl = 'https://restaurantspringbackend.herokuapp.com/customers';

export default {
    getAllCustomers(){
        return fetch(baseUrl + "?page=0&size=100")
        .then(res => res.json())
        },

    createCustomer(customerDetails){
        return fetch(baseUrl, {
            method:"POST",
            body: JSON.stringify(customerDetails),
            headers: { 'Content-Type': 'application/json'}
        })
    }

    }
