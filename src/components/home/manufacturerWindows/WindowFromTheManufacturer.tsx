import ManufacturerWindows from "./ManufacturerWindows";

async function getData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/sections?pagename=home&kind=WindowsFromManufacturerSection`,
    {
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!res.ok) {
    console.error("Failed to fetch data");
    return { items: [], title: "" };
  }

  const data = await res.json();

  const items =
    data.data?.[0]?.items
      ?.sort((a: any, b: any) => a.serial - b.serial)
      ?.map((item: any) => ({
        id: item._id,
        url: item.url,
        title: item.title,
      })) ?? [];

  return { items, title: data.data?.[0]?.title || "" };
}

export default async function WindowFromTheManufacturer() {
  const { items, title } = await getData();
  console.log(items, "items");
  return <ManufacturerWindows items={items} title={title} />;
}
