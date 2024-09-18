import React from 'react';
import { View, Text, StyleSheet, Image, Linking, TouchableOpacity } from 'react-native';
type RestaurantProps = {
  _id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  openingHours?: object; // Optional property
  rating: number;
  cuisine: string[];
  website: string;
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
      width: 140,
      height: 170,
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
      color: '#777',
      marginTop: 4,
    },
    email: {
      color: '#555',
      marginTop: 4,
    },
    phone: {
      color: '#555',
      marginTop: 4,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
    },
    rating: {
      color: '#FFD700',
      fontWeight: 'bold',
    },
    cuisine: {
      color: '#666',
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
 
}) => {
  const defaultImage = 'https://via.placeholder.com/150'; // Default Image URL

  return (
    <View style={styles.card}>
      

      <Image style={styles.image} source={{ uri: defaultImage }} />

      <View style={styles.details}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.row}>
          <Text style={styles.rating}>Rating: {rating}</Text>
        </View>
        <Text style={styles.address}>{address}</Text>
        <Text style={styles.email}>{email}</Text>
        <Text style={styles.phone}>{phone}</Text>

        <View style={styles.row}>
          <Text style={styles.cuisine}>{cuisine.join(', ')}</Text>
        </View>

        {/* Website Link */}
        <TouchableOpacity onPress={() => Linking.openURL(website)}>
          <Text style={styles.website}>Visit Website</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
};

export default RestaurantCard;
