import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import ErrorMessage from "../../components/ErrorMessage";
import { RegisterForm } from "./styles";

const LOGIN_MUTATION = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      newToken
      newRefreshToken
    }
  }
`;

const Login = props => {
  const [loginUser, { data, error }] = useMutation(LOGIN_MUTATION);

  const graphqlError = error && error.message;

  if (data && data.login) {
    console.log("Login complete");
    props.history.push("/");
    const { newRefreshToken, newToken } = data.login;
    localStorage.setItem("token", newToken);
    localStorage.setItem("refreshToken", newRefreshToken);
  }

  return (
    <Formik
      initialValues={{ password: "", email: "" }}
      validationSchema={() =>
        Yup.object().shape({
          email: Yup.string()
            .email("Invalid email")
            .required("Required"),
          password: Yup.string().required("No password provided.")
        })
      }
      onSubmit={async values => {
        try {
          await loginUser({
            variables: {
              email: values.email,
              password: values.password
            }
          });
        } catch (e) {
          console.log(e);
        }
      }}
    >
      {({ values, errors, handleChange, handleSubmit }) => (
        <RegisterForm onSubmit={handleSubmit}>
          <h1>Login</h1>
          <TextField
            required
            id="outlined-required"
            label="Email"
            name="email"
            variant="outlined"
            placeholder="enter email"
            value={values.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            required
            id="outlined-required"
            label="Password"
            name="password"
            variant="outlined"
            placeholder="enter password"
            value={values.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button variant="contained" color="primary" type="submit">
            Sign up
          </Button>
          {graphqlError && <ErrorMessage msg={graphqlError} />}
        </RegisterForm>
      )}
    </Formik>
  );
};

export default Login;
