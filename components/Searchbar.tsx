import React, {useState, useEffect} from 'react';
import {View, TextInput, FlatList, Text, StyleSheet} from 'react-native';
import axios from 'axios';
import {REACT_APP_BACKEND_URL} from '@env';
type Restaurant = {
  name: string; address: string; _id: string,email:string,phone:string
};

const Searchbar: React.FC = () => {
  console.log("React Native",REACT_APP_BACKEND_URL)
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [restaurants, setRestaurants] =
    useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] =
    useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fetchAllData = async () => {
    try {
      setLoading(true);
      
      const response = await axios.get(
        `${REACT_APP_BACKEND_URL}/api/restaurant`,
      );
      setRestaurants(response.data);

      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };
  const fetchQueryData = async (query: string) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://10.0.2.2:3001/api/restaurant/search/${query}`,
      );
      setFilteredRestaurants(response.data);
      setLoading(false)
    } catch (err: any) {
      setError(err.message)
      setFilteredRestaurants([]);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllData();
  }, []);

  const handleSearch = async(query: string) => {
    setSearchQuery(query);
    if (query) {
      await fetchQueryData(query);
    } else {
      setFilteredRestaurants([]);
    }
  };

  return (
    <View style={styles.container}>
      {loading && <Text>loading...</Text>}
      {error ? (
        <Text>{error}</Text>
      ) : (
        <View style={styles.list}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for restaurants,dishes,etc..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
          <FlatList
            data={filteredRestaurants.length>0?filteredRestaurants:restaurants}
            keyExtractor={item => item._id}
            renderItem={({item}) => (
              <Text style={styles.itemText}>{item.name}</Text>
            )}
          />
        </View>
      )}
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
