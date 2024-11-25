import MovieBanner from "@/modules/Watch/MovieBanner/MovieBanner";
import MovieDetails from "@/modules/Watch/MovieDetails/MovieDetails";
import { useLazyGetMovieByIdQuery } from "@/store/services/movieApi";
import { IMovieDeatils } from "@/types/src/types/movies.type";
import Head from "next/head";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const Watch = () => {
  const [movieDetails, setMovieDetails] = React.useState<IMovieDeatils | null>(
    null
  );
  const params = useParams();
  const [getMovie] = useLazyGetMovieByIdQuery();

  useEffect(() => {
    (async () => {
      if (params?.id) {
        const data = await getMovie(parseInt(params.id as string));
        if (data.data) {
          setMovieDetails(data.data);
        }
      }
    })();
    console.log(params);
  }, [params]);

  return (
    <>
      {movieDetails && (
        <div>
          <Head>
            <title>{`${movieDetails.title} - Movie Bits`}</title>
            <meta name="description" content={movieDetails.overview} />
            <meta property="og:title" content={movieDetails.title} />
            <meta property="og:description" content={movieDetails.overview} />
            <meta
              property="og:image"
              content={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
            />
            <meta property="og:type" content="video.movie" />
            <meta
              property="og:url"
              content={`https://www.moviebits.com/movie/${movieDetails.id}`}
            />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={movieDetails.title} />
            <meta name="twitter:description" content={movieDetails.overview} />
            <meta
              name="twitter:image"
              content={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
            />
          </Head>
          <MovieBanner
            bannerImage={movieDetails.backdrop_path!}
            title={movieDetails.title}
          />
          <MovieDetails details={movieDetails} />
        </div>
      )}
    </>
  );
};

export default Watch;
