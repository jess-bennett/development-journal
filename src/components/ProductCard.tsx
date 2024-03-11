"use client";
import React from "react";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

import { categoryIcons } from "../utilities/types";

export interface ProductItem {
  id: string;
  description: string;
  category: string;
  price: number;
}

const ProductCard = ({ id, description, category, price }: ProductItem) => {
  return (
    <article className="c-entry-card">
      <header className="c-entry-card__header">
        <div className="c-entry-card__skill">{categoryIcons[category]}</div>
        <p className="c-entry-card__date">{id}</p>
      </header>
      <h2 className="c-entry-card__title">{description}</h2>
      {price}
      <footer className="c-entry-card__footer">
        <button className="c-btn">
          <CiCirclePlus />
        </button>
        <button className="c-btn">
          <CiCircleMinus />
        </button>
      </footer>
    </article>
  );
};

export default ProductCard;
