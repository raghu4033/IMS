import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import ApiService from "../../../../Utils/ApiService";
import { Drawer } from "../../Common/Drawer";

export const SubmissionForm = ({ getStudentSubmissions, open, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const saveCapstoneSubmissions = async (data) => {
    try {
      setErrorMessage(null);
      setLoading(true);
      const resp = await ApiService.post(
        ApiService.ApiURLs.saveCapstoneSubmissions,
        {
          ...data,
        }
      );
      if (resp.status === 200 && resp.data?.data) {
        console.log("Submission saved successfully.");
        onClose();
        getStudentSubmissions();
      }
      setLoading(false);
    } catch (err) {
      setErrorMessage(
        err?.response?.data?.error ||
          "Something went wrong. please try again later."
      );
      setLoading(false);
    }
  };

  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      title: "",
      description: "",
      fromDate: "",
      toDate: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .trim()
        .required("Please enter valid name.")
        .typeError("Please enter valid name."),
      description: Yup.string()
        .trim()
        .required("Please enter valid description.")
        .typeError("Please enter valid description."),
      fromDate: Yup.date()
        .required("Please enter valid From Date.")
        .typeError("Please enter valid From Date."),
      toDate: Yup.date()
        .required("Please enter valid To Date.")
        .typeError("Please enter valid To Date."),
    }),
    onSubmit: (data) => {
      console.log("data", data);
      saveCapstoneSubmissions(data);
    },
  });

  return (
    <Drawer
      isOpen={open}
      onClose={onClose}
      title={"Capstone Submission"}
      footer={
        <>
          <button>Cancel</button>
          <button onClick={handleSubmit} disabled={loading} type="submit">
            Submit
          </button>
        </>
      }
    >
      <div>
        {errorMessage ? (
          <span className="error-text">{errorMessage}</span>
        ) : (
          <></>
        )}
        <div className="form-group">
          <label htmlFor="fullname">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Submission Title"
            value={values.title}
            onChange={handleChange}
          />
          {touched?.title && errors?.title ? (
            <span className="error-text">{errors?.title}</span>
          ) : (
            <></>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Description"
            value={values.description}
            onChange={handleChange}
          />
          {touched?.description && errors?.description ? (
            <span className="error-text">{errors?.description}</span>
          ) : (
            <></>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="date">From Date:</label>
          <input
            type="date"
            id="date"
            name="fromDate"
            value={values.fromDate}
            onChange={handleChange}
          />
          {touched?.fromDate && errors?.fromDate ? (
            <span className="error-text">{errors?.fromDate}</span>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="date">To Date:</label>
        <input
          type="date"
          id="date"
          name="toDate"
          value={values.toDate}
          onChange={handleChange}
        />
        {touched?.toDate && errors?.toDate ? (
          <span className="error-text">{errors?.toDate}</span>
        ) : (
          <></>
        )}
      </div>
    </Drawer>
  );
};
