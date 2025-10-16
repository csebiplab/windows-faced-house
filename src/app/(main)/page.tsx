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
import InstallmentOffer from "@/components/home/installmentOffer/InstallmentOffer";
import ManufacturerSection from "@/components/home/manufacturerSection/ManufacturerSection";
import ManufacturerWindows from "@/components/home/manufacturerWindows/ManufacturerWindows";
import MelkeProfileComparison from "@/components/home/melkeProfileComparison/MelkeProfileComparison";
import NewsSection from "@/components/home/newsSection/NewsSection";
import OffersForBuyers from "@/components/home/offersForBuyers/OffersForBuyers";
import OffersSection from "@/components/home/offersSection/OffersSection";
import OurWorks from "@/components/home/ourWorks/OurWorks";
import Products from "@/components/home/product/Product";
import ProjectExamples from "@/components/home/projectExamples/ProjectExamples";
import Reviews from "@/components/home/reviews/Reviews";
import ServicesData from "@/components/home/services/ServicesData";
import SocialFollow from "@/components/home/socialFollow/SocialFollow";
import TechnologySection from "@/components/home/technologySection/TechnologySection";
import UsefulArticlesCarousel from "@/components/home/usefulArticlesCarousel/UsefulArticlesCarousel";
import VideoReviewCarousel from "@/components/home/videoReviewCarousel/VideoReviewCarousel";
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
      <section>
        <InstallmentOffer />
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
        <Reviews />
      </section>
      <section>
        <VideoReviewCarousel />
      </section>
      <section>
        <FAQSection />
      </section>
      <section>
        <UsefulArticlesCarousel />
      </section>
      <section>
        <NewsSection />
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
