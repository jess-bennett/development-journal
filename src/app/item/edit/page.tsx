"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { NextRequest } from "next/server";
import { RxUpdate } from "react-icons/rx";

import { Item, Skill } from "@prisma/client";

const EditPage = (req: NextRequest) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [item, setItem] = useState<Item | null>(null);
  const skills = Object.values(Skill);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/item/read?id=${id}`);
        const data = await response.json();
        setItem(data);
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const editItem = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const updatedItemData = {
        title: formData.get("title")!.toString(),
        content: formData.get("content")!.toString(),
        skill: Array.from(formData.getAll("skills")!) as Skill[],
      };
      await fetch(`/api/item/update?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedItemData),
      });
      router.push("/features/to-do");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form
      className="c-entry-card"
      onSubmit={(e) => {
        e.preventDefault();
        editItem(e);
      }}
    >
      <div className="c-entry-card__title">
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          defaultValue={item?.title}
        />
      </div>
      <div className="c-entry-card__content">
        <textarea
          name="content"
          id="content"
          placeholder="Content"
          defaultValue={item?.content}
        />
        <select
          className="c-entry-card__content"
          defaultValue={item?.skill || ["DEFAULT"]} // Preselect item skills or default value if not available
          name="skills"
          multiple
          required
        >
          {skills.map((skill, idx) => (
            <option
              key={idx}
              value={skill}
              selected={item?.skill.includes(skill)}
            >
              {skill}
            </option>
          ))}
        </select>
      </div>
      <footer className="c-entry-card__footer">
        <button className="c-btn" type="submit">
          <RxUpdate />
        </button>
      </footer>
    </form>
  );
};

export default EditPage;
