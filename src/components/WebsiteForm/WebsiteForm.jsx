import { useFormik } from "formik";
import React from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Button, Form } from "semantic-ui-react";
import "./WebsiteForm.scss";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../gql/user.js";

function WebsiteForm({ refetch, currentWebsite, setShowModal }) {
  const [updateUser] = useMutation(UPDATE_USER);
  const formik = useFormik({
    initialValues: { website: currentWebsite || "" },
    validationSchema: Yup.object({
      website: Yup.string().url().required(),
    }),
    onSubmit: async () => {
      try {
        const result = await updateUser({
          variables: {
            input: {
              website: formik.values.website,
            },
          },
        });
        if (result.data.updateUser) {
          toast.success("Website update was successfull!!!");
          refetch();
          setShowModal(false);
        } else {
          toast.error("Error on website update");
        }
      } catch (error) {
        toast.error("Error on website update");
        console.log(error);
      }
    },
  });
  return (
    <Form onSubmit={formik.handleSubmit} className="website-form">
      <Form.Input
        onChange={formik.handleChange}
        error={formik.errors.website}
        value={formik.values.website}
        placeholder="URL web"
        name="website"
      />
      <Button type="submit" className="btn-submit">
        Update
      </Button>
    </Form>
  );
}

export default WebsiteForm;
