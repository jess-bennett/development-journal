import { NextRequest, NextResponse } from "next/server";
import { Skill, PrismaClient } from "@prisma/client";
import { getRequestIdFromQuery } from "@/src/utilities/getRequestId";

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
    await updateEntryById(id, formData);
    return new NextResponse("Entry updated successfully", { status: 200 });
  } catch (error) {
    console.error("Error updating entry:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

async function updateEntryById(
  id: string,
  formData: {
    title: string;
    content: string;
    skills: Skill[];
  }
): Promise<void> {
  await prisma.entry.update({ data: formData, where: { id } });
}
