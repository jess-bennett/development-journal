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
  AI: <GiArtificialIntelligence title="AI" />,
  BUG_FIXES: <GrBug title="Bug fixes" />,
  CSS: <SiCss3 title="CSS" />,
  DATABASES: <GiDatabase title="Databases" />,
  GIT: <SiGit title="Git" />,
  EXTERNAL_LIBRARIES: <GrCubes title="External libraries" />,
  HTML: <SiHtml5 title="HTML" />,
  JAVASCRIPT: <SiJavascript title="JavaScript" />,
  JEST: <SiJest title="Jest" />,
  LEGACY_CODE: <GiSkullCrossedBones title="Legacy code" />,
  MISC: <VscSymbolMisc title="Misc" />,
  NEXT_JS: <SiNextdotjs title="Next.js" />,
  NODE_JS: <BiLogoNodejs title="Node.js" />,
  NPM: <SiNpm title="Npm" />,
  REACT: <SiReact title="React" />,
  REST_APIS: <VscCloud title="Rest APIs" />,
  SASS: <SiSass title="Sass" />,
  SQL: <TbSql title="SQL" />,
  TYPESCRIPT: <SiTypescript title="TypeScript" />,
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
