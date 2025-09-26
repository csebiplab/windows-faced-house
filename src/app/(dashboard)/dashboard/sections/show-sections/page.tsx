import { ShowSection } from "@/components/dashboard/sections/ShowSections";
import PageHeader from "@/components/ui/PageHeader";

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sections`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    console.error("Failed to fetch sections");
  }

  const data: any = await res.json();
  return data?.data;
}

export default async function ShowSectionsPage() {
  const data: any[] = await getData();

  return (
    <div>
      <PageHeader
        title="Show Sections"
        href="/dashboard/sections/add-section"
      />
      <ShowSection data={data} />
    </div>
  );
}
