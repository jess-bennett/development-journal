import { NextRequest, NextResponse } from "next/server";

import { getRequestIdFromQuery } from "@/src/utilities/getRequestId";
import { PrismaClient, Skill } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req: NextRequest): Promise<NextResponse> {
  try {
    const id = getRequestIdFromQuery(req);
    if (id === null) {
      return new NextResponse("Bad Request: Missing 'id' parameter", {
        status: 400,
      });
    }
    if (req.headers.get("content-type") !== "application/json") {
      return new NextResponse("Unsupported Media Type", { status: 415 });
    }
    const bodyJson = await req.json();

    if (!bodyJson) {
      return new NextResponse("Bad Request", { status: 400 });
    }
    const formData = {
      title: bodyJson.title,
      content: bodyJson.content,
      skills: bodyJson.skills as Skill[],
    };
    await updateItemById(id, formData);
    return new NextResponse("Item updated successfully", { status: 200 });
  } catch (error) {
    console.error("Error updating item:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

async function updateItemById(
  id: string,
  formData: {
    title: string;
    content: string;
    skills: Skill[];
  }
): Promise<void> {
  await prisma.item.update({ data: formData, where: { id } });
}
