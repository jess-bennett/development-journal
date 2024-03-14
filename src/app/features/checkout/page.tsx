"use client";
import { useEffect, useReducer, useState } from "react";
import {
  calculateDataPerItem,
  calculateGrossTotal,
  calculateNetTotal,
  calculateShippingCost,
  calculateSubtotal,
  calculateTotalDiscount,
  calculateTotalTax,
  productData,
} from "checkout-library/src";

import CheckoutCard from "@/src/components/CheckoutCard";
import ProductCard from "@/src/components/ProductCard";

const Checkout = () => {
  const { products } = productData;
  const [checkoutData, setCheckoutData] = useState({
    productQuantities: {},
    itemData: {},
    subtotal: 0,
    discount: 0,
    tax: 0,
    grossTotal: 0,
    shipping: 0,
    netTotal: 0,
  });

  useEffect(() => {
    const itemData = calculateDataPerItem(checkoutData.productQuantities);
    const subtotal = calculateSubtotal(checkoutData.productQuantities);
    const discount = calculateTotalDiscount(checkoutData.productQuantities);
    const tax = calculateTotalTax(checkoutData.productQuantities);
    const grossTotal = calculateGrossTotal(checkoutData.productQuantities);
    const shipping = calculateShippingCost(checkoutData.productQuantities);
    const netTotal = calculateNetTotal(checkoutData.productQuantities);

    setCheckoutData((prevData) => ({
      ...prevData,
      itemData,
      subtotal,
      discount,
      tax,
      grossTotal,
      shipping,
      netTotal,
    }));
  }, [checkoutData.productQuantities]);

  const updateProductQuantity = (id: string, quantity: number) => {
    setCheckoutData((prevData) => ({
      ...prevData,
      productQuantities: {
        ...prevData.productQuantities,
        [id]: quantity,
      },
    }));
  };

  return (
    <>
      <CheckoutCard
        items={checkoutData.itemData}
        subtotal={checkoutData.subtotal}
        discount={checkoutData.discount}
        tax={checkoutData.tax}
        grossTotal={checkoutData.grossTotal}
        shipping={checkoutData.shipping}
        netTotal={checkoutData.netTotal}
      />
      {products.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
          quantity={
            (checkoutData.productQuantities as Record<string, number>)[
              product.id
            ] || 0
          }
          updateProductQuantity={updateProductQuantity}
        />
      ))}
    </>
  );
};

export default Checkout;
