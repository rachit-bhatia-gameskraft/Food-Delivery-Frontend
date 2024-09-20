import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,

} from 'react-native';
import MenuItem from '../components/MenuItem';
import Searchbar from '../components/Searchbar';
import {fetchQueryData,debouncedFetchQueryData} from '../utils/fetchUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';



const RestaurantScreen: React.FC<{navigation:any,route:any}> = ({
  route,
  navigation,
}) => {
  const [cartItems, setCartItems] = useState<{ [key: string]: number }>({});
  const [menuItems, setMenutItems] = useState();
  const [searchQuery, setSearchQuery] = useState<string>('');


  const {restaurant} = route.params;
  useEffect(() => {
    const fetchData = async () => {
      if(!searchQuery)
      {
        const data = await fetchQueryData(searchQuery, 'menu',restaurant._id);
        setMenutItems(data);
      }
      else
      {
        const data = await debouncedFetchQueryData(searchQuery, 'menu',restaurant._id);
        setMenutItems(data);
      }
    };
    fetchData();
  }, [searchQuery,restaurant._id]);

  const saveCartToLocalStorage = async (items : object) => {
    try {
      await AsyncStorage.setItem('cartItems', JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save cart to local storage', error);
    }
  };

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
    const length = Object.keys(cartItems).length;
    if(length > 0){
      saveCartToLocalStorage(cartItems);
    }
  }, [cartItems]);

  useEffect(() => {
    loadCartFromLocalStorage();
  }, []);



  const handleGoToCart = async () => {
    try {
      // Convert cartItems to an array of items with quantity > 0
      const selectedItems = Object.entries(cartItems)
      .filter(([itemId, quantity]) => quantity > 0)
      .map(([itemId, quantity]) => ({id: itemId, quantity}));

      // Make an API call with the selected items
      const response = await axios.post('http://10.0.2.2:3001/api/cart', {
        cartItems: selectedItems,
      });

      console.log('Cart API response:', response.data);

      // Navigate to the cart screen with updated cart items
      navigation.navigate('Cart', {cartItems: selectedItems});
    } catch (error) {
      console.error('Error sending cart items to the server:', error);
    }
  };

  const handleAddToCart = async(itemId: string) => {
    const storedRestaurantId = await AsyncStorage.getItem('restaurantId');
    if(restaurant._id !== storedRestaurantId){
      await AsyncStorage.setItem('restaurantId', restaurant._id);
      await AsyncStorage.removeItem('cartItems');
      setCartItems({});
    }
    setCartItems(prevCart => ({
      ...prevCart,
      [itemId]: (prevCart[itemId] || 0) + 1,
    }));
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCartItems(prevCart => ({
      ...prevCart,
      [itemId]: Math.max((prevCart[itemId] || 1) - 1, 0),
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <Text style={styles.restaurantName}> {restaurant.name}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Cart', {cartItems})}>
          <Text style={styles.cart}>🛒</Text>
        </TouchableOpacity>
      </View>
            <Searchbar onSearchQueryChange={setSearchQuery} />

      <FlatList
        data={menuItems}
        renderItem={({item}) => (
          <MenuItem
          key={item._id}
            item={item}
            quantity={cartItems[item._id] || 0}
            handleAddToCart={() => handleAddToCart(item._id)}
            handleRemoveFromCart={() => handleRemoveFromCart(item._id)}
          />
        )}
        keyExtractor={item => item._id}
      />

      <TouchableOpacity
        style={styles.goToCartButton}
        onPress={() => navigation.navigate('Cart', {cartItems})}>
        <Text style={styles.buttonText}>Go to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: '#fff'},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  back: {fontSize: 24},
  restaurantName: {fontSize: 24, fontWeight: 'bold'},
  cart: {fontSize: 24},

  goToCartButton: {
    backgroundColor: '#ff6347',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {color: '#fff', fontSize: 18},
});

export default RestaurantScreen;
