import styled from "styled-components"

const Head = styled.span`
width: 100%;
cursor: pointer;
position: fixed;
display: flex;
justify-content: center;
text-transform: upppercase;
background-color: #39445a;
font-family: "Montserrat", sans-serif;
font-size: 5vw;
padding-bottom: 15px;
box-shadow: 0 1px 5px black;
color: white;
z-index: 100;

@media (max-width: 1000px){
    padding-top: 15px;
    font-size: 6.4vw; 
}
`;

const Header = () => {
  return (
    <Head onClick={()=> window.scroll(0,0)}>🎬 Movies Hub 🎥</Head>
  )
}

export default Header