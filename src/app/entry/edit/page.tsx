import React from "react";
import { Skill, PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export default async function EditPage({
  searchParams: { id },
}: {
  searchParams: { id: string };
}) {
  async function editEntry(data: FormData) {
    "use server";
    const formData = {
      title: data.get("title")!.toString(),
      content: data.get("content")!.toString(),
      skill: data.get("skill")! as Skill,
    };
    await prisma.entry.update({ data: formData, where: { id } });
    redirect("/");
  }
  const entry = await prisma.entry.findUnique({ where: { id } });
  const skills = Object.values(Skill);
  return (
    <form action={editEntry}>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Title"
        defaultValue={entry?.title}
      />
      <label htmlFor="content">Content</label>
      <textarea
        name="content"
        id="content"
        placeholder="Content"
        defaultValue={entry?.content}
      />
      <select name="skill" defaultValue={entry?.skill}>
        <option value="" disabled selected>
          Select a skill
        </option>
        {skills.map((skill, idx) => (
          <option key={idx} value={skill}>
            {skill}
          </option>
        ))}
      </select>
      <button type="submit">Update</button>
    </form>
  );
}
