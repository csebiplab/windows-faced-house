import Banner from "@/components/home/Banner/Banner";
import DownloadCatalog from "@/components/home/downloadCatalog/DownloadCatalog";
import EstimateBanner from "@/components/home/estimateBanner/EstimateBanner";
import FreeMeasurementForm from "@/components/home/freeMeasurementForm/FreeMeasurementForm";
import GuaranteeSection from "@/components/home/guaranteeSection/GuaranteeSection";
import InnovativeBanner from "@/components/home/innovativeBanner/InnovativeBanner";
import ManufacturerSection from "@/components/home/manufacturerSection/ManufacturerSection";
import ManufacturerWindows from "@/components/home/manufacturerWindows/ManufacturerWindows";
import MelkeProfileComparison from "@/components/home/melkeProfileComparison/MelkeProfileComparison";
import OffersSection from "@/components/home/offersSection/OffersSection";
import OurWorks from "@/components/home/ourWorks/OurWorks";
import Products from "@/components/home/product/Product";
import ServicesData from "@/components/home/services/ServicesData";
import TechnologySection from "@/components/home/technologySection/TechnologySection";
import WhyWorkWithUs from "@/components/home/whyWorkWithUs/WhyWorkWithUs";
import WindowColorSelector from "@/components/home/windowColorSelector/WindowColorSelector";
import WindowInstallation from "@/components/home/windowInstallation/WindowInstallation";
import WindowSelection from "@/components/home/windowSelection/WindowSelection";
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
      <section>
        <ManufacturerWindows />
      </section>
      <section>
        <OurWorks />
      </section>
      <section>
        <FreeMeasurementForm />
      </section>
      <section>
        <ManufacturerSection />
      </section>
      <section>
        <WindowSelection />
      </section>
      <section>
        <InnovativeBanner />
      </section>
      <section>
        <MelkeProfileComparison />
      </section>
      <section>
        <DownloadCatalog />
      </section>
      <section>
        <OffersSection />
      </section>
      <section>
        <WindowColorSelector />
      </section>
    </main>
  );
}
