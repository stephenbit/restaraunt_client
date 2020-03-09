import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const App =() => {

  // const [countries, setCountries] = useState([])
  // const getCountries= () => {
  //   fetch('https://restcountries.eu/rest/v2/all')
  //   .then(res=>res.json())
  //   .then(countries=>setCountries(countries))
  //   .then(banana=>console.log(countries)
  //   )
  // }

  // useEffect(()=>{
  //   getCountries()
  // },
  // []
  // );

  return(
    <View style={styles.container}>
      <Text style={styles.text}>
      IT WORKS!!!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "blue"
  },
  text:{
    fontSize: 50,
    color: 'red'
  }


})

export default App;
