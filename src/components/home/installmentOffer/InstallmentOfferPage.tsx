import getData from "./getData";
import InstallmentOffer from "./InstallmentOffer";

export default async function InstallmentOfferPage() {
  const data = await getData();

  if (!data.steps?.length) return null;

  return <InstallmentOffer {...data} />;
}
