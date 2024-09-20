import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import RestaurantScreen from './screens/RestaurantScreen';
import CartScreen from './screens/CartScreen';
import OrderScreen from './screens/OrderScreen';
import { CartProvider } from './store/CartContext';

type RootStackParamList = {
  Home: undefined;
  Restaurant: undefined;
  Cart: undefined;
  Order: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <CartProvider>

   
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false, // Adjust if you want to show headers
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Restaurant" component={RestaurantScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Order" component={OrderScreen} />

      </Stack.Navigator>
    </NavigationContainer>
    </CartProvider>
  );
};

export default App;
