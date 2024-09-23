import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import MenuItem from '../components/MenuItem';
import { useCart } from '../store/CartContext';

import AsyncStorage from '@react-native-async-storage/async-storage';
import BackArrow from '../assets/backArrow';
import axios from 'axios';
import { REACT_APP_BACKEND_URL } from '@env';
const userId = "60b6bdf9d2a9b818a4b49a76";  // Hardcoded userId

interface MyItem  {
  // Empty for now, but can be filled with other relevant props
}

type Restaurant = {
  name: string;
  address: string;
  _id: string;
  email: string;
  phone: string;
};

interface cartItem extends MyItem {
  item: {
    _id: string;
    name: string;
    price: string;
    imageUrl: string;
  };
  quantity: number;
}

const CartScreen: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
   const restaurantId = route.params;
   const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
   const { cartItems, setCartItems } = useCart();
   const cartItemArray: cartItem[] = Object.values(cartItems || []);
   
   const totalAmount = cartItemArray.reduce((total, item) => {
     const numericPrice = parseFloat(item.item.price);
     return total + numericPrice * item.quantity;
   }, 0);

   // Fetch restaurant details
   useEffect(() => {
     const fetchRestaurant = async () => {
       try {
         const response = await axios.get(`${REACT_APP_BACKEND_URL}/api/restaurant/${restaurantId}`);
         setRestaurant(response.data);
       } catch (err) {
         console.error('Error fetching restaurant details:', err);
       }
     };
     if (restaurantId) {
       fetchRestaurant();
     }
   }, [restaurantId]);

   // Place order function
   const placeOrder = async () => {
     try {
       const orderData = {
         items: cartItemArray.map(item => ({
           dish: item.item._id,
           quantity: item.quantity,
           price: item.item.price,
         })),
         deliveryAddress: restaurant ? restaurant.address : '123 Main St',  // Example address
         totalPrice: totalAmount,
       };
       const response = await axios.post(`http://10.0.2.2:3001/api/order/user/${userId}/orders`, orderData);
       Alert.alert('Order placed successfully', `Order ID: ${response.data.order._id}`);
       setCartItems({});  // Clear cart after placing the order
       navigation.navigate('Order', { userId });  // Redirect to the Order screen
     } catch (error) {
       console.error('Error placing order:', error);
       Alert.alert('Error', 'Failed to place the order.');
     }
   };

   return (
     <View style={styles.container}>
       <View style={styles.row}> 
         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
           <BackArrow/>
         </TouchableOpacity>
         <Text style={styles.title}>Your Cart</Text>
       </View>

       <FlatList
         data={cartItemArray}
         renderItem={({ item }) => (
           <MenuItem
             item={item.item}  // Pass the item details
             cartItems={cartItems}
             setCartItems={setCartItems}
             restaurant={restaurant}
           />
         )}
         keyExtractor={(item) => item.item._id}
       />
       <View style={styles.totalContainer}>
         <Text style={styles.totalText}>Total: ₹{totalAmount.toFixed(2)}</Text>
       </View>

       { Object.keys(cartItems).length > 0 && (
         <TouchableOpacity 
           style={styles.checkoutButton}
           onPress={placeOrder}  // Trigger the placeOrder function
         >
           <Text style={styles.buttonText}>Checkout</Text>
         </TouchableOpacity>
       )}
     </View>
   );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  row: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 10,
  },
  backButton: {
    backgroundColor: '#FF6347',  // Tomato red background
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  title: { fontSize: 24, fontWeight: 'bold', marginTop: 18, marginLeft: 15 },
  totalContainer: { marginTop: 16, marginBottom: 16 },
  totalText: { fontSize: 18, fontWeight: 'bold' },
  checkoutButton: { backgroundColor: '#ff6347', padding: 16, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18 },
});

export default CartScreen;
