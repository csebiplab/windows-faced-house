import Banner from "@/components/home/Banner/Banner";
import EstimateBanner from "@/components/home/estimateBanner/EstimateBanner";
import Products from "@/components/home/product/Product";
import ServicesData from "@/components/home/services/ServicesData";
import WindowInstallation from "@/components/home/windowInstallation/WindowInstallation";
import WindowsManufacturer from "@/components/home/windowsManufacturer/WindowsManufacturer";

export default function Page() {
  return (
    <main>
      <section>
        <Banner />
      </section>
      <section>
        <Products />
      </section>
      <section>
        <ServicesData />
      </section>
      <section>
        <WindowInstallation />
      </section>
      <section>
        <EstimateBanner />
      </section>
      <section>
        <WindowsManufacturer />
      </section>
    </main>
  );
}
