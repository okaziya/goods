import React, { useReducer } from "react";

const reduce = (cart, action) => {
  const { type } = action;
  if (type === "ADD_PRODUCT") {
    const { product } = action;
    const { id } = product;
    if (cart[id]) {
      cart[id] += 1;
    } else {
      cart[id] = 1;
    }
    return { ...cart };
  }

  if (type === "DELETE_PRODUCT") {
    const { product } = action;
    const { id } = product;
    if (cart[id]) {
      delete cart[id];
    }
    return { ...cart };
  }
  if (type === "UPDATE_QUANTITY_OF_PRODUCT") {
    const { product } = action;
    const { id } = product;
    const { newQuantityNumber } = action;
    if (cart[id]) {
      if (newQuantityNumber) {
        cart[id] = newQuantityNumber;
      } else {
        cart[id] = 1;
      }
    }
    return { ...cart };
  }
  throw Error("Unknown action type");
};

export const CartContext = React.createContext();

// cart data has a structure of { [product.id]: quantityInCart }

export function CartProvider({ children }) {
  const [cart, cartDispatch] = useReducer(reduce, {});

  const addProductToCart = (product) => {
    cartDispatch({ type: "ADD_PRODUCT", product });
  };

  const deleteProductFromCart = (product) => {
    cartDispatch({ type: "DELETE_PRODUCT", product });
  };

  const updateQuantityOfProduct = (product, newQuantityNumber) => {
    cartDispatch({
      type: "UPDATE_QUANTITY_OF_PRODUCT",
      product,
      newQuantityNumber,
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addProductToCart,
        deleteProductFromCart,
        updateQuantityOfProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
