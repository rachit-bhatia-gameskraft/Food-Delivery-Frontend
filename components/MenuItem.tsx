import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

interface MenuItemProps {
  id: string;
  name: string;
  price: string;
  image: string;
  onAddToCart: (id: string) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ id, name, price, image, onAddToCart }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text>{price}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => onAddToCart(id)}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  image: {
    width: 80,
    height: 80,
  },
  info: {
    flex: 1,
    paddingLeft: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
  },
});

export default MenuItem;
