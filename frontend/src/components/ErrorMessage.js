import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types';

const ErrorContainer = styled.div`
    display: flex;
    flex-direction: row;
    color: red;
    font-size:11px;    
    padding-top: 5px;
`

const ErrorMessage = ({msg, ...props}) => {

    const cleanedMessage = msg.replace("GraphQL error:", "");
    return <ErrorContainer>{cleanedMessage}</ErrorContainer>
}


ErrorMessage.propTypes = {
    msg:  PropTypes.string.isRequired
}

ErrorMessage.defaultProps = {
    msg: ''
  };

export default ErrorMessage