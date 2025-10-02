"use client";

import { HeroTable } from "./HeroTable";

const commonHeaders = ["Page Name", "Section Kind"];

const heroSectionHeaders = [
  "State",
  "Title",
  "Button Name",
  "Description",
  "Banner Image",
  "Modified",
  "Created",
];

export const ShowSection = ({ data }: { data: any[] }) => {
  if (!data || data.length === 0) {
    return (
      <div className="p-4 bg-white">
        <p className="p-4 text-center text-gray-500">No sections available.</p>
      </div>
    );
  }

  const renderTable = (section: any) => {
    switch (section.kind) {
      case "HeroSection": {
        const headers = [...commonHeaders, ...heroSectionHeaders];
        return <HeroTable section={section} headers={headers} />;
      }
      default:
        return (
          <p className="p-4 text-center text-gray-500">
            Unsupported section type: {section.kind}
          </p>
        );
    }
  };

  return (
    <div className="p-4 bg-white">
      {data.map((section, index) => (
        <div key={index}>{renderTable(section)}</div>
      ))}
    </div>
  );
};
