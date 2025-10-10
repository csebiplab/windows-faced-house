"use client";

import { useState } from "react";
import CreateHeroSectionForm from "./CreateHeroSectionForm";
import { ProductSectionForm } from "./ProductSectionForm";

const pageOptions = [
  { label: "Home", value: "home" },
  { label: "About", value: "about" },
];

const sectionOptions = [
  { label: "Hero", value: "HeroSection" },
  { label: "Product", value: "ProductSection" },
  { label: "Service", value: "ServiceSection" },
];

const CreateSectionComponent = () => {
  const [selectedPage, setSelectedPage] = useState("home");
  const [selectedSection, setSelectedSection] = useState("HeroSection");

  const renderForm = () => {
    switch (selectedSection) {
      case "HeroSection":
        return <CreateHeroSectionForm kind="HeroSection" page={selectedPage} />;
      default:
        return <ProductSectionForm kind="ProductSection" page={selectedPage} />;
    }
  };

  return (
    <section className="space-y-4">
      {/* Two dropdowns side by side */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label htmlFor="page-type" className="block font-medium mb-2">
            Select Page
          </label>
          <select
            id="page-type"
            value={selectedPage}
            onChange={(e) => setSelectedPage(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            {pageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label htmlFor="section-type" className="block font-medium mb-2">
            Select Section Type
          </label>
          <select
            id="section-type"
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            {sectionOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">{renderForm()}</div>
    </section>
  );
};

export default CreateSectionComponent;
