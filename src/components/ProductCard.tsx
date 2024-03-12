"use client";
import React, { useState } from "react";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

import { categoryIcons } from "../utilities/types";

interface ProductCardProps {
  id: string;
  description: string;
  category: string;
  price: number;
  unitType: string;
  quantity: number;
  updateProductQuantity: (id: string, quantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  description,
  category,
  price,
  unitType,
  quantity,
  updateProductQuantity,
}) => {
  const handleIncrease = () => {
    updateProductQuantity(id, quantity + 1);
  };

  const handleDecrease = () => {
    {
      quantity > 0 ? updateProductQuantity(id, quantity - 1) : quantity;
    } // Update quantity by -1
  };

  return (
    <article className="c-entry-card">
      <header className="c-entry-card__header">
        <div className="c-entry-card__skill">{categoryIcons[category]}</div>
        <p className="c-entry-card__date">
          {quantity} {unitType}
        </p>
      </header>
      <h2 className="c-entry-card__title">{description}</h2>
      <p className="c-entry-card__content">{`£${price.toFixed(2)}`}</p>
      <footer className="c-entry-card__footer">
        <button className="c-btn" onClick={handleIncrease}>
          <CiCirclePlus />
        </button>
        <button className="c-btn" onClick={handleDecrease}>
          <CiCircleMinus />
        </button>
      </footer>
    </article>
  );
};

export default ProductCard;
