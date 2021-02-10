import React, { useState } from "react";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from '../image/vendit-logo-black.png';
import { useMutation } from '@apollo/client';
import { ADD_USER } from './common'
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
  const [confirmpassword, setConfirmpassword] = useState('');
  const [addUser, { loading, error }] = useMutation(ADD_USER);
  const history = useHistory();
 

  const Submit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    addUser({ variables: { email: email, password: password, confirmpassword: confirmpassword } });

    setEmail("");
    setPassword("");
    if(error) {
      return alert("정보 확인바람")
    }
    // history.push("/signin");
    }


  return (
    <SignUpContainer>
    <SignUpBox>
      <LogoImgLink to='/'>
        <LogoImg src={Logo} />
      </LogoImgLink>
      <form onSubmit={Submit}> 
        <StyledInput
          autoComplete="email"
          name="email"
          type="email"
          placeholder="EMAIL"
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <StyledInput
          autoComplete="password"
          name="password"
          type="password"
          placeholder="PASSWORD"
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
        <StyledInput
          autoComplete="password"
          name="confirm_password"
          type="password"
          placeholder="CONFIRM PASSWORD"
          onChange={(e) => setConfirmpassword(e.target.value)}
          disabled={loading}
        />
        <StyledButton type="submit" disabled={loading}>
          SIGN UP
        </StyledButton>
        {error && <p style={{ color: "red" }}>Error :(</p>}
      </form>
    </SignUpBox>
  </SignUpContainer>
  )
}

export default Signup;
