import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, ScrollView } from 'react-native';
import axios from 'axios';
import OrderCard from '../components/OrderCard'; // Import the OrderCard component

const OrderScreen: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId } = route.params;

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

  // Split the orders into pending and others (completed/cancelled)
  const pendingOrders = orders.filter(order => order.status === 'Pending');
  const otherOrders = orders
    .filter(order => order.status !== 'Pending')
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by createdAt

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={true}>
      <View style={styles.container}>
        {/* Heading */}
        <Text style={styles.heading}>All Your Orders Here:</Text>

        {/* Render Pending Orders */}
        <FlatList
          data={pendingOrders}
          renderItem={({ item }) => (
            <OrderCard
              _id={item._id}
              status={item.status}
              onPress={() => navigation.navigate('OrderDetails', { orderId: item._id })}
            />
          )}
          keyExtractor={(item) => item._id}
          ListEmptyComponent={<Text>No pending orders found for this user.</Text>}
        />

        {/* Divider Line */}
        {otherOrders.length > 0 && <View style={styles.divider} />}

        {/* Render Completed and Cancelled Orders */}
        <FlatList
          data={otherOrders}
          renderItem={({ item }) => (
            <OrderCard
              _id={item._id}
              status={item.status}
              onPress={() => navigation.navigate('OrderDetails', { orderId: item._id })}
            />
          )}
          keyExtractor={(item) => item._id}
          ListEmptyComponent={<Text>No completed or cancelled orders found.</Text>}
        />
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
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ff6347',
    marginBottom: 20,
    textAlign: 'center',
  },
  divider: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginVertical: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OrderScreen;
