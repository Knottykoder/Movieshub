import axios from "axios";
import { useEffect, useState } from "react";
import { ContentDetailsInterface, PageTitle, TrendingSection } from "../Trending/Trending";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/Pagination";
import Genres from "../../components/Genres";
import useGenre from "../../hooks/useGenre";

const Movies = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState(1);
  const [selectGenres, setSelectGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreForURL = useGenre(selectGenres);
  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForURL}`
    );
    setContent(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    fetchMovies();
  }, [page, genreForURL]);
  return (
    <div>
      <PageTitle>movies</PageTitle>
      <Genres
        type="movie"
        selectGenres={selectGenres}
        setSelectGenres={setSelectGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <TrendingSection >
        {content &&
          content.map((item: ContentDetailsInterface) => (
            <SingleContent
              key={item.id}
              id={item.id}
              poster={item.poster_path}
              title={item.title || item.name}
              date={item.first_air_date || item.release_date}
              media_type={'movie'}
              vote_average={item.vote_average}
            />
          ))}
      </TrendingSection>
      {numOfPages && numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Movies;
