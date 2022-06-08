import React, { useEffect, useId, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { UserAuth } from "../context/AuthContext";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { User } from "firebase/auth";
import { db } from "../firebase";

const SavedShows = () => {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();
  const sliderId = useId();

  const slideMove = (direction: "right" | "left") => {
    const slider = document.getElementById(sliderId);
    if (slider == null) return;
    if (direction === "left") slider.scrollLeft -= 500;
    if (direction === "right") slider.scrollLeft += 500;
  };

  const movieRef = doc(db, "users", `${user?.email}`);
  const deleteShow = async (passId: number) => {
    try {
      const result = movies.filter((item: any) => item.id !== passId);
      await updateDoc(movieRef, {
        savedShow: result,
      });
    } catch (error) {}
  };

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedShow);
    });
  }, [user?.email]);

  return (
    <div>
      <h2 className="text-white font-bold md:text-xl p-4">My Show</h2>
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
          {movies.map((item: any, idx) => {
            return (
              <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2 ">
                <img
                  className="w-full h-auto block"
                  src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                  alt={item?.title}
                />
                <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white ">
                  <p className=" whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
                    {item.title}
                  </p>
                  <p
                    onClick={() => deleteShow(item.id)}
                    className="absolute text-gray-300 top-4 right-4"
                  >
                    <AiOutlineClose />
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <MdChevronRight
          onClick={() => slideMove("right")}
          className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100  cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
      </div>
    </div>
  );
};

export default SavedShows;
