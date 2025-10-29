import { fetchSection } from "@/lib/api";
import Accessories from "./Accessories";

export default async function AccessoriesPage() {
  const { title, items } = await fetchSection("AccessoriesSection");

  if (!items?.length) return null;

  // Map API items to the structure expected by the client component
  const accessories = items.map((item: any) => ({
    id: item._id,
    title: item.title,
    description: item.description || "",
    image: item.url,
  }));

  return <Accessories title={title || "Аксессуары"} articles={accessories} />;
}
