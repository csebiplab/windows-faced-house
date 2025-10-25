import { allSections } from "@/utils/sections";

async function getData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/sections?pagename=home&kind=${allSections.INSTALLMENT_PLAN_SECTION}`,
    {
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!res.ok) {
    console.error("❌ Failed to fetch");
    return {
      mainTitle: "",
      highlightTitle: "",
      duration: "",
      firstPayment: "",
      note: "",
      imageUrl: "",
      steps: [],
    };
  }

  const data = await res.json();
  const section = data?.data?.[0];

  if (!section) return { steps: [] };

  // Transform API data into a clean structure
  const steps =
    section.steps?.map((s: any) => ({
      id: s.stepNumber,
      title: s.title,
      desc: s.description,
    })) ?? [];

  return {
    mainTitle: section.mainTitle ?? "",
    highlightTitle: section.highlightTitle ?? "",
    duration: section.duration ?? "",
    firstPayment: section.firstPayment ?? "",
    note: section.note ?? "",
    imageUrl: section.imageUrl ?? "",
    steps,
  };
}

export default getData;
