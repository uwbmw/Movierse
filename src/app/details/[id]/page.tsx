/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import axios from "axios";
import Footer from "@/components/Footer";
import { BASE_IMAGE_URL } from "@/utils/Const";
import Loading from "@/components/Loading";
import { BsPlayFill } from "react-icons/bs";
import Genres from "@/components/Genres";
import { Root } from "@/app/types/movie-type";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

const MovieDetails = () => {
    const [movie, setMovie] = useState<Root | null>(null);
    const [showPlayer, setShowPlayer] = useState(false);
    const [trailer, setTrailer] = useState("");

    const router = useRouter();
    const { id } = useParams();

    const mainRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&append_to_response=videos`
                );
                setMovie(response.data);
            } catch (error) {
                console.error("Error fetching movie details:", error);
                // Handle error here, e.g., setMovie(null) or show error message
            }
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        if (movie) {
            const trailerIndex = movie?.videos?.results?.findIndex(
                (element: { type: string }) => element.type === "Trailer"
            );

            if (trailerIndex !== undefined && trailerIndex !== -1) {
                const trailerURL = `https://www.youtube.com/watch?v=${movie?.videos?.results[trailerIndex]?.key}`;
                setTrailer(trailerURL);
            }
        }
    }, [movie]);

    const startPlayer = () => {
        if (mainRef.current) {
            mainRef.current.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
            });
        }
        setShowPlayer(true);
    };

    if (!movie) {
        return null
    }

    return (
        <main className="bg-secondary max-h-[calc(100vh-77px)] min-h-[calc(100vh-77px)] rounded-lg p-8 overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-[#22222a] scrollbar-track-primary" ref={mainRef}>
            {/* Close button */}
            
            {/* Movie Details */}
            <div className="flex justify-center items-center pt-4 md:pt-0">
                <div className="grid md:grid-cols-[300px,1fr] max-w-[1200px] gap-12">
                    {/* Movie Poster */}
                    <div>
                        <img className="rounded-lg" src={`${BASE_IMAGE_URL}${movie.poster_path}`} alt={movie.title} />
                    </div>

                    {/* Movie Information */}
                    <div className="space-y-6 md:space-y-3 text-textColor">
                        {/* Movie Title */}
                        <div className="uppercase text-[26px] md:text-[34px] font-medium pr-4 text-white">
                            {movie.title}
                        </div>

                        {/* Genres */}
                        <div className="flex gap-4  flex-wrap">
                            {movie.genres.map((genre: { id: number; name: string; }, index: number) => (
                                <Genres
                                    key={genre.id}
                                    index={index}
                                    length={movie.genres.length}
                                    name={genre.name}
                                    id={genre.id}
                                />
                            ))}
                        </div>

                        {/* Additional Information */}
                        <div className="flex flex-col md:flex-row gap-2 md:gap-6">
                            <div>Language: {movie.original_language.toUpperCase()}</div>
                            <div>Release: {movie.release_date}</div>
                            <div>Runtime: {movie.runtime} MIN.</div>
                            <div>Rating: {movie.vote_average} ⭐️</div>
                        </div>

                        {/* Overview */}
                        <div className="pt-14 space-y-2 pr-4">
                            <div>OVERVIEW</div>
                            <div>{movie.overview}</div>
                        </div>

                        {/* Watch Trailer Button */}
                        <div className="inline-block pt-6 cursor-pointer" onClick={startPlayer}>
                            <div className="rounded-lg transition-all duration-500 flex gap-2 items-center bg-white text-black px-4 py-2 mb-6 hover:bg-[#b4b4b4]">
                                <BsPlayFill size={24} />
                                Watch Trailer
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trailer Player */}
            <div className={`absolute justify-center items-center h-[684px] w-[1105px] top-3 inset-x-[7] md:inset-x-[13] rounded overflow-hidden transition duration-1000 ${showPlayer ? "opacity-100 z-50" : "hidden"}`}>
                <div className="flex items-center justify-between bg-black text-[#f9f9f9] p-3.5">
                    <span className="font-semibold">Playing Trailer</span>
                    <div className="cursor-pointer w-8 h-8 flex justify-center items-center rounded-lg opacity-50 hover:opacity-75 hover:bg-[#0f0f0f]">
                        <IoMdClose onClick={() => setShowPlayer(false)} className="h-5" />
                    </div>
                </div>
                <div className="relative items-center  justify-center pt-[56.25%]">
                    <ReactPlayer
                        url={trailer}
                        width="100%"
                        height="100%"
                        style={{ position: "absolute", top: 0, left: 0 }}
                        controls={true}
                        playing={showPlayer}
                    />
                </div>
            </div>

            {/* Footer */}
            <div className="pb-20">
                <Footer />
            </div>
        </main>
    );
};

export default MovieDetails;
