import "./Result.css";
import DoneIcon from "@mui/icons-material/Done";

function Result() {
  return (
    <div className="body" style={{ marginTop: "-55px" }}>
      <h3>Results</h3>
      <section className="line"></section>
      <div className="line-div">
        <span className="line-text">Car validation check</span>
        <DoneIcon />
      </div>
      <section className="line"></section>
      <div className="line-div">
        <span className="line-text"> Damage validation check</span>
        <DoneIcon />
      </div>
      <section className="line"></section>
      <div className="line-div">
        <span className="line-text"> Location</span>
        <span className="line-text">Font</span>
      </div>
    </div>
  );
}

export default Result;
