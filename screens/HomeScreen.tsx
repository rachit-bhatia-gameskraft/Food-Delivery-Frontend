
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Pressable,
  Modal,
} from 'react-native';
import RestaurantCard from '../components/RestaurantCard';
import Searchbar from '../components/Searchbar';
import {fetchQueryData,debouncedFetchQueryData} from '../utils/fetchUtils';
import SortIcon from '../assets/sortIcon';import CartIcon from '../assets/cartIcon';
import { useCart } from '../store/CartContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Restaurant = {
  name: string;
  address: string;
  _id: string;
  email: string;
  phone: string;
  rating:number;
  deliveryTime:number
  imageUrl: string,
};



const HomeScreen: React.FC<{navigation: any}> = ({navigation}) => {


  const { cartItems , setCartItems} = useCart();
  const hasCartItems = Object.keys(cartItems).length > 0;
  const firstCartItem = Object.values(cartItems)[0]; // Get the first item in the cart (if it exists)
  const restaurantId = firstCartItem?.item?.restaurant;

  const loadCartFromLocalStorage = async () => {
    try {
      const storedCartItems = await AsyncStorage.getItem('cartItems');
      if (storedCartItems !== null) {
        setCartItems(JSON.parse(storedCartItems));
      }
    } catch (error) {
      console.error('Failed to load cart from local storage', error);
    }
  };
  
  
  
  useEffect(() => {
    loadCartFromLocalStorage();
  }, []);
  console.log("Home Screen CartItems",cartItems)
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [sortOption, setSortOption] = useState<string | null>(null);
  const [originalRestaurants, setOriginalRestaurants] = useState<Restaurant[]>([]);
  const [pressed, setPressed] = useState<string | null>('default');
  useEffect(() => {
    const fetchData = async () => {
      try {

        if(!searchQuery)
        {
          setLoading(true);
          const data = await fetchQueryData(searchQuery, 'restaurant');
          setRestaurants(data);
          setOriginalRestaurants(data);
          setPressed('default');
          setLoading(false);
        }
        else
        {
          setLoading(true);
          const data = await debouncedFetchQueryData(searchQuery, 'restaurant');
          setOriginalRestaurants(data);
          setPressed('default');
          setRestaurants(data);
          setLoading(false);
        }
      } catch (err:any) {
        setLoading(false);
        setError(err.message);
      }
    };
    fetchData();
  }, [searchQuery]);

  const sortRestaurants = (option: string) => {
    let sortedRestaurants = [...restaurants];
    if (option === 'ratings') {
      sortedRestaurants.sort((a, b) => b.rating - a.rating);
    } else if (option === 'deliveryTime') {
      sortedRestaurants.sort((a, b) => a.deliveryTime - b.deliveryTime);
    }
    setRestaurants(sortedRestaurants);
    setSortOption(option);
  };
  const resetToDefault = () => {
    setRestaurants([...originalRestaurants]);
    setSortOption(null);
  };

  return (
    <View style={style.container}>
      <View style={style.top}>
      <Searchbar  onSearchQueryChange={setSearchQuery} />
      <TouchableOpacity onPress={() => setModalVisible(true)} >
      <SortIcon/>
        </TouchableOpacity>
      </View>
      {loading ? <Text>loading...</Text> :
      <>
      {error && <Text>{error}</Text>}

     {hasCartItems && (

      <TouchableOpacity
        style={style.floatingCartButton}
        onPress={() => navigation.navigate('Cart',{cartItems, restaurantId})}
      >
        <Text style={style.cartText}><CartIcon/></Text>
      </TouchableOpacity>

     )}
   
     
      <ScrollView >
        {restaurants.map(restaurant => (
          <TouchableOpacity
          key={restaurant._id}
          onPress={() =>
            navigation.navigate('Restaurant', {
              restaurant,
            })
          }>
            <RestaurantCard key={restaurant._id} {...restaurant} />
          </TouchableOpacity>
        ))}
      </ScrollView>
        </>
        }
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={style.modalContainer}>
          <View style={style.modalContent}>
          <Pressable
              style={[style.modalOption,
                pressed === 'default' && style.pressOption,
              ]}
              onPress={() => {
                resetToDefault();
                setModalVisible(false);
              }}
              onPressIn={()=>setPressed('default')}
            >
              <Text style={style.text}>Default</Text>
            </Pressable>
            <Pressable
              style={[style.modalOption,
                pressed === 'ratings' && style.pressOption,
              ]}
              onPress={() => {
                sortRestaurants('ratings');
                setModalVisible(false);
              }}
              onPressIn={()=>setPressed('ratings')}
            >
              <Text style={style.text}>Sort by Ratings</Text>
            </Pressable>
            <Pressable
              style={[style.modalOption,
                pressed === 'deliveryTime' && style.pressOption,
              ]}
              onPress={() => {
                sortRestaurants('deliveryTime');
                setModalVisible(false);
              }}
              onPressIn={()=>setPressed('deliveryTime')}
            >
              <Text style={style.text}>Sort by Delivery Time</Text>
            </Pressable>
            <Pressable
              style={style.modalCancel}
              onPress={() => setModalVisible(false)}
            >
              <Text>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    padding:16,
    },
    top:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-evenly',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 16,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    modalOption: {
      padding: 16,
    },
    modalCancel: {
      padding: 16,
      marginTop: 10,
      backgroundColor: '#FF6347',
      borderRadius: 5,
      alignItems: 'center',
    },
    pressOption:{
      backgroundColor:'#FF6347',
      borderRadius:5,
    },
    text:{
      color:'#000000',
    },
    floatingCartButton: {
      position: 'absolute', 
      bottom: 30, // Distance from the bottom
      right: 20, // Distance from the right
      width: 60,
      height: 60,
      borderRadius: 30, // Circular button
      backgroundColor: '#f8f8f8', // You can change the color to match your design
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000', // Shadow for elevation
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
      zIndex: 100,
    },
    cartText: {
      fontSize: 30,
      color: '#FF6347',
      // Size of the cart emoji
    },
  
});

export default HomeScreen;;
