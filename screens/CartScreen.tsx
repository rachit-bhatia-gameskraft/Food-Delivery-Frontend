import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import MenuItem from '../components/MenuItem';
import { useCart } from '../store/CartContext';

import AsyncStorage from '@react-native-async-storage/async-storage';
import BackArrow from '../assets/backArrow';



interface MyItem  {
  
  //handleAddToCart: (item: { _id: string; name: string; price: string; imageUrl: string }) => void;
  //handleRemoveFromCart: (item: { _id: string; name: string; price: string; imageUrl: string }) => void;
}

type Restaurant = {
  name: string;
  address: string;
  _id: string;
  email: string;
  phone: string;
};

interface cartItem extends MyItem{
  item: {
    _id: string;
    name: string;
    price: string;
    imageUrl: string;
  };
  quantity: number;
}


const CartScreen: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {

   const {restaurant}  = route.params;

   const { cartItems , setCartItems} = useCart();

   //console.log("tyoe of function",typeof(handleAddToCart))
   
  const cartItem: cartItem[] =  Object.values(cartItems || []);


  console.log("I am inside the cart cartScreen", cartItems)
 

  const totalAmount = cartItem.reduce((total, item) => {
    
    const numericPrice = parseFloat(item.item.price);
    
    return total + numericPrice * item.quantity;
  }, 0);
  



  

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
    console.log("Useeffect ke ander")
    const length = Object.keys(cartItems).length;
    if(length > 0){
      saveCartToLocalStorage(cartItems);
    }
  }, [cartItems]);

  useEffect(() => {
    loadCartFromLocalStorage();
  }, []);





  return (
    <View style={styles.container}>
        

     
      <View style={styles.row}> 
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <BackArrow/>
        </TouchableOpacity>
        <Text style={styles.title}>Your Cart</Text>
       </View>

      <FlatList
        data={cartItem}
        renderItem={({ item }) => (
          // <View style={styles.cartItem}>
          //   <Text style={styles.itemName}>{item.item.name}</Text>
          //   <Text style={styles.itemDetails}>{item.quantity} x {item.item.price}</Text>
          // </View>
          <MenuItem
          item={item.item} // Pass the item details
          cartItems={cartItems}
          setCartItems={setCartItems}
          restaurant={restaurant}
          
        />
       )}
        keyExtractor={(item) => item.item._id}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${totalAmount.toFixed(2)}</Text>
      </View>
      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={() => navigation.navigate('Order')}
      >
        <Text style={styles.buttonText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemPrice: {
    fontSize: 16,
    color: '#888',
  },
  itemQuantity: {
    fontSize: 16,
    color: '#888',
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

  back: {fontSize: 24},
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginTop: 10, marginLeft:10 },
  cartItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 8, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  itemName: { fontSize: 16 },
  itemDetails: { fontSize: 16, color: '#666' },
  totalContainer: { marginTop: 16, marginBottom: 16 },
  totalText: { fontSize: 18, fontWeight: 'bold' },
  checkoutButton: { backgroundColor: '#ff6347', padding: 16, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18 },

  row:{
    display:"flex",
    flexDirection: "row",
    marginVertical:10
  }
});

export default CartScreen;
