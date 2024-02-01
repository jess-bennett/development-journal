import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  try {
    const entry = await prisma.entry.findUnique({ where: { id: String(id) } });

    if (!entry) {
      res.status(404).json({ error: "Entry not found" });
      return;
    }

    res.status(200).json(entry);
  } catch (error) {
    console.error("Error fetching entry:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
