import { Imovie } from "@/app/discover/[id]/page";
import { useEffect, useRef } from "react";
import Swiper from "swiper";
import "swiper/swiper-bundle.css";
import Card from "../CardLand";
import CardLand from "../CardLand";

function MovieSlider({ movies }: { movies: Imovie[] }) {
  const swiperContainer = useRef(null);

  useEffect(() => {
    if (swiperContainer.current) {
      new Swiper(swiperContainer.current, {
        slidesPerView: 6,
        spaceBetween: 12,
        loop: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        // Add any other Swiper options you need
      });
    }
  }, [movies]);

  return (
    <div ref={swiperContainer} className="swiper-container ">
      <div className="swiper-wrapper" style={{ scrollBehavior: "smooth" }}>
        {movies.map((movie) => (
          <div key={movie.id} className="swiper-slide">
            {/* Your Card component here */}
            <CardLand
              img={movie.poster_path}
              id={movie.id}
              title={movie.title}
              releaseDate={movie.release_date}
            />
          </div>
        ))}
      </div>
      <div className="swiper-button-prev z-20" />
      <div className="swiper-button-next z-20" />
    </div>
  );
}

export default MovieSlider;
