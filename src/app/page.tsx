export const revalidate = 10;
import EntryCard from "@/src/components/EntryCard";
import prisma from "@/src/lib/prisma";

export default async function Home() {
  const entries = await prisma.entry.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <>
      {entries.map((entry) => (
        <EntryCard key={entry.id} {...entry} />
      ))}
    </>
  );
}
