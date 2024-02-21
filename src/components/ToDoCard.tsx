"use client";
import React from "react";
import Link from "next/link";
import { FiDelete, FiEdit } from "react-icons/fi";

import { Skill } from "@prisma/client";

import { skillIcons } from "../utilities/types";

export interface Item {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  skill: Skill[];
}

async function deleteItem(id: string) {
  await fetch(`/api/item/delete?id=${id}`, {
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

const ToDoCard = ({ id, title, content, createdAt, skill }: Item) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const skillsArray = toArray(skill);
  const formattedContent = formatContent(content);
  return (
    <article className="c-entry-card">
      <header className="c-entry-card__header">
        <div className="c-entry-card__skill">
          {skillsArray.map((skill, idx) => (
            <span key={idx}>{skillIcons[skill]}</span>
          ))}
        </div>
        <p className="c-entry-card__date">
          {createdAt.toLocaleString("en-GB", options)}
        </p>
      </header>
      <h2 className="c-entry-card__title">{title}</h2>
      {formattedContent}
      <footer className="c-entry-card__footer">
        <button className="c-btn" onClick={() => deleteItem(id)}>
          <FiDelete />
        </button>
        <Link className="c-btn" href={`/item/edit?id=${id}`} role="button">
          <FiEdit />
        </Link>
      </footer>
    </article>
  );
};

export default ToDoCard;
