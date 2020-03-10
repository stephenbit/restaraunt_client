const baseUrl = 'https://restaurantspringbackend.herokuapp.com/bookings';

export default {
    getAllBookings(){
        return fetch(baseUrl)
        .then(res => res.json())
        }
    }
