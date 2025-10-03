import Banner from "@/components/home/Banner/Banner";
import Products from "@/components/home/product/Product";

export default function Page() {
  return (
    <main>
      <section>
        <Banner />
      </section>
      <section>
        <Products />
      </section>
    </main>
  );
}
