import Banner from "@/components/home/Banner/Banner";
import EstimateBanner from "@/components/home/estimateBanner/EstimateBanner";
import Products from "@/components/home/product/Product";
import Services from "@/components/home/services/Services";
import WindowInstallationProcess from "@/components/home/windowInstallation/WindowInstallationProcess";
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
        <Services />
      </section>
      <section>
        <WindowInstallationProcess />
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
