import React from "react";
import { Container } from "semantic-ui-react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function MainLayout() {
  return (
    <>
      <Header />
      <Container className="layout-basic">
        <Outlet />
      </Container>
    </>
  );
}

export default MainLayout;
