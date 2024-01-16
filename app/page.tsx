import prisma from "@/lib/prisma";
export default async function Home() {
  const entries = await prisma.entry.findMany();
  return (
    <>
      {entries.map((entry) => (
        <div key={entry.id}>
          <h1>{entry.title}</h1>
          <p>{entry.content}</p>
        </div>
      ))}
    </>
  );
}
