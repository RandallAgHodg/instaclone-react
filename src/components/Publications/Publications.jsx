import { map } from "lodash";
import React from "react";
import { Grid } from "semantic-ui-react";
import PreviewPublications from "./PreviewPublications/PreviewPublications.jsx";
import "./Publications.scss";
function Publications({ publications }) {
  return (
    <div className="publications">
      <h1>Publications</h1>
      <Grid columns={4}>
        {map(publications, (publication, index) => (
          <Grid.Column key={index}>
            <PreviewPublications publication={publication} />
          </Grid.Column>
        ))}
      </Grid>
    </div>
  );
}

export default Publications;
