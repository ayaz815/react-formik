import React, { useState } from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FastField,
} from "formik";
import * as Yup from "yup";
import { TextError } from "./TextError";

const initialValues = {
  name: "ayaz",
  email: "abc@gmail.com",
  channel: "ayazdev",
  comments: "Welcome to ayazdev",
  address: "alkabir town, lahore, PK",
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNumbers: ["", ""],
  phNumbers: [""],
};

const savedValues = {
  name: "ayaz",
  email: "abc@gmail.com",
  channel: "ayazdev",
  comments: "Welcome to ayazdev",
  address: "alkabir town, lahore, PK",
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNumbers: ["", ""],
  phNumbers: [""],
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email format").required("Required"),
  channel: Yup.string().required("Required"),
});

const validateComments = (value) => {
  let error;
  if (!value) {
    error = "Required!";
  }
  return error;
};

const onsubmit = (values, onSubmitProps) => {
  console.log("Form Data:", values);
  console.log("Submit Props:", onSubmitProps);
  onSubmitProps.setSubmitting(false);
  onSubmitProps.resetForm();
};

// `formik.isDirty` will set to false initially and will be true if you will change any of te field state

const SimpleForm = () => {
  const [formValues, setFormValues] = useState(null);
  return (
    <Formik
      initialValues={formValues || initialValues}
      validationSchema={validationSchema}
      onSubmit={onsubmit}
      enableReinitialize
      // validateOnChange={false}
      // validateOnBlur={false}
      // validateOnMount
      // `validateOnMount` works fine for small forms as it will run all the validations on component mount
    >
      {(formik) => {
        console.log("formik props:", formik);
        return (
          <Form>
            <div className="form-control">
              <label htmlFor="name">Name</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component={TextError} />
            </div>
            <div className="form-control">
              <label htmlFor="email">Email</label>
              <Field type="text" id="email" name="email" />
              <ErrorMessage name="email" component={TextError} />
            </div>
            <div className="form-control">
              <label htmlFor="channel">Channel</label>
              <Field type="text" id="channel" name="channel" />
              <ErrorMessage name="channel">
                {(errorMsg) => <div className="error">{errorMsg}</div>}
              </ErrorMessage>
            </div>
            <div className="form-control">
              <label htmlFor="comments">Comments</label>
              <Field
                as="textarea"
                id="comments"
                name="comments"
                validate={validateComments}
              />
              <ErrorMessage name="comments" component={TextError} />
            </div>
            <div className="form-control">
              <label htmlFor="comments">Address</label>
              <FastField name="address">
                {(props) => {
                  const { field, form, meta } = props;
                  console.log("Render props:", props);
                  return (
                    <div>
                      <inout type="text" id="address" {...field} />
                      {meta.touched && meta.error ? (
                        <div>{meta.error}</div>
                      ) : null}
                    </div>
                  );
                }}
              </FastField>
            </div>
            <div className="form-control">
              <label htmlFor="facebook">Facebook profile</label>
              <Field type="text" id="faceboook" name="social.facebool" />
            </div>
            <div className="form-control">
              <label htmlFor="twitter">Twitter profile</label>
              <Field type="text" id="twitter" name="social.twitter" />
            </div>
            <div className="form-control">
              <label htmlFor="primaryph">Primary Phone Number</label>
              <Field type="text" id="primaryph" name="phoneNumbers[0]" />
            </div>
            <div className="form-control">
              <label htmlFor="secondaryph">Secondary Phone Number</label>
              <Field type="text" id="secondaryph" name="phoneNumbers[1]" />
            </div>
            <div className="form-control">
              <label>List of phone numbers</label>
              <FieldArray name="phNumbers">
                {(fieldArrayProps) => {
                  console.log("fieldArrayProps:", fieldArrayProps);
                  const { push, remove, form } = fieldArrayProps;
                  const { values } = form;
                  const { phNumbers } = values;
                  return (
                    <div>
                      {phNumbers.map((phNumber, index) => (
                        <div key={index}>
                          <Field name={`[${index}]`} />
                          {index > 0 && (
                            <button type="button" onClick={() => remove(index)}>
                              -
                            </button>
                          )}
                          <button type="button" onClick={() => push("")}>
                            +
                          </button>
                        </div>
                      ))}
                    </div>
                  );
                }}
              </FieldArray>
            </div>
            <button
              onClick={() => formik.validateField("comments")}
              type="button"
            >
              Validate Comments
            </button>
            <button onClick={() => formik.validateForm()} type="button">
              Validate all
            </button>
            <button
              onClick={() => formik.setFieldTouched("comments")}
              type="button"
            >
              Visit Comments
            </button>
            <button
              onClick={() =>
                formik.setTouched({
                  name: true,
                  email: true,
                  channel: true,
                  comments: true,
                })
              }
              type="button"
            >
              Visit fields
            </button>
            {/* <button disabled={!formik.isValid} type="submit">
              Submit
            </button> */}
            <button
              onClick={() => {
                setFormValues(savedValues);
              }}
              type="button"
            >
              Load Saved Values
            </button>
            <button type="reset">Reset</button>
            <button
              disabled={!formik.isValid || formik.isSubmitting}
              type="submit"
            >
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SimpleForm;
