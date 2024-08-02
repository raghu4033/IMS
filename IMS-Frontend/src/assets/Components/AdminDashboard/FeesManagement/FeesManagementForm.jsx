import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import ApiService from "../../../../Utils/ApiService";
import { Drawer } from "../../Common/Drawer";

export const FeesManagementForm = ({ open, onClose, getStudentFees }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const getStudents = async () => {
    try {
      setLoading(true);
      const resp = await ApiService.get(
        `${ApiService.ApiURLs.getUsers}?role=STUDENT`
      );
      if (resp.status === 200 && resp.data?.data) {
        console.log(resp.data.data);
        setStudents(resp?.data?.data || []);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  const saveStudentFees = async (data) => {
    try {
      setLoading(true);
      const resp = await ApiService.post(ApiService.ApiURLs.saveStudentFees, {
        ...data,
      });
      if (resp.status === 200 && resp.data?.data) {
        console.log("Student Fee Installment saved successfully.");
        onClose();
        getStudentFees();
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const { values, handleChange, handleSubmit, errors, setFieldValue, touched } =
    useFormik({
      initialValues: {
        student: "",
        feesAmount: "",
        remainingFees: "",
        paymentDate: "",
        installmentNumber: "",
        paymentType: "",
      },
      validationSchema: Yup.object({
        student: Yup.string()
          .trim()
          .length(24)
          .required("Please select Student.")
          .typeError("Please select Student."),
        feesAmount: Yup.number()
          .min(1)
          .required("Fees amount is required.")
          .typeError("Fees amount is required.")
          .test(
            "remainingAmount",
            "Fees amount should be less than or equals to remaining fees.",
            function (value) {
              return (
                value &&
                this.parent.remainingFees &&
                Number(value) <= Number(this.parent?.remainingFees)
              );
            }
          ),
        remainingFees: Yup.number()
          .min(1)
          .required("Remaining Fees is required.")
          .typeError("Remaining Fees is required."),
        paymentDate: Yup.date()
          .required("Payment Date is required.")
          .typeError("Payment Date is required."),
        installmentNumber: Yup.string()
          .trim()
          .required("Installment Number is requirement.")
          .typeError("Installment Number is requirement."),
        paymentType: Yup.string()
          .trim()
          .required("Please select Payment Type.")
          .typeError("Please select Payment Type."),
      }),
      onSubmit: (data) => {
        saveStudentFees(data);
      },
    });

  console.log(errors);

  return (
    <Drawer
      isOpen={open}
      onClose={onClose}
      title={"Fees Collection"}
      footer={
        <>
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit} disabled={loading} type="submit">
            Submit
          </button>
        </>
      }
    >
      <div className="form-container">
        <form>
          <div className="form-section">
            <div className="form-group form-group-column">
              <div className="form-group">
                <label htmlFor="student">Student Name:</label>
                <select
                  id="student"
                  name="student"
                  value={values.student}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setFieldValue("student", e.target.value);
                    console.log(
                      students.find((i) => i._id === e.target.value)
                        ?.remainingFees
                    );
                    const remainingFees =
                      students.find((i) => i._id === e.target.value)
                        ?.remainingFees || 0;
                    setFieldValue("feesAmount", remainingFees);
                    setFieldValue("remainingFees", remainingFees);
                  }}
                >
                  <option value="" disabled selected>
                    Choose Your Student
                  </option>
                  {students.map((student) => {
                    return (
                      <option value={student._id} key={student._id}>
                        {[student?.firstName, student?.lastName]
                          .filter(Boolean)
                          .join(" ")}
                      </option>
                    );
                  })}
                </select>
                {touched?.student && errors?.student ? (
                  <span className="error-text">{errors?.student}</span>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="form-group form-group-column">
              <label htmlFor="paymentDate">Date:</label>
              <input
                type="date"
                id="paymentDate"
                name="paymentDate"
                disabled={!values.student}
                onChange={handleChange}
                value={values.paymentDate}
                max={new Date().toISOString().split("T")[0]}
              />
              {touched?.paymentDate && errors?.paymentDate ? (
                <span className="error-text">{errors?.paymentDate}</span>
              ) : (
                <></>
              )}
            </div>
            <div className="form-group form-group-column">
              <label htmlFor="remainingFees">Amount:</label>
              <input
                type="number"
                id="remainingFees"
                name="remainingFees"
                placeholder="Remaining Fees"
                disabled={true}
                value={values.remainingFees}
              />
              {touched?.remainingFees && errors?.remainingFees ? (
                <span className="error-text">{errors?.remainingFees}</span>
              ) : (
                <></>
              )}
            </div>
            <div className="form-group form-group-column">
              <label htmlFor="feesAmount">Amount:</label>
              <input
                type="number"
                id="feesAmount"
                name="feesAmount"
                placeholder="Fees Amount"
                disabled={!values.student}
                onChange={handleChange}
                value={values.feesAmount}
              />
              {touched?.feesAmount && errors?.feesAmount ? (
                <span className="error-text">{errors?.feesAmount}</span>
              ) : (
                <></>
              )}
            </div>
            <div className="form-group form-group-column">
              <label htmlFor="installmentNumber">Installment Number:</label>
              <input
                type="number"
                id="installmentNumber"
                name="installmentNumber"
                placeholder="Installment Number"
                disabled={!values.student}
                onChange={handleChange}
                value={values.installmentNumber}
              />
              {touched?.installmentNumber && errors?.installmentNumber ? (
                <span className="error-text">{errors?.installmentNumber}</span>
              ) : (
                <></>
              )}
            </div>
            <div className="form-group form-group-column">
              <label htmlFor="paymentType">Payment Type:</label>
              <select
                id="paymentType"
                name="paymentType"
                disabled={!values.student}
                onChange={handleChange}
                value={values.paymentType}
              >
                <option value="" disabled selected>
                  Choose Payment Type
                </option>
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="cheque">Cheque</option>
              </select>
              {touched?.paymentType && errors?.paymentType ? (
                <span className="error-text">{errors?.paymentType}</span>
              ) : (
                <></>
              )}
            </div>
          </div>
        </form>
      </div>
    </Drawer>
  );
};
