import React, { useEffect, useReducer, useMemo, useCallback } from "react";
import GroupCard from "./GroupCard";
import axios from "axios";
import constructDataState from "../constructDataState";
import useCurrencyContext from "../hooks/useCurrencyContext";
import Cart from "../components/Cart";

const dataReducer = (state, action) => {
  const { type } = action;

  if (type === "SET_STATE") return action.state;
};

function Goods() {
  const [dataState, dispatchDataState] = useReducer(dataReducer, null);
  const groups = useMemo(() => dataState && Object.values(dataState.groups), [
    dataState,
  ]);

  const getProductsForGroup = useCallback(
    (group) => {
      return Object.values(dataState.products).filter(
        ({ groupId }) => groupId === group.id
      );
    },
    [dataState]
  );
  const { setRateForCurrency } = useCurrencyContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/data.json");
        const { data: namesData } = await axios.get("/names.json");
        const constructedData = constructDataState(data, namesData);

        const randomUSDRate = Math.floor(Math.random() * 60 + 20);
        setRateForCurrency(randomUSDRate, "USD");

        dispatchDataState({ type: "SET_STATE", state: constructedData });
      } catch (err) {
        alert("something went wrong");
        console.error(err);
      }
    };

    fetchData();

    const FIFTEEN_SECONDS = 15000;
    const intervalID = setInterval(fetchData, FIFTEEN_SECONDS);
    return () => {
      clearInterval(intervalID);
    };
  }, [setRateForCurrency]);

  if (!dataState) return null;

  return (
    <>
      <header className="flex-center">
        <h1>Goods</h1>
      </header>
      <main className="app container">
        {groups.map((group) => (
          <GroupCard
            group={group}
            products={getProductsForGroup(group)}
            key={group.id}
          />
        ))}
        <Cart products={dataState.products} />
      </main>
    </>
  );
}

export default Goods;
