import logo from "../assets/Handwritting-logo-green.png";
import backButton from "../assets/back.png";
import { TakeMeConstants } from "../Utils/TakeMeConstants";

const TakeMeBar = ({ title, route, setOpenImageManager }) => {

  return (
    <div className="col-13" style={{ borderRadius: '10px' , border: '1px solid #E5E5E5', boxShadow: "0px 2px 2px -3px gray" }}>
      <nav
        className="row align-content-center shadow-sm"
        style={{ backgroundColor: '#FFFFFF', height: "70px" }}
      >
        <div
          className="col-4 d-flex align-items-center"
          style={{ paddingLeft: "25px" }}
          onClick={() => setOpenImageManager(false)}
        >
            <img
              src={backButton}
              alt="Back Button"
              style={{ height: "50%", width: "auto" }}
            />
        </div>
        <div className="col-4 d-flex align-items-center">
          <div
            style={{
                color: TakeMeConstants.PRIMARY_COLOR,
              fontSize: TakeMeConstants.LARGE_TEXT_SIZE,
              fontWeight: "bold",
            }}
          >
            {title}
          </div>
        </div>
        <div className="col-4 d-flex align-items-center">
          <a className="navbar-brand">
            <img
              src={logo}
              style={{ maxWidth: "99px", height: "90%" }}
              alt="Logo"
            />
          </a>
        </div>
      </nav>
    </div>
  );
};

export default TakeMeBar;
