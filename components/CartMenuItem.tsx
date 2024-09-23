import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet,Modal,ScrollView} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
   
import axios from 'axios';
type Restaurant = {
  name: string;
  address: string;
  _id: string;
  email: string;
  phone: string;
};
type AddOn = {
  _id: string;
  name: string;
  price: number;
};
interface CartItem {
  item: {  
    _id: string;
    name: string;
    price: string;
    imageUrl: string;
  };
  addOn: AddOn[];
  quantity: number;
  finalPrice : number;
}
interface MenuItemProps {
  item: CartItem;
  
  // handleAddToCart: (item: string) => void;
  // handleRemoveFromCart: (item: string) => void;
  //handleAddToCart: (item: { _id: string; name: string; price: string; imageUrl: string }) => void;
  //handleRemoveFromCart: (item: { _id: string; name: string; price: string; imageUrl: string }) => void;
  
  cartItems: CartItem[]; // Change from object to array
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
   restaurant : Restaurant
}



const CartMenuItem: React.FC<MenuItemProps> = ({ item,cartItems,setCartItems,restaurant}) => {
   console.log("items---->",cartItems);


   const handleAddToCart = async (item: any) => {
    const storedRestaurantId = await AsyncStorage.getItem('restaurantId');
  
    // If the restaurant is different, clear the cart and set the new restaurant ID
    if (restaurant._id !== storedRestaurantId) {
      await AsyncStorage.setItem('restaurantId', restaurant._id);
      await AsyncStorage.removeItem('cartItems');
      setCartItems([]); // Clear cart items
    }
  
    // Check if the exact item (full object comparison) already exists in the cart
    const existingCartItem = cartItems.find(
      (cartItem) => JSON.stringify(cartItem) === JSON.stringify(item)
    );
  
    let updatedCartItems;
  
    if (existingCartItem) {
      updatedCartItems = cartItems.map((cartItem) =>
        JSON.stringify(cartItem) === JSON.stringify(item)
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      const newCartItem = {
        item,
        addOn: [], 
        quantity: 1,
      };
      updatedCartItems = [...cartItems, newCartItem];
    }
    setCartItems(updatedCartItems);
    await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };
  


  const handleRemoveFromCart = async (item: any) => {
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem === item
    );

    if (existingCartItem) {
      if (existingCartItem.quantity === 1) {
        setCartItems((prevCart) =>
          prevCart.filter((cartItem) => cartItem !== existingCartItem)
        );
      } else {
        setCartItems((prevCart) =>
          prevCart.map((cartItem) =>
            cartItem === existingCartItem
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          )
        );
      }

      const storedCartItems = await AsyncStorage.getItem('cartItems');
      let updatedCartItems = storedCartItems ? JSON.parse(storedCartItems) : [];

      if (existingCartItem.quantity === 1) {
        updatedCartItems = updatedCartItems.filter(
          (cartItem: any) => cartItem.item._id !== item._id
        );
      } else {
        updatedCartItems = updatedCartItems.map((cartItem: any) =>
          cartItem.item._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      }

      await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    }
  };
    
   
  const addOnNames = item.addOn.map(addOn => addOn.name).join(', ');

  return (
    <View style={styles.menuItemContainer}>
      {/* Item Image */}
      <Image source={{ uri: item.item.imageUrl }} style={styles.menuImage} />
  
      {/* Item Details */}
      <View style={styles.menuDetails}>
        <Text style={styles.menuName}>{item.item.name}</Text>
        <Text style={styles.menuPrice}>${item.finalPrice.toFixed(2)}</Text>
        <Text style={styles.menuPrice}>{addOnNames ? ` (Add-ons: ${addOnNames})` : ''}</Text>
  
        {/* Quantity Controls */}
        <View style={styles.quantityControls}>
          <TouchableOpacity
            onPress={() => handleRemoveFromCart(item)}
            style={styles.controlButton}>
            <Text style={styles.controlText}>-</Text>
          </TouchableOpacity>
  
          <Text style={styles.quantityText}>
          {item.quantity}
          </Text>
  
          <TouchableOpacity
            onPress={() => handleAddToCart(item)}
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
    padding:10,
  },
  menuImage: {
    
    
    // width: 100, height: 120,
    
    // borderRadius: 8,
    // marginRight: 12,
    // backgroundColor: '#f0f0f0'

    width: 100,
      height: 120,
      borderRadius: 8,
  
  },

  
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
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addOnItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  addOnText: {
    marginLeft: 10,
  },
  addButton: {
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default CartMenuItem;
