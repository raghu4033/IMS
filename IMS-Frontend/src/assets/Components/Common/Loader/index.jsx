import LoaderImg from "../../../Images/loaderimage.png";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <img src={LoaderImg} alt="Loading..." className="loader-image" />
    </div>
  );
};

export default Loader;
