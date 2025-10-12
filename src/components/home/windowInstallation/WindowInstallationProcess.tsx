import WindowInstallation from "./WindowInstallation";

async function getData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/sections?pagename=home&kind=WindowInstallationProcessSection`,
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
    data.data?.[0]?.items?.map((item: any) => ({
      id: item._id,
      text: item.title,
      image: item.imageUrl,
    })) ?? [];

  return {
    items,
    title: data.data?.[0]?.title,
    descriptionTop: data.data?.[0]?.descriptionTop,
    descriptionBottom: data.data?.[0]?.descriptionBottom,
    footerTitle: data.data?.[0]?.footerTitle,
    footerDescription: data.data?.[0]?.footerDescription,
  };
}

export default async function WindowInstallationProcess() {
  const {
    items,
    title,
    descriptionTop,
    descriptionBottom,
    footerTitle,
    footerDescription,
  } = await getData();
  return (
    <WindowInstallation
      steps={items}
      title={title}
      descriptionTop={descriptionTop}
      descriptionBottom={descriptionBottom}
      footerTitle={footerTitle}
      footerDescription={footerDescription}
    />
  );
}
