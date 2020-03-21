const baseUrl = 'https://restaurantspringbackend.herokuapp.com/eatingPlatforms';

export default {
    getAllTables(){
        return fetch(baseUrl)
        .then(res => res.json())
        }
    }
