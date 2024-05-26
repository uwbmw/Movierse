import { BASE_URL } from "@/utils/Const";
import axios from "axios";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";

interface propsType {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent) => void;
}

interface Igenre {
  id: string;
  name: string;
}

const MobNav = ({ input, setInput, handleSubmit }: propsType) => {
  const [isOpen, setIsOpen] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  const searchParams = useSearchParams();
  const params = useParams();

  useEffect(() => {
    axios
      .get(
        `${BASE_URL}/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
      )
      .then(({ data }) => {
        console.log(data.genres);
        setGenres(data.genres);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (searchParams.get("genre")) {
      setSelectedGenre(searchParams.get("genre")!);
      return;
    }

    setSelectedGenre(params.id.toString().replace(/%20/g, " "));
  }, [params.id, searchParams]);

  return (
    <>
      <form
        className="md:hidden flex justify-between w-[100%]"
        onSubmit={handleSubmit}
      >
        <div onClick={() => setIsOpen(true)}>
          <AiOutlineMenu size={30} />
        </div>

        <div className="space-x-4">
          <input
            className="bg-secondary px-4 py-2 outline-none placeholder:text-textColor text-[14px] w-[180px]"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search Movies..."
          />

          <button
            type="submit"
            className="bg-secondary text-textColor px-4 py-2 hover:bg-textColor hover:text-white text-[14px]"
          >
            Search
          </button>
        </div>
      </form>

      {/* full screen nav */}
      <div
        className={`min-h-[100vh] max-h-[100vh] w-[100%] bg-primary fixed left-0 top-0 z-10
overflow-scroll ${isOpen ? "block" : "hidden"} `}
      >
        <div className="sticky top-0 bg-primqry py-4 w-[100%]">
          <IoMdClose
            onClick={() => setIsOpen(false)}
            className="absolute top-0 right-0 m-2 mt-7"
            size={28}
          />
        </div>

        <div className="px-4 pb-16">
          <div className="flex flex-col gap-4 pt-4">
            <p className="sidebarTitle">Discover</p>

            <Link
              className="w-fit"
              href="/discover/top_rated"
              onClick={() => setIsOpen(false)}
            >
              <p
                className={`sidebarLink ${
                  selectedGenre == "top_rated" ? "sidebarActive" : ""
                }`}
              >
                Top Rated
              </p>
            </Link>
            <Link
              className="w-fit"
              href="/discover/popular"
              onClick={() => setIsOpen(false)}
            >
              <p
                className={`sidebarLink ${
                  selectedGenre == "popular" ? "sidebarActive" : ""
                }`}
              >
                Popular
              </p>
            </Link>
            <Link
              className="w-fit"
              href="/discover/upcoming"
              onClick={() => setIsOpen(false)}
            >
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
                className="w-fit"
                onClick={() => setIsOpen(false)}
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
      </div>
    </>
  );
};

export default MobNav;
