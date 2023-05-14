import * as React from "react";
import { Box } from '@mui/material';
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import MovieIcon from "@mui/icons-material/Movie";
import TvIcon from "@mui/icons-material/Tv";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import type {} from '@mui/lab/themeAugmentation';

export const SimpleBottomNavigation = () => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const style = {
    width: "100%",
    position: "fixed",
    bottom: 0,
    zIndex: 100,
  };

  useEffect(() => {
    if (value === 0) {
      navigate("/");
    }else if(value === 1){
        navigate("/movies")
    }else if( value === 2){
        navigate("/series")
    }else if (value === 3){
        navigate("/search")
    }
  }, [value,navigate ]);

  return (
    <Box sx={style}>
      <BottomNavigation
        sx={{ bgcolor: "#2d313a" }}
        showLabels
        value={value}
        onChange={(_event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          sx={{ color: "white" }}
          label="Trending"
          icon={<WhatshotIcon />}
        />
        <BottomNavigationAction
          sx={{ color: "white" }}
          label="Movies"
          icon={<MovieIcon />}
        />
        <BottomNavigationAction
          sx={{ color: "white" }}
          label="TV-series"
          icon={<TvIcon />}
        />
        <BottomNavigationAction
          sx={{ color: "white" }}
          label="Search"
          icon={<SearchIcon />}
        />
      </BottomNavigation>
    </Box>
  );
};
