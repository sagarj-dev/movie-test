import {
  IGenreResponse,
  IMovie,
  IMovieDeatils,
  IPaginatedResponse
} from "@/types/src/types/movies.type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface SearchMovieByTypeParams {
  type: string;
  page: number;
}

export interface DiscoverMovieFilters {
  startYear?: number;
  endYear?: number;
  genre?: number;
  minRating?: number;
  maxRating?: number;
  page: number;
}

export interface SearchMovieParams {
  text: string;
  page: number;
}
const injectIsLiked = (movies: IMovie[]) => {
  const fevMovies = localStorage.getItem("fevMovies");
  const likedMovies = JSON.parse(fevMovies || "[]");
  return movies.map((movie) => {
    const isLiked = likedMovies.find(
      (likedMovie: IMovie) => likedMovie.id === movie.id
    );
    return { ...movie, isLiked: !!isLiked };
  });
};
export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3"
  }),
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({
    getMovieGenres: builder.query<IGenreResponse, void>({
      query: () =>
        `/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    }),
    searchMovies: builder.query<IPaginatedResponse<IMovie>, SearchMovieParams>({
      query: ({ text, page }) =>
        `/search/movie?language=en-US&page=${page}&api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&query=${text || "a"}`,
      transformResponse: (response: IPaginatedResponse<IMovie>) => ({
        ...response,
        results: injectIsLiked(response.results)
      }),
      keepUnusedDataFor: 3600
    }),
    discoverMovies: builder.query<
      IPaginatedResponse<IMovie>,
      DiscoverMovieFilters
    >({
      query: ({
        endYear = "2024",
        genre = 12,
        startYear = "1985",
        maxRating = 10,
        minRating = 0,
        page = 1
      }) =>
        `/discover/movie?language=en-US&page=1&api_key=${process.env.NEXT_PUBLIC_API_KEY}&sort_by=popularity.desc&release_date.gte=${startYear}-01-01&release_date.lte=${endYear}-12-31&with_genres=${genre}&vote_average.gte=${minRating}&vote_average.lte=${maxRating}&page=${page}`
    }),
    getMovieById: builder.query<IMovieDeatils, number>({
      query: (id) => `/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    }),
    getMoviesByType: builder.query<
      IPaginatedResponse<IMovie>,
      SearchMovieByTypeParams
    >({
      query: ({ page, type }) =>
        `/movie/${type}?language=en-US&page=${page}&api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
      transformResponse: (response: IPaginatedResponse<IMovie>) => ({
        ...response,
        results: injectIsLiked(response.results)
      }),
      keepUnusedDataFor: 3600
    })
  })
});

export const {
  useLazyGetMovieByIdQuery,
  useGetMovieByIdQuery,
  useLazyGetMoviesByTypeQuery,
  useGetMovieGenresQuery,
  useLazyDiscoverMoviesQuery,
  useLazySearchMoviesQuery
} = movieApi;
