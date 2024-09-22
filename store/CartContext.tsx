import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the cart item state
interface CartItem {

  item:{  
  _id: string;
  name: string;
  price: string;
  imageUrl: string
  restaurant: string;
  
  }
  quantity: number;
}

interface CartContextType {
  cartItems: { [key: string]: CartItem };
  setCartItems: React.Dispatch<React.SetStateAction<{ [key: string]: CartItem }>>;
}


const CartContext = createContext<CartContextType | undefined>(undefined);


export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// CartProvider to wrap around components that need access to the cart
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<{ [key: string]: CartItem }>({});

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};
