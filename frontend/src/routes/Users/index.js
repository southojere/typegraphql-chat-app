import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Card from "react-bootstrap/Card";
import styled from 'styled-components'

const USERS_QUERY = gql`
  {
    users {
      id
      email
    }
  }
`;


const Grid = styled.div`
    display:grid;
    grid-gap:1rem;
    grid-template-columns: repeat( auto-fit, minmax(150px, 1fr) );
`

const Users = () => {
  const { loading, error, data } = useQuery(USERS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Grid>
        {data.users.map(({ id, email }) => (
          <Card key={id}>
            <Card.Body>{email}</Card.Body>
          </Card>
        ))}
    </Grid>
  );
};

export default Users;
