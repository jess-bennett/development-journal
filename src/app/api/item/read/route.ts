import { NextRequest, NextResponse } from "next/server";

import { getRequestIdFromQuery } from "@/src/utilities/getRequestId";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const id = getRequestIdFromQuery(req);

    if (id !== null) {
      const item = await prisma.item.findUnique({
        where: { id: String(id) },
      });
      return NextResponse.json(item, { status: 200 });
    } else {
      const items = await prisma.item.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
      return NextResponse.json(items, { status: 200 });
    }
  } catch (error) {
    console.error("Error fetching items:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
