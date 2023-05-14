import { Pagination, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import type {} from "@mui/lab/themeAugmentation";

interface CustomPaginationInterface {
  setPage(args: number): void;
  numOfPages?: number;
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const style = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  marginTop: 10,
};

const CustomPagination: React.FC<CustomPaginationInterface> = ({ setPage,numOfPages }) => {
  const handlePageChange = (page: number) => {
    setPage(page);
    window.scroll(0, 0);
  };
  return (
    <div style={style}>
      <ThemeProvider theme={darkTheme}>
        <Pagination
          hideNextButton
          hidePrevButton
          count={numOfPages}
          onChange={(e: any) => handlePageChange(e.target.textContent)}
          color="primary"
        />
      </ThemeProvider>
    </div>
  );
};

export default CustomPagination;
