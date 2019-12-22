import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';



const USERS_QUERY = gql`
  {
    users {
      id
      email
    }
  }
`;

const Users = () => {
    const { loading, error, data } = useQuery(USERS_QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
  
    return data.users.map(({ id, email }) => (
      <div key={id}>
        <p>
          {email}
        </p>
      </div>
    ));
}

export default Users;