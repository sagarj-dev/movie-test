import Tabs from "@/components/Common/Tabs/Tabs";
import React, { useEffect, useState } from "react";
import styles from "./PopularMovies.module.scss";
import { useLazyGetMoviesByTypeQuery } from "@/store/services/movieApi";
import { useInView } from "react-intersection-observer";
import MovieListGrid from "@/components/Common/MovieListGrid/MovieListGrid";
import { IMovie } from "@/types/src/types/movies.type";

const PopularMovies = () => {
  const [activeTab, setActiveTab] = useState<string>("popular");
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<IMovie[]>([]);
  const { ref, inView } = useInView();

  const [getPopularMovies, { isLoading, isFetching }] =
    useLazyGetMoviesByTypeQuery();
  useEffect(() => {
    const fetchMovies = async () => {
      if (!isLoading) {
        const { data } = await getPopularMovies({
          type: activeTab,
          page
        });
        if (data) {
          setMovies((prev) => [...prev, ...data.results]);
        }
      }
    };
    fetchMovies();
  }, [page]);

  useEffect(() => {
    if (inView && !isFetching && !isLoading) {
      setPage((prev) => prev + 1);
    }
  }, [inView]);

  useEffect(() => {
    setPage(() => 1);
    setMovies([]);
  }, [activeTab]);

  return (
    <div className={styles.populerMovies}>
      <Tabs
        items={[
          { key: "popular", title: "Populer" },
          { key: "now_playing", title: "Now Playing" },
          { key: "top_rated", title: "Top Rated" },
          { key: "upcoming", title: "Up Coming" }
        ]}
        defaultActiveKey="popular"
        onChange={setActiveTab}
      />

      <MovieListGrid items={movies} isLoading={isFetching} />

      <div ref={ref} className={styles.loadingTrigger}>
        {isLoading && <p>Loading more...</p>}
      </div>
    </div>
  );
};

export default PopularMovies;
