import {StyleSheet, View} from 'react-native';
import React from 'react';
import Searchbar from './components/Searchbar';
import HomeScreen from './Screens/Home';
const App = () => {
  //console.log(process.env.REACT_APP_BACKEND_URL)
  return (
    <>
    <View style={styles.container}>
      <Searchbar />
    </View>
    <HomeScreen></HomeScreen>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
