import WindowSelection from "./WindowSelection";

async function getData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/sections?pagename=home&kind=ChooseWindowsAtAPriceThatSuitsYou`,
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
        title: item.title,
        price: item.priceFrom
          ? `от ${item.priceFrom} ${item.priceUnit || "₽/м²"}`
          : "",
        chambers: item.airChambers,
        width: item.frameSashWidth,
        insulation: item.thermalProtection,
        label: item.tag, // “Самый тёплый” style
        image: Array.isArray(item.imageUrl) ? item.imageUrl[0] : item.imageUrl,
        category: item.category, // "budget" | "comfort" | "premium"
        buttonText: item.buttonText || "Заказать расчёт",
      })) ?? [];

  return { items, title: data.data?.[0]?.title || "" };
}

export default async function WindowsProduct() {
  const { items, title } = await getData();
  return <WindowSelection items={items} title={title} />;
}
