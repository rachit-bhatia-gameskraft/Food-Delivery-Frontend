
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
import {fetchQueryData,debouncedFetchQueryData} from '../utils/fetchUtils';

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

  useEffect(() => {
    const fetchData = async () => {
      try {

        if(!searchQuery)
        {
          setLoading(true);
          const data = await fetchQueryData(searchQuery, 'restaurant');
          setRestaurants(data);
          setLoading(false);
        }
        else
        {
          setLoading(true);
          const data = await debouncedFetchQueryData(searchQuery, 'restaurant');
          setRestaurants(data);
          setLoading(false);
        }
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
      {loading ? <Text>loading...</Text> :
      <>
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
        </>
        }
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    padding:16,
    },
});

export default HomeScreen;
