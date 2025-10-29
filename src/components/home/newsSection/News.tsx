import { fetchSection } from "@/lib/api";
import NewsSection from "./NewsSection";

export default async function News() {
  const { title, items } = await fetchSection("NewsSection");

  if (!items?.length) return null;

  const news = items.map((item: any) => ({
    id: item._id,
    title: item.title,
    description: item.description,
    date: new Date(item.date).toLocaleDateString("ru-RU"), // Format: dd.mm.yyyy
    image: item.url || "/article1.png", // fallback if missing
  }));

  return <NewsSection title={title || "Наши новости"} articles={news} />;
}
