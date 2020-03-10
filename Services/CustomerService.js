const baseUrl = 'https://restaurantspringbackend.herokuapp.com/customers';

export default {
    getAllCustomers(){
        return fetch(baseUrl)
        .then(res => res.json())
        }
    }
