import { AddWindowInstallationProcess } from "@/components/dashboard/window-installation-process/AddWindowInstalltionProcess";
import PageHeader from "@/components/ui/PageHeader";

export default function page() {
  return (
    <div>
      <PageHeader title="Add Window Installtion Process" />
      <AddWindowInstallationProcess />
    </div>
  );
}
