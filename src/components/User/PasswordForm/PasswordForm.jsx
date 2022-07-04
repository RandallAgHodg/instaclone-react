import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../gql/user.js";
import { toast } from "react-toastify";
import "./PasswordForm.scss";

function PasswordForm({ logout }) {
  const [updateUser] = useMutation(UPDATE_USER);
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object({
      currentPassword: Yup.string().required(),
      repeatNewPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("newPassword")], "The password fields do not match"),
      newPassword: Yup.string()
        .required()
        .oneOf(
          [Yup.ref("repeatNewPassword")],
          "The password fields do not match"
        ),
    }),
    onSubmit: async (formValue) => {
      try {
        const result = await updateUser({
          variables: {
            input: {
              password: formik.values.currentPassword,
              newPassword: formik.values.newPassword,
            },
          },
        });
        if (!result.data.updateUser) {
          toast.error("Error on password update");
        }
        toast.success("The password was updated successfully!!");
        logout();
      } catch (error) {
        toast.error("Error on password update");
      }
    },
  });
  return (
    <Form onSubmit={formik.handleSubmit} className="password-form">
      <Form.Input
        type="password"
        error={formik.errors.currentPassword}
        onChange={formik.handleChange}
        value={formik.values.currentPassword}
        placeholder="Current password"
        name="currentPassword"
      />
      <Form.Input
        type="password"
        error={formik.errors.newPassword}
        onChange={formik.handleChange}
        value={formik.values.newPassword}
        placeholder="New password"
        name="newPassword"
      />
      <Form.Input
        type="password"
        error={formik.errors.repeatNewPassword}
        onChange={formik.handleChange}
        value={formik.values.repeatNewPassword}
        placeholder="Repeat new password"
        name="repeatNewPassword"
      />
      <Button type="submit" className="btn-submit">
        Update
      </Button>
    </Form>
  );
}

const initialValues = () => {
  return {
    currentPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  };
};

export default PasswordForm;
