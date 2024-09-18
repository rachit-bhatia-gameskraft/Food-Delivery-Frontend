import {StyleSheet, View} from 'react-native';
import React from 'react';
import Searchbar from './components/Searchbar';
const App = () => {

  return (
    <View style={styles.container}>
      <Searchbar />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
