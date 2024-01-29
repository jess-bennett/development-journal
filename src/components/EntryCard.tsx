"use client";
import Link from "next/link";
import { Skill } from "@prisma/client";
import React from "react";
import { BiLogoNodejs } from "react-icons/bi";
import { FiDelete, FiEdit } from "react-icons/fi";
import {
  GiArtificialIntelligence,
  GiDatabase,
  GiSkullCrossedBones,
} from "react-icons/gi";
import { GrBug, GrCubes } from "react-icons/gr";
import {
  SiCss3,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiNextdotjs,
  SiNpm,
  SiReact,
  SiSass,
  SiTypescript,
} from "react-icons/si";
import { TbSql } from "react-icons/tb";
import { VscCloud, VscSymbolMisc } from "react-icons/vsc";

type Props = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  skill: Skill;
};

const options = {
  weekday: "short",
  year: "numeric",
  month: "2-digit",
  day: "numeric",
};

const skillIcons: Record<Skill, React.JSX.Element> = {
  AI: <GiArtificialIntelligence />,
  BUG_FIXES: <GrBug />,
  CSS: <SiCss3 />,
  DATABASES: <GiDatabase />,
  GIT: <SiGit />,
  EXTERNAL_LIBRARIES: <GrCubes />,
  HTML: <SiHtml5 />,
  JAVASCRIPT: <SiJavascript />,
  JEST: <SiJest />,
  LEGACY_CODE: <GiSkullCrossedBones />,
  MISC: <VscSymbolMisc />,
  NEXT_JS: <SiNextdotjs />,
  NODE_JS: <BiLogoNodejs />,
  NPM: <SiNpm />,
  REACT: <SiReact />,
  REST_APIS: <VscCloud />,
  SASS: <SiSass />,
  SQL: <TbSql />,
  TYPESCRIPT: <SiTypescript />,
};

async function deleteEntry(id: string) {
  await fetch(`/api/entry/delete?id=${id}`, {
    method: "DELETE",
  });
  window.location.reload();
}

function toArray<T>(item: T | T[]): T[] {
  return Array.isArray(item) ? item : [item];
}

export default function EntryCard({
  id,
  title,
  content,
  createdAt,
  skill,
}: Props) {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const skillsArray = toArray(skill);
  return (
    <article className="c-entry-card">
      <header className="c-entry-card__header">
        {skillsArray.map((skill, idx) => (
          <p key={idx} className="c-entry-card__skill">
            {skillIcons[skill]}
          </p>
        ))}
        <p className="c-entry-card__date">
          {createdAt.toLocaleString("en-GB", options)}
        </p>
      </header>
      <h2 className="c-entry-card__title">{title}</h2>
      <p className="c-entry-card__content">{content}</p>
      <footer className="c-entry-card__footer">
        <button className="c-btn" onClick={() => deleteEntry(id)}>
          <FiDelete />
        </button>
        <Link className="c-btn" href={`/entry/edit?id=${id}`} role="button">
          <FiEdit />
        </Link>
      </footer>
    </article>
  );
}
