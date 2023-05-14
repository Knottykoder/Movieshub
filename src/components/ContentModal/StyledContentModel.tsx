import styled from "styled-components";

export const ContentModalLandscape = styled.img`
  object-fit: contain;
  border-radius: 10px;

  @media (min-width: 835px) {
    display: none;
  }
`;

export const ContentModalPortrait = styled.img`
  display: none;
  object-fit: contain;
  border-radius: 10px;
  @media (min-width: 835px) {
    display: flex;
    width: 38%;
  }
`;

export const Tagline = styled.i`
  padding-bottom: 10px;
  align-self: center;
  @media (min-width: 835px) {
    display: none;
  }
`;

export const ContentModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: 835px) {
    flex-direction: row;
    justify-content: space-around;
    padding: 10px 0;
  }
`;

export const ContentModalAbout = styled.div`
  padding: 10px;
  width: 95%;
  height: 90%;
  display: flex;
  flex-direction: column;
  font-family: "Roboto", sans-serif;
  justify-content: space-evenly;
  font-weight: 300;
  @media (min-width: 835px) {
    width: 58%;
    padding: 0;
    height: 100%;
  }
`;

export const ContentModalTitle = styled.span`
  height: 12%;
  font-size: 5vw;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (min-width: 835px) {
    font-size: 3.5vw;
  }
`;

export const ContentModalDescription = styled.span`
  display: flex;
  height: 40%;
  overflow-y: scroll;
  padding: 15px;
  border-radius: 20px;
  scrollbar-width: thin; /* Firefox */
  box-shadow: inset 0 0 5px #000000;
  text-align: justify;

  &::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: 835px) {
    font-size: 22px;
  }
`;
