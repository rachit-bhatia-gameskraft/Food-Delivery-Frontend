import React, {useState,} from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import axios from 'axios';
import {REACT_APP_BACKEND_URL} from '@env';
type Restaurant = {
  name: string;
  address: string;
  _id: string;
  email: string;
  phone: string;
};
// import { Dispatch, SetStateAction } from 'react';

// Define the type for your props
// interface SearchBarProps {
//   style?: object; // Optional style prop
//   fetchQueryData
// }

const Searchbar: React.FC<any> = ({fetchQueryData}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');


  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);




  const handleSearch = (query: string) => {
    setSearchQuery(query)
    fetchQueryData(query)
  };

  return (
    <View style={styles.container}>
      {loading && <Text>loading...</Text>}
      {error && <Text>{error}</Text>}
      <View style={styles.list}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for restaurants,dishes,etc..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  itemText: {
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'lightgrey',
  },
  list: {
    flex: 1,
  },
});

export default Searchbar;
