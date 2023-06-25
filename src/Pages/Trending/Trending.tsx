import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/Pagination";

export const PageTitle = styled.span`
text-transform: uppercase;
display: flex;
justify-content: center;
font-family: "Montserrat", sans-serif;
font-size: 2vw;
padding: 4px;
border-radius: 50px;
color: white;

@media (max-width: 1000px){
  font-size: 6.4vw;
}
`;

export const TrendingSection = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: space-around;
`;

export interface ContentDetailsInterface {
  id: number;
  title: string;
  poster_path: string;
  name: string;
  first_air_date: string;
  release_date: string;
  media_type: string;
  vote_average: number;
}

const Trending = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${
        import.meta.env.VITE_API_KEY
      }&page=${page}`
    );
    setContent(data.results);
  };
  useEffect(()=>{
   fetchTrending()
  },[page])
  return (
    <div>
      <PageTitle>Trending</PageTitle>
      <TrendingSection>
        {content &&
          content.map((item: ContentDetailsInterface) => (
            <SingleContent
              key={item.id}
              id={item.id}
              poster={item.poster_path}
              title={item.title || item.name}
              date={item.first_air_date || item.release_date}
              media_type={item.media_type}
              vote_average={item.vote_average}
            />
          ))}
      </TrendingSection>
      <CustomPagination setPage={setPage}/>
    </div>
  );
};

export default Trending;
