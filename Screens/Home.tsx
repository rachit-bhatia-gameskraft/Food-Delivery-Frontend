import React, {useEffect, useState, useCallback} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import RestaurantCard from '../components/RestaurantCard';
import Searchbar from '../components/Searchbar';
import axios from 'axios';
import {REACT_APP_BACKEND_URL} from '@env';
import OrderScreen from './OrderScreen';

type Restaurant = {
  name: string;
  address: string;
  _id: string;
  email: string;
  phone: string;
};

const Home: React.FC<{navigation: any}> = ({navigation}) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const debounce = <T extends (...args: any[]) => any>(
    fn: T,
    timer: number,
  ): ((...args: Parameters<T>) => void) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (...args: Parameters<T>) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn(...args);
      }, timer);
    };
  };
  const fetchQueryData = async (query: string) => {
    try {
      setLoading(true);
      const apiUrl = query
        ? `${REACT_APP_BACKEND_URL}/api/restaurant/search/${query}`
        : `${REACT_APP_BACKEND_URL}/api/restaurant`;
      const response = await axios.get(apiUrl);
      setRestaurants(response.data);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);

      setLoading(false);
    }
  };
  useEffect(() => {
    fetchQueryData('');
  }, []);

  return (
    <View style={style.container}>
      <Searchbar style={style.searchbar} fetchQueryData={fetchQueryData} />
      <ScrollView style={style.list}>
        {restaurants.map(restaurant => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Restaurant', {
                restaurant,
              })
            }>
            <RestaurantCard key={restaurant._id} {...restaurant} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchbar: {},
  list: {
    marginTop: 25,
  },
});

export default Home;
