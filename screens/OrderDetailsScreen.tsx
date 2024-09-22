import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
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
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Order Summary Card */}
        <View style={styles.card}>
          <Text style={styles.header}>Order Summary</Text>
          <Text style={styles.detailText}>Order ID: {orderDetails._id}</Text>
          <Text style={styles.detailText}>Status: {orderDetails.status}</Text>
          <Text style={styles.detailText}>Delivery Address: {orderDetails.deliveryAddress}</Text>
          <Text style={styles.detailText}>Total Price: ₹{orderDetails.totalPrice}</Text>
          <Text style={styles.detailText}>Date: {new Date(orderDetails.createdAt).toLocaleDateString()}</Text>
          <Text style={styles.detailText}>Time: {new Date(orderDetails.createdAt).toLocaleTimeString()}</Text>
        </View>

        {/* Items Ordered Card */}
        <View style={styles.card}>
          <Text style={styles.header}>Items Ordered</Text>
          {orderDetails.items.map((item: any, index: number) => (
            <View key={index} style={styles.itemBox}>
              <Text style={styles.itemText}>Dish ID: {item.dish}</Text>
              <Text style={styles.itemText}>Quantity: {item.quantity}</Text>
              <Text style={styles.itemText}>Price: ₹{item.price}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 10,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff6347',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  itemBox: {
    backgroundColor: '#ffe6cc',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OrderDetailsScreen;
