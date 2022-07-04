import React, { useState } from "react";
import "../LoginForm/LoginForm.scss";
import { Form, Button } from "semantic-ui-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../../gql/user.js";
import { setToken, decodeToken } from "../../../utils/token.js";
import useAuth from "../../../hooks/useAuth.js";
import { toast } from "react-toastify";

const LoginForm = () => {
  const { setUser } = useAuth();
  const [error, setError] = useState("");
  const [login] = useMutation(LOGIN);
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object({
      email: Yup.string().email().required(true),
      password: Yup.string().required(true),
    }),
    onSubmit: async (formValues) => {
      setError("");
      try {
        const {
          data: {
            login: { token },
          },
        } = await login({
          variables: {
            input: formValues,
          },
        });
        setToken(token);
        toast.success("User loged in successfully!!");
        setUser(decodeToken(token));
      } catch (error) {
        setError(error.message);
        console.log(error);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="login-form">
      <h2 className="register-form-title">
        Register to watch pictures and videos from your friends.
      </h2>
      <Form.Input
        onChange={formik.handleChange}
        type="text"
        placeholder="Email"
        name="email"
        error={formik.errors.email}
      />
      <Form.Input
        onChange={formik.handleChange}
        type="password"
        placeholder="Password"
        name="password"
        error={formik.errors.password}
      />
      <Button type="submit" className="btn-submit">
        Log In
      </Button>
      {error && <p className="submit-error">{error}</p>}
    </Form>
  );
};

const initialValues = () => {
  return {
    email: "",
    password: "",
  };
};

export default LoginForm;
