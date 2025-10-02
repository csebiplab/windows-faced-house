import BannerClient from "./BannerClient";

async function getBannerData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/sections?pagename=home&kind=HeroSection`,
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
  const sectionContent = data?.data?.[0]?.sectionContent ?? [];

  return sectionContent.map((item: any, index: number) => ({
    id: item._id,
    img: item.imgUrl,
    title: item.title,
    desc: (
      <p className="text-xs leading-snug whitespace-pre-line">
        {item.description}
      </p>
    ),
    activeBtn: item.buttonName,
    inActiveBtn: (
      <p className="line-clamp-2 text-xs">
        <strong>{item.title}</strong> {item.description.split("\n")[0]}
      </p>
    ),
  }));
}

export default async function Banner() {
  const slides = await getBannerData();
  return <BannerClient slides={slides} />;
}
