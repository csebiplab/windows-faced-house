import Accessories from "@/components/home/accessories/Accessories";
import Banner from "@/components/home/Banner/Banner";
import Certificates from "@/components/home/certificates/Certificates";
import DownloadCatalog from "@/components/home/downloadCatalog/DownloadCatalog";
import EstimateBanner from "@/components/home/estimateBanner/EstimateBanner";
import FAQSection from "@/components/home/fAQSection/FAQSection";
import FreeMeasurement from "@/components/home/freeMeasurement/FreeMeasurement";
import FreeMeasurementForm from "@/components/home/freeMeasurementForm/FreeMeasurementForm";
import GuaranteeSection from "@/components/home/guaranteeSection/GuaranteeSection";
import ImportantParameters from "@/components/home/importantParameters/ImportantParameters";
import InnovativeBanner from "@/components/home/innovativeBanner/InnovativeBanner";
import ManufacturerSection from "@/components/home/manufacturerSection/ManufacturerSection";
import OffersForBuyers from "@/components/home/offersForBuyers/OffersForBuyers";
import OurWorks from "@/components/home/ourWorks/OurWorks";
import Products from "@/components/home/product/Product";
import Services from "@/components/home/services/Services";
import ProjectExamples from "@/components/home/projectExamples/ProjectExamples";
import SocialFollow from "@/components/home/socialFollow/SocialFollow";
import TechnologySection from "@/components/home/technologySection/TechnologySection";
import WindowInstallationProcess from "@/components/home/windowInstallation/WindowInstallationProcess";
import WindowsManufacturer from "@/components/home/windowsManufacturer/WindowsManufacturer";
import WorkWithUs from "@/components/home/whyWorkWithUs/WorkWithUs";
import WindowFromTheManufacturer from "@/components/home/manufacturerWindows/WindowFromTheManufacturer";
import WindowsProduct from "@/components/home/windowSelection/WindowsProduct";
import MelkeProfiles from "@/components/home/melkeProfileComparison/MelkeProfiles";
import OurPromotions from "@/components/home/offersSection/OurPromotions";
import ChooseWindow from "@/components/home/windowColorSelector/ChooseWindow";
import InstallmentOfferPage from "@/components/home/installmentOffer/InstallmentOfferPage";
import ReviewSection from "@/components/home/reviews/ReviewSection";
import Article from "@/components/home/usefulArticlesCarousel/Article";
import News from "@/components/home/newsSection/News";

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
        <WorkWithUs />
      </section>
      <section>
        <WindowFromTheManufacturer />
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
        <WindowsProduct />
      </section>
      <section>
        <InnovativeBanner />
      </section>
      <section>
        <MelkeProfiles />
      </section>
      <section>
        <DownloadCatalog />
      </section>
      <section>
        <OurPromotions />
      </section>
      <section>
        <ChooseWindow />
      </section>
      <section>
        <InstallmentOfferPage />
      </section>
      <section>
        <OffersForBuyers />
      </section>
      <section>
        <ImportantParameters />
      </section>
      <section>
        <FreeMeasurement />
      </section>
      <section>
        <Certificates />
      </section>
      <section>
        <ReviewSection />
      </section>
      <section>
        <FAQSection />
      </section>
      <section>
        <Article />
      </section>
      <section>
        <News />
      </section>
      <section>
        <Accessories />
      </section>
      <section>
        <ProjectExamples />
      </section>
      <section>
        <SocialFollow />
      </section>
    </main>
  );
}
