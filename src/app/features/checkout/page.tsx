"use client";
import { productData, totalPrice } from "checkout-library/src";

import ProductCard from "@/src/components/ProductCard";

const Checkout = () => {
  const { products } = productData;
  const pricetoDisplay = totalPrice([
    { id: "UC1234", quantity: 2 },
    { id: "UC1237", quantity: 1 },
  ]);
  return (
    <>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}

      <div>{pricetoDisplay}</div>
    </>
  );
};

export default Checkout;
