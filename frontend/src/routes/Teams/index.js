import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import styled from "styled-components";
import Card from "react-bootstrap/Card";

const TEAMS_QUERY = gql`
  {
    teams {
      id
      name
    }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-gap:1rem;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
`;

const Teams = () => {
  const { loading, error, data } = useQuery(TEAMS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Grid>
      {data.teams.map(({ id, name }) => (
        <Card key={id}>
          <Card.Body>{name}</Card.Body>
        </Card>
      ))}
    </Grid>
  );
};

export default Teams;
