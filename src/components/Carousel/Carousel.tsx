import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { img_300, noPicture } from "../../config/config";
import styled from "styled-components";


const CarouselItem = styled.div`
  display: flex;
  flex-direction: column;
  object-fit: contain;
  padding: 10px;
`;

const CarouselImg = styled.img`
border-radius: 10px;
  margin-bottom: 5px;
  box-shadow: 0px 0px 5px black;
`;

interface CarouselInterface {
  id: number;
  media_type: string
}

interface CreditsInterface {
  profile_path: string;
  name: string
}

const handleDragStart = (e: SyntheticEvent) => e.preventDefault();

const Gallery: React.FC<CarouselInterface> = ({ id, media_type }) => {
  const [credits, setCredits] = useState<CreditsInterface[]>([]);

  const items = credits.map((c) => (
    <CarouselItem >
      <CarouselImg
        src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
        alt={c?.name}
        onDragStart={handleDragStart}
      />
      <b className="carouselItem__txt">{c?.name}</b>
    </CarouselItem>
  ));

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };

  const fetchCredits = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=en-US`
    );
    setCredits(data.cast);
  };

  useEffect(() => {
    fetchCredits();
  }, []);

  return (
    <AliceCarousel
      mouseTracking
      infinite
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      items={items}
      autoPlay
    />
  );
};

export default Gallery;
