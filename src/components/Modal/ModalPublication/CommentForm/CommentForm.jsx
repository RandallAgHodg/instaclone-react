import React from "react";
import { Button, Form } from "semantic-ui-react";
import "./CommentForm.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../../../../gql/comment.js";

function CommentForm({ publication }) {
  const [addComment] = useMutation(ADD_COMMENT);
  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: Yup.object({
      comment: Yup.string().required(true),
    }),
    onSubmit: async ({ comment }) => {
      try {
        const result = await addComment({
          variables: {
            input: {
              publicationId: publication.id,
              comment,
            },
          },
        });
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <Form className="comment-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        placeholder="Add a comment"
        name="comment"
        onChange={formik.handleChange}
        value={formik.values.comment}
        error={formik.errors.comment}
      />
      <Button type="submit">Publish</Button>
    </Form>
  );
}

export default CommentForm;
