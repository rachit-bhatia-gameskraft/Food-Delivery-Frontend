// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
// import axios from 'axios';

// const OrderDetailsScreen: React.FC<{ route: any }> = ({ route }) => {
//   const { orderId } = route.params;
//   const [orderDetails, setOrderDetails] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchOrderDetails();
//   }, []);

//   const fetchOrderDetails = async () => {
//     try {
//       const response = await axios.get(`http://10.0.2.2:3001/api/order/order/${orderId}`);
//       setOrderDetails(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching order details:', error);
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color="#ff6347" />
//       </View>
//     );
//   }

//   if (!orderDetails) {
//     return (
//       <View style={styles.center}>
//         <Text>No order details found.</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.scrollContainer}>
//       <View style={styles.container}>
//         {/* Order Summary Card */}
//         <View style={styles.card}>
//           <Text style={styles.header}>Order Summary</Text>
//           <Text style={styles.detailText}>Order ID: {orderDetails._id}</Text>
//           <Text style={styles.detailText}>Status: {orderDetails.status}</Text>
//           <Text style={styles.detailText}>Delivery Address: {orderDetails.deliveryAddress}</Text>
//           <Text style={styles.detailText}>Total Price: ₹{orderDetails.totalPrice}</Text>
//           <Text style={styles.detailText}>Date: {new Date(orderDetails.createdAt).toLocaleDateString()}</Text>
//           <Text style={styles.detailText}>Time: {new Date(orderDetails.createdAt).toLocaleTimeString()}</Text>
//         </View>

//         {/* Items Ordered Card */}
//         <View style={styles.card}>
//           <Text style={styles.header}>Items Ordered</Text>
//           {orderDetails.items.map((item: any, index: number) => (
//             <View key={index} style={styles.itemBox}>
//               <Text style={styles.itemText}>Dish ID: {item.dish}</Text>
//               <Text style={styles.itemText}>Quantity: {item.quantity}</Text>
//               <Text style={styles.itemText}>Price: ₹{item.price}</Text>
//             </View>
//           ))}
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   scrollContainer: {
//     flexGrow: 1,
//     paddingVertical: 10,
//     backgroundColor: '#f5f5f5',
//   },
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#f5f5f5',
//   },
//   card: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 10,
//     marginBottom: 20,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   header: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#ff6347',
//     marginBottom: 10,
//   },
//   detailText: {
//     fontSize: 16,
//     marginBottom: 10,
//     color: '#333',
//   },
//   itemBox: {
//     backgroundColor: '#ffe6cc',
//     padding: 10,
//     marginVertical: 5,
//     borderRadius: 5,
//   },
//   itemText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   center: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default OrderDetailsScreen;


// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
// import axios from 'axios';

// const OrderDetailsScreen: React.FC<{ route: any }> = ({ route }) => {
//   const { orderId } = route.params;
//   const [orderDetails, setOrderDetails] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchOrderDetails();
//   }, []);

//   const fetchOrderDetails = async () => {
//     try {
//       const response = await axios.get(`http://10.0.2.2:3001/api/order/order/${orderId}`);
//       setOrderDetails(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching order details:', error);
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color="#ff6347" />
//       </View>
//     );
//   }

//   if (!orderDetails) {
//     return (
//       <View style={styles.center}>
//         <Text>No order details found.</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Order ID: {orderDetails.orderId}</Text>
//       <Text>Status: {orderDetails.status}</Text>
//       <Text>Delivery Address: {orderDetails.deliveryAddress}</Text>
//       <Text>Total Price: ₹{orderDetails.totalPrice}</Text>
//       <Text>Date: {orderDetails.date}</Text>
//       <Text>Time: {orderDetails.time}</Text>

//       <Text style={styles.header}>Items Ordered:</Text>
//       {orderDetails.items.map((item: any, index: number) => (
//         <View key={index} style={styles.item}>
//           <Text>Dish ID: {item.dish}</Text>
//           <Text>Quantity: {item.quantity}</Text>
//           <Text>Price: ₹{item.price}</Text>
//         </View>
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   header: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   item: {
//     backgroundColor: '#f0f0f0',
//     padding: 10,
//     marginVertical: 5,
//     borderRadius: 5,
//   },
//   center: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default OrderDetailsScreen;
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';

const OrderDetailsScreen: React.FC<{ route: any }> = ({ route }) => {
  const { orderId } = route.params;
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:3001/api/order/order/${orderId}`);
      setOrderDetails(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching order details:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#ff6347" />
      </View>
    );
  }

  if (!orderDetails) {
    return (
      <View style={styles.center}>
        <Text>No order details found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.card}>
        <View style={styles.section}>
          <Text style={styles.header}>Order ID</Text>
          <Text style={styles.value}>{orderDetails.orderId}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.header}>Status</Text>
          <Text style={styles.value}>{orderDetails.status}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.header}>Delivery Address</Text>
          <Text style={styles.value}>{orderDetails.deliveryAddress}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.header}>Total Price</Text>
          <Text style={styles.value}>${orderDetails.totalPrice}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.header}>Date & Time</Text>
          <Text style={styles.value}>{orderDetails.date} - {orderDetails.time}</Text>
        </View>

        <Text style={styles.itemsHeader}>Items Ordered:</Text>
        {orderDetails.items.map((item: any, index: number) => (
          <View key={index} style={styles.itemCard}>
            <Text style={styles.itemText}>Dish ID: {item.dish}</Text>
            <Text style={styles.itemText}>Quantity: {item.quantity}</Text>
            <Text style={styles.itemText}>Price: ${item.price}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    borderColor: '#ff6347', // Orangish border
    borderWidth: 1,
  },
  section: {
    marginBottom: 20,
  },
  header: {
    fontSize: 16,
    color: '#ff6347', // Orangish header text
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    color: '#333', // Darker text color for values
  },
  itemsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff6347', // Orangish items header
    marginTop: 10,
    marginBottom: 10,
  },
  itemCard: {
    backgroundColor: '#ffe6cc', // Light orange for the item card
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    borderColor: '#ff6347', // Orangish border for the item card
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  itemText: {
    fontSize: 14,
    color: '#333', // Darker text for the item details
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OrderDetailsScreen;

