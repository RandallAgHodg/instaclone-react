import React from "react";
import { Grid } from "semantic-ui-react";
import Feed from "../../components/Home/Feed/index.js";
import UsersNotFolloweds from "../../components/Home/UsersNotFolloweds/UsersNotFolloweds.jsx";
import useAuth from "../../hooks/useAuth.js";
import "./Home.scss";

function Home() {
  const { auth, getUser } = useAuth();

  return (
    <Grid className="home">
      <Grid.Column className="home__left" width={11}>
        <Feed />
      </Grid.Column>
      <Grid.Column className="home__right" width={5}>
        <UsersNotFolloweds />
      </Grid.Column>
    </Grid>
  );
}

export default Home;
