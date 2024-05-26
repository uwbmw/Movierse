/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React, { useState } from 'react'
import CardSkeleton from './CardSkeleton';
import { BASE_IMAGE_URL } from '@/utils/Const';
import Image from 'next/image';
import Loading from './Loading';

interface propsType {
  img: string;
  id: string;
  title: string;
  releaseDate: string;
}

const CardLand = ({ img, id, title, releaseDate }: propsType) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="group">
      <Link href={`/details/${id}`}>
        <div className="group">
          <img
            className="rounded-lg w-[350px] h-[100%] group-hover:scale-105 group-hover:border-2 group-hover:border-yellow-500 transition-all duration-500"
            src={`${BASE_IMAGE_URL}${img}`}
            alt="movie poster"
          />
          <div className="absolute bottom-0 left-0 right-0  bg-primary/75 backdrop-opacity-10 backdrop-invert rounded-b-lg px-4 py-2 text-center transition-all duration-500 opacity-0 group-hover:opacity-100">
            <p className="text-white">{title}</p>
            <p className="text-white">{releaseDate}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardLand