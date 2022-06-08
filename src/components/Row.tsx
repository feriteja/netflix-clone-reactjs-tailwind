import React, { useEffect, useId, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { movieType } from "../constant/type/type";
import { getMovieList } from "../services/movie";
import { MovieCard } from "./MovieCard";

interface props {
  title: string;
  fetchURL: string;
}

const Row: React.FC<props> = ({ fetchURL, title }) => {
  const [movies, setMovies] = useState<movieType[]>([]);
  const sliderId = useId();

  useEffect(() => {
    getMovieList(fetchURL).then((res) => setMovies(res.results));
  }, [fetchURL]);

  const slideMove = (direction: "right" | "left") => {
    const slider = document.getElementById(sliderId);
    if (slider == null) return;
    if (direction === "left") slider.scrollLeft -= 500;
    if (direction === "right") slider.scrollLeft += 500;
  };

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
      <div className="relative flex items-center group ">
        <MdChevronLeft
          onClick={() => slideMove("left")}
          className="bg-white rounded-full absolute opacity-50 hover:opacity-100  cursor-pointer z-10 hidden group-hover:block "
          size={40}
        />
        <div
          id={sliderId}
          className="w-full h-full left-0 overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies.map((item, index) => (
            <MovieCard key={item.id + title} item={item} />
          ))}
        </div>
        <MdChevronRight
          onClick={() => slideMove("right")}
          className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100  cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
      </div>
    </>
  );
};

export default Row;
