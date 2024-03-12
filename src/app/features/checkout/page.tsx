"use client";
import { useEffect, useState } from "react";
import { productData, totalPrice } from "checkout-library/src";

import CheckoutCard from "@/src/components/CheckoutCard";
import ProductCard from "@/src/components/ProductCard";

interface SelectedProduct {
  id: string;
  quantity: number;
}

const Checkout = () => {
  const { products } = productData;
  const [productQuantities, setProductQuantities] = useState<{
    [id: string]: number;
  }>({});
  const [pricetoDisplay, setPricetoDisplay] = useState(0);

  useEffect(() => {
    // Calculate the total price using totalPrice function
    const total = totalPrice(productQuantities);
    // Update pricetoDisplay state
    setPricetoDisplay(total);
  }, [productQuantities]);

  const updateProductQuantity = (id: string, quantity: number) => {
    setProductQuantities({ ...productQuantities, [id]: quantity });
  };

  return (
    <>
      <CheckoutCard price={pricetoDisplay} />
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
