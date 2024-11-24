import MovieListGrid from "@/components/Common/MovieListGrid/MovieListGrid";
import { IMovie } from "@/types/src/types/movies.type";
import Container from "@/UI-Kit/Container/Container";
import Heading from "@/UI-Kit/Heading/Heading";
import React, { useEffect, useState } from "react";

const Favorite = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    const fevMovies = localStorage.getItem("fevMovies");
    const likedMovies = JSON.parse(fevMovies || "[]");
    setMovies(likedMovies);
  }, []);

  return (
    <Container>
      <Heading level={2}>Favorite Movies</Heading>
      <MovieListGrid items={movies} />
    </Container>
  );
};

export default Favorite;
