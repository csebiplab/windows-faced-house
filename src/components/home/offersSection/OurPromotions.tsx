import OffersSection from "./OffersSection";

async function getMelkeProfiles() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/sections?pagename=home&kind=OurPromotionsSection`,
    {
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!res.ok) {
    console.error("❌ Failed to fetch");
    return { title: "", items: [] };
  }

  const data = await res.json();
  const title = data?.data?.[0]?.title ?? "";

  const items =
    data?.data?.[0]?.items
      ?.sort((a: any, b: any) => a.serial - b.serial)
      ?.map((item: any) => ({
        id: item._id,
        title: item.title ?? "",
        description: item.description ?? "",
        image: Array.isArray(item.url) ? item.url[0] : item.url ?? "",
      })) ?? [];

  return { title, items };
}

export default async function OurPromotions() {
  const { title, items } = await getMelkeProfiles();

  return <OffersSection offers={items} title={title} />;
}
