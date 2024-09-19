import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

interface MenuItemProps {
  item: {
    _id: string;
    name: string;
    price: string;
    imageUrl: string;
  };
  quantity: number;
  handleAddToCart: (itemId: string) => void;
  handleRemoveFromCart: (itemId: string) => void;
  // cartItems: { [key:string]: number };  // Passing the entire cartItems state
  // setCartItems: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
}



const MenuItem: React.FC<MenuItemProps> = ({ item, quantity, handleAddToCart, handleRemoveFromCart}) => {
  console.log("Hi i am inside the menu" ,item)
 
  return (
         <View style={styles.menuItemContainer}>
            <Image source={{uri: item.imageUrl}} style={styles.menuImage} />
            <View style={styles.menuDetails}>
              <Text style={styles.menuName}>{item.name}</Text>
              <Text style={styles.menuPrice}>{item.price}</Text>
              <View style={styles.quantityControls}>
                <TouchableOpacity
                  onPress={() => handleRemoveFromCart(item._id)}
                  style={styles.controlButton}>
                  <Text style={styles.controlText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>
                  {quantity || 0}
                </Text>
                <TouchableOpacity
                  onPress={() => handleAddToCart(item._id)}
                  style={styles.controlButton}>
                  <Text style={styles.controlText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
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
  quantityText: {fontSize: 18, marginHorizontal: 8},
  menuItemContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  menuImage: {width: 100, height: 100},
  menuDetails: {flex: 1, padding: 8},
  menuName: {fontSize: 16, fontWeight: 'bold'},
  menuPrice: {fontSize: 14, color: '#666'},
  quantityControls: {flexDirection: 'row', alignItems: 'center', marginTop: 8},
  controlButton: {
    backgroundColor: '#ff6347',
    padding: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  controlText: {color: '#fff', fontSize: 18},
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
