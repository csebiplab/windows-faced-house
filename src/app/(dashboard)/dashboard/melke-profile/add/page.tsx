import PageHeader from "@/components/ui/PageHeader";
import { AddMelkeProfiles } from "@/components/dashboard/melke-profile/AddMelkeProfiles";

export default function page() {
  return (
    <div>
      <PageHeader title="Add Melke Profiles" />
      <AddMelkeProfiles />
    </div>
  );
}
