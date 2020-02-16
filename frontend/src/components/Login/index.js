import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import styled from "styled-components";

import Alert from "../Alert";
import { Input, Icon, Form, Button } from "antd";

const Header = styled.p`
  font-size: 20px;
  margin-bottom: 0.5rem;
`;

const FormWrapper = styled(Form)`
  padding: 0 3rem;
`;

const FormItem = styled(Form.Item)`
  margin: 0;
`;

const SubmitButton = styled(Button)`
  background: #ec4079;
  border: 0;

  &:hover {
      background-color: #ec4079;
      opacity:.8;
  }
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
  const [loading, setLoading] = React.useState(false);
  const graphqlError = error && error.message;

  if (data && data.login) {
    console.log("Login complete");
    props.history.push("/");
    const { newRefreshToken, newToken } = data.login;
    localStorage.setItem("token", newToken);
    localStorage.setItem("refreshToken", newRefreshToken);
  }

  const handleLogin = async values => {
    setLoading(true);
    try {
      await loginUser({
        variables: {
          email: values.email,
          password: values.password
        }
      });
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
    setLoading(false);
  };

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
      onSubmit={handleLogin}
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
         <FormWrapper onSubmit={handleSubmit} action="">
            <div className="px-4 pb-4">
              <Header>SIGN IN</Header>
              <FormItem
                hasFeedback
                extra={errors.email}
                validateStatus={!!errors.email ? "error" : ""}
              >
                <Input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="Email"
                  size="large"
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                />
              </FormItem>
            </div>
            <div className="px-4 pb-4">
              <FormItem
                hasFeedback
                extra={errors.password}
                validateStatus={!!errors.password ? "error" : ""}
              >
                <Input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="Password"
                  size="large"
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                />
              </FormItem>
            </div>

            <div className="px-4 pb-4">
              <SubmitButton block loading={loading} htmlType="submit" type="primary">
                Login
              </SubmitButton>
            </div>
          </FormWrapper>
        </>
      )}
    </Formik>
  );
};

export default Login;
