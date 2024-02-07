import { NextRequest, NextResponse } from "next/server";

import { PrismaClient, Skill } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest): Promise<NextResponse> {
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
      skill: bodyJson.skill as Skill[],
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
  skill: Skill[];
}): Promise<void> {
  await prisma.entry.create({
    data: entryData,
  });
}
