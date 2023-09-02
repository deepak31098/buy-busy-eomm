import {createContext, useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useAuth} from "./authContext";
import {
  createOrder,
  getCartItems,
  getItemsDetails,
  updateCart,
} from "../services/cart";
import {useLoading} from "./loadingContext";

const cartContext = createContext();

// custom hook
export const useCart = () => useContext(cartContext);

// provider
export const CartContextProvider = ({children}) => {
  const [cart, setCart] = useState([]);
  const user = useAuth();
  const [total, setTotal] = useState(0);
  const [item, setItem] = useState(0);
  const {showSpinner, hideSpinner} = useLoading();

  // remove items from cart
  const removeItem = id => {
    const newList = cart.filter(e => e.id !== id);
    updateCart(user?.uid, newList);
    toast("Item removed from cart");
  };

  // add new item to cart
  const addItem = id => {
    const index = cart.findIndex(e => e.id === id);
    const newList = cart;
    if (index >= 0) {
      // increase quantuty in existing list
      newList[index] = {id, quantity: newList[index].quantity + 1};
      setCart(newList);
      toast("Item count increased");
    } else {
      // add new item to list
      newList.push({id, quantity: 1});
      setCart(newList);
      toast("New Item added");
    }
    updateCart(user?.uid, newList);
  };

  // callback function in get item
  const getCartItemsDetails = async cart => {
    const newList = cart?.map(async e => {
      // get product details from id doc id stored in card
      const data = await getItemsDetails(e.id);
      // save product details and quantity in cart
      return {
        ...data.data(),
        ...e,
      };
    });
    // Wait for all promises to resolve
    const newCart = await Promise.all(
      newList?.filter(item => item !== undefined && item !== null)
    );
    setCart(newCart);
    const price = newCart?.reduce(
      (acc, curr) => curr.price * curr.quantity + acc,
      0
    );
    const item = newCart?.reduce((acc, curr) => curr.quantity + acc, 0);
    setTotal(price);
    setItem(item);
    hideSpinner();
  };

  // get all cart item in user's card using doc id
  useEffect(() => {
    if (!user?.uid) return;
    showSpinner();
    const unsubscribe = getCartItems(
      doc => getCartItemsDetails(doc.data()?.cart),
      user?.uid
    );
    return () => unsubscribe();
  }, [user?.uid]);

  const updateQuantity = (change, id) => {
    const index = cart.findIndex(e => e.id === id);
    const newList = cart;
    newList[index].quantity = newList[index].quantity + change;
    if (newList[index].quantity === 0) {
      newList.splice(index, 1);
    }
    setCart(newList);
    updateCart(user?.uid, newList);
    toast("Item count updated");
  };

  // confirm order
  const confirmOrder = () => {
    const order = cart?.map(e => {
      return {
        id: e.id,
        quantity: e.quantity,
      };
    });
    createOrder({order, id: user?.uid});
    updateCart(user?.uid, []);
  };

  return (
    <cartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        updateQuantity,
        total,
        item,
        confirmOrder,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};
