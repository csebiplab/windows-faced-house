import ProductGrid from "./ProductGrid";

async function getData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/sections?pagename=home&kind=ProductSection`,
    {
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!res.ok) {
    console.error("Failed to fetch banner data");
    return [];
  }

  const data: any = await res.json();

  const products = data.data?.[0]?.items || [];
  const items = products.map((item: any, index: number) => ({
    id: index + 1,
    title: item.title.toUpperCase(),
    description: item.items.split(",").map((str: string) => str.trim()),
    price: `от ${item.priceFrom.toLocaleString("ru-RU")} ${item.priceUnit}`,
    image: item.imageUrl,
  }));
  return items;
}

export default async function Products() {
  const products = await getData();
  return <ProductGrid products={products} />;
}
