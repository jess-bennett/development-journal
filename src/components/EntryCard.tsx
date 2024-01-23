"use client";
import Link from "next/link";
import { Mood } from "@prisma/client";
import React from "react";

type Props = {
  id: string;
  title: string;
  content: string;
  mood: Mood;
};
async function deleteEntry(id: string) {
  await fetch(`/api/entry/delete?id=${id}`, {
    method: "DELETE",
  });
  window.location.reload();
}
export default function EntryCard({ id, title, content, mood }: Props) {
  return (
    <article className="c-entry-card">
      <header>
        <h2 className="c-entry-card__header">{title}</h2>
      </header>
      <p className="c-entry-card__content">{content}</p>
      <footer className="c-entry-card__footer">
        How I feel at the moment: <strong>{mood}</strong>
        <button onClick={() => deleteEntry(id)}>Delete</button>
        <Link
          style={{ width: "100%" }}
          href={`/entry/edit?id=${id}`}
          role="button"
          className="outline"
        >
          Edit
        </Link>
      </footer>
    </article>
  );
}
