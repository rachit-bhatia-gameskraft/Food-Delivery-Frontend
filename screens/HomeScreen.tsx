
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import RestaurantCard from '../components/RestaurantCard';
import Searchbar from '../components/Searchbar';
import fetchQueryData from '../utils/fetchUtils';

type Restaurant = {
  name: string;
  address: string;
  _id: string;
  email: string;
  phone: string;
};

const HomeScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
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

  
  // const debouncedFetchQueryData = debounce(fetchQueryData, 300);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchQueryData(searchQuery, 'restaurant');
        setLoading(false);
        setRestaurants(data);
      } catch (err:any) {
        setLoading(false);
        setError(err.message);
      }
    };
    fetchData();
  }, [searchQuery]);

  return (
    <View style={style.container}>
      <Searchbar style={style.searchbar} onSearchQueryChange={setSearchQuery} />
      {loading && <Text>loading...</Text>}
      {error && <Text>{error}</Text>}
      <ScrollView style={style.list}>
        {restaurants.map(restaurant => (
          <TouchableOpacity
          key={restaurant._id}
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

export default HomeScreen;
