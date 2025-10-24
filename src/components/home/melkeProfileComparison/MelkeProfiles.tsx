import MelkeProfileComparison from "./MelkeProfileComparison";

type Specs = {
  width: string;
  thickness: string;
  chambers: string;
  thermal: string;
  sound: string;
  class: string;
  price: string;
};

export type MelkeProfile = {
  id: string;
  title: string;
  description: string;
  image: string;
  specs: Specs;
  colors: string[];
  seals: string[];
  badge?: string;
  badgeColor?: string;
};

type MelkeProfileResponse = {
  title: string;
  items: MelkeProfile[];
};

async function getMelkeProfiles(): Promise<MelkeProfileResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/sections?pagename=home&kind=ComparisonOfMelkeProfiles`,
    {
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!res.ok) {
    console.error("❌ Failed to fetch Melke profiles");
    return { title: "", items: [] };
  }

  const data = await res.json();
  const title = data?.data?.[0]?.title ?? "";
  //   console.log(JSON.stringify(data, null, 4), "data");

  const items: MelkeProfile[] =
    data?.data?.[0]?.items
      ?.sort((a: any, b: any) => a.serial - b.serial)
      ?.map((item: any) => ({
        id: item._id,
        title: item.title ?? "",
        description: item.description ?? "",
        image: Array.isArray(item.image) ? item.image[0] : item.image ?? "",
        specs: {
          width: item.specs?.width || "-",
          thickness: item.specs?.thickness || "-",
          chambers: item.specs?.chambers || "-",
          thermal: item.specs?.thermal || "-",
          sound: item.specs?.sound || "-",
          class: item.specs?.class || "-",
          price: item.specs?.price || "-",
        },
        colors: item.colors ?? [],
        seals: item.seals ?? [],
        badge: item.badge,
        badgeColor: item.badgeColor,
      })) ?? [];

  return { title, items };
}

export default async function MelkeProfiles() {
  const { title, items } = await getMelkeProfiles();
  //   console.log(items, "i");

  return <MelkeProfileComparison profiles={items} title={title} />;
}
