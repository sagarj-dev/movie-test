import Input from "@/components/Common/Input/Input";
import Select from "@/components/Common/Select/Select";
import styles from "./MovieFilters.module.scss";
import { IoIosSearch } from "react-icons/io";
import {
  DiscoverMovieFilters,
  SearchMovieParams,
  useGetMovieGenresQuery
} from "@/store/services/movieApi";
import { FC, useEffect, useState } from "react";

interface AllFiltersProps extends DiscoverMovieFilters {
  text?: string;
}

interface MovieFiltersProps {
  filters: AllFiltersProps;
  setFilters: (filters: DiscoverMovieFilters | SearchMovieParams) => void;
}

const MovieFilters: FC<MovieFiltersProps> = ({ filters, setFilters }) => {
  const [query, setQuery] = useState<string>("");
  const { data } = useGetMovieGenresQuery();
  const genreOptions = (data?.genres || []).map((genre) => ({
    value: genre.id,
    label: genre.name
  }));
  const yearsOptions = Array.from({ length: 50 }, (_, i) => {
    const year = new Date().getFullYear() - 50 + i;
    return {
      value: year,
      label: year.toString()
    };
  });
  const ratingOptions = Array.from({ length: 10 }, (_, i) => {
    const rating = i + 1;
    return {
      value: rating,
      label: rating.toString()
    };
  });
  const isSearch = filters.hasOwnProperty("text");
  useEffect(() => {
    const timmer = setTimeout(() => {
      if (isSearch) {
        setFilters({ ...filters, text: query });
      }
    }, 300);
    return () => {
      clearTimeout(timmer);
    };
  }, [query]);
  return (
    <div className={styles.container}>
      <div className={styles.input}>
        {isSearch && (
          <Input
            placeholder="Search Movie"
            preFix={<IoIosSearch />}
            label="Search Movie"
            onChange={(e) => setQuery(e.target.value)}
          />
        )}
      </div>
      {!isSearch && (
        <div className={styles.filters}>
          <Select
            label="Genre"
            options={genreOptions}
            onSelect={(v) => {
              setFilters({ ...filters, genre: v as number });
            }}
          />
          <Select
            label="From Year"
            options={yearsOptions}
            defaultValue={yearsOptions[0].value}
            onSelect={(v) => {
              setFilters({ ...filters, startYear: v as number });
            }}
          />
          <Select
            label="To Year"
            options={yearsOptions}
            defaultValue={yearsOptions[yearsOptions.length - 1].value}
            onSelect={(v) => {
              setFilters({ ...filters, endYear: v as number });
            }}
          />

          <Select
            label="Minimum Rating"
            options={ratingOptions}
            defaultValue={ratingOptions[0].value}
            onSelect={(v) => {
              setFilters({ ...filters, minRating: v as number });
            }}
          />
        </div>
      )}
    </div>
  );
};

export default MovieFilters;
