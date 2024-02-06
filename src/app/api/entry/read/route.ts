import { NextRequest, NextResponse } from "next/server";

import { getRequestIdFromQuery } from "@/src/utilities/getRequestId";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const id = getRequestIdFromQuery(req);

    if (id !== null) {
      const entry = await prisma.entry.findUnique({
        where: { id: String(id) },
      });
      return NextResponse.json(entry, { status: 200 });
    } else {
      const entries = await prisma.entry.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
      return NextResponse.json(entries, { status: 200 });
    }
  } catch (error) {
    console.error("Error fetching entries:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
