import Heading from "@/UI-Kit/Heading/Heading";
import React, { useEffect, useState } from "react";
import MovieListGrid from "@/components/Common/MovieListGrid/MovieListGrid";
import {
  DiscoverMovieFilters,
  SearchMovieParams,
  useLazySearchMoviesQuery
} from "@/store/services/movieApi";
import MovieFilters from "../DiscoverMovies/MovieFilters/MovieFilters";

const SearchMovies = () => {
  const [filters, setFilters] = useState<SearchMovieParams>({
    text: "",
    page: 1
  });
  const [getMovies, { data, isLoading }] = useLazySearchMoviesQuery();

  useEffect(() => {
    getMovies(filters);
  }, [filters]);

  const handlefilters = (
    newfilters: DiscoverMovieFilters | SearchMovieParams
  ) => {
    if ("text" in newfilters) {
      setFilters(newfilters);
    }
  };

  return (
    <div>
      <Heading level={2}>Search Movies</Heading>
      <MovieFilters filters={filters} setFilters={handlefilters} />
      <MovieListGrid items={data?.results || []} isLoading={isLoading} />
    </div>
  );
};

export default SearchMovies;
