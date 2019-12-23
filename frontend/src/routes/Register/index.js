import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import ErrorMessage from "../../components/ErrorMessage";
import { RegisterForm } from "./styles";

const CREATE_USER_MUTATION = gql`
  mutation($options: UserInput!) {
    createUser(options: $options) {
      id
    }
  }
`;

const Register = props => {
  const [createUser, { data }] = useMutation(CREATE_USER_MUTATION);

  return (
    <Formik
      initialValues={{ username: "", password: "", email: "" }}
      validationSchema={() =>
        Yup.object().shape({
          username: Yup.string()
            .max(20, "Please pick a shorter username")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email")
            .required("Required"),
          password: Yup.string()
            .required("No password provided.")
            .min(8, "Password is too short - should be 5 chars minimum.")
        })
      }
      onSubmit={(values, actions) => {
        createUser({
            variables: {
                options: values
            }
        })
      }}
    >
      {({ values, errors, handleChange, handleSubmit }) => (
        <RegisterForm onSubmit={handleSubmit}>
          <h1>Sign up</h1>
          <label for="username">Username</label>
          <input
            name="username"
            type="text"
            placeholder="enter username"
            value={values.username}
            onChange={handleChange}
          ></input>
          {errors.username && <ErrorMessage msg={errors.username} />}
          <label for="email">Email</label>
          <input
            name="email"
            type="text"
            placeholder="enter email"
            value={values.email}
            onChange={handleChange}
          ></input>
          {errors.email && <ErrorMessage msg={errors.email} />}
          <label for="password">Password</label>
          <input
            name="password"
            type="text"
            placeholder="enter password"
            value={values.password}
            onChange={handleChange}
          ></input>
          {errors.password && <ErrorMessage msg={errors.password} />}
          <button type="submit">Submit</button>
        </RegisterForm>
      )}
    </Formik>
  );
};

export default Register;
