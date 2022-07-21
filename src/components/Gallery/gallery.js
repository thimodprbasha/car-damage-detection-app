import "./gallery.css";

const Gallery = ({ data, isResult }) => {
  return (
    <div className="wrapper">
      <div className="content">
        <div className="row gy-4">
          {data.map((element) => (
            <div class="col-lg-3 col-md-6">
              <div class="card">
                <div class="card-img">
                  <img
                    src={element.image}
                    alt={element.file_name}
                    class="img-fluid"
                  />
                </div>
                <h3>{element.file_name}</h3>
                {isResult && (
                  <div class="card-body">
                    <div className="body" style={{ marginTop: "-55px" }}>
                      <h3>Results</h3>
                      <section className="line"></section>
                      <div className="line-div">
                        <span className="line-text">Damage Type</span>
                        <span className="line-text-result">
                          {element.image_instrument}
                        </span>
                      </div>
                      <section className="line"></section>
                      <div className="line-div">
                        <span className="line-text">Severity Level</span>
                        <span className="line-text-result">
                          {element.severity_level}
                        </span>
                      </div>
                      <section className="line"></section>
                      <div className="line-div">
                        <span className="line-text"> Price</span>
                        <span className="line-text-result">
                          {element.price}
                        </span>
                      </div>
                      <section className="line"></section>
                      <div className="line-div">
                        <span className="line-text"> Probability</span>
                        <span className="line-text-result">
                          {element.probability}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
