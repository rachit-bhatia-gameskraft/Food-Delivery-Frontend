import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import MenuItem from '../components/MenuItem';

interface RestaurantScreenProps {
  route: {
    params: {
      restaurantId: string;
    };
  };
  navigation: any;
}



const RestaurantScreen: React.FC<RestaurantScreenProps> = ({ route, navigation }) => {
  const [cartItems, setCartItems] = useState<{ [key: string]: number }>({});
  useEffect(()=>{
   fetchMenu(route.params.restaurantId); 
  },[]);

  const fetchMenu = async (restaurantId : string)=>{

    try {
  
      const response = await axios.get(
        `http://10.0.2.2:3001/api/menu/66e95387b962c552edeb2209/`,
      );
      console.log(response.data)
      setMenutItems(response.data)
     
      
    } catch (err: any) {
      
     
    }
   
  
     
  }

  const [menuItems , setMenutItems]= useState();



  const handleAddToCart = (itemId: string) => {
    setCartItems((prevCart) => ({
      ...prevCart,
      [itemId]: (prevCart[itemId] || 0) + 1,
    }));
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCartItems((prevCart) => ({
      ...prevCart,
      [itemId]: Math.max((prevCart[itemId] || 1) - 1, 0),
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <Text style={styles.restaurantName}>Restaurant {route.params.restaurantId}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Cart', { cartItems })}>
          <Text style={styles.cart}>🛒</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={menuItems}
        renderItem={({ item }) => (
          <View style={styles.menuItemContainer}>
            <Image source={{ uri: item.image }} style={styles.menuImage} />
            <View style={styles.menuDetails}>
              <Text style={styles.menuName}>{item.name}</Text>
              <Text style={styles.menuPrice}>{item.price}</Text>
              <View style={styles.quantityControls}>
                <TouchableOpacity onPress={() => handleRemoveFromCart(item.id)} style={styles.controlButton}>
                  <Text style={styles.controlText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{cartItems[item.id] || 0}</Text>
                <TouchableOpacity onPress={() => handleAddToCart(item.id)} style={styles.controlButton}>
                  <Text style={styles.controlText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />

      <TouchableOpacity
        style={styles.goToCartButton}
        onPress={() => navigation.navigate('Cart', { cartItems })}
      >
        <Text style={styles.buttonText}>Go to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  back: { fontSize: 24 },
  restaurantName: { fontSize: 24, fontWeight: 'bold' },
  cart: { fontSize: 24 },
  menuItemContainer: { flexDirection: 'row', marginBottom: 16, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, overflow: 'hidden', backgroundColor: '#fff' },
  menuImage: { width: 100, height: 100 },
  menuDetails: { flex: 1, padding: 8 },
  menuName: { fontSize: 16, fontWeight: 'bold' },
  menuPrice: { fontSize: 14, color: '#666' },
  quantityControls: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  controlButton: { backgroundColor: '#ff6347', padding: 8, borderRadius: 4, marginHorizontal: 4 },
  controlText: { color: '#fff', fontSize: 18 },
  quantityText: { fontSize: 18, marginHorizontal: 8 },
  goToCartButton: { backgroundColor: '#ff6347', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 16 },
  buttonText: { color: '#fff', fontSize: 18 },
});

export default RestaurantScreen;
