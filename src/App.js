import React, { useState } from "react";
import "./App.css";
import { Header } from "./containers";
import { Result } from "./components";
import image from "./assets/image-bg.png";
import hero_img from "./assets/image/hero-img.svg";
import Button from "@mui/material/Button";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { Row, Col, Container, Card } from "react-bootstrap";

function App() {
  const [file, setFile] = useState(null);
  const [imageFile, setImage] = useState(null);
  const [errMsg, setMsg] = useState(null);
  const [show, setAlert] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [reset, setReset] = useState(false);

  function handleChange(e) {
    console.log(e.target.files);
    setFile(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
  }

  const handleSubmission = async () => {
    if (file != null) {
      const URL = "http://127.0.0.1:5000/api/detect-car-damage";
      setAlert(false);
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", file.name);

      await axios
        .post(URL, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          setLoading(false);
          console.log(result);
          if (result.data.error === null) {
            setReset(true);
            setData(result.data);
          } else {
            setReset(true);
            setAlert(true);
            setMsg(result.data.error);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setAlert(true);
      setMsg("Plese add image");
    }
  };

  function refreshPage() {
    window.location.reload(false);
  }

  const AlertToast = ({ Message }) => {
    return (
      <div>
        <Alert show={show} variant="danger" dismissible>
          <Alert.Heading>{Message}</Alert.Heading>
        </Alert>
      </div>
    );
  };

  // return (
  //   <div className="App">
  //     <Header />
  //     <div className="body-div">
  //       <h1 style={{ color: "#FFFFFF", textAlign: "center", padding: "40px" }}>
  //         Submit Damage Assessment
  //       </h1>
  //       <AlertToast Message={errMsg}></AlertToast>
  //       {!isLoading ? (
  //         <div>
  //           <Container>
  //             <Row>
  //               <Col md={12}>
  //                 <Row>
  //                   <Col md={4} className="p-1">
  //                     <img src={imageFile || image} width={100} height={100} />
  //                   </Col>
  //                   <Col md={4} className="p-1">
  //                     <img src={imageFile || image} width={100} height={100} />
  //                   </Col>
  //                 </Row>
  //               </Col>
  //             </Row>
  //           </Container>

  //           <div className="button-upload">
  //             {reset ? (
  //               <div className="button-re-upload">
  //                 <Button
  //                   variant="contained"
  //                   component="label"
  //                   style={{ padding: "10px" }}
  //                   onClick={refreshPage}
  //                 >
  //                   Reupload
  //                 </Button>
  //               </div>
  //             ) : (
  //               <>
  //                 <div className="button-upload-upload">
  //                   <Button
  //                     variant="contained"
  //                     component="label"
  //                     style={{ padding: "10px" }}
  //                   >
  //                     Upload
  //                     <input
  //                       hidden
  //                       accept="image/*"
  //                       type="file"
  //                       onChange={handleChange}
  //                     />
  //                   </Button>
  //                 </div>
  //                 <div className="button-upload-submit">
  //                   <Button
  //                     variant="contained"
  //                     component="label"
  //                     style={{ padding: "10px" }}
  //                     onClick={handleSubmission}
  //                   >
  //                     Submit
  //                   </Button>
  //                 </div>
  //               </>
  //             )}
  //           </div>
  //         </div>
  //       ) : (
  //         <div className="spinner-container">
  //           <div className="loading-spinner"></div>
  //         </div>
  //       )}

  //       {data && <Result Result={data} />}
  //     </div>
  //   </div>
  // );
  return (
    <>
      <Header />
      <div className="hero">
        <div className="container">
          <div className="row gy-4 d-flex justify-content-between">
            <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
              <h2>Submit Damage Assessment</h2>
              <p>
                Car Damage Detective allows you to upload a picture of your car
                damage to indepently assess damage location and severity, easing
                the burden of filing an insurance claim and getting your car
                repaired
              </p>
              <div className="d-flex justify-content-start">
                <button type="submit" className="btn btn-primary">
                  Get Started
                </button>
              </div>
            </div>
            <div class="col-lg-5 order-1 order-lg-2 hero-img">
              <img src={hero_img} className="img-fluid mb-3 mb-lg-0" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="service">
        <div className="container">
          <div className="row gy-4 d-flex justify-content-center">
            <div className="col-lg-12 ">
              <div class="section-header">
                <span>Submit Damage Assessment</span>
                <h2>Submit Damage Assessment</h2>
              </div>
              <p>
                Take a picture of your car damage. For best results, try to
                focus on one major area of damage (e.g., front, side, or rear)
                and contain most of the car body in the picture.
              </p>
            </div>

            <div className="col-lg-6  d-flex flex-column justify-content-center">
              <div>
                <input
                  class="form-control form-control-lg"
                  id="formFileLg"
                  type="file"
                  multiple
                />
              </div>
              <div className="my-4 d-flex justify-content-center ">
                <button type="submit" className="submit-btn">
                  Submit
                </button>
              </div>
            </div>
          </div>
          <div class="row gy-4">

          <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
            <div class="card">
              <div class="card-img">
                <img src={image} alt="" class="img-fluid"/>
              </div>
              <h3>Storage</h3>
            </div>
          </div>
          <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
            <div class="card">
              <div class="card-img">
              <img src={image} alt="" class="img-fluid"/>
              </div>
              <h3>Storage</h3>
            </div>
          </div>
          <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
            <div class="card">
              <div class="card-img">
              <img src={image} alt="" class="img-fluid"/>
              </div>
              <h3>Storage</h3>
            </div>
          </div>
        </div>
        

        </div>
      </div>
    </>
  );
}

export default App;
