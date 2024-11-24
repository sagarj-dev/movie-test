import { BASE_URL_IMAGE, BASE_URL_IMAGE_ORIGINAL } from "@/constants/constants";
import { IMovieDeatils } from "@/types/src/types/movies.type";
import Image from "next/image";
import styles from "./MovieDetails.module.scss";
import React, { FC } from "react";
import Container from "@/UI-Kit/Container/Container";
import Heading from "@/UI-Kit/Heading/Heading";
import Text from "@/UI-Kit/Text/Text";
import dayjs from "dayjs";

interface MovieDetailsProps {
  details: IMovieDeatils;
}

const MovieDetails: FC<MovieDetailsProps> = ({ details }) => {
  const genre = details.genres.map((genre) => genre.name).join(", ");
  return (
    <Container>
      <div className={styles.container}>
        <div className={styles.poster}>
          <Image
            src={`${BASE_URL_IMAGE_ORIGINAL}${details.poster_path}`}
            alt={"asd"}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={`${BASE_URL_IMAGE}${details.poster_path}`}
          />
        </div>
        <div className={styles.detailsContainer}>
          <div>
            <Heading level={6}>{details.tagline}</Heading>
            <Text as="p">{details.overview}</Text>
          </div>
          <div>
            <Heading level={6}>Type</Heading>
            <Text as="p">Movie</Text>
          </div>
          <div>
            <Heading level={6}>Release Date</Heading>
            <Text as="p">{dayjs("2021-09-01").format("DD/MM/YYYY")}</Text>
          </div>
          <div>
            <Heading level={6}>Genres</Heading>
            <Text as="p">{genre}</Text>
          </div>
          <div>
            <Heading level={6}>Production</Heading>
            <Text as="p">{details.production_companies[0].name}</Text>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default MovieDetails;
