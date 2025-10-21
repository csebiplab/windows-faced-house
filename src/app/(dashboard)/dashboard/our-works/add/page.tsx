import { AddOurWorks } from "@/components/dashboard/our-works/AddOurWorks/AddOurWorks";
import PageHeader from "@/components/ui/PageHeader";

export default function page() {
  return (
    <div>
      <PageHeader title="Add Our Work" />
      <AddOurWorks />
    </div>
  );
}
