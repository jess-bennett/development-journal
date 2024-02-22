"use client";
export const revalidate = 10;
import React, { useEffect, useState } from "react";
import Link from "next/link";

import { iconConfig } from "@/src/utilities/iconConfig";

import SecondaryHeader from "../../../components/SecondaryHeader";
import ToDoCard, { Item } from "../../../components/ToDoCard";

const ToDo = () => {
  const [items, setItems] = useState<Item[]>([]);
  const { iconNewItem } = iconConfig;
  const secondaryHeaderButtons = [
    <Link key={1} href="/item/create" role={"button"}>
      {iconNewItem}
    </Link>,
  ];

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("/api/item/read");
        if (response.ok) {
          const data = await response.json();
          setItems(data);
        } else {
          console.error("Failed to fetch items");
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <>
      <SecondaryHeader buttons={secondaryHeaderButtons} />
      <div className="o-container--column">
        <h2>Incomplete Items</h2>
        {items
          .filter((item) => !item.complete)
          .map((item) => (
            <ToDoCard key={item.id} {...item}></ToDoCard>
          ))}
      </div>
      <div className="o-container--column">
        <h2>Complete Items</h2>
        {items
          .filter((item) => item.complete)
          .map((item) => (
            <ToDoCard key={item.id} {...item}></ToDoCard>
          ))}
      </div>
    </>
  );
};

export default ToDo;
