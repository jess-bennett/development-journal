"use client";
import React from "react";
import Link from "next/link";

import { Skill } from "@prisma/client";

import { iconConfig } from "../utilities/iconConfig";
import { skillIcons } from "../utilities/types";

export interface Entry {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  skill: Skill[];
}

async function deleteEntry(id: string) {
  await fetch(`/api/entry/delete?id=${id}`, {
    method: "DELETE",
  });
  window.location.reload();
}

function toArray<T>(item: T | T[]): T[] {
  return Array.isArray(item) ? item : [item];
}

const formatContent = (content: string) => {
  const formattedContent = content.replace(/`([^`]+)`/g, (_, match) => {
    return `<code>${match}</code>`;
  });

  return (
    <p
      className="c-entry-card__content"
      dangerouslySetInnerHTML={{ __html: formattedContent }}
    ></p>
  );
};

const EntryCard = ({ id, title, content, createdAt, skill }: Entry) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let formattedDate = new Date(createdAt).toLocaleString("en-GB", options);
  const skillsArray = toArray(skill);
  const formattedContent = formatContent(content);
  const { iconEdit, iconDelete } = iconConfig;
  return (
    <article className="c-entry-card">
      <header className="c-entry-card__header">
        <div className="c-entry-card__skill">
          {skillsArray.map((skill, idx) => (
            <span key={idx}>{skillIcons[skill]}</span>
          ))}
        </div>
        <p className="c-entry-card__date">{formattedDate}</p>
      </header>
      <h2 className="c-entry-card__title">{title}</h2>
      {formattedContent}
      <footer className="c-entry-card__footer">
        <button className="c-btn" onClick={() => deleteEntry(id)}>
          {iconDelete}
        </button>
        <Link className="c-btn" href={`/entry/edit?id=${id}`} role="button">
          {iconEdit}
        </Link>
      </footer>
    </article>
  );
};

export default EntryCard;
