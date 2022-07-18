import React, { useState } from "react";
import "./App.css";
import { Header } from "./containers";
import { Result } from "./components";
import image from "./assets/image-bg.png";
import Button from "@mui/material/Button";
import Alert from "react-bootstrap/Alert";
import axios from "axios";

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

  return (
    <div className="App">
      <Header />
      <div className="body-div">
        <h1 style={{ color: "#FFFFFF", textAlign: "center", padding: "40px" }}>
          Submit Damage Assessment
        </h1>
        <AlertToast Message={errMsg}></AlertToast>
        {!isLoading ? (
          <div>
            <img src={imageFile || image} width={500} height={400} />
            <div className="button-upload">
              {reset ? (
                <div className="button-re-upload">
                  <Button
                    variant="contained"
                    component="label"
                    style={{ padding: "10px" }}
                    onClick={refreshPage}
                  >
                    Reupload
                  </Button>
                </div>
              ) : (
                <>
                  <div className="button-upload-upload">
                    <Button
                      variant="contained"
                      component="label"
                      style={{ padding: "10px" }}
                    >
                      Upload
                      <input
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={handleChange}
                      />
                    </Button>
                  </div>
                  <div className="button-upload-submit">
                    <Button
                      variant="contained"
                      component="label"
                      style={{ padding: "10px" }}
                      onClick={handleSubmission}
                    >
                      Submit
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="spinner-container">
            <div className="loading-spinner"></div>
          </div>
        )}

        {data && <Result Result={data} />}
      </div>
    </div>
  );
}

export default App;
