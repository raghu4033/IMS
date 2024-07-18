import userLogo from "../../../Images/user.png";
import ApiService from "../../../../Utils/ApiService";
import "../styles.css";

export const StudentProfile = () => {
  return(
  <>
    <div class="container">
      <div class="student-profile-displau-column column-three">
          <div class="box student-profile-img">
              <img src={userLogo} alt="User Image"/>
              <h2>Harshad Vinubhai</h2>
              <hr/>
              <div class="student-info"><strong>Email:</strong> admin@admin.com</div>
              <div class="student-info"><strong>Phone:</strong> 2268997480</div>
              <div class="student-info"><strong>Location:</strong> Kitchener</div>
          </div>
      </div>
      <div class="student-profile-displau-column column-seven">
          <div class="box">
              <h2>Personal Details</h2>
              <hr/>
              <div class="student-info"><strong>Full Name:</strong> Harshad Satasiya</div>
              <div class="student-info"><strong>Father's Name:</strong> Vinubhai Satasiya</div>
              <div class="student-info"><strong>Date of Birth:</strong> Dec. 12, 2000</div>
              <div class="student-info"><strong>Gender:</strong> Male</div>
              <div class="student-info"><strong>Address:</strong> 37 Broadmoor Ave</div>
              <div class="student-info"><strong>City:</strong> Kitchener</div>
              <div class="student-info"><strong>Zip Code:</strong> 364522</div>
              <div class="student-info"><strong>Phone:</strong> 2268997480</div>
              <div class="student-info"><strong>Email:</strong> admin@admin.com</div>
          </div>
      </div>
    </div>
  </>
);
};
