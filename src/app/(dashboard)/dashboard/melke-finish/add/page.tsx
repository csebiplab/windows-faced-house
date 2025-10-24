import { AddMelkeFinishes } from "@/components/dashboard/melke-finish/AddMelkeFinish";
import PageHeader from "@/components/ui/PageHeader";

export default function page() {
  return (
    <div>
      <PageHeader title="Add Melke Finish" />
      <AddMelkeFinishes />
    </div>
  );
}
