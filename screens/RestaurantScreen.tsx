import React, {useEffect, useState} from 'react';
import axios from 'axios';
import MenuItem from '../components/MenuItem';
import { useCart } from '../store/CartContext';

import Icon from 'react-native-vector-icons/Ionicons';  
import BackArrow  from '../assets/backArrow';

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,

} from 'react-native';

import Searchbar from '../components/Searchbar';
import {fetchQueryData,debouncedFetchQueryData} from '../utils/fetchUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';

// type Restaurant = {
//   name: string;
//   address: string;
//   _id: string;
//   email: string;
//   phone: string;
// };

type item= {
  _id: string;
  name: string;
  price: string;
  imageUrl: string;
};



const RestaurantScreen: React.FC<{navigation:any,route:any}> = ({
  route,
  navigation,
}) => {
 const {cartItems, setCartItems} = useCart();

  const [menuItems, setMenutItems] = useState();
  const [searchQuery, setSearchQuery] = useState<string>('');


  const {restaurant} = route.params;
  console.log("restaurantsss---->",restaurant);
  useEffect(() => {
    const fetchData = async () => {
      if(!searchQuery)
      {
        const data = await fetchQueryData(searchQuery, 'menu',restaurant._id);
        setMenutItems(data);
        console.log(data)
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
    if (cartItems.length > 0) {  
      saveCartToLocalStorage(cartItems); 
    }
  }, [cartItems]); 
  

  useEffect(() => {
    loadCartFromLocalStorage();
  }, []);
  
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}style={styles.backButton} >
           <BackArrow/>
        </TouchableOpacity>
        <Text style={styles.restaurantName}> {restaurant.name}</Text>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('Cart', {cartItems,setCartItems})}>
          <Text style={styles.cart}>🛒</Text>
        </TouchableOpacity> */}
      </View>
      <Searchbar onSearchQueryChange={setSearchQuery} />
        <FlatList
           data={menuItems}

          renderItem={({ item }) => (
         <MenuItem
           item={item}
           
           restaurant={restaurant}
         />)}

         keyExtractor={item => item._id}  
  
        />
      <TouchableOpacity
        style={styles.goToCartButton}
        onPress={() => navigation.navigate('Cart',restaurant._id)}>
        <Text style={styles.buttonText}>Go to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: '#fff'},
  header: {
    flexDirection: 'row',
    //justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  backButton: {
    backgroundColor: '#FF6347',  // Tomato red background
    paddingVertical: 8,          // Vertical padding for better touch target
    paddingHorizontal: 15,       // Horizontal padding to make it rectangular
    borderRadius: 5,             // Small border radius for a subtle rectangle
    shadowColor: '#000',         // Shadow for a bit of depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,          // Lighter shadow for a cleaner look
    shadowRadius: 2,
    elevation: 2,                // Low elevation for Android (small shadow)
    alignSelf: 'flex-start',     // Align to the left
    marginLeft: 10,              // Slight margin from the screen's edge
    marginTop: 10,                           // Optional: Slight margin to the left of the screen
  },
  back: {
    color: '#fff',               // White text color
    fontSize: 20,                // Slightly larger font size for visibility
    fontWeight: 'bold',          // Bold text
  },
  backIcon: {
    marginRight: 8,              // Space between the icon and text
  },

  restaurantName: {
    marginRight:18,
    marginTop:10,
    fontSize: 24, fontWeight: 'bold',
    paddingLeft:50
  },
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
