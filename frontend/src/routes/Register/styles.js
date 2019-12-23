import styled from 'styled-components'

const RegisterForm = styled.form`
    display:flex;
    flex-direction: column;
    max-width: 300px;
    margin: auto;
    border: 1px solid black;
    border-radius: 10px;
    padding: 1rem;

    > div {
        margin-top:1rem;
    }

    > button {
        margin-top: 1rem;
    }
`



export {
    RegisterForm
}