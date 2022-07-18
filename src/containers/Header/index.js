import "./Header.css";
import Button from "@mui/material/Button";

function Header() {
  return (
    <div className="header">
      <div className="header-main">
        <span className="header-main-text">CAR DAMAGE DETECTIVE</span>
      </div>
      <div className="header-sub">
        <div className="button-div">
          {/* <Button
            className="header-sub-text"
            style={{
              color: "#FFFFFF",
              fontSize: "18px",
            }}
          >
            HOW IT WORKS
          </Button>
        </div>
        <div className="button-div">
          <Button
            className="header-sub-text"
            style={{
              color: "#FFFFFF",
              fontSize: "18px",
            }}
          >
            ASSESS DAMAGE
          </Button> */}
        </div>
      </div>
    </div>
  );
}

export default Header;
