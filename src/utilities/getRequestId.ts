import { NextRequest } from "next/server";

export function getRequestIdFromQuery(req: NextRequest): string | null {
  const { searchParams } = req.nextUrl;
  const id = searchParams.get("id");
  if (!id) {
    return null;
  }
  return id;
}
