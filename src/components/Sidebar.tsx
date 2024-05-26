"use client";
import { BASE_URL } from "@/utils/Const";
import axios from "axios";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Sidebar = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const params = useParams();
  const searchParams = useSearchParams();

  interface Igenre {
    id: string;
    name: string;
  }

  useEffect(() => {
    axios
      .get(
        `${BASE_URL}/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
      )
      .then(({ data }) => {
        setGenres(data.genres);
        console.log("sidebar", data.genres);
      });
  }, []);

  useEffect(() => {
    if (searchParams.get("genre")) {
      setSelectedGenre(searchParams.get("genre")?.toString()!);
      return;
    }

    setSelectedGenre(params.id.toString().replace(/%20/g, " "));
  }, [params.id, searchParams]);

  function setIsOpen(arg0: boolean): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div
      className="bg-primary px-10 max-h-[calc(100vh-77px)] pb-6 overflow-y-scroll scrollbar-thin scrollbar-thumb-[#22222a]
scrollbar-track-primary hidden sm:block"
    >
      <div className="flex flex-col gap-4 pt-4">
        <p className="sidebarTitle">Discover</p>

        <Link href="/discover/top_rated">
          <p
            className={`sidebarLink ${
              selectedGenre == "top_rated" ? "sidebarActive" : ""
            }`}
          >
            Top Rated
          </p>
        </Link>

        <Link href="/discover/popular">
          <p
            className={`sidebarLink ${
              selectedGenre == "popular" ? "sidebarActive" : ""
            }`}
          >
            Popular
          </p>
        </Link>

        <Link href="/discover/upcoming">
          <p
            className={`sidebarLink ${
              selectedGenre == "upcoming" ? "sidebarActive" : ""
            }`}
          >
            Upcoming
          </p>
        </Link>
      </div>

      <div className="flex flex-col gap-4 pt-4">
        <p className="sidebarTitle">Genres</p>

        {genres.map((genre: Igenre) => (
          <Link
            key={genre.id}
            href={`/genres/${genre.id}?genre=${genre.name.toLowerCase()}`}
          >
            <p
              className={`sidebarLink ${
                genre.name.toLowerCase() === selectedGenre
                  ? "sidebarActive"
                  : ""
              }`}
            >
              {genre.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
