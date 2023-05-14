import { Chip } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";

const Genres: React.FC<any> = ({
  selectGenres,
  setGenres,
  setSelectGenres,
  genres,
  type,
  setPage,
}) => {

    const handleAdd = (genre: any)=>{
      setSelectGenres([...selectGenres, genre]);
      setGenres(genres.filter((g:any)=> g.id !== genre.id))
      setPage(1);
    }
    const handleRemove = (genre: any)=>{
      setSelectGenres(selectGenres.filter((selected: any)=> selected.id !== genre.id));
      setGenres([...genres, genre])
      setPage(1);
    }
  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=en-US`
    );
    setGenres(data.genres);
  };
  useEffect(() => {
    fetchGenres();
    return () => {
      setGenres([]);
    };
  }, []);

  return (
    <div style={{ padding: "6px 0" }}>
        {selectGenres &&
        selectGenres.map((genre: any) => (
          <Chip
            key={genre.id}
            label={genre.name}
            style={{ margin: 2, color: "white" }}
            clickable
            color="primary"
            size="small"
            onDelete={()=>handleRemove(genre)}
          />
        ))}
      {genres &&
        genres.map((genre: any) => (
          <Chip
            key={genre.id}
            label={genre.name}
            style={{ margin: 2, color: "white" }}
            clickable
            size="small"
            onClick={()=> handleAdd(genre)}
          />
        ))}
    </div>
  );
};

export default Genres;
