"use client";
import React from "react";

export interface CheckoutItem {
  [id: string]: { quantity: number; subtotal: number; description: string };
}

interface CheckoutCardProps {
  price: number;
  items: CheckoutItem;
  subtotal: number;
  discount: number;
  tax: number;
}

const CheckoutCard: React.FC<CheckoutCardProps> = ({
  price,
  items,
  subtotal,
  discount,
  tax,
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
          .map(([id, { quantity, subtotal, description }]) => (
            <li key={id}>{`${description} x(${quantity}): £${subtotal.toFixed(
              2
            )}`}</li>
          ))}
      </ul>
      <footer className="c-entry-card__footer">
        <ul>
          <li>Subotal: {`£${subtotal.toFixed(2)}`}</li>
          <li>Discount: {`£${discount.toFixed(2)}`}</li>
          <li>Tax: {`£${tax.toFixed(2)}`}</li>
          <li>Total: {`£${price.toFixed(2)}`}</li>
        </ul>
      </footer>
    </article>
  );
};

export default CheckoutCard;
