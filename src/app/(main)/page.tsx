import Banner from "@/components/home/Banner";
import ProductGrid from "@/components/home/ProductGrid";

async function getData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/sections?pagename=home&kind=HeroSection`,
    {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    console.error("Failed to fetch sections");
  }

  const data: any = await res.json();
  return data?.data;
}

export default async function page() {
  const bannerDt = await getData();

  return (
    <main>
      <section>
        <Banner bannerdt={bannerDt} />
      </section>
      <section>
        <ProductGrid />
      </section>
    </main>
  );
}
