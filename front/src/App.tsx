import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import UserContext from "./context/userContext";
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';

import Home from './page/Home';
import Signin from './page/Signin';
import Signup from './page/Signup';



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
      // if(tokenRes) {
      //   setUserData({
      //     token
      //   })
      // }
    
    }
    checkLoggedIn();
  }, [])

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <Router>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/signin" component={Signin}/>
          <Route path="/signup" component={Signup}/>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}
