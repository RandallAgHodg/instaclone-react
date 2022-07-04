import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { initial } from "lodash";
import React from "react";
import { toast } from "react-toastify";
import { Button, Form, TextArea } from "semantic-ui-react";
import * as Yup from "yup";
import { UPDATE_USER } from "../../../gql/user.js";
import "./DescriptionForm.scss";

function DescriptionForm({ refetch, currentDescription, setShowModal }) {
  const [updateUser] = useMutation(UPDATE_USER);
  const formik = useFormik({
    initialValues: { description: currentDescription || "" },
    validationSchema: Yup.object({
      description: Yup.string().required(),
    }),
    onSubmit: async () => {
      try {
        const result = await updateUser({
          variables: {
            input: {
              description: formik.values.description,
            },
          },
        });

        if (result.data.updateUser) {
          toast.success("Description update was successfull!!!");
          refetch();
          setShowModal(false);
        } else {
          toast.error("Error on description update");
        }
      } catch (error) {
        toast.error("Error on description update");
        console.log(error);
      }
    },
  });
  return (
    <Form onSubmit={formik.handleSubmit} className="description-form">
      <TextArea
        className={formik.errors.description && "error"}
        onChange={formik.handleChange}
        value={formik.values.description}
        placeholder="Description"
        type="text"
        name="description"
      />
      <Button type="submit" className="btn-submit">
        Update{" "}
      </Button>
    </Form>
  );
}

const initialValues = () => {
  return {
    description: "",
  };
};
export default DescriptionForm;
