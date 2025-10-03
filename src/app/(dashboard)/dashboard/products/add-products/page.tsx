import { AddProductComp } from "@/components/dashboard/products/AddProducts";
import PageHeader from "@/components/ui/PageHeader";

export default function page() {
  return (
    <div>
      <PageHeader title="Add Products" />
      <AddProductComp />
    </div>
  );
}
