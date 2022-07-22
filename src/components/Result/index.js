import "./Result.css";

function Result({ data }) {
  // var date = new Date(date.time);
  return (
    <div className=" result d-flex justify-content-center">
      <div className="card featured" style={{ width: "50%" }}>
        <div className="card-body">
          <h5 className="card-title">Pricing</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <div className="line-div">
                <span className="line-text">Total Price</span>
                <span className="line-text-result">
                  {data.calculated_price}
                </span>
              </div>
            </li>
            <li className="list-group-item">
              <div className="line-div">
                <span className="line-text">Location</span>
                <span className="line-text-result">
                  {data.location.address}
                </span>
              </div>
            </li>
            <li className="list-group-item">
              <div className="line-div">
                <span className="line-text">Time</span>
                <span className="line-text-result">{data.time} </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Result;
