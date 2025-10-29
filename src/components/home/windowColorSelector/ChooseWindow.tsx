import { allSections } from "@/utils/sections";
import WindowColorSelector from "./WindowColorSelector";

async function getData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/sections?pagename=home&kind=${allSections.MELKE_FINISH_SECTION}`,
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
  const section = data?.data?.[0];
  const title = section?.title ?? "";

  // 🎯 Transform each item into a clean structure for the component
  const items =
    section?.items?.map((item: any) => ({
      id: item._id,
      category: item.category,
      title: item.title,
      subtitle: item.subtitle,
      description: item.description,
      availableSystems: item.availableSystems,
      price: item.price,
      currency: item.currency,
      badge: item.badge,
      priceNote: item.priceNote,
      colors:
        item.options?.map((opt: any) => ({
          id: opt.name.toLowerCase().replace(/\s+/g, "-"),
          label: opt.name,
          color: opt.colorCode,
          image: opt.url,
        })) ?? [],
    })) ?? [];

  return { title, items };
}

export default async function ChooseWindow() {
  const { title, items } = await getData();

  if (!items.length) return null;

  return <WindowColorSelector title={title} items={items} />;
}
