import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import RestaurantScreen from './screens/RestaurantScreen';
import CartScreen from './screens/CartScreen';
import OrderScreen from './screens/OrderScreen';
import OrderDetailsScreen from './screens/OrderDetailsScreen';

type RootStackParamList = {
  Home: undefined;
  Restaurant: undefined;
  Cart: undefined;
  Order: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
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
        <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
