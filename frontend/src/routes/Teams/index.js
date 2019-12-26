import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';



const TEAMS_QUERY = gql`
  {
    teams {
      id
      name
    }
  }
`;

const Teams = () => {
    const { loading, error, data } = useQuery(TEAMS_QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
  
    return data.teams.map(({ id, name }) => (
      <div key={id}>
        <p>
          {name}
        </p>
      </div>
    ));
}

export default Teams;