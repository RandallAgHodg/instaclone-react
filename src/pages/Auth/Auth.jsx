import React, { useState } from "react";
import { Container, Image } from "semantic-ui-react";
import RegisterForm from "../../components/Auth/RegisterForm";
import instaclone from "../../assets/png/instaclone.png";
import "./Auth.scss";
import LoginForm from "../../components/Auth/LoginForm";

export default function Auth() {
  const [showLogin, setShowLogin] = useState(true);
  return (
    <Container fluid className="auth">
      <Image src={instaclone} />

      <div className="container-form">
        {showLogin ? (
          <LoginForm />
        ) : (
          <RegisterForm setShowLogin={setShowLogin} />
        )}
      </div>

      <div className="change-form">
        {showLogin ? (
          <>
            Create an account
            <span onClick={() => setShowLogin(!showLogin)}>Register</span>
          </>
        ) : (
          <>
            Login with your account
            <span onClick={() => setShowLogin(!showLogin)}>Login</span>
          </>
        )}
      </div>
    </Container>
  );
}
