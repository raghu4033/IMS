import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import ApiService from "../../../../Utils/ApiService";
import { Drawer } from "../../Common/Drawer";
import moment from "moment";
import { ImageUpload } from "../../Common/ImageUpload";

export const SubmissionForm = ({ getStudentSubmissions, open, onClose }) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    getSubmissions();
  }, []);

  const getSubmissions = async () => {
    try {
      setLoading(true);
      const resp = await ApiService.get(ApiService.ApiURLs.getSubmissions);
      if (resp.status === 200 && resp.data?.data) {
        console.log(resp.data.data);
        setSubmissions(resp?.data?.data || []);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const saveCapstoneSubmissions = async (data) => {
    try {
      setErrorMessage(null);
      setLoading(true);
      const resp = await ApiService.post(
        ApiService.ApiURLs.saveStudentSubmission,
        {
          ...data,
        }
      );
      if (resp.status === 200 && resp.data?.data) {
        console.log("Student Submission saved successfully.");
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

  const { values, handleChange, handleSubmit, errors, touched, setFieldValue } =
    useFormik({
      initialValues: {
        submission: "",
        fileUrl: "",
        description: "",
      },
      validationSchema: Yup.object({
        submission: Yup.string()
          .trim()
          .length(24)
          .required("Please select submission.")
          .typeError("Please select submission."),
        fileUrl: Yup.string()
          .trim()
          .required("Please upload file.")
          .typeError("Please upload file."),
        description: Yup.string()
          .trim()
          .required("Please enter valid description.")
          .typeError("Please enter valid description."),
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
        <div className="form-group form-group-column">
          <label htmlFor="submission">Submission Name:</label>
          <select
            id="submission"
            name="submission"
            value={values.submission}
            onChange={handleChange}
          >
            <option value="" disabled selected>
              Choose Your Submission
            </option>
            {submissions.map((sub) => {
              return (
                <option value={sub._id} key={sub._id}>
                  {sub.title} (
                  {`${moment(sub.fromDate).format("DD/MM/YYYY")} -
                    ${moment(sub.toDate).format("DD/MM/YYYY")}`}
                  )
                </option>
              );
            })}
          </select>
          {touched?.submission && errors?.submission ? (
            <span className="error-text">{errors?.submission}</span>
          ) : (
            <></>
          )}
        </div>
        <div className="form-section">
          <div className="section-heading">File</div>
          <div className="form-group">
            <label htmlFor="photo">Upload File:</label>
            <ImageUpload
              error={
                touched?.fileUrl && errors?.fileUrl ? errors.fileUrl : null
              }
              onUpload={(url) => {
                console.log(url);
                setFieldValue("fileUrl", url);
              }}
              onDelete={() => {
                setFieldValue("fileUrl", "");
              }}
              onError={() => {}}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Description"
            value={values.description}
            disabled={!values.submission}
            onChange={handleChange}
          />
          {touched?.description && errors?.description ? (
            <span className="error-text">{errors?.description}</span>
          ) : (
            <></>
          )}
        </div>
      </div>
    </Drawer>
  );
};
