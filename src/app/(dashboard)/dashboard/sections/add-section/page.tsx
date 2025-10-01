import CreateSectionComponent from "@/components/dashboard/sections/CreateSectionComponent";
import PageHeader from "@/components/ui/PageHeader";

export default function AddSectionPage() {
  return (
    <div>
      <PageHeader title="Add Section" />
      <CreateSectionComponent />
    </div>
  );
}
