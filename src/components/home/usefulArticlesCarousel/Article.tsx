import { fetchSection } from "@/lib/api";
import UsefulArticlesCarousel from "./UsefulArticlesCarousel";

export default async function Article() {
  const { title, items } = await fetchSection("ArticleSection");

  if (!items?.length) return null;
  const articles = items.map((item: any) => ({
    id: item._id,
    title: item.title,
    image: item.url,
    link: item.slug ? `/articles/${item.slug}` : "#",
    slugLabel: item.slugLabel || "Подробнее",
  }));

  return <UsefulArticlesCarousel title={title} articles={articles} />;
}
