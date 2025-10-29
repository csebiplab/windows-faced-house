import { fetchSection } from "@/lib/api";
import ProjectExamples from "./ProjectExamples";

export default async function WorkExample() {
  const { title, items } = await fetchSection("ExamplesOfOurworkSection");

  if (!items?.length) return null;

  // Convert the fetched URLs to objects that the slider can use
  const projectImages = items.map((url: string, idx: number) => ({
    id: idx + 1,
    src: url.replace(/\\/g, "/"), // Fix Windows backslashes in paths
  }));

  return <ProjectExamples title={title} projectImages={projectImages} />;
}
