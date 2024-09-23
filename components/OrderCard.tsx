import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type OrderProps = {
  _id: string;
  status: string;
  onPress: () => void;
};

const OrderCard: React.FC<OrderProps> = ({ _id, status, onPress }) => {
  // Determine background color and text color based on status
  const statusStyle = getStatusStyle(status);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.orderId}>Order ID: {_id}</Text>
      <View style={styles.statusContainer}>
        <View style={[styles.icon, { backgroundColor: statusStyle.iconColor }]} />
        <Text style={[styles.status, { backgroundColor: statusStyle.backgroundColor, color: statusStyle.textColor }]}>
          Status: {status}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// Helper function to determine styles based on status
const getStatusStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return {
        backgroundColor: '#e0ffe0', // Light green background
        textColor: '#28a745',       // Green text
        iconColor: '#28a745',       // Green icon
      };
    case 'pending':
      return {
        backgroundColor: '#fff6e0', // Light yellow background
        textColor: '#ffb700',       // Yellowish text
        iconColor: '#ffb700',       // Yellowish icon
      };
    case 'canceled':
      return {
        backgroundColor: '#ffe6e6', // Light red background
        textColor: '#ff6347',       // Red text
        iconColor: '#ff6347',       // Red icon
      };
    default:
      return {
        backgroundColor: '#e0e0e0', // Default grey background
        textColor: '#888',          // Grey text
        iconColor: '#888',          // Grey icon
      };
  }
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
    borderColor: '#ff6347',
    borderWidth: 1,
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
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
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  icon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
});

export default OrderCard;
