"use client";
export const revalidate = 10;
import React, { useEffect, useState } from "react";
import EntryCard, { Entry } from "@/src/components/EntryCard";

const Home = () => {
  const [entries, setEntries] = useState<Entry[]>([]);

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

    // Call the fetchEntries function
    fetchEntries();
  }, []); // The empty dependency array ensures that the effect runs once when the component mounts

  return (
    <>
      {entries.map((entry) => (
        <EntryCard key={entry.id} {...entry} />
      ))}
    </>
  );
};

export default Home;
