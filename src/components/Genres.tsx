import Link from "next/link";
import React from "react";

interface Igenres {
  index: number;
  name: string;
  length: number;
  id: number;
}

const Genres = ({ index, name, length, id }: Igenres) => {
  return (
    <Link href={`/genres/${id}?genre=${name.toLowerCase()}`}>
      <div className="flex gap-4  text-textColor hover:text-white transition-all duration-500 ">
        <div>{name}</div>
        <div className="text-textColor">{index + 1 !== length ? "/" : ""}</div>
      </div>
    </Link>
  );
};

export default Genres;
