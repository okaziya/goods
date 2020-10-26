import { useContext } from "react";
import { CurrencyContext } from "../contexts/CurrencyContext";

export default function useCurrencyContext() {
  return useContext(CurrencyContext);
}
