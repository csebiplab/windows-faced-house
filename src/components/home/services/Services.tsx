import ServicesData from "./ServicesData";

async function getData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/sections?pagename=home&kind=ServiceSection`,
    {
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!res.ok) {
    console.error("Failed to fetch banner data");
    return { items: [], title: "" };
  }

  const data = await res.json();

  const items =
    data.data?.[0]?.items
      ?.sort((a: any, b: any) => a.serial - b.serial)
      ?.map((item: any) => ({
        id: item.serial,
        title: item.title,
        price: item.description,
        image: item.imageUrl,
      })) ?? [];

  return { items, title: data.data?.[0]?.title || "" };
}

export default async function Services() {
  const { items, title } = await getData();
  return <ServicesData items={items} title={title} />;
}
