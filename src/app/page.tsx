import Banner from "@/components/home/Banner";
import ProductGrid from "@/components/home/ProductGrid";
export default async function page() {
  return (
    <main>
      <section>
        <Banner />
      </section>
      <section>
        <ProductGrid />
      </section>
    </main>
  );
}
