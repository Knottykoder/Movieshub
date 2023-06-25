import { Box, Button, Modal } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import {img_500, unavailable, unavailableLandscape } from "../../config/config";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Carousel from "../Carousel/Carousel";
import { Content } from "../SingleContent/StyledSingleContent";
import { ContentModalAbout, ContentModalContainer, ContentModalDescription, ContentModalLandscape, ContentModalPortrait, ContentModalTitle, Tagline } from "./StyledContentModel";

const style = {
  // eslint-disable-next-line @typescript-eslint/prefer-as-const
  width: "90%",
  height: "80%",
  bgcolor: "#39445a",
  border: "1px solid #282c34",
  borderRadius: 5,
  color: "white",
  boxShadow: 5,
  p: "8px 8px 24px",
};

interface ContentModelInterface {
  children: any;
  media_type: string;
  id: number;
}

interface ContentInterface {
  id: number;
  title: string;
  description: string;
  media_type: string;
  poster_path: string;
  name: string;
  release_date: string;
  vote_average: number;
  first_air_date: string;
  tagline: string;
  overview: string;
  backdrop_path: string
}

const ContentModal: React.FC<ContentModelInterface> = ({ children, media_type, id }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [content, setContent] = useState<ContentInterface>();
  const [video, setVideo] = useState([]);

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=en-US`
    );

    setContent(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=en-US`
    );

    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
  }, []);

  return (
    <>
      <Content onClick={handleOpen}>
        {children}
      </Content>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{display: "flex", justifyContent: "center", alignItems: "center"}}
      >
        <Box sx={style}>
        {content && (
              <ContentModalContainer>
                <ContentModalPortrait
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                />
                <ContentModalLandscape
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content.name || content.title}
                />
                <ContentModalAbout>
                  <ContentModalTitle>
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </ContentModalTitle>
                  {content.tagline && (
                    <Tagline >{content.tagline}</Tagline>
                  )}

                  <ContentModalDescription>
                    {content.overview}
                  </ContentModalDescription>

                  <div>
                    <Carousel id={id} media_type={media_type} />
                  </div>

                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
                  </ContentModalAbout>
                </ContentModalContainer>
          )}
        </Box>
      </Modal>
    </>
  );
}

export default ContentModal;