import React, { FC } from "react";
import MovieCard from "../MovieCard/MovieCard";
import styles from "./MovieListGrid.module.scss";
import Text from "@/UI-Kit/Text/Text";
import { IMovie } from "@/types/src/types/movies.type";
import Heading from "@/UI-Kit/Heading/Heading";
import { ImSad } from "react-icons/im";

interface MovieListGridProps {
  title?: string | React.ReactNode;
  items: IMovie[];
  isLoading?: boolean;
}

const MovieListGrid: FC<MovieListGridProps> = ({
  items,
  title,
  isLoading = false
}) => {
  const TitleComponent =
    typeof title === "string" ? <Text as="p">{title}</Text> : title;
  return (
    <>
      {TitleComponent}
      {isLoading && <Heading level={5}>Loading</Heading>}
      {!isLoading && (
        <div className={styles.grid}>
          {items.length === 0 && (
            <div className={styles.notFound}>
              <Heading level={5}>
                <ImSad />
              </Heading>
              <Heading level={5}>No Movies Found</Heading>
            </div>
          )}
          {items.map((item, i) => {
            return <MovieCard key={i} details={item} />;
          })}
        </div>
      )}
    </>
  );
};

export default MovieListGrid;
