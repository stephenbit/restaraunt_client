const baseUrl = 'https://restaurantspringbackend.herokuapp.com/bookings';

export default {
    getAllBookings(){
        return fetch(baseUrl)
        .then(res => res.json())
        },

    createBooking(bookingDetails){
        return fetch(baseUrl, {
            method:"POST",
            body: JSON.stringify(bookingDetails),
            headers: { 'Content-Type': 'application/json'}
        })
    },

    updateBooking(bookingDetails){
        return fetch( bookingDetails.url, {
            method: 'PATCH',
            body: JSON.stringify(bookingDetails),
            headers: {'Content-Type': 'application/json'}
        })
        .then( res => res.json())
    }



    }
