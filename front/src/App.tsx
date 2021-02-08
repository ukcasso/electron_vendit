import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import icon from '../assets/icon.svg';
import './App.global.css';

const Hello = () => {


  return (
    <div>
      <div className="Hello" >
        <img width="200px" alt="icon" src={icon} />
      </div>
      <h1 style={{ textAlign: "center" }}>VENDIT</h1>
      <div className="Hello">
        <a
          href="https://vendit.co.kr/"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            SIGN UP
          </button>
        </a>
        <a
          href="https://vendit.co.kr/"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            LOGIN
          </button>
        </a>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}
