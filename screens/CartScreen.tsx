import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import MenuItem from '../components/MenuItem';
import { useCart } from '../store/CartContext';


interface MyItem  {
  
  //handleAddToCart: (item: { _id: string; name: string; price: string; imageUrl: string }) => void;
  //handleRemoveFromCart: (item: { _id: string; name: string; price: string; imageUrl: string }) => void;
}

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
  console.log(route.params)
   const { cartItems , setCartItems} = useCart();

   //console.log("tyoe of function",typeof(handleAddToCart))
   
  const cartItem: cartItem[] =  Object.values(cartItems || []);

  console.log("I am inside the cart cartScreen", cartItems)
 

  const totalAmount = cartItem.reduce((total, item) => {
    
    const numericPrice = parseFloat(item.item.price);
    
    return total + numericPrice * item.quantity;
  }, 0);
  

  return (
    <View style={styles.container}>
        
      <Text style={styles.title}>Your Cart</Text>
      <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.back]}>←</Text>
        </TouchableOpacity>
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

  back: {fontSize: 24},
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  cartItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 8, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  itemName: { fontSize: 16 },
  itemDetails: { fontSize: 16, color: '#666' },
  totalContainer: { marginTop: 16, marginBottom: 16 },
  totalText: { fontSize: 18, fontWeight: 'bold' },
  checkoutButton: { backgroundColor: '#ff6347', padding: 16, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18 },
});

export default CartScreen;
