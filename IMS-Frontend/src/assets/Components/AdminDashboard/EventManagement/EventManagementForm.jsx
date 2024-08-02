import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import ApiService from "../../../../Utils/ApiService";
import { Drawer } from "../../Common/Drawer";

export const EventManagementForm = ({ getEvents, open, onClose }) => {
  const [loading, setLoading] = useState(false);

  const localStore = JSON.parse(
    localStorage.getItem("ims:auth:profile") || "{}"
  );

  console.log("local", localStore);

  const saveEvent = async (data) => {
    try {
      setLoading(true);
      const resp = await ApiService.post(ApiService.ApiURLs.saveEvent, {
        ...data,
      });
      if (resp.status === 200 && resp.data?.data) {
        console.log("Event saved successfully.");
        onClose();
        getEvents();
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      name: "",
      place: "",
      date: "",
      user: localStore?._id,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .trim()
        .required("Event Name is required.")
        .typeError("Event Name is required."),
      place: Yup.string()
        .trim()
        .required("Event Place is required.")
        .typeError("Event Place is required."),
      date: Yup.date()
        .required("Event Date is required.")
        .typeError("Event Date is required."),
    }),
    onSubmit: (data) => {
      saveEvent(data);
    },
  });

  return (
    <Drawer
      isOpen={open}
      onClose={onClose}
      title={"Create Event"}
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
        <div className="form-group">
          <label htmlFor="name">Event Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Event Name"
            value={values.name}
            onChange={handleChange}
          />
          {touched?.name && errors?.name ? (
            <span className="error-text">{errors?.name}</span>
          ) : (
            <></>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="place">Event Place:</label>
          <input
            type="text"
            id="place"
            name="place"
            placeholder="Event Place"
            value={values.place}
            onChange={handleChange}
          />
          {touched?.place && errors?.place ? (
            <span className="error-text">{errors?.place}</span>
          ) : (
            <></>
          )}
        </div>
        <div className="form-group form-group-column">
          <label htmlFor="date">Event Date:</label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            pattern="[0-9]{10}"
            placeholder="Event Date"
            value={values.date}
            onChange={handleChange}
          />
          {touched?.date && errors?.date ? (
            <span className="error-text">{errors?.date}</span>
          ) : (
            <></>
          )}
        </div>
      </div>
    </Drawer>
  );
};
