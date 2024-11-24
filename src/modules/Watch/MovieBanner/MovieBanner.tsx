import Image from "next/image";
import styles from "./MovieBanner.module.scss";
import { FC } from "react";
import { BASE_URL_IMAGE, BASE_URL_IMAGE_ORIGINAL } from "@/constants/constants";
import Container from "@/UI-Kit/Container/Container";
import Heading from "@/UI-Kit/Heading/Heading";

interface MovieBannerProps {
  bannerImage: string;
  title: string;
}

const MovieBanner: FC<MovieBannerProps> = ({ bannerImage, title }) => {
  return (
    <Container>
      <div className={styles.movieBanner}>
        <Image
          src={`${BASE_URL_IMAGE_ORIGINAL}${bannerImage}`}
          alt={title}
          layout="fill"
          objectFit="cover"
          placeholder="blur"
          blurDataURL={`${BASE_URL_IMAGE}${bannerImage}`}
        />
      </div>
      <div className={styles.title}>
        <div className={styles.blur}></div>
        <Heading level={5}>{title}</Heading>
      </div>
    </Container>
  );
};

export default MovieBanner;
