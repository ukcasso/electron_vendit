import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import UserContext from "./context/userContext";
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';

import Home from './page/Home';
import Signin from './page/Signin';
import Signup from './page/Signup';
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
        "http://localhost:3030/tokenIsValid",
        null,
        { headers: { "x-auth-token": token }});
      console.log(tokenRes.data) // 토큰없을 시 false
      if(tokenRes) {
        const userRes = await Axios.post(
          "http://localhost:3030/emailIsVaild", 
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
  }, [])

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <Router>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/signin" component={Signin}/>
          <Route path="/signup" component={Signup}/>
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
