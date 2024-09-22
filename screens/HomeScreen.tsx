
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
import CartIcon from '../assets/cartIcon';
import { useCart } from '../store/CartContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Restaurant = {
  name: string;
  address: string;
  _id: string;
  email: string;
  phone: string;
};



const HomeScreen: React.FC<{navigation: any}> = ({navigation}) => {


  const { cartItems , setCartItems} = useCart();
  const hasCartItems = Object.keys(cartItems).length > 0;
  const firstCartItem = Object.values(cartItems)[0]; // Get the first item in the cart (if it exists)
  const restaurantId = firstCartItem?.item?.restaurant;

  const loadCartFromLocalStorage = async () => {
    try {
      const storedCartItems = await AsyncStorage.getItem('cartItems');
      if (storedCartItems !== null) {
        setCartItems(JSON.parse(storedCartItems));
      }
    } catch (error) {
      console.error('Failed to load cart from local storage', error);
    }
  };
  
  
  
  useEffect(() => {
    loadCartFromLocalStorage();
  }, []);
  console.log("Home Screen CartItems",cartItems)
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
      <Searchbar  onSearchQueryChange={setSearchQuery} />
      {loading ? <Text>loading...</Text> :
      <>
      {error && <Text>{error}</Text>}

     {hasCartItems && (

      <TouchableOpacity
        style={style.floatingCartButton}
        onPress={() => navigation.navigate('Cart',{cartItems, restaurantId})}
      >
        <Text style={style.cartText}><CartIcon/></Text>
      </TouchableOpacity>

     )}
   
     
      <ScrollView >
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
    floatingCartButton: {
      position: 'absolute', 
      bottom: 30, // Distance from the bottom
      right: 20, // Distance from the right
      width: 60,
      height: 60,
      borderRadius: 30, // Circular button
      backgroundColor: '#f8f8f8', // You can change the color to match your design
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000', // Shadow for elevation
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
      zIndex: 100,
    },
    cartText: {
      fontSize: 30,
      color: '#FF6347',
      // Size of the cart emoji
    },
  
});

export default HomeScreen;;
