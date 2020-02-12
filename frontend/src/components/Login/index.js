import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import styled from "@emotion/styled";

import Alert from "../Alert";

const Button = styled.button`
`;

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
      {({
        values,
        handleChange,
        handleSubmit,
        touched,
        handleBlur,
        errors
      }) => (
        <>
          {Object.keys(errors).length > 0 && <Alert />}
          <form
            onSubmit={handleSubmit}
            action=""
            className="bg-white shadow-md rounded px-8 py-8 pt-8"
          >
            <div className="px-4 pb-4">
              <label htmlFor="email" className="text-sm block font-bold pb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="john@doe.com"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-700 leading-tight focus:outline-none focus:shadow-outline"
              ></input>
            </div>
            <div className="px-4 pb-4">
              <label
                htmlFor="password"
                className="text-sm block font-bold pb-2"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Enter your password"
                className={
                  "shadow appearance-none border rounded w-full py-2 px-3 text-grey-700 leading-tight focus:outline-none focus:shadow-outline" +
                  (errors.password ? " border border-red-500" : "")
                }
              ></input>
            </div>
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 mx-4 rounded"
            >
              Login
            </Button>
          </form>
        </>
      )}
    </Formik>
  );
};

export default Login;
