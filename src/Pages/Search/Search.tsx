import styled from "styled-components";
import { ContentDetailsInterface, TrendingSection } from "../Trending/Trending";
import { useEffect, useState } from "react";
import { Button, Tab, Tabs, TextField, ThemeProvider, createTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/Pagination";

const SearchBar = styled.div`
display: flex;
margin: "15px 0;
`;

const Search = () => {
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState(1);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#fff",
      },
    },
  });
  const fetchSearch = async() =>{
  const {data} = await axios.get(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
    import.meta.env.VITE_API_KEY
  }&language=en-US&query=${searchText}&page=${page}&include_adult=false`)
  setContent(data.results)
  setNumOfPages(data.total_pages)
  }

  useEffect(()=>{
   fetchSearch()
  },[type,page])
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
      <SearchBar>
          <TextField
            style={{ flex: 1 }}
            label="Search"
            variant="filled"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button variant="contained" style={{ marginLeft: 10 }}  onClick={fetchSearch}>
            <SearchIcon fontSize="large"/>
          </Button>
      </SearchBar>
      <Tabs value={type} style={{paddingBottom: 5}} indicatorColor="primary" textColor="primary" onChange={( _e ,newVal)=>{
            setType(newVal);
            setPage(1)
          }}>
            <Tab style={{width: "50%"}} label="Search Movies"/>
            <Tab style={{width: "50%"}} label="Search Tv Series"/>
          </Tabs>
        </ThemeProvider>
        <TrendingSection>
        {content &&
          content.map((item: ContentDetailsInterface) => (
            <SingleContent
              key={item.id}
              id={item.id}
              poster={item.poster_path}
              title={item.title || item.name}
              date={item.first_air_date || item.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={item.vote_average}
            />
          ))}
            {searchText &&
          !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </TrendingSection>
      {numOfPages && numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Search;
