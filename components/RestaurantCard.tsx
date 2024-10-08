import React from 'react';
import { View, Text, StyleSheet, Image, Linking, TouchableOpacity } from 'react-native';
import Star from '../assets/star';

type RestaurantProps = {
  _id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  openingHours?: object;
  rating: number;
  cuisine: string[];
  website: string;
  deliveryTime:number;
};

const styles = StyleSheet.create({
    card: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 2,
      marginBottom: 20,
      marginHorizontal: 10,
      padding: 10,
    },
    image: {
      width: 130,
      height: 150,
      borderRadius: 8,
    },
    details: {
      flex: 1,
      paddingLeft: 10,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
    },
    address: {
      color: '#777'
    },
    email: {
      color: '#777'
    },
    phone: {
      color: '#777'
    },
    row: {
      flexDirection: 'row',
      marginTop: 8,
    },
    star: {
      backgroundColor: 'green',
      height: 14,
      width: 14,
      borderRadius: 7,
      justifyContent: 'center',
      alignItems: 'center', 
      marginTop: 3
    },
    rating: {
      color: 'Black',
      fontWeight: 'bold',
      marginLeft: 3
    },
    dot: {
      fontWeight: 'bold', 
      color: '#000',
      marginHorizontal: 5,
    },
    timings: {
      color: 'Black',
      fontWeight: '500',
    },
    cuisine: {
      color: '#666',
      fontWeight: 'normal',
      marginTop: 1
    },
    website: {
      color: '#1E90FF',
      marginTop: 8,
      textDecorationLine: 'underline',
    },
  });
  

const RestaurantCard: React.FC<any> = ({
  name,
  address,
  email,
  phone,
  rating,
  cuisine,
  website, 
  deliveryTime,
  imageUrl,
}) => {
  const defaultImage = 'https://via.placeholder.com/150'; // Default Image URL

  return (
    <View style={styles.card}>

      {/* <Image style={styles.image} source={{ uri: imageUrl }} /> */}

      <Image style={styles.image} source={{uri:imageUrl}}/>

      <View style={styles.details}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.row}>
          <View style={styles.star}>
            <Star></Star>
          </View>
          <Text style={styles.rating}>{rating}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.timings}>~{deliveryTime} minutes</Text>
        </View>
        <Text style={styles.cuisine}>{cuisine.join(', ')}</Text>
        <Text style={styles.address}>{address}</Text>
        <Text style={styles.email}>{email}</Text>
        <Text style={styles.phone}>{phone}</Text>
      </View>

    </View>
  );
};

export default RestaurantCard;
