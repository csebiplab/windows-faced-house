import Banner from "@/components/home/Banner/Banner";
import DownloadCatalog from "@/components/home/downloadCatalog/DownloadCatalog";
import EstimateBanner from "@/components/home/estimateBanner/EstimateBanner";
import FreeMeasurementForm from "@/components/home/freeMeasurementForm/FreeMeasurementForm";
import GuaranteeSection from "@/components/home/guaranteeSection/GuaranteeSection";
import InnovativeBanner from "@/components/home/innovativeBanner/InnovativeBanner";
import ManufacturerSection from "@/components/home/manufacturerSection/ManufacturerSection";
import ManufacturerWindows from "@/components/home/manufacturerWindows/ManufacturerWindows";
import MelkeProfileComparison from "@/components/home/melkeProfileComparison/MelkeProfileComparison";
import OurWorks from "@/components/home/ourWorks/OurWorks";
import Products from "@/components/home/product/Product";
import Services from "@/components/home/services/Services";
import TechnologySection from "@/components/home/technologySection/TechnologySection";
import WhyWorkWithUs from "@/components/home/whyWorkWithUs/WhyWorkWithUs";
import WindowInstallationProcess from "@/components/home/windowInstallation/WindowInstallationProcess";
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
    </main>
  );
}
