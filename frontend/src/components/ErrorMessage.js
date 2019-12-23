import React from 'react'
import styled from 'styled-components'

const ErrorContainer = styled.div`
    display: flex;
    flex-direction: row;
    color: red;
    font-size:14px;
`

const ErrorMessage = ({msg, ...props}) => {

    const cleanedMessage = msg.replace("GraphQL error:", "");
    return <ErrorContainer>{cleanedMessage}</ErrorContainer>
}

export default ErrorMessage