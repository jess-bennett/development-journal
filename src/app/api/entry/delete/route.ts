import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  try {
    const id = getRequestIdFromQuery(req);
    await deleteEntryById(id);
    return new NextResponse("Entry deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting entry:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

function getRequestIdFromQuery(req: NextRequest): string {
  const { searchParams } = req.nextUrl;
  const id = searchParams.get("id");
  if (!id) {
    throw new Error("Missing 'id' parameter in the request");
  }
  return id;
}

async function deleteEntryById(id: string): Promise<void> {
  await prisma.entry.delete({ where: { id } });
}
