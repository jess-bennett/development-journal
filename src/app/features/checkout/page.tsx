"use client";
import { useEffect, useState } from "react";
import {
  calculateDataPerItem,
  calculateSubtotal,
  calculateTotalDiscount,
  calculateTotalPrice,
  calculateTotalTax,
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
  const [subtotaltoDisplay, setSubtotaltoDisplay] = useState(0);
  const [discounttoDisplay, setDiscounttoDisplay] = useState(0);
  const [taxtoDisplay, setTaxtoDisplay] = useState(0);
  const [dataPerItemtoDisplay, setDataPerItemtoDisplay] = useState<{
    [id: string]: { quantity: number; subtotal: number; description: string };
  }>({});

  useEffect(() => {
    const discount = calculateTotalDiscount(productQuantities);
    setDiscounttoDisplay(discount);
    const tax = calculateTotalTax(productQuantities);
    setTaxtoDisplay(tax);
    const dataPerItem = calculateDataPerItem(productQuantities); // Calculate subtotals
    setDataPerItemtoDisplay(dataPerItem);
    const subtotal = calculateSubtotal(productQuantities);
    setSubtotaltoDisplay(subtotal);
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
        items={dataPerItemtoDisplay}
        subtotal={subtotaltoDisplay}
        discount={discounttoDisplay}
        tax={taxtoDisplay}
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
