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
}
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
  
  cartItems: CartItem[]; // Change from object to array
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
   restaurant : Restaurant
}



const MenuItem: React.FC<MenuItemProps> = ({ item,cartItems,setCartItems,restaurant}) => {
   
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const [showAddOnModal, setShowAddOnModal] = useState(false); 
  const [checkedAddOns, setCheckedAddOns] = useState<string[]>([]);
  const [cart , setCart] = useState<any>([]);

  const toggleAddOn = (addOn : any) => {
    if (checkedAddOns.includes(addOn._id)) {
      setCheckedAddOns(checkedAddOns.filter(id => id !== addOn._id));
    } else {
      setCheckedAddOns([...checkedAddOns, addOn._id]);
    }
  }

  const cancleAddOn = () => {
    setCheckedAddOns([]);
    setShowAddOnModal(false)
  }

  const handleAddOn = async () => {
    const storedRestaurantId = await AsyncStorage.getItem('restaurantId');

    if (restaurant._id !== storedRestaurantId) {
      await AsyncStorage.setItem('restaurantId', restaurant._id);
      await AsyncStorage.removeItem('cartItems');
      setCartItems([]);
    }

    const selectedAddOnObjects = selectedAddOns.filter((addOn) =>
      checkedAddOns.includes(addOn._id)
    );

    const storedCartItems = await AsyncStorage.getItem('cartItems');
    let updatedCartItems = storedCartItems ? JSON.parse(storedCartItems) : [];

    // Check if the same item with add-ons exists
    const existingCartItem = cartItems.find(
      (cartItem) =>
        cartItem.item._id === item._id &&
        JSON.stringify(cartItem.addOn.map((a) => a._id).sort()) === JSON.stringify(selectedAddOnObjects.map((a) => a._id).sort())
    );

    if (existingCartItem) {
      // Increase quantity if item exists
      setCartItems((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem === existingCartItem
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
          )
        );
        updatedCartItems = updatedCartItems.map((cartItem: any) =>
          cartItem === existingCartItem
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // Add new item
        const itemPrice = parseFloat(item.price); // Ensure the item price is a number
        const addOnTotalPrice = selectedAddOnObjects.reduce((total, addOn) => total + addOn.price, 0);
        const finalPrice = itemPrice + addOnTotalPrice;
        const newCartItem = {
          item,
          addOn: selectedAddOnObjects,
          quantity: 1,
          finalPrice: finalPrice
        };
        setCartItems((prevCart) => [...prevCart, newCartItem]);
        updatedCartItems.push(newCartItem);
      }
  
      await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  
      setCheckedAddOns([]);
      setShowAddOnModal(false);
    };

  const handleAddToCart = async(item: any) => {

    try {
      const response = await axios.get(`http://10.0.2.2:3001/api/menu/addOn/${item._id}`);
      if(response.data.length !== 0){
        setSelectedAddOns(response.data);
        return;
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }

    const storedRestaurantId = await AsyncStorage.getItem('restaurantId');

    if (restaurant._id !== storedRestaurantId) {
      await AsyncStorage.setItem('restaurantId', restaurant._id);
      await AsyncStorage.removeItem('cartItems');
      setCartItems([]);
    }

    const existingCartItem = cartItems.find(
      (cartItem) =>
        cartItem.item._id === item._id &&
        JSON.stringify(cartItem.addOn) === JSON.stringify([])
    );

    if (existingCartItem) {
      setCartItems((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem === existingCartItem
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems((prevCart) => [...prevCart, { item, addOn: [], quantity: 1,finalPrice:item.price }]);
    }
  
  };

  useEffect(() => {
    const itemCountMap: any = {};
  
    cartItems.forEach((cartItem) => {
      const itemId = cartItem.item._id;
  
      if (itemCountMap[itemId]) {
        itemCountMap[itemId].quantity += cartItem.quantity; // Add quantity to the existing count
      } else {
        itemCountMap[itemId] = { ...cartItem.item, quantity: cartItem.quantity }; // Initialize with item details and first quantity
      }
    });
  
    // Update the cart state with item details and total counts
    setCart(Object.values(itemCountMap));
  }, [cartItems]);

  useEffect(()=>{
    if(selectedAddOns.length !== 0){
      setShowAddOnModal(true);
    }
  },[selectedAddOns]);


  const handleRemoveFromCart = async (item: any) => {
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.item._id === item._id
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
    
   


  return (
    <View style={styles.menuItemContainer}>
      {/* Item Image */}
      <Image source={{ uri: item.imageUrl }} style={styles.menuImage} />
  
      {/* Item Details */}
      <View style={styles.menuDetails}>
        <Text style={styles.menuName}>{item.name}</Text>
        <Text style={styles.menuPrice}>${item.price}</Text>
  
        {/* Quantity Controls */}
        <View style={styles.quantityControls}>
          <TouchableOpacity
            onPress={() => handleRemoveFromCart(item)}
            style={styles.controlButton}>
            <Text style={styles.controlText}>-</Text>
          </TouchableOpacity>
  
          <Text style={styles.quantityText}>
            {
              cart.find((cartItem: any) => cartItem._id === item._id)?.quantity || 0
            } {/* Display quantity from cart or 0 */}
          </Text>
  
          <TouchableOpacity
            onPress={() => handleAddToCart(item)}
            style={styles.controlButton}>
            <Text style={styles.controlText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
  
      {/* Modal to show Add-Ons */}
      <Modal visible={showAddOnModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Add-Ons</Text>
            <ScrollView>
              {selectedAddOns.map((addOn) => (
                <View key={addOn._id} style={styles.addOnItem}>
                  <CheckBox
                    value={checkedAddOns.includes(addOn._id)}
                    onValueChange={() => toggleAddOn(addOn)}
                  />
                  <Text style={styles.addOnText}>
                    {addOn.name} - ${addOn.price}
                  </Text>
                </View>
              ))}
            </ScrollView>
  
            <TouchableOpacity onPress={handleAddOn} style={styles.addButton}>
              <Text style={styles.addButtonText}>Add to Cart</Text>
            </TouchableOpacity>
  
            <TouchableOpacity onPress={cancleAddOn} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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

export default MenuItem;
