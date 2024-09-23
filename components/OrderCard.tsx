import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type OrderProps = {
  _id: string;
  status: string;
  onPress: () => void; // Function to handle card press
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
    marginHorizontal: 10,
    padding: 20,
    borderColor: '#ff6347', // Orangish border for modern look
    borderWidth: 1,
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Darker color for text
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  status: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ff6347', // Orangish status color
    backgroundColor: '#ffe6cc', // Light orange background for status
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  icon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ff6347',
    marginRight: 10,
  },
});

const OrderCard: React.FC<OrderProps> = ({ _id, status, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.orderId}>Order ID: {_id}</Text>
      <View style={styles.statusContainer}>
        <View style={styles.icon} />
        <Text style={styles.status}>Status: {status}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default OrderCard;
