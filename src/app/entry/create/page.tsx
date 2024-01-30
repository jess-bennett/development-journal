import React from "react";
import { Skill, PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { FiSend } from "react-icons/fi";

const prisma = new PrismaClient();

async function createEntry(data: FormData) {
  "use server";
  const formData = {
    title: data.get("title")!.toString(),
    content: data.get("content")!.toString(),
    skill: Array.from(data.getAll("skills")!) as Skill[],
  };
  console.log(formData);
  await prisma.entry.create({ data: formData });
  redirect("/");
}

export default function CreatePage() {
  const skills = Object.values(Skill);
  return (
    <form className="c-entry-card" action={createEntry} method="POST">
      <div className="c-entry-card__title">
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          required
        />
      </div>
      <div className="c-entry-card__content">
        <textarea name="content" id="content" placeholder="Content" required />
        <select
          className="c-entry-card__content"
          defaultValue={["DEFAULT"]}
          name="skills"
          multiple
          required
        >
          {skills.map((skill, idx) => (
            <option key={idx} value={skill}>
              {skill}
            </option>
          ))}
        </select>
      </div>
      <footer className="c-entry-card__footer">
        <button className="c-btn" type="submit">
          <FiSend />
        </button>
      </footer>
    </form>
  );
}
