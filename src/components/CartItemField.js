import "./CartItemField.scss";
import React, { useState, useEffect, useMemo } from "react";
import czechNrFormat from "../utils/czechNrFormat";
import useCurrencyContext from "../hooks/useCurrencyContext";
import trash from "../images/trash.svg";
import useCartContext from "../hooks/useCartContext";

export default function CartItemField({ item, maxQuantity }) {
  const { convertBaseToCurrency } = useCurrencyContext();
  const { id, name, quantity: quantityInit, price } = item;
  const [quantity, setQuantity] = useState();
  const [numericQuantity, setNumericQuantity] = useState(quantityInit);
  const { deleteProductFromCart, updateQuantityOfProduct } = useCartContext();

  useEffect(() => setQuantity(quantityInit), [quantityInit]);

  useEffect(() => {
    const newQuantityValue = numericQuantity.toString().replace(/^0+/, "");
    setQuantity(newQuantityValue);
    if (parseInt(newQuantityValue) !== item.quantity) {
      updateQuantityOfProduct(item, parseInt(newQuantityValue));
    }
  }, [numericQuantity, numericQuantity]);

  const handleChange = ({ target }) => {
    const validatedTargetValue = target.value ? target.value : 1;
    setNumericQuantity(Math.min(validatedTargetValue, maxQuantity));
  };

  const sumPrice = useMemo(() => {
    return quantity ? price * parseInt(quantity) : 0;
  }, [quantity, price]);

  return (
    <tr key={id}>
      <td>{name}</td>
      <td className="relative">
        <div className="flex-center">
          <input
            className="cart-item__input"
            value={quantity}
            type="number"
            min="1"
            onChange={handleChange}
          />
        </div>
        {parseInt(quantity) === maxQuantity && (
          <div className="cart-item__hint text-center">
            <small className="bold">Количество ограничено</small>
          </div>
        )}
      </td>
      <td>
        <div className="flex-items-center justify-around">
          <p>{czechNrFormat(convertBaseToCurrency(sumPrice, "USD"))}</p>
          <button
            className="pointer"
            onClick={() => deleteProductFromCart(item)}
          >
            <img alt="trash" src={trash} width={15} />
          </button>
        </div>
      </td>
    </tr>
  );
}
