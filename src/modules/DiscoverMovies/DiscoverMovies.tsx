import Heading from "@/UI-Kit/Heading/Heading";
import React, { useEffect, useState } from "react";
import MovieFilters from "./MovieFilters/MovieFilters";
import MovieListGrid from "@/components/Common/MovieListGrid/MovieListGrid";
import {
  DiscoverMovieFilters,
  useLazyDiscoverMoviesQuery
} from "@/store/services/movieApi";

const DiscoverMovies = () => {
  const [filters, setFilters] = useState<DiscoverMovieFilters>({
    startYear: 1985,
    endYear: 2024,
    genre: 12,
    minRating: 0,
    maxRating: 10,
    page: 1
  });
  const [getMovies, { data, isLoading }] = useLazyDiscoverMoviesQuery();

  useEffect(() => {
    getMovies(filters);
  }, [filters]);

  return (
    <div>
      <Heading level={2}>Discover Movies</Heading>
      <MovieFilters filters={filters} setFilters={setFilters} />
      <MovieListGrid items={data?.results || []} isLoading={isLoading} />
    </div>
  );
};

export default DiscoverMovies;
