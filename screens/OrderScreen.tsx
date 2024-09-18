import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const OrderScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Confirmation</Text>
      <Text style={styles.message}>Thank you for your order! Your food will be delivered soon.</Text>
      <Button
        title="Back to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  message: { fontSize: 16, marginBottom: 24, textAlign: 'center' },
});

export default OrderScreen;
