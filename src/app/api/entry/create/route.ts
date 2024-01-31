import { Skill, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse> {
  try {
    if (req.headers.get("content-type") !== "application/json") {
      return new NextResponse("Unsupported Media Type", { status: 415 });
    }
    const bodyJson = await req.json();

    if (!bodyJson) {
      return new NextResponse("Bad Request", { status: 400 });
    }
    const entryData = {
      title: bodyJson.title,
      content: bodyJson.content,
      skills: bodyJson.skills as Skill[],
    };
    await createNewEntry(entryData);
    return new NextResponse("Entry created successfully", { status: 200 });
  } catch (error) {
    console.error("Error creating entry:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

async function createNewEntry(entryData: {
  title: string;
  content: string;
  skills: Skill[];
}): Promise<void> {
  await prisma.entry.create({
    data: entryData,
  });
}
