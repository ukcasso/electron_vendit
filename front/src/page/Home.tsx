import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from '../image/vendit-logo-black.png';
import userContext from "../context/userContext"

function Home() {
  const { userData } = useContext(userContext);
  const HomeContainer = styled.div`
    text-align: center;
  `

  const LogoImg = styled.img`
    width: 200px;
  `


  const HomeBtn = styled.div`
  
  `

  return (
    <HomeContainer>
      {console.log("userData", userData)}
      <LogoImg src={Logo} />
      <p>Management Program</p>
      <HomeBtn>
        <Link to="/signin">
          <button>
            SIGN IN
          </button>
        </Link>
        <Link to="/signup">
          <button>
            SIGN UP
          </button>
        </Link>
      </HomeBtn>
    </HomeContainer>
  );
};

export default Home;