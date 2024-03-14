"use client";
import { useEffect, useState } from "react";
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
  const [productQuantities, setProductQuantities] = useState<{
    [id: string]: number;
  }>({});
  const [itemDatatoDisplay, setItemDatatoDisplay] = useState<{
    [id: string]: { quantity: number; subtotal: number; description: string };
  }>({});
  const [subtotaltoDisplay, setSubtotaltoDisplay] = useState(0);
  const [discounttoDisplay, setDiscounttoDisplay] = useState(0);
  const [taxtoDisplay, setTaxtoDisplay] = useState(0);
  const [grossTotaltoDisplay, setGrossTotaltoDisplay] = useState(0);
  const [shippingtoDisplay, setShippingtoDisplay] = useState(0);
  const [netTotaltoDisplay, setNetTotaltoDisplay] = useState(0);

  useEffect(() => {
    const itemData = calculateDataPerItem(productQuantities);
    setItemDatatoDisplay(itemData);
    const subtotal = calculateSubtotal(productQuantities);
    setSubtotaltoDisplay(subtotal);
    const discount = calculateTotalDiscount(productQuantities);
    setDiscounttoDisplay(discount);
    const tax = calculateTotalTax(productQuantities);
    setTaxtoDisplay(tax);
    const grossTotal = calculateGrossTotal(productQuantities);
    setGrossTotaltoDisplay(grossTotal);
    const shipping = calculateShippingCost(productQuantities);
    setShippingtoDisplay(shipping);
    const netTotal = calculateNetTotal(productQuantities);
    setNetTotaltoDisplay(netTotal);
  }, [productQuantities]);

  const updateProductQuantity = (id: string, quantity: number) => {
    setProductQuantities({ ...productQuantities, [id]: quantity });
  };

  return (
    <>
      <CheckoutCard
        items={itemDatatoDisplay}
        subtotal={subtotaltoDisplay}
        discount={discounttoDisplay}
        tax={taxtoDisplay}
        grossTotal={grossTotaltoDisplay}
        shipping={shippingtoDisplay}
        netTotal={netTotaltoDisplay}
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
