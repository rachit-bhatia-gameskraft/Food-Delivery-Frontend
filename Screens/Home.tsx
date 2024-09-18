import React from 'react';
import { ScrollView } from 'react-native';
import RestaurantCard from '../components/RestaurantCard';
import Searchbar from '../components/Searchbar';

const restaurants = [
  {
    _id: '66e95387b962c552edeb2209',
    name: "Joe's Pizzeria",
    address: '123 Main St, Cityville',
    email: 'joe@example.com',
    phone: '+1234567890',
    rating: 4.5,
    cuisine: ['Italian'],
    website: 'https://joespizzeria.com',
  }
];

const HomeScreen: React.FC = () => {
  return (
    <ScrollView>
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant._id} {...restaurant} />
      ))}
    </ScrollView>
  );
};

export default HomeScreen;
