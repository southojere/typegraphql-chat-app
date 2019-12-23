import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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
  const [createUser, { data, error }] = useMutation(CREATE_USER_MUTATION);


  const graphqlError = error && error.message;

  if(data && data.createUser) {
      props.history.push('/')
  }
  
  return (
    <Formik
      initialValues={{ password: "", email: "" }}
      validationSchema={() =>
        Yup.object().shape({
          email: Yup.string()
            .email("Invalid email")
            .required("Required"),
          password: Yup.string()
            .required("No password provided.")
            .min(8, "Password is too short - should be 5 chars minimum.")
        })
      }
       onSubmit={async values => {
        try {
          await createUser({
            variables: {
              options: values,
            }
          });
        } catch (e) {
            console.log(e)
        }
      }}
    >
      {({ values, errors, handleChange, handleSubmit }) => (
        <RegisterForm onSubmit={handleSubmit}>
          <h1>Sign up</h1>
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
          {graphqlError && <ErrorMessage msg={graphqlError}/>}
          
        </RegisterForm>
      )}
    </Formik>
  );
};

export default Register;
