import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from '../image/vendit-logo-black.png';

function Home() {
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