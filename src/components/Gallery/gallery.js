import React, { useState} from "react";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./gallery.css";


const Gallery = ({ data, isResult, err, state }) => {
  const handleFileSelected = (e, index) => {
    const imgObj = {
      image: URL.createObjectURL(e.target.files[0]),
      file_name: e.target.files[0].name,
    };
  
    let newImageArr = [...data];
    newImageArr[index] = imgObj;
    state(newImageArr);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <div className="wrapper">
      <div className="content">
        <div className="row gy-4">
          {data.map((element, index) => (
            <div className="col-lg-3 col-md-6" key={index}>
              <div className="card" style={err ? { borderColor: "red" } : null}>
                <div className="card-img">
                  <div className="image-upload">
                    {!isResult && (
                      <>
                        <div className="image-upload-icon">
                          <MoreVertIcon className="menu-select-icon"></MoreVertIcon>
                        </div>
                        <div className="menu">
                          <div className="menu-item">
                            <div className="item">
                              <label htmlFor={`i-${index}`}>
                                <EditIcon className="pe-1" />
                                Change image
                              </label>
                              <input
                                id={`i-${index}`}
                                style={{ display: "none" }}
                                type="file"
                                onChange={(e) => {
                                  handleFileSelected(e, index);
                                  console.log("Sss", index);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

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
