/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState } from "react";
import CardSkeleton from "./CardSkeleton";
import { BASE_IMAGE_URL } from "@/utils/Const";

interface propsType {
  img: string;
  id: string;
  title: string;
  releaseDate: string;
}

const Card = ({ img, id, title, releaseDate }: propsType) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="group bg-primary h-[450px] md:h-[335px] w-[100%]">
      <Link
        className={`${!loaded && error && "hidden"}`}
        href={`/details/${id}`}
      >
        <div className="group relative">
          <img
            className="object-cover h-[450px] md:h-[335px] w-[100%] rounded-lg group-hover:scale-105 group-hover:border-2 group-hover:border-yellow-500 transition-all duration-500"
            src={`${BASE_IMAGE_URL}${img}`}
            alt="movie poster"
            width={500}
            height={335}
            // onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
          />
          <div
            className="absolute bg-primary w-[100%] rounded-lg backdrop-opacity-10 backdrop-invert bg-primary/85 bottom-0 px-4 py-2 text-center transition-all duration-500 opacity-0
     group-hover:opacity-100"
          >
            {title}
            <p>{releaseDate}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
