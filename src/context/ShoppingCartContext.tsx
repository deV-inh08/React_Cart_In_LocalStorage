import React, { createContext, ReactNode, useContext, useState } from 'react';
import ShoppingCart from '../components/ShoppingCart/ShoppingCart';
import { useLocalStorage } from '../hooks/useLocalStorage';


const useShoppingCart = () => {
  return useContext(ShoppingCartContext)
};

interface TypeChildrenProps {
    children: ReactNode
};


type ShoppingCartContext = {
    openCart: () => void;
    closeCart: () => void;
    getItemQuantity: (id: number) => number;
    increaseCartQuantity: (id: number) => void;
    decreaseCartQuantity: (id: number) => void;
    removeFromCart: (id: number) => void;
    cartQuantity: number;
    cartItems: CartItemType[]
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);


type CartItemType = {
    id: number,
    quantity: number,
}

const ShoppingCartProvider = ( { children }: TypeChildrenProps ) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [cartItems, setCartItem] = useLocalStorage<CartItemType[]>("shopping-cart", []);
    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);


    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    const getItemQuantity = (id: number) => {
        return cartItems.find((item) => item.id === id)?.quantity || 0
    };

    const increaseCartQuantity = (id: number) => {
        setCartItem((preCartItem) => {
            if(preCartItem.find((item) => item.id === id) == null) {
                return [...preCartItem, {id, quantity: 1}]
            } else {
                return preCartItem.map((item) => {
                    if(item.id === id) {
                        return {...item, quantity: item.quantity + 1}
                    } else {
                        return item
                    }
                })
            }
        })
    };

    const decreaseCartQuantity = (id: number) => {
        setCartItem((preCartItem) => {
            if(preCartItem.find((item) => item.id === id)?.quantity === 1) {
                return preCartItem.filter((item) => item.id !== id)
            } else {
                return preCartItem.map((item) => {
                    if(item.id === id) {
                        return {...item, quantity: item.quantity - 1}
                    } else {
                        return item
                    }
                })
            }
        })
    };

    const removeFromCart = (id: number) => {
        setCartItem((preCartItem) => {
            return preCartItem.filter((item) => item.id !== id)
        })
    }


    return (
        <ShoppingCartContext.Provider value={{getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, cartQuantity, cartItems , openCart, closeCart}}>
            {children}
            <ShoppingCart isOpen={isOpen}/>
        </ShoppingCartContext.Provider>
    )
};

export {
    useShoppingCart,
    ShoppingCartProvider
}