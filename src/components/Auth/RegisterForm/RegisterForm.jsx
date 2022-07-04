import React from "react";
import { Form, Button } from "semantic-ui-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import "./RegisterForm.scss";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { REGISTER } from "../../../gql/user.js";

const RegisterForm = ({ setShowLogin }) => {
  const [register] = useMutation(REGISTER);
  const formik = useFormik({
    initialValues: initialValue(),
    validationSchema: Yup.object({
      name: Yup.string().required("The name field is required"),
      username: Yup.string()
        .matches(
          /^[a-zA-Z0-9-]*$/,
          "The username asdsafield must not contain white spaces"
        )
        .required("The username field is required"),
      email: Yup.string()
        .email("The email is not valid")
        .required("The email field is required"),
      password: Yup.string().required("Password field is required"),
      confirmPassword: Yup.string()
        .required("Confirm password field is required")
        .oneOf(
          [Yup.ref("password")],
          "Confirm password and password field don`t match with each other"
        ),
    }),
    onSubmit: async (formValue) => {
      try {
        const newUser = formValue;
        delete newUser.confirmPassword;
        await register({ variables: { input: newUser } });
        toast.success("User registered successfully!!!");
        setShowLogin(true);
        return;
      } catch (error) {
        toast.error(error.message);
        console.log(error.message);
      }
    },
  });

  return (
    <>
      <h2 className="register-form-title">
        Sign in to watch pictures and videos from your friends.
      </h2>
      <Form onSubmit={formik.handleSubmit} className="register-form">
        <Form.Input
          onChange={formik.handleChange}
          type="text"
          placeholder="Name and lastname"
          name="name"
          value={formik.values.name}
          error={formik.errors.name && true}
        />
        <Form.Input
          onChange={formik.handleChange}
          type="email"
          placeholder="Email"
          name="email"
          value={formik.values.email}
          error={formik.errors.email && true}
        />
        <Form.Input
          onChange={formik.handleChange}
          type="text"
          placeholder="Username"
          name="username"
          value={formik.values.username}
          error={formik.errors.username && true}
        />
        <Form.Input
          onChange={formik.handleChange}
          type="password"
          placeholder="Password"
          name="password"
          value={formik.values.password}
          error={formik.errors.password && true}
        />
        <Form.Input
          onChange={formik.handleChange}
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={formik.values.confirmPassword}
          error={formik.errors.confirmPassword && true}
        />
        <Button type="submit" className="btn-submit">
          Sign in
        </Button>
      </Form>
    </>
  );
};

const initialValue = () => {
  return {
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  };
};

export default RegisterForm;
