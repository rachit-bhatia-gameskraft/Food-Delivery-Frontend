import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';

const OrderScreen: React.FC<{ navigation:any,route:any }> = ({ navigation, route }) => {  //get user id route. params
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const {userId} = route.params;

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  const fetchOrderHistory = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:3001/api/order/user/${userId}/orders`);
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#ff6347" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.orderBox}
            onPress={() => navigation.navigate('OrderDetails', { orderId: item._id })}  // Navigate to OrderDetails with orderId
          >
            <Text style={styles.orderId}>Order ID: {item._id}</Text>
            <Text style={styles.orderStatus}>Status: {item.status}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={<Text>No orders found for this user.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  orderBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderStatus: {
    fontSize: 14,
    marginTop: 5,
    color: '#555',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OrderScreen;
