import { Badge } from "@mui/material";
import { img_300, unavailable } from "../../config/config";
import {  Poster, SubTitle, Title } from "./StyledSingleContent";
import ContentModal from "../ContentModal/ContentModal";

export interface SingleContentInterface {
  id: number;
  poster: string;
  title: string;
  date: string;
  media_type: string;
  vote_average: number;
}

const SingleContent: React.FC<SingleContentInterface> = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {
  return (
    <ContentModal media_type={media_type} id={id}>
        <Badge badgeContent={vote_average.toFixed(1)} color={vote_average > 6 ? "primary" : "secondary"}/>
      <Poster
        src={poster ? `${img_300}/${poster}` : unavailable}
        alt={unavailable}
      />
      <Title className="title">{title}</Title>
      <SubTitle className="subtitle">
        {media_type === "tv" ? "TV Series" : "Movie"}
        <SubTitle className="subtitle">{date}</SubTitle>
      </SubTitle>
    </ContentModal>
  );
};

export default SingleContent;
