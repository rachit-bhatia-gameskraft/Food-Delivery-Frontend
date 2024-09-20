import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
}

const CartScreen: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  const cartItems: CartItem[] = Object.entries(route.params.cartItems || {}).map(([id, quantity]) => ({
    id,
    name: `Item ${id}`,
    price: `$9.99`, 
    quantity : Number(quantity),
  }));

  const totalAmount = cartItems.reduce((total, item) => total + parseFloat(item.price.replace('$', '')) * item.quantity, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDetails}>{item.quantity} x {item.price}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
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
