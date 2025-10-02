import Banner from "@/components/home/Banner/Banner";
import ProductGrid from "@/components/home/ProductGrid";

export default function Page() {
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
