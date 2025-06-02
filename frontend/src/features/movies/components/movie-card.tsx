import { useState } from "react";
import { Heart, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Movie } from "@/types/movie";
import { useAppDispatch } from "@/app/hooks";
import { toggleFavourite } from "../moviesSlice";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const dispatch =  useAppDispatch()
  const [isHovered, setIsHovered] = useState(false);

  const rating = 4.8;

  const handleLikeClick = () => {
    dispatch(toggleFavourite({imdbID:movie.imdbID}))
  }

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300 h-[370px] pt-0",
        isHovered ? "transform scale-[1.03] shadow-xl" : "shadow-md"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.svg?height=450&width=300"}
          alt={movie.Title}
          className="w-full  object-cover transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute top-2 right-2 z-10">
          <Button
            size="icon"
            className={cn(
              "rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50",
              movie.fav ? "text-red-500" : "text-white"
            )}
            onClick={handleLikeClick}
          >
            <Heart className={cn("h-5 w-5", movie.fav && "fill-current")} />
            <span className="sr-only">Add to favorites</span>
          </Button>
        </div>

        <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-xs text-white backdrop-blur-sm">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span>{rating}</span>
        </div>
      </div>

      <CardContent className="p-4 pt-0">
        <h3 className="font-semibold line-clamp-1 text-lg">{movie.Title}</h3>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{movie.Year}</span>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            {movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
