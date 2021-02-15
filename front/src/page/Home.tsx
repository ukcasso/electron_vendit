import React, { useContext } from 'react';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import Logo from '../image/vendit-logo-black.png';
import userContext from "../context/userContext"


const HomeContainer = styled.div`
text-align: center;
`

const LogoImg = styled.img`
width: 200px;
`


const HomeBtn = styled.div`

`

function Home() {
  const { userData, setUserData } = useContext(userContext);
  
  const history = useHistory();
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("user-auth-token", "");
    
    history.push('/')
    window.location.reload();
    
  };



  return (
    <HomeContainer>
      {console.log("userData", userData)}
      <LogoImg src={Logo} />
      <p>Management Program</p>
      <HomeBtn>
        {userData.user ? 
        <button onClick={logout}>Log out</button>
        :
        <>
        <Link to="/login">
          <button>
            SIGN IN
          </button>
        </Link>
        <Link to="/register">
          <button>
            SIGN UP
          </button>
        </Link>
        </>
        }
        
      </HomeBtn>
    </HomeContainer>
  );
};

export default Home;