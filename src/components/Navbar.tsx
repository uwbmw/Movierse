/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import MobNav from "./MobNav";

const Navbar = () => {
  const [input, setInput] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInput("");
    router.push(`/search/${input}?page=1`);
  };

  return (
    <div className="bg-primary">
      <div className="flex justify-between items-center py-4 px-2 md:px-10">
        <Link className="hidden md:block" href="/">
          <h2 className="text-[30px]">Movierse</h2>
        </Link>
        <form className="space-x-4 hidden md:block" onSubmit={handleSubmit}>
          <input
            className="rounded-lg transition-all duration-500 bg-secondary px-4 py-2 outline-none placeholder:text-textColor"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search Movies..."
          />

          <button className=" rounded-lg transition-all duration-500 bg-secondary text-textColor px-4 py-2 hover:bg-textColor hover:text-white">
            Search
          </button>
        </form>

        {/* <MobNav input={input} setInput={setInput} handleSubmit={handleSubmit} /> */}
      </div>
    </div>
  );
};

export default Navbar;
