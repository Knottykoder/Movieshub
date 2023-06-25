import styled from "styled-components";

export const Poster = styled.img`
border-radius: 10px;
`;

export const Title = styled.b`
width: 100%;
text-align: center;
font-size: 17px;
padding: 8px 0;
`;

export const SubTitle = styled.span`
display: flex;
justify-content: space-between;
padding-bottom: 3px;
padding: 0 2px;
`;

export const Content = styled.div`
display: flex;
flex-direction: column;
width: 200px;
padding: 5px;
margin: 5px 0;
background-color: #282c34;
border-radius: 10px;
position: relative;
font-family: "Montserrat", sans-serif;
cursor: pointer;

&:hover {
    background-color: white;
    color: black;
}
`;