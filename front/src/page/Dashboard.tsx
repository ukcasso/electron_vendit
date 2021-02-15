import React, { useContext } from "react";
import UserContext from "../context/userContext";
import { useHistory } from "react-router-dom";

function Dashboard() {
  const { userData, setUserData } = useContext(UserContext);

  const logout = () => {
    const history = useHistory();
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("user-auth-token", "");
    localStorage.setItem("company-auth-token", "")
    
    history.push('/')
  };
  return (
    <div>
      로그인 완료
      {userData.user ? 
      <>
          <button onClick={logout}>Log out</button>
      </>
      :
      null
      }
    </div>
  )
}

export default Dashboard
