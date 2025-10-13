import AddWindowProduct from "@/components/dashboard/window-products/AddWindowProduct";
import PageHeader from "@/components/ui/PageHeader";

export default function page() {
  return (
    <div>
      <PageHeader title="Add Window Products" />
      <AddWindowProduct />
    </div>
  );
}
