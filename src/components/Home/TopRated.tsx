"use client";
import { Imovie } from "@/app/discover/[id]/page";
import CardSkeleton from "../CardSkeleton";
import Footer from "../Footer";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/utils/Const";
import Card from "../CardLand";
import MovieSlider from "./MovieSlider";

const TopRated = () => {
  const [title, setTitle] = useState("");
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [discover, setDiscover] = useState("");
  const [loaded, setLoaded] = useState(false);

  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mainRef?.current?.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    const id = "top_rated";
    const page = "";

    axios
      .get(`${BASE_URL}/movie/${id}`, {
        params: {
          api_key: process.env.NEXT_PUBLIC_API_KEY,
          page,
        },
      })
      .then((Response) => {
        setLoaded(true);
        console.log("res: ", Response.data);
        setMovies(Response.data.results);
        setCurrentPage(Response.data.page);
        setTotalPage(Response.data.total_page);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <main
      className="bg-secondary max-h-[calc(100vh-77px)] min-h-[calc(100vh-77px)] p-8  relative"
      ref={mainRef}
    >
      <h2 className="text-[24px] tracking-[2px]">{title}</h2>

      {/* <div className="grid gap-8 moviesGrid place-items-center mt-8"> */}
      {!loaded && <CardSkeleton />}

      <MovieSlider movies={movies} />
      {/* </div> */}

      {/* <div className="flex justify-center gap-16 py-6  pt-16">
        <button
          onClick={() => handlePageChange("prev")}
          className={`bg-purple-900 p-2 px-8 hover:bg-purple-950 ${
            currentPage === 1 && "hidden"
          }`}
        >
          Prev
        </button>
        <button
          onClick={() => handlePageChange("next")}
          className={`bg-purple-900 p-2 px-8 hover:bg-purple-950 ${
            currentPage === totalPage && "hidden"
          }`}
        >
          Next
        </button>
      </div> */}

      <div className="pb-20">
        <Footer />
      </div>
    </main>
  );
};

export default TopRated;
