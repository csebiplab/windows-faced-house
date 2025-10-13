import Banner from "@/components/home/Banner/Banner";
import EstimateBanner from "@/components/home/estimateBanner/EstimateBanner";
import GuaranteeSection from "@/components/home/guaranteeSection/GuaranteeSection";
import Products from "@/components/home/product/Product";
import ServicesData from "@/components/home/services/ServicesData";
import TechnologySection from "@/components/home/technologySection/TechnologySection";
import WhyWorkWithUs from "@/components/home/whyWorkWithUs/WhyWorkWithUs";
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
      <section>
        <GuaranteeSection />
      </section>
      <section>
        <TechnologySection />
      </section>
      <section>
        <WhyWorkWithUs />
      </section>
    </main>
  );
}
