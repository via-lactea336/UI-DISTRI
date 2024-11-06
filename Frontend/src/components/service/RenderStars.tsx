import { Star } from "lucide-react";

type RenderStarsProps = {
  rating: number;
};

const RenderStars = ({ rating }: RenderStarsProps) => {
  const stars = [...Array(5)].map((_, i) => (
    <Star
      key={i}
      className={`w-4 h-4 ${
        i < Math.round(rating)
          ? "text-yellow-400 fill-yellow-400"
          : "text-gray-500"
      }`}
    />
  ));
  return stars;
};

export default RenderStars;
