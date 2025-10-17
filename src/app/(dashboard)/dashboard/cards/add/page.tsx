import { AddCardForm } from "@/components/dashboard/cards/AddCardForm";
import PageHeader from "@/components/ui/PageHeader";

export default function page() {
  return (
    <div>
      <PageHeader title="Add Cards" />
      <AddCardForm />
    </div>
  );
}
