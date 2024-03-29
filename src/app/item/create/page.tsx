"use client";
import React from "react";
import { useRouter } from "next/navigation";

import { iconConfig } from "@/src/utilities/iconConfig";
import { Skill } from "@prisma/client";

const CreatePage = () => {
  const skills = Object.values(Skill);
  const router = useRouter();

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const itemData = {
        title: formData.get("title")!.toString(),
        content: formData.get("content")!.toString(),
        skill: Array.from(formData.getAll("skills")!) as Skill[],
      };
      await fetch("/api/item/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemData),
      });
      router.push("/features/to-do");
    } catch (error) {
      console.error(error);
    }
  };
  const { iconCreate } = iconConfig;
  return (
    <form className="c-entry-card" onSubmit={submitData}>
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
          {iconCreate}
        </button>
      </footer>
    </form>
  );
};

export default CreatePage;
