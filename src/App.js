import React from "react";
import Goods from "./components/Goods";
import "./styles/app.scss";
import { CurrencyProvider } from "./contexts/CurrencyContext";
import { CartProvider } from "./contexts/CartContext";

export default function App() {
  return (
    <CurrencyProvider>
      <CartProvider>
        <Goods />
      </CartProvider>
    </CurrencyProvider>
  );
}
