"use client";
import React, { useEffect, useState } from "react";
import { Entry, Skill } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { NextRequest } from "next/server";

const EditPage = (req: NextRequest) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [entry, setEntry] = useState<Entry | null>(null);
  const skills = Object.values(Skill);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/entry/read?id=${id}`);
        const data = await response.json();
        setEntry(data);
      } catch (error) {
        console.error("Error fetching entry:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const editEntry = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const updatedEntryData = {
        title: formData.get("title")!.toString(),
        content: formData.get("content")!.toString(),
        skill: Array.from(formData.getAll("skills")!) as Skill[],
      };
      await fetch(`/api/entry/update?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEntryData),
      });
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        editEntry(e);
      }}
    >
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
      <select
        className="c-entry-card__content"
        defaultValue={entry?.skill || ["DEFAULT"]} // Preselect entry skills or default value if not available
        name="skills"
        multiple
        required
      >
        {skills.map((skill, idx) => (
          <option
            key={idx}
            value={skill}
            selected={entry?.skill.includes(skill)}
          >
            {skill}
          </option>
        ))}
      </select>

      <button type="submit">Update</button>
    </form>
  );
};

export default EditPage;
