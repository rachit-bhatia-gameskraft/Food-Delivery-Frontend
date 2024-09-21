
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
import SortIcon from '../assets/sortIcon';
type Restaurant = {
  name: string;
  address: string;
  _id: string;
  email: string;
  phone: string;
  rating:number;
  deliveryTime:number
};

const HomeScreen: React.FC<{navigation: any}> = ({navigation}) => {
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
      <TouchableOpacity onPress={() => setModalVisible(true)} style={style.modal}>
      <SortIcon/>
        </TouchableOpacity>
      </View>
      {loading ? <Text>loading...</Text> :
      <>
      {error && <Text>{error}</Text>}
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
});

export default HomeScreen;
