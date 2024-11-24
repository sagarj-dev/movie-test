import MovieBanner from "@/modules/Watch/MovieBanner/MovieBanner";
import MovieDetails from "@/modules/Watch/MovieDetails/MovieDetails";
import { useLazyGetMovieByIdQuery } from "@/store/services/movieApi";
import { IMovieDeatils } from "@/types/src/types/movies.type";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const Watch = () => {
  const [movieDeatils, setMovieDetails] = React.useState<IMovieDeatils | null>(
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
      {movieDeatils && (
        <div>
          <MovieBanner
            bannerImage={movieDeatils.backdrop_path!}
            title={movieDeatils.title}
          />
          <MovieDetails details={movieDeatils} />
        </div>
      )}
    </>
  );
};

export default Watch;
