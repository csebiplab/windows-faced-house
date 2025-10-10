import { AddServices } from "@/components/dashboard/services/AddServices";
import PageHeader from "@/components/ui/PageHeader";

export default function page() {
  return (
    <div>
      <PageHeader title="Add Services" />
      <AddServices />
    </div>
  );
}
