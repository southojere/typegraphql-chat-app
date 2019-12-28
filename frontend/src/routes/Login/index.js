import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import ErrorMessage from "../../components/ErrorMessage";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
      onSubmit={async (values) => {
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
      {({
        values,
        handleChange,
        handleSubmit,
        touched,
        handleBlur,
        errors,
      }) => (
        <Form onSubmit={handleSubmit}>
          {console.log(errors)}
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
              isValid={touched.email && !errors.email}
              value={values.email}
              onBlur={handleBlur}
            />
            {touched.email && <ErrorMessage msg={errors.email}/>}
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={values.password}
              onBlur={handleBlur}
              isValid={touched.password && !errors.password}
            />
            {touched.password && <ErrorMessage msg={errors.password}/>}
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
          {graphqlError && <ErrorMessage msg={graphqlError} />}
        </Form>
      )}
    </Formik>
  );
};

export default Login;
