import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

interface MenuItemProps {
  item: {
    _id: string;
    name: string;
    price: string;
    imageUrl: string;
  };
  
  // handleAddToCart: (item: string) => void;
  // handleRemoveFromCart: (item: string) => void;
  //handleAddToCart: (item: { _id: string; name: string; price: string; imageUrl: string }) => void;
  //handleRemoveFromCart: (item: { _id: string; name: string; price: string; imageUrl: string }) => void;
  
   cartItems: { [key: string]: { item: any, quantity: number }  };  // Passing the entire cartItems state
   setCartItems: React.Dispatch<React.SetStateAction<{ [key: string]: { item: any, quantity: number }  }>>;
}



const MenuItem: React.FC<MenuItemProps> = ({ item,cartItems,setCartItems}) => {
   
  //const [cartItems, setCartItems] = useState<{ [key: string]: { item: any, quantity: number } }>({});

  const handleAddToCart = (item: any) => {
    
    setCartItems(prevCart => ({
      ...prevCart,
      [item._id]:{ 
        item,
        quantity: (prevCart[item._id]?.quantity || 0) + 1
      
      },    }));
  
  };

  const handleRemoveFromCart = (item: any) => {
    
    

    if(cartItems[item._id]!=undefined){
      setCartItems(prevCart => ({
      ...prevCart,
      [item._id]:{ 
        item,
        quantity: Math.max((prevCart[item._id]?.quantity- 1),0)
      
      },  }));

    
      if(cartItems[item._id]?.quantity===1){
        
         setCartItems(prevCart => {
          const updatedCart = { ...prevCart };
      

          
            delete updatedCart[item._id];
          
      
          return updatedCart;
        });

      }

    }
    
    
    

      
  };
 console.log("Menu", cartItems)
  return (
         <View style={styles.menuItemContainer}>
            <Image source={{uri: item.imageUrl}} style={styles.menuImage} />
            <View style={styles.menuDetails}>
              <Text style={styles.menuName}>{item.name}</Text>
              <Text style={styles.menuPrice}>{item.price}</Text>
              <View style={styles.quantityControls}>
                <TouchableOpacity
                  onPress={() => handleRemoveFromCart(item)}
                  style={styles.controlButton}>
                  <Text style={styles.controlText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>
                  {cartItems[item._id]?.quantity || 0}
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
function setCartItems(arg0: (prevCart: any) => any) {
  throw new Error('Function not implemented.');
}

