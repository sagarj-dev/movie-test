import React, { FC } from "react";
import styles from "./MovieCard.module.scss";
import { BASE_URL_IMAGE } from "@/constants/constants";
import Image from "next/image";
import Text from "@/UI-Kit/Text/Text";
import { FaRegStar } from "react-icons/fa";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
import dayjs from "dayjs";
import { toTitleCase } from "@/utility/capitol";
import { IMovie } from "@/types/src/types/movies.type";
import { useRouter } from "next/navigation";

interface MovieCardProps {
  details: IMovie;
}

const MovieCard: FC<MovieCardProps> = ({ details }) => {
  const [isLiked, setIsLiked] = React.useState<boolean>(details.isLiked);
  const router = useRouter();

  const addToFev = () => {
    const fevMovies = localStorage.getItem("fevMovies");
    const movies = JSON.parse(fevMovies || "[]");
    if (isLiked) {
      localStorage.setItem(
        "fevMovies",
        JSON.stringify(
          movies.filter((movie: IMovie) => movie.id !== details.id)
        )
      );
    } else {
      movies.push({ ...details, isLiked: true });
      localStorage.setItem("fevMovies", JSON.stringify(movies));
    }
    setIsLiked(!isLiked);
  };
  return (
    <div className={styles.movieCard}>
      <div
        className={styles.imageContainer}
        onClick={() => router.push(`movie/${details.id}`)}
      >
        <Image
          src={`${BASE_URL_IMAGE}${details.poster_path}`}
          alt={details.title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <Text as="p" className={styles.title}>
        {details.title}
      </Text>

      <Text as="p" className={styles.date}>
        {toTitleCase(dayjs(details.release_date).fromNow())}
      </Text>
      <div className={styles.rating}>
        <FaRegStar />
        <Text as="span">{details.vote_average}</Text>
      </div>
      <button className={styles.like} onClick={addToFev}>
        {isLiked ? <IoMdHeart /> : <IoMdHeartEmpty />}
      </button>
    </div>
  );
};

export default MovieCard;
