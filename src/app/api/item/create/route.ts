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
    const itemData = {
      title: bodyJson.title,
      content: bodyJson.content,
      skill: bodyJson.skill as Skill[],
      complete: false,
    };
    await createNewItem(itemData);
    return new NextResponse("Item created successfully", { status: 200 });
  } catch (error) {
    console.error("Error creating item:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

async function createNewItem(itemData: {
  title: string;
  content: string;
  skill: Skill[];
  complete: boolean;
}): Promise<void> {
  await prisma.item.create({
    data: itemData,
  });
}
