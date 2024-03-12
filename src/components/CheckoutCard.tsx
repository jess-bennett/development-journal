"use client";
import React from "react";

export interface CheckoutItem {
  [id: string]: { subtotal: number; description: string };
}

interface CheckoutDiscount {
  [category: string]: number;
}

interface CheckoutCardProps {
  price: number;
  items: CheckoutItem;
  discounts: CheckoutDiscount;
}

const CheckoutCard: React.FC<CheckoutCardProps> = ({
  price,
  items,
  discounts,
}) => {
  return (
    <article className="c-entry-card--checkout">
      <header className="c-entry-card__header">
        <div className="c-entry-card__skill"></div>
        <p className="c-entry-card__date"></p>
      </header>
      <h2 className="c-entry-card__title">Checkout</h2>
      <h3 className="c-entry-card__subheader">Items</h3>
      <ul className="c-entry-card__content">
        {Object.entries(items)
          .filter(([id, { subtotal }]) => subtotal !== 0)
          .map(([id, { subtotal, description }]) => (
            <li key={id}>{`${description}: £${subtotal}`}</li>
          ))}
      </ul>
      <h3 className="c-entry-card__subheader">Discounts</h3>
      <ul className="c-entry-card__content">
        {Object.entries(discounts)
          .filter(([category, discountValue]) => discountValue !== 0)
          .map(([category, discountValue]) => (
            <li key={category}>{`${category}: £${discountValue.toFixed(
              2
            )}`}</li>
          ))}
      </ul>
      <footer className="c-entry-card__footer">{`£${price.toFixed(2)}`}</footer>
    </article>
  );
};

export default CheckoutCard;
