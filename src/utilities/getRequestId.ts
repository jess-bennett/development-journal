import { NextRequest } from "next/server";

export function getRequestIdFromQuery(req: NextRequest): string {
  const { searchParams } = req.nextUrl;
  const id = searchParams.get("id");
  if (!id) {
    throw new Error("Missing 'id' parameter in the request");
  }
  return id;
}
