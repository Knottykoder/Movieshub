import Genres from "../../components/Genres";
import { ContentDetailsInterface, PageTitle, TrendingSection } from "../Trending/Trending";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/Pagination";
import { useEffect, useState } from "react";
import useGenre from "../../hooks/useGenre";
import axios from "axios";

const Series = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState(1);
  const [selectGenres, setSelectGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreForURL = useGenre(selectGenres);
  const fetchSeries = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForURL}`
    );
    setContent(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    fetchSeries();
  }, [page, genreForURL]);
  return (
    <div>
      <PageTitle>Tv series</PageTitle>
        <Genres
        type="tv"
        selectGenres={selectGenres}
        setSelectGenres={setSelectGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <TrendingSection>
        {content &&
          content.map((item: ContentDetailsInterface) => (
            <SingleContent
              key={item.id}
              id={item.id}
              poster={item.poster_path}
              title={item.title || item.name}
              date={item.first_air_date || item.release_date}
              media_type={"tv"}
              vote_average={item.vote_average}
            />
          ))}
      </TrendingSection>
      {numOfPages && numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  )
}

export default Series