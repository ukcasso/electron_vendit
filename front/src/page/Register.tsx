import React, { useState, useContext } from "react";
import styled from 'styled-components';
import UserContext from '../context/userContext'
import Axios from "axios";
import { Link } from 'react-router-dom';
import Logo from '../image/vendit-logo-black.png';
import { useHistory } from "react-router-dom";

const SignUpContainer = styled.div`
  display: flex;
  text-align: center;
  align-content: center;
  align-items: center;
`

const SignUpBox = styled.div`
  width: 400px;
  height: 500px;
  background-color: white;
  padding: 10px 20px;
  margin: 10px;
  border-radius: 10px;
  border: none;
  appearance: none;
  font-size: 1.3rem;
  box-shadow: 0px 8px 28px -6px rgba(24, 39, 75, 0.12),
    0px 18px 88px -4px rgba(24, 39, 75, 0.14);
  transition: transform ease-in 0.1s;
`

const LogoImgLink = styled(Link)`

`

const LogoImg = styled.img`
  margin-top: 50px;
  width: 200px;
`

const StyledInput = styled.input`
  margin-top: 60px;
  font-size: 1rem;
  font-family: "Montserrat", sans-serif;
  border: none;
  border-bottom: 1px solid gray;
  padding-bottom: 0.5rem;
  outline: none;
  width: 70%;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid gray;
  }
  & + & {
    margin-top: 2rem;
  }
`;

const StyledButton = styled.button`
  margin-top: 80px;
  background-color: #424242;
  color: #fff;
  width: 200px;
  height: 50px;
  box-shadow: 0px 8px 28px -6px rgba(24, 39, 75, 0.12),
    0px 18px 88px -4px rgba(24, 39, 75, 0.14);
  transition: transform ease-in 0.1s;
`




function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();
  const [confirmpassword, setConfirmpassword] = useState('');
  const { setUserData } = useContext(UserContext);
  const history = useHistory();
 

  const submit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const loginUser = { email, password, confirmpassword};
      const loginRes = await Axios.post("http://localhost:3030/api/auth/register", loginUser);
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("user-auth-token", loginRes.data.token);
      history.push("/login");
    } catch (err) {
      console.log(err)
    }
  };


  return (
    <SignUpContainer>
    <SignUpBox>
      <LogoImgLink to='/'>
        <LogoImg src={Logo} />
      </LogoImgLink>
      <form onSubmit={submit}> 
        <StyledInput
          autoComplete="email"
          name="email"
          type="email"
          placeholder="EMAIL"
          onChange={(e) => setEmail(e.target.value)}
        />
        <StyledInput
          autoComplete="password"
          name="password"
          type="password"
          placeholder="PASSWORD"
          onChange={(e) => setPassword(e.target.value)}
        />
        <StyledInput
          autoComplete="password"
          name="confirm_password"
          type="password"
          placeholder="CONFIRM PASSWORD"
          onChange={(e) => setConfirmpassword(e.target.value)}
        />
        <StyledButton type="submit" >
          SIGN UP
        </StyledButton>
      </form>
    </SignUpBox>
  </SignUpContainer>
  )
}

export default Signup;
