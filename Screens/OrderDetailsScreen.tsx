import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const OrderDetailsScreen: React.FC<{ route: any }> = ({ route }) => {
  const { orderId } = route.params;
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:3001/api/order/order/${orderId}`);
      setOrderDetails(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching order details:', error);
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

  if (!orderDetails) {
    return (
      <View style={styles.center}>
        <Text>No order details found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Order ID: {orderDetails.orderId}</Text>
      <Text>Status: {orderDetails.status}</Text>
      <Text>Delivery Address: {orderDetails.deliveryAddress}</Text>
      <Text>Total Price: ₹{orderDetails.totalPrice}</Text>
      <Text>Date: {orderDetails.date}</Text>
      <Text>Time: {orderDetails.time}</Text>

      <Text style={styles.header}>Items Ordered:</Text>
      {orderDetails.items.map((item: any, index: number) => (
        <View key={index} style={styles.item}>
          <Text>Dish ID: {item.dish}</Text>
          <Text>Quantity: {item.quantity}</Text>
          <Text>Price: ₹{item.price}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OrderDetailsScreen;
