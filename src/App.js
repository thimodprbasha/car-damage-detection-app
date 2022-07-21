import React, { useState, useRef } from "react";
import "./App.css";
import { Header } from "./containers";
import hero_img from "./assets/image/hero-img.svg";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import Gallery from "./components/Gallery/gallery";

function App() {
  const [imageFiles, setImages] = useState(null);
  const [files, setFiles] = useState(null);
  const [errMsg, setMsg] = useState(null);
  const [show, setAlert] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [reset, setReset] = useState(false);

  const [showImages, setPreview] = useState(false);

  const serviceRef = useRef(null);

  const executeScroll = () =>
    serviceRef.current.scrollIntoView({ behavior: "smooth" });

  function handleChange(e) {
    debugger;
    console.log(e.target.files[0]);
    // setFile(e.target.files[0]);
    // setImage(URL.createObjectURL(e.target.files[0]));
  }

  const handleFileSelected = (e) => {
    setFiles([]);
    setImages([]);
    for (let i = 0; i < e.target.files.length; i++) {
      const imgObj = {
        image: URL.createObjectURL(e.target.files[i]),
        fileName: e.target.files[i].name,
      };
      setFiles((fileArr) => [...fileArr, imgObj]);
      setImages((fileArr) => [...fileArr, e.target.files[i]]);
    }
  };

  const handleFileSubmition = () => {
    files.map((e) => console.log(e));
    setPreview(true);
  };

  const handleSubmission = async () => {
    if (imageFiles != null) {
      const URL = "http://127.0.0.1:5000/api/detect-car-damage";
      setAlert(false);
      setLoading(true);
      const formData = new FormData();
      imageFiles.map((file) => formData.append("file", file));
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
            // setReset(true);
            // setData(result.data);
          } else {
            // setReset(true);
            // setAlert(true);
            // setMsg(result.data.error);
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
                <button className="btn btn-primary" onClick={executeScroll}>
                  Get Started
                </button>
              </div>
            </div>
            <div className="col-lg-5 order-1 order-lg-2 hero-img">
              <img src={hero_img} className="img-fluid mb-3 mb-lg-0" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="service">
        <div className="container">
          <div className="row gy-4 d-flex justify-content-center">
            <div ref={serviceRef} className="col-lg-12 ">
              <div className="section-header">
                <span>Submit Damage Assessment</span>
                <h2>Submit Damage Assessment</h2>
              </div>
              <p>
                Take a picture of your car damage. For best results, try to
                focus on one major area of damage (e.g., front, side, or rear)
                and contain most of the car body in the picture.
              </p>
            </div>

            {showImages ? (
              <>
                <div className="d-flex justify-content-center ">
                  <button className="submit-btn" onClick={handleSubmission}>
                    Upload
                  </button>
                </div>
                <Gallery data={files} isResult={false}></Gallery>
              </>
            ) : (
              <div className="col-lg-6  d-flex flex-column justify-content-center">
                <div>
                  <input
                    className="form-control form-control-lg"
                    type="file"
                    multiple
                    onChange={handleFileSelected}
                  />
                </div>
                <div className="my-4 d-flex justify-content-center ">
                  <button className="submit-btn" onClick={handleFileSubmition}>
                    Submit
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* <Gallery image={hero_img}></Gallery> */}
        </div>
      </div>
    </>
  );
}

export default App;
