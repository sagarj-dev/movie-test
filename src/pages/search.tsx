import SearchMovies from "@/modules/SearchMovies/SearchMovies";
import Container from "@/UI-Kit/Container/Container";
import Head from "next/head";
import React from "react";

const Search = () => {
  return (
    <>
      <Head>
        <title>Movie Bits | Search</title>
        <meta name="description" content="Search Movies" />
        <meta
          name="keywords"
          content="movies, films, cinema, movie recommendations"
        />
        <meta property="og:title" content="Movie Bits" />
        <meta
          property="og:description"
          content="Find your next favorite Movie"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://movie-test-sgj.vercel.app/" />
        <meta property="og:image" content="/images/logo.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Movie Bits" />
        <meta
          name="twitter:description"
          content="Find your next favorite Movie"
        />
        <meta name="twitter:image" content="/images/logo.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo.svg" />
        <link rel="canonical" href="https://movie-test-sgj.vercel.app/" />
      </Head>
      <Container>
        <SearchMovies />
      </Container>
    </>
  );
};

export default Search;
