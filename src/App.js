import React, { useState, useRef } from "react";
import "./App.css";
import { Header } from "./containers";
import hero_img from "./assets/image/hero-img.svg";
import axios from "axios";
import Gallery from "./components/Gallery/gallery";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Result from "./components/Result";

function App() {
  var isPreview = false;
  const [imageFiles, setImages] = useState(null);
  const [files, setFiles] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [showImages, setPreview] = useState(false);
  const [showImageResult, setPreviewResult] = useState({
    showResult: false,
    err: false,
  });

  const serviceRef = useRef(null);

  const executeScroll = () =>
    serviceRef.current.scrollIntoView({ behavior: "smooth" });

  const handleFileSelected = (e) => {
    setFiles([]);
    setImages([]);
    for (let i = 0; i < e.target.files.length; i++) {
      const imgObj = {
        image: URL.createObjectURL(e.target.files[i]),
        file_name: e.target.files[i].name,
      };
      setFiles((fileArr) => [...fileArr, imgObj]);
      setImages((fileArr) => [...fileArr, e.target.files[i]]);
    }
  };

  const handleFileSubmition = () => {
    if (files != null) {
      setPreview(true);
    } else {
      toast.error("Please add a image", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleData = (probs) => {
    const newImgProps = probs.map((e) => {
      const fileULR = files.find((x) => x.file_name === e.file_name);
      console.log(fileULR);

      e.image = fileULR.image;
      return e;
    });
    setFiles(newImgProps);
    isPreview = true;
  };

  const handleSubmission = async () => {
    const URL = "http://127.0.0.1:5000/api/detect-car-damage";

    const formData = new FormData();
    imageFiles.map((file) => formData.append("file", file));

    setLoading(true);
    const pending = toast.loading("Analyzing images");

    await axios
      .post(URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => result.data)
      .then((data) => {
        setLoading(false);
        setData(data);
        handleData(data.result);
        if (!data.error) {
          setPreviewResult({
            showResult: true,
            err: false,
          });
          toast.update(pending, {
            render: "Success 👌",
            type: "success",
            isLoading: false,
            autoClose: 5000,
          });
          setData(data);
        } else {
          setPreviewResult({
            showResult: false,
            err: true,
          });
          toast.update(pending, {
            render: data.error_msg,
            type: "error",
            isLoading: false,
            autoClose: 5000,
          });
        }
      })
      .catch((error) => {
        setPreviewResult({
          showResult: false,
          err: true,
        });
        setLoading(false);
        toast.update(pending, {
          render: error.message,
          type: "error",
          autoClose: 5000,
          isLoading: false,
        });
        console.error("Error:", error);
      });
  };

  const resetPage = () => {
    window.location.reload(false);
    serviceRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Header />
      <ToastContainer />
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
              {showImageResult.showResult ? (
                <Result data={data}></Result>
              ) : (
                <p>
                  Take a picture of your car damage. For best results, try to
                  focus on one major area of damage (e.g., front, side, or rear)
                  and contain most of the car body in the picture.
                </p>
              )}

              {/* {data && <Result data={data}></Result>} */}
            </div>

            {!isLoading ? (
              <>
                {showImages ? (
                  <>
                    <div className="d-flex justify-content-center ">
                      <button
                        className="submit-btn"
                        onClick={
                          showImageResult.showResult || showImageResult.err
                            ? resetPage
                            : handleSubmission
                        }
                      >
                        {showImageResult.showResult || showImageResult.err
                          ? "Restart"
                          : "Upload"}
                      </button>
                    </div>

                    <Gallery
                      data={files}
                      isResult={showImageResult.showResult}
                      err={showImageResult.err}
                      state={setFiles}
                    ></Gallery>
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
                      <button
                        className="submit-btn"
                        onClick={handleFileSubmition}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="col-lg-6  d-flex  justify-content-center">
                <div
                  style={{ width: "4rem", height: "4rem" }}
                  className="spinner-border text-primary"
                  role="status"
                ></div>
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
