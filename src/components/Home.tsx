import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    console.log(`Access token: ${token}`);
    if (token) {
      console.log("true");
      navigate("/todos");
    } else {
      console.log("false");
    }
  }, []);
  const handleSigninClick = () => {
    axios
      .post(
        "https://www.pre-onboarding-selection-task.shop/auth/signin",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(({ data }) => {
        console.log("login Success");
        localStorage.setItem("access_token", data.access_token);
        navigate("/todos");
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="home">
      <div className="signin-title">SIGN IN</div>
      <div className="signin-container">
        <input
          className="signin-input"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="아이디"
        />
        <input
          className="signin-input"
          placeholder="비밀번호"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="signin-button-conatainer">
          <input
            className="submit-button"
            type="button"
            value={"로그인"}
            onClick={handleSigninClick}
          />
          <Link to={"/signup"}>
            <div className="submit-button">회원가입</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
