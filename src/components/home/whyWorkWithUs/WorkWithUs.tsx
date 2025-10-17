import WhyWorkWithUs from "./WhyWorkWithUs";

async function getData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/sections?pagename=home&kind=WorkWithUsSection`,
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
        id: item._id,
        text: item.title,
        image: item.url,
        icon: item.icon,
      })) ?? [];

  return { items, title: data.data?.[0]?.title || "" };
}

export default async function WorkWithUs() {
  const { items, title } = await getData();
  return <WhyWorkWithUs items={items} title={title} />;
}
