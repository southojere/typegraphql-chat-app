import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import ErrorMessage from "../../components/ErrorMessage";
import { RegisterForm } from "./styles";

const CREATE_TEAM_MUTATION = gql`
  mutation($name: String!) {
    createTeam(name: $name) {
        id
        name
    }
  }
`;

const CreateTeam = props => {
  const [createTeam, { data, error }] = useMutation(CREATE_TEAM_MUTATION);

  const graphqlError = error && error.message;

  if (data && data.createTeam) {
    console.log("Login complete");
  }

  return (
    <Formik
      initialValues={{ teamName: "" }}
      validationSchema={() =>
        Yup.object().shape({
            teamName: Yup.string()
            .required("Required"),
        })
      }
      onSubmit={async values => {
        try {
          await createTeam({
            variables: {
              name: values.teamName,
            }
          });
        } catch (e) {
          console.log(e);
        }
      }}
    >
      {({ values, errors, handleChange, handleSubmit }) => (
        <RegisterForm onSubmit={handleSubmit}>
          <h1>Create Team</h1>
          <TextField
            required
            id="outlined-required"
            label="Create Team"
            name="teamName"
            variant="outlined"
            placeholder="Team Bob"
            value={values.teamName}
            onChange={handleChange}
            error={!!errors.teamName}
            helperText={errors.teamName}
          />
          <Button variant="contained" color="primary" type="submit">
            Create
          </Button>
          {graphqlError && <ErrorMessage msg={graphqlError} />}
        </RegisterForm>
      )}
    </Formik>
  );
};

export default CreateTeam;
