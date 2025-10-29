// lib/api.ts
export async function fetchSection(kind: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/sections?pagename=home&kind=${kind}`,
    {
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
    }
  );
  const data = await res.json();
  return data?.data?.[0] || {};
}
