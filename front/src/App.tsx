import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import UserContext from "./context/userContext";
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';

import Home from './page/Home';
import Login from './page/Login';
import Register from './page/Register';
import Dashboard from './page/Dashboard';



export default function App() {  
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });


  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("user-auth-token");
      if (token === null) {
        localStorage.setItem("user-auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:3030/api/auth/tokenIsValid",
        null,
        { headers: { "x-auth-token": token }});
      console.log(tokenRes.data) // 토큰없을 시 false
      if(tokenRes.data) {
        const userRes = await Axios.get(
          "http://localhost:3030/api/auth/", 
          null, 
          {headers: { "x-auth-token": token }});
        console.log("userRes", userRes)
        setUserData({
            token,
            user: userRes.data
          }
        )
      }
    }
    checkLoggedIn();
    console.log("userData", userData)
  }, []);

  // useEffect(() => {
  //   if (localStorage.getItem("user-auth-token")) {
  //     const checkLoggedIn = async () => {
  //       let token = localStorage.getItem("user-auth-token");
  //       if (token === null) {
  //         localStorage.setItem("user-auth-token", "");
  //         token = "";
  //       }
  //       const tokenRes = await Axios.post(
  //         "http://localhost:3030/api/auth/tokenIsValid",
  //         null,
  //         { headers: { "x-auth-token": token } }
  //       );
  //       console.log(tokenRes.data); //false나온다 토큰없을시
  //       if (tokenRes.data) {
  //         const userRes = await Axios.get("http://localhost:3030/api/auth/", {
  //           headers: { "x-auth-token": token },
  //         });
  //         setUserData({
  //           token,
  //           user: userRes.data,
  //         });
  //       }
  //     };
  //     checkLoggedIn();
  //   }
  // },[]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <Router>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/Login" component={Login}/>
          <Route path="/Register" component={Register}/>
          {userData 
          ? 
          <Route path="/dashboard" component={Dashboard}/>
          :
          null
          }
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}
