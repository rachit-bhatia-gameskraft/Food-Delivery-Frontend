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
import fetchQueryData from '../utils/fetchUtils';
// type Restaurant = {
//   name: string;
//   address: string;
//   _id: string;
//   email: string;
//   phone: string;
// };



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
      const data = await fetchQueryData(searchQuery, 'menu',restaurant._id);
      setMenutItems(data);
    };
    fetchData();
  }, [searchQuery,restaurant._id]);



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

  const handleAddToCart = (itemId: string) => {
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

  // console.log('carItems', cartItems);
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
        keyExtractor={item => item.id}
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
