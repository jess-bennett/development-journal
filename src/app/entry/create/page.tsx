import React from "react";
import { Skill, PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

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
    <form action={createEntry} method="POST">
      <label htmlFor="title">Title</label>
      <input type="text" name="title" id="title" placeholder="Title" />
      <label htmlFor="content">Content</label>
      <textarea name="content" id="content" placeholder="Content" />
      <select defaultValue={["DEFAULT"]} name="skills" multiple>
        <option value="DEFAULT" disabled>
          Choose a skill ...
        </option>
        {skills.map((skill, idx) => (
          <option key={idx} value={skill}>
            {skill}
          </option>
        ))}
      </select>
      <button type="submit">Create</button>
    </form>
  );
}
