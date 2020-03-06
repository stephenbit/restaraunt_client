import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const App =() => {

  const [countries, setCountries] = useState([])
  const getCountries= () => {
    fetch('https://restcountries.eu/rest/v2/all')
    .then(res=>res.json())
    .then(countries=>setCountries(countries))
    .then(banana=>console.log(countries)
    )
  }

  useEffect(()=>{
    getCountries()
  },
  []
  );

  return(
    <View style={styles.container}>
      <Text style={styles.text}>{countries[0].name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text:{
    fontSize: 50
  }


})

export default App;