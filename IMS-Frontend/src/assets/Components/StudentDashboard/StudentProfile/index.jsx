import { useEffect, useState } from "react";
import ApiService from "../../../../Utils/ApiService";
import userLogo from "../../../Images/user.png";
import "../styles.css";
import moment from "moment";

export const StudentProfile = () => {
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(null);

  const getUserProfile = async () => {
    try {
      setLoading(true);
      const resp = await ApiService.get(ApiService.ApiURLs.getUserProfile);
      if (resp.status === 200 && resp.data?.data) {
        setUserProfile(resp.data.data);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <>
      <div className="container">
        <div className="student-profile-displau-column column-three">
          <div className="box student-profile-img">
            <img src={userLogo} alt="User Image" />
            <h2>{[userProfile?.firstName, userProfile?.lastName].filter(Boolean).join(" ")}</h2>
            <hr />
            <div className="student-info"><strong>Email:</strong> {userProfile?.email || "N/A"}</div>
            <div className="student-info"><strong>Phone:</strong>  {userProfile?.mobile || "N/A"}</div>
            <div className="student-info"><strong>Location:</strong> {userProfile?.city || "N/A"}</div>
          </div>
        </div>
        <div className="student-profile-displau-column column-seven">
          <div className="box">
            <h2>Personal Details</h2>
            <hr />
            <div className="student-info"><strong>Full Name: </strong>{[userProfile?.firstName, userProfile?.lastName].filter(Boolean).join(" ")}</div>
            <div className="student-info"><strong>Father&apos;s Name: </strong>{[userProfile?.middleName, userProfile?.lastName].filter(Boolean).join(" ")}</div>
            <div className="student-info"><strong>Date of Birth: </strong>{userProfile?.dob ? moment(userProfile?.dob).format("MMM DD, YYYY") : "N/A"}</div>
            <div className="student-info"><strong>Gender: </strong>{userProfile?.gender || "N/A"}</div>
            <div className="student-info"><strong>City: </strong>{userProfile?.city || "N/A"}</div>
            <div className="student-info"><strong>Zip Code: </strong>{userProfile?.pincode || "N/A"}</div>
            <div className="student-info"><strong>Phone: </strong>{userProfile?.mobile || "N/A"}</div>
            <div className="student-info"><strong>Email: </strong>{userProfile?.email || "N/A"}</div>
          </div>
        </div>
      </div>
    </>
  );
};
