import React from "react";
import { Container, Grid, Image } from "semantic-ui-react";
import "./Header.scss";
import Logo from "../../assets/png/instaclone.png";
import { Link } from "react-router-dom";
import RightHeader from "./RightHeader/RightHeader.jsx";
import Search from "./Search/Search.jsx";

function Header() {
  return (
    <div className="header">
      <Container>
        <Grid>
          <Grid.Column width={3} className="header__logo">
            <Link to="/">
              <Image src={Logo} alt="logo" />
            </Link>
          </Grid.Column>
          <Grid.Column width={10} className="">
            <Search />
          </Grid.Column>
          <Grid.Column width={3} className="header__logo">
            <RightHeader />
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}

export default Header;
