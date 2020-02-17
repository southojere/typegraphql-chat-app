import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Input, Icon, Form, Button, Alert } from "antd";

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

const SubmitButton = styled(Button)``;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  span {
    margin: 0.5rem 0;
    font-size: 12px;
    text-align: center;
  }
`;

const FORM_STATES = {
  LOGIN: 0,
  SIGNUP: 1
};

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

const SIGNUP_MUTATION = gql`
  mutation($options: UserInput!) {
    createUser(options: $options) {
      id
      email
    }
  }
`;

const Login = props => {
  const history = useHistory();
  const [loginUser, { data: loginData, error: loginError }] = useMutation(
    LOGIN_MUTATION
  );
  const [
    createUser,
    { data: registerData, error: registerError }
  ] = useMutation(SIGNUP_MUTATION);
  const [formState, setFormState] = React.useState(FORM_STATES.LOGIN);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const graphqlError =
    (loginError && loginError.message) ||
    (registerError && registerError.message);

  if (loginData && loginData.login) {
    history.push("/notes");
    const { newRefreshToken, newToken } = loginData.login;
    localStorage.setItem("token", newToken);
    localStorage.setItem("refreshToken", newRefreshToken);
  } else if (registerData && registerData.createUser) {
    // TODO: handle successful signup
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

  const handleSignUp = async (values, resetForm) => {
    setLoading(true);
    try {
      await createUser({
        variables: {
          options: {
            email: values.email,
            password: values.password
          }
        }
      }).then(() => {
        setMessage("Done! Try logging in :)");
        resetForm({});
      });
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
    setLoading(false);
  };

  const RenderButtons = () => {
    if (formState === FORM_STATES.LOGIN) {
      return (
        <ButtonWrapper className="px-4">
          <SubmitButton
            block
            loading={loading}
            htmlType="submit"
            type="primary"
            onClick={() => setFormState(FORM_STATES.LOGIN)}
          >
            Login
          </SubmitButton>
          <span style={{ textDecoration: "underline" }}>Or</span>
          <SubmitButton
            block
            htmlType="submit"
            onClick={() => setFormState(FORM_STATES.SIGNUP)}
          >
            Create account
          </SubmitButton>
        </ButtonWrapper>
      );
    } else if (formState === FORM_STATES.SIGNUP) {
      return (
        <ButtonWrapper className="px-4">
          <SubmitButton
            block
            loading={loading}
            htmlType="submit"
            type="primary"
            onClick={() => setFormState(FORM_STATES.SIGNUP)}
          >
            Create account
          </SubmitButton>
          <span>Or</span>
          <SubmitButton
            block
            htmlType="submit"
            onClick={() => setFormState(FORM_STATES.LOGIN)}
          >
            Login
          </SubmitButton>
        </ButtonWrapper>
      );
    }
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
      onSubmit={(values, { resetForm }) => {
        console.log("submiting");
        if (formState === FORM_STATES.SIGNUP) {
          handleSignUp(values, resetForm);
        } else if (formState === FORM_STATES.LOGIN) {
          handleLogin(values);
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
          <FormWrapper onSubmit={handleSubmit} action="">
            <div className="px-4 pb-4">
              <Header>
                {formState === FORM_STATES.LOGIN ? "SIGN IN" : "SIGN UP"}
              </Header>
              <FormItem
                hasFeedback
                extra={errors.email}
                validateStatus={!!errors.email ? "error" : ""}
              >
                <Input
                  type="email"
                  name="email"
                  value={values.email}
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
                  value={values.password}
                  onChange={handleChange}
                  placeholder="Password"
                  size="large"
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                />
              </FormItem>
            </div>
            {graphqlError && (
              <div className="px-4 pb-4">
                <Alert
                  type="error"
                  message="[GraphQL] Whoops an error occurred"
                />
              </div>
            )}
            {message && (
              <div className="px-4 pb-4">
                <Alert
                  showIcon
                  type="success"
                  message={message}
                  closable
                  onClose={() => setMessage("")}
                />
              </div>
            )}
            <RenderButtons />
          </FormWrapper>
        </>
      )}
    </Formik>
  );
};

export default Login;
