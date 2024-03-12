"use client";
import { useEffect, useState } from "react";
import {
  calculateDiscounts,
  calculateSubtotals,
  calculateTotalPrice,
  productData,
} from "checkout-library/src";

import CheckoutCard from "@/src/components/CheckoutCard";
import ProductCard from "@/src/components/ProductCard";

const Checkout = () => {
  const { products } = productData;
  const [productQuantities, setProductQuantities] = useState<{
    [id: string]: number;
  }>({});
  const [totaltoDisplay, setTotaltoDisplay] = useState(0);
  const [subtotalstoDisplay, setSubtotalstoDisplay] = useState<{
    [id: string]: { subtotal: number; description: string };
  }>({});
  const [discounttoDisplay, setdiscounttoDisplay] = useState<{
    [category: string]: number;
  }>({});

  useEffect(() => {
    const discountValues = calculateDiscounts(productQuantities); // Calculate subtotals
    setdiscounttoDisplay(discountValues);
    const subtotalsData = calculateSubtotals(productQuantities); // Calculate subtotals
    setSubtotalstoDisplay(subtotalsData);
    const total = calculateTotalPrice(productQuantities);
    setTotaltoDisplay(total);
  }, [productQuantities]);

  const updateProductQuantity = (id: string, quantity: number) => {
    setProductQuantities({ ...productQuantities, [id]: quantity });
  };

  return (
    <>
      <CheckoutCard
        price={totaltoDisplay}
        items={subtotalstoDisplay}
        discounts={discounttoDisplay}
      />
      {products.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
          quantity={productQuantities[product.id] || 0}
          updateProductQuantity={updateProductQuantity}
        />
      ))}
    </>
  );
};

export default Checkout;
