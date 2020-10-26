import React, { useState, useMemo, useCallback } from "react";
import "./ProductBox.scss";
import useCurrencyContext from "../hooks/useCurrencyContext";
import useCartContext from "../hooks/useCartContext";
import czechNrFormat from "../utils/czechNrFormat";

export default function ProductBox({ product }) {
  const { name, price, quantity } = product;
  const [usdRate, setUsdRate] = useState();
  const { convertBaseToCurrency, rates } = useCurrencyContext();
  const { cart, addProductToCart } = useCartContext();

  const backgroundColor = useMemo(() => {
    let color = "transparent";
    if (usdRate - rates.USD < 0) {
      color = "coral";
    } else if (usdRate - rates.USD > 0) {
      color = "palegreen";
    }

    setUsdRate(rates.USD);
    return color;
  }, [rates]);

  const canAddToCart = useMemo(
    () => !cart[product.id] || cart[product.id] < quantity,
    [cart, product.id, quantity]
  );

  const handleClick = useCallback(() => {
    canAddToCart && addProductToCart(product);
  }, [canAddToCart, addProductToCart, product, quantity]);

  return (
    <div className="product flex-items-center">
      <div className="product__body flex justify-between">
        <div className="product__name">{name}</div>
        <div className="product__quantity text-center flex-items-center">
          {quantity}
        </div>
      </div>
      <div
        className="product__price text-end bold"
        style={{ backgroundColor: backgroundColor }}
      >
        {czechNrFormat(convertBaseToCurrency(price, "USD"))}
      </div>
      <div className="product__button-container flex-center">
        <button
          className="button--add pointer"
          onClick={handleClick}
          disabled={!canAddToCart}
        >
          +
        </button>
      </div>
    </div>
  );
}
