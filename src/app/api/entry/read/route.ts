import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse> {
  try {
    const entries = await prisma.entry.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(entries, { status: 200 });
  } catch (error) {
    console.error("Error fetching entries:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
