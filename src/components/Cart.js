import "./Cart.scss";
import React from "react";
import useCartContext from "../hooks/useCartContext";
import CartItem from "../models/CartItem";
import useCurrencyContext from "../hooks/useCurrencyContext";
import czechNrFormat from "../utils/czechNrFormat";
import CartItemField from "./CartItemField";

export default function Cart({ products }) {
  const { cart } = useCartContext();
  const items = Object.entries(cart).reduce(
    (result, [productId, quantityInCart]) => {
      const product = products[productId];

      if (product)
        result.push(new CartItem({ ...product, quantity: quantityInCart }));

      return result;
    },
    []
  );
  const { convertBaseToCurrency } = useCurrencyContext();

  const sumOfPrice = items.reduce(
    (acc, curCurtItem) =>
      curCurtItem.quantity
        ? curCurtItem.price * curCurtItem.quantity + acc
        : acc,
    0
  );
  return (
    <div className="flex-column full-width justify-between">
      <table className="cart-table">
        <thead>
          <tr>
            <th className="cart-table__name-column">
              Product name and description
            </th>
            <th className="cart-table__quantity-column">Quantity</th>
            <th className="cart-table__price-column">Price</th>
          </tr>
        </thead>
        {items && items.length ? (
          <tbody>
            {items.map((item) => (
              <CartItemField
                key={item.id}
                item={item}
                maxQuantity={products[item.id].quantity}
              />
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td className="text-center" colSpan="3">
                <h3>Cart is empty</h3>
              </td>
            </tr>
          </tbody>
        )}
      </table>
      <div className="flex justify-end ">
        <h4>
          Total cost:
          <span>
            {" "}
            {czechNrFormat(convertBaseToCurrency(sumOfPrice, "USD"))}
          </span>
        </h4>
      </div>
    </div>
  );
}
