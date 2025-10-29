import { fetchSection } from "@/lib/api";
import Reviews from "./Reviews";
import VideoReviewCarousel from "./VideoReviewCarousel";

export default async function ReviewSection() {
  const { title, items } = await fetchSection("ReviewSection");
  const textReviews = items
    ?.filter((item: any) => item.type === "text")
    .map((item: any, index: number) => ({
      id: item._id,
      name: item.name,
      date: new Date(item.createdAt).toLocaleDateString("ru-RU"),
      text: item.content,
      rating: item.rating,
    }));
  const videoReviews = items
    ?.filter((item: any) => item.type === "video")
    .map((item: any) => ({
      id: item._id,
      name: item.name,
      videoUrl: item.videoUrl,
    }));

  //   console.log(JSON.stringify(textReviews, null, 4));
  //   console.log(JSON.stringify(videoReviews, null, 4));

  return (
    <div>
      <Reviews title={title} reviews={textReviews} />
      <VideoReviewCarousel reviews={videoReviews} />
    </div>
  );
}
