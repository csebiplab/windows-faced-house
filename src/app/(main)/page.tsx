import Banner from "@/components/home/Banner/Banner";
import EstimateBanner from "@/components/home/estimateBanner/EstimateBanner";
import GuaranteeSection from "@/components/home/guaranteeSection/GuaranteeSection";
import ManufacturerWindows from "@/components/home/manufacturerWindows/ManufacturerWindows";
import OurWorks from "@/components/home/ourWorks/OurWorks";
import Products from "@/components/home/product/Product";
import Services from "@/components/home/services/Services";
import TechnologySection from "@/components/home/technologySection/TechnologySection";
import WhyWorkWithUs from "@/components/home/whyWorkWithUs/WhyWorkWithUs";
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
      <section>
        <GuaranteeSection />
      </section>
      <section>
        <TechnologySection />
      </section>
      <section>
        <WhyWorkWithUs />
      </section>
      <section>
        <ManufacturerWindows />
      </section>
      <section>
        <OurWorks />
      </section>
    </main>
  );
}
