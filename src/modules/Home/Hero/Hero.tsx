import Heading from "@/UI-Kit/Heading/Heading";
import React from "react";
import styles from "./Hero.module.scss";
import Text from "@/UI-Kit/Text/Text";
const Hero = () => {
  return (
    <div className={styles.heroContainer}>
      <Heading level={2} className={styles.title}>
        Find your next favorite Movie
      </Heading>
      <Text as="p">
        Discover thousands of movies, from timeless classics to the latest
        blockbusters. Create your personalized watchlist and never miss a
        must-see film again.
      </Text>
    </div>
  );
};

export default Hero;
