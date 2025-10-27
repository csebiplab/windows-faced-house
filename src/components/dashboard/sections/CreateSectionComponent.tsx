"use client";

import { useState } from "react";
import CreateHeroSectionForm from "./CreateHeroSectionForm";
import { AddSectionItemForm } from "./AddSectionItemForm";
import CreateWindowInstallmentPlanSection from "../WindowInstallmentPlan/CreateWindowInstallmentPlanSection";

const pageOptions = [
  { label: "Home", value: "home" },
  { label: "About", value: "about" },
] as const;

const sectionOptions = [
  { label: "Hero", value: "HeroSection" },
  { label: "Product", value: "ProductSection" },
  { label: "Service", value: "ServiceSection" },
  {
    label: "Installation of plastic windows",
    value: "WindowInstallationProcessSection",
  },
  { label: "Why work with us", value: "WorkWithUsSection" },
  {
    label: "Windows from the manufacturer",
    value: "WindowsFromManufacturerSection",
  },
  {
    label: "Choose windows at a price that suits you",
    value: "ChooseWindowsAtAPriceThatSuitsYou",
  },
  { label: "Comparison of Melke profiles", value: "ComparisonOfMelkeProfiles" },
  { label: "Our promotions", value: "OurPromotionsSection" },
  {
    label: "Choose the color of your Melke window",
    value: "MelkeFinishSection",
  },
  {
    label: "Plastic windows in installments",
    value: "InstallmentPlanSection",
  },
  {
    label: "Feedback from our clients",
    value: "ReviewSection",
  },
  {
    label: "Useful articles",
    value: "ArticleSection",
  },
] as const;

type SectionKey = (typeof sectionOptions)[number]["value"];

const sectionConfig: Record<
  SectionKey,
  | { component: "hero" }
  | { component: "item"; query: string; itemLabel: string }
  | { component: "windowInstallment" }
> = {
  HeroSection: { component: "hero" },
  ProductSection: {
    component: "item",
    query: "products",
    itemLabel: "Product",
  },
  ServiceSection: {
    component: "item",
    query: "services",
    itemLabel: "Service",
  },
  WindowInstallationProcessSection: {
    component: "item",
    query: "installationprocesses",
    itemLabel: "Window Installation Process",
  },
  WorkWithUsSection: {
    component: "item",
    query: "WorkWithUsCard",
    itemLabel: "Work With Us",
  },
  WindowsFromManufacturerSection: {
    component: "item",
    query: "WindowsFromManufacturerCard",
    itemLabel: "Windows Manufacturer Video",
  },
  ChooseWindowsAtAPriceThatSuitsYou: {
    component: "item",
    query: "products",
    itemLabel: "Windows",
  },
  ComparisonOfMelkeProfiles: {
    component: "item",
    query: "melkeProfiles",
    itemLabel: "Melke Profile",
  },
  OurPromotionsSection: {
    component: "item",
    query: "OurPromotionsCard",
    itemLabel: "Our Promotion",
  },
  MelkeFinishSection: {
    component: "item",
    query: "melkefinishes",
    itemLabel: "Melke Finish",
  },
  InstallmentPlanSection: {
    component: "windowInstallment",
  },
  ReviewSection: {
    component: "item",
    query: "reviews",
    itemLabel: "Reviews",
  },
  ArticleSection: {
    component: "item",
    query: "ArticleCard",
    itemLabel: "Article",
  },
};

const CreateSectionComponent = () => {
  const [selectedPage, setSelectedPage] = useState<string>(
    pageOptions[0].value
  );
  const [selectedSection, setSelectedSection] = useState<SectionKey>(
    sectionOptions[0].value
  );

  const config = sectionConfig[selectedSection];

  const renderForm = () => {
    if (!config) return null;
    switch (config.component) {
      case "hero":
        return (
          <CreateHeroSectionForm kind={selectedSection} page={selectedPage} />
        );

      case "windowInstallment":
        return (
          <CreateWindowInstallmentPlanSection
            kind={selectedSection}
            page={selectedPage}
          />
        );

      default:
        return (
          <AddSectionItemForm
            kind={selectedSection}
            page={selectedPage}
            query={config.query}
            itemLabel={config.itemLabel}
          />
        );
    }
  };

  return (
    <section className="space-y-4">
      {/* Select inputs */}
      <div className="flex flex-wrap gap-4">
        <SelectField
          label="Select Page"
          id="page-type"
          value={selectedPage}
          onChange={(e) => setSelectedPage(e.target.value)}
          options={pageOptions}
        />

        <SelectField
          label="Select Section Type"
          id="section-type"
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value as SectionKey)}
          options={sectionOptions}
        />
      </div>

      <div className="mt-4">{renderForm()}</div>
    </section>
  );
};

// Small reusable dropdown component to declutter main JSX
const SelectField = ({
  label,
  id,
  value,
  onChange,
  options,
}: {
  label: string;
  id: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  options: readonly { label: string; value: string }[];
}) => (
  <div className="flex-1 min-w-[200px]">
    <label htmlFor={id} className="block font-medium mb-2">
      {label}
    </label>
    <select
      id={id}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded-md p-2"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default CreateSectionComponent;
