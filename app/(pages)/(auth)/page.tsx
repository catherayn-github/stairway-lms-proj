import React from "react";
import LoginForm from "./_components/LoginForm";
import Container from "@app/_components/Container";

const LoginPage = () => {
  return (
    <Container className="flex h-dvh items-center justify-center flex-col">
      <LoginForm />
    </Container>
  );
};

export default LoginPage;
