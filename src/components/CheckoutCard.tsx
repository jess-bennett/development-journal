"use client";
import React from "react";

export interface CheckoutItem {
  price: number;
}

const CheckoutCard = ({ price }: CheckoutItem) => {
  return (
    <article className="c-entry-card--checkout">
      <header className="c-entry-card__header">
        <div className="c-entry-card__skill"></div>
        <p className="c-entry-card__date"></p>
      </header>
      <h2 className="c-entry-card__title">Checkout</h2>
      <p className="c-entry-card__content">{`£${price.toFixed(2)}`}</p>
      <footer className="c-entry-card__footer">Footer</footer>
    </article>
  );
};

export default CheckoutCard;
