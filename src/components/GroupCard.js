import "./GroupCard.scss";
import React from "react";
import ProductBox from "./ProductBox";

export default function GroupCard({ group, products }) {
  const { name } = group;
  return (
    <div className="group flex-column">
      <div className="group__header">
        <h4 className="text-center">{name}</h4>
      </div>
      <div className="group__body">
        {products.map((product) => (
          <ProductBox product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
