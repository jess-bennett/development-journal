"use client";
export const revalidate = 10;
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IoMdAddCircleOutline } from "react-icons/io";

import SecondaryHeader from "../../../components/SecondaryHeader";
import ToDoCard, { Item } from "../../../components/ToDoCard";

const ToDo = () => {
  const [items, setItems] = useState<Item[]>([]);
  const secondaryHeaderButtons = [
    <Link key={1} href="/item/create" role={"button"}>
      <IoMdAddCircleOutline />
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
      {items.map((item) => (
        <ToDoCard key={item.id} {...item} />
      ))}
    </>
  );
};

export default ToDo;
