import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AddOn {
  _id: string;
  name: string;
  price: number;
}

interface CartItem {
  item: {  
    _id: string;
    name: string;
    price: string;
    imageUrl: string;
    restaurant: string;
  };
  addOn: AddOn[];
  finalPrice: number;
  quantity: number;

}

interface CartContextType {
  cartItems: CartItem[]; // Change from object to array
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>; // Update setter
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
  // Initialize cartItems as an array instead of an object
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};
