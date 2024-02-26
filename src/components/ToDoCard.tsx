"use client";
import React from "react";
import Link from "next/link";

import { Skill } from "@prisma/client";

import { iconConfig } from "../utilities/iconConfig";
import { skillIcons } from "../utilities/types";

export interface Item {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  skill: Skill[];
  complete: boolean;
}

async function deleteItem(id: string) {
  await fetch(`/api/item/delete?id=${id}`, {
    method: "DELETE",
  });
  window.location.reload();
}

async function markComplete(id: string, status: boolean) {
  try {
    const updatedStatus = {
      complete: status,
    };
    await fetch(`/api/item/update/complete?id=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedStatus),
    });
    window.location.reload();
  } catch (error) {
    console.error("Error marking item as complete:", error);
  }
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

const ToDoCard = ({ id, title, content, createdAt, skill, complete }: Item) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let formattedDate = new Date(createdAt).toLocaleString("en-GB", options);
  const skillsArray = toArray(skill);
  const formattedContent = formatContent(content);
  const { iconEdit, iconDelete, iconComplete, iconIncomplete } = iconConfig;
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
        <button className="c-btn" onClick={() => deleteItem(id)}>
          {iconDelete}
        </button>
        <Link className="c-btn" href={`/item/edit?id=${id}`} role="button">
          {iconEdit}
        </Link>
        {complete ? (
          <button className="c-btn" onClick={() => markComplete(id, false)}>
            {iconIncomplete}
          </button>
        ) : (
          <button className="c-btn" onClick={() => markComplete(id, true)}>
            {iconComplete}
          </button>
        )}
      </footer>
    </article>
  );
};

export default ToDoCard;
