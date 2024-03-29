"use client";
export const revalidate = 10;
import React, { useEffect, useState } from "react";
import Link from "next/link";

import EntryCard, { Entry } from "../components/EntryCard";
import SecondaryHeader from "../components/SecondaryHeader";
import { iconConfig } from "../utilities/iconConfig";

const Home = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const { iconNewEntry } = iconConfig;
  const secondaryHeaderButtons = [
    <Link key={1} href="/entry/create" role={"button"}>
      {iconNewEntry}
    </Link>,
  ];

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await fetch("/api/entry/read");
        if (response.ok) {
          const data = await response.json();
          setEntries(data);
        } else {
          console.error("Failed to fetch entries");
        }
      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    };

    fetchEntries();
  }, []);

  return (
    <>
      <SecondaryHeader buttons={secondaryHeaderButtons} />
      {entries.map((entry) => (
        <EntryCard key={entry.id} {...entry} />
      ))}
    </>
  );
};

export default Home;
