import { NextRequest, NextResponse } from "next/server";

import { getRequestIdFromQuery } from "@/src/utilities/getRequestId";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  try {
    const id = getRequestIdFromQuery(req);
    if (id === null) {
      return new NextResponse("Bad Request: Missing 'id' parameter", {
        status: 400,
      });
    }
    await deleteItemById(id);
    return new NextResponse("Item deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting item:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

async function deleteItemById(id: string): Promise<void> {
  await prisma.item.delete({ where: { id } });
}
