import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../gql/user.js";
import { toast } from "react-toastify";
import "./EmailForm.scss";

function EmailForm({ setShowModal, refetch, currentEmail }) {
  const [updateUser] = useMutation(UPDATE_USER);
  const formik = useFormik({
    initialValues: {
      email: currentEmail || "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
    }),
    onSubmit: async () => {
      try {
        const result = await updateUser({
          variables: {
            input: {
              email: formik.values.email,
            },
          },
        });

        if (result.data.updateUser) {
          toast.success("Email update was successfull!!!");
          refetch();
          setShowModal(false);
        } else {
          toast.error("Error on email update");
        }
      } catch (error) {
        console.log(error);
        toast.error("Error on email update");
      }
    },
  });
  return (
    <Form onSubmit={formik.handleSubmit} className="email-form">
      <Form.Input
        onChange={formik.handleChange}
        error={formik.errors.email}
        value={formik.values.email}
        type="email"
        placeholder="Write your new email"
        name="email"
      />
      <Button className="btn-submit" type="submit">
        Update
      </Button>
    </Form>
  );
}

export default EmailForm;
