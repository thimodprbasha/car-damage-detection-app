import "./Result.css";
import DoneIcon from "@mui/icons-material/Done";

function Result({ Result }) {
  const data = Result.result;
  return (
    <div className="body" style={{ marginTop: "-55px" }}>
      <h3>Results</h3>
      <section className="line"></section>
      <div className="line-div">
        <span className="line-text">Damage Type</span>
        <span className="line-text">{data.image_instrument}</span>
      </div>
      <section className="line"></section>
      <div className="line-div">
        <span className="line-text">Severity Level</span>
        <span className="line-text">{data.severity_level}</span>
      </div>
      <section className="line"></section>
      <div className="line-div">
        <span className="line-text"> Price</span>
        <span className="line-text">{data.price}</span>
      </div>
      <section className="line"></section>
      <div className="line-div">
        <span className="line-text"> Probability</span>
        <span className="line-text">{data.probability}</span>
      </div>
    </div>
  );
}

export default Result;
