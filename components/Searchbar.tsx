import React, {useState, useEffect} from 'react';
import {View, TextInput, FlatList, Text, StyleSheet} from 'react-native';
import axios from 'axios';
// import Config from 'react-native-config';
// import {REACT_APP_BACKEND_URL} from '@env'
type Restaurant = {
  data: [];
};

const Searchbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [restaurants, setRestaurants] =
    useState<{name: string; address: string; _id: string}[]>();
  const [filteredRestaurants, setFilteredRestaurants] =
    useState<{name: string; address: string; _id: string}[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response: Restaurant = await axios.get(
        'http://10.1.1.0:3001/api/restaurant',
        // 'http://localhost:3001/api/restaurant',
      );
      setRestaurants(response.data);
      restaurants?.map(restaurant => {
        console.log(restaurant.name);
      });
      setLoading(false);
    } catch (err: any) {
      console.log(err);
      setError(err);
      setLoading(false);
    }
  };
  const fetchQueryResult = async (query: string) => {
    try {
      setLoading(true);
      const response: Restaurant = await axios.get(
        `http://10.1.1.0:3001/api/restaurant/search/${query}`,
      );
      setFilteredRestaurants(response.data);
    } catch (err) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log(query);
    if (query) {
      fetchQueryResult(query);
    } else {
      setRestaurants(restaurants);
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
            data={restaurants}
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
