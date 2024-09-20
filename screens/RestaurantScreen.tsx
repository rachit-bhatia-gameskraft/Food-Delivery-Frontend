import React, {useEffect, useState} from 'react';
import axios from 'axios';
import MenuItem from '../components/MenuItem';
import { useCart } from '../store/CartContext';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,

} from 'react-native';

// type Restaurant = {
//   name: string;
//   address: string;
//   _id: string;
//   email: string;
//   phone: string;
// };

type item= {
  _id: string;
  name: string;
  price: string;
  imageUrl: string;
};



const RestaurantScreen: React.FC<{navigation:any,route:any}> = ({
  route,
  navigation,
}) => {

//const [cartItems, setCartItems] = useState<{ [key: string]: { item: any, quantity: number } }>({});
 const {cartItems, setCartItems} = useCart();
  const restaurant = route.params.restaurant;
  useEffect(() => {
    fetchMenu(restaurant._id);
  }, [restaurant._id]);

  const [menuItems, setMenutItems] = useState();

  const fetchMenu = async (restaurantId: string) => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:3001/api/menu/${restaurantId}`
      );
      
    
    
        console.log('Response Data:', response.data);
      
     
  
      // Set the fetched menu items in the state
      setMenutItems(response.data);
     
    } 
    catch (error) {
      // Handle errors here
      console.error('Error fetching menu data:', error);
    }
  };
  
    
  // const handleGoToCart = async () => {
  //   try {
  //     // Convert cartItems to an array of items with quantity > 0
  //     const selectedItems = Object.entries(cartItems)
  //       .filter(([itemId, quantity]) => quantity > 0)
  //       .map(([itemId, quantity]) => ({ id: itemId, quantity }));
  
  //     // Make an API call with the selected items
  //     const response = await axios.post('http://10.0.2.2:3001/api/cart', {
  //       cartItems: selectedItems,
  //     });
  
  //     console.log('Cart API response:', response.data);
  
  //     // Navigate to the cart screen with updated cart items
  //     navigation.navigate('Cart', { cartItems: selectedItems });
  //   } catch (error) {
  //     console.error('Error sending cart items to the server:', error);
  //   }
  // };
  



  // const handleAddToCart = (item: any) => {
    
  //   setCartItems(prevCart => ({
  //     ...prevCart,
  //     [item._id]:{ 
  //       item,
  //       quantity: (prevCart[item._id]?.quantity || 0) + 1
      
  //     },    }));
  
  // };

  // const handleRemoveFromCart = (item: any) => {
    
    

  //   if(cartItems[item._id]!=undefined){
  //     setCartItems(prevCart => ({
  //     ...prevCart,
  //     [item._id]:{ 
  //       item,
  //       quantity: Math.max((prevCart[item._id]?.quantity- 1),0)
      
  //     },  }));

    
  //     if(cartItems[item._id]?.quantity===0){
        
  //       setCartItems(prevCart => {
  //         const updatedCart = { ...prevCart };
      

          
  //           delete updatedCart[item._id];
          
      
  //         return updatedCart;
  //       });

  //     }

  //   }
    
    
    

      
  // };
  

  console.log("restaurat",cartItems)
  
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <Text style={styles.restaurantName}> {restaurant.name}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Cart', {cartItems,setCartItems})}>
          <Text style={styles.cart}>🛒</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={menuItems}
        
        renderItem={({item}) => (
         
          <MenuItem
          item={item}
          cartItems= {cartItems}
          setCartItems={setCartItems}
        
        
       />
       )}

        keyExtractor={item => item._id}
      />
      
      <TouchableOpacity
        style={styles.goToCartButton}
        onPress={() => navigation.navigate('Cart',{cartItems,setCartItems})}>
        <Text style={styles.buttonText}>Go to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: '#fff'},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  back: {fontSize: 24},
  restaurantName: {fontSize: 24, fontWeight: 'bold'},
  cart: {fontSize: 24},
  


  goToCartButton: {
    backgroundColor: '#ff6347',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {color: '#fff', fontSize: 18},
});

export default RestaurantScreen;
