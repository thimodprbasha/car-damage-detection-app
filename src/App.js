import React, { useState } from "react";
import "./App.css";
import { Header } from "./containers";
import { Result } from "./components";
import image from "./assets/image-bg.png";
import Button from "@mui/material/Button";
import Alert from "react-bootstrap/Alert";

function App() {
  const [file, setFile] = useState();
  const [submit, setSubmit] = useState(false);
  const [isLoading, setLoading] = useState(false);
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  function handleSubmit() {
    if (file != null) {
      setLoading(true);
      setTimeout(() => {
        setSubmit(true);
        setLoading(false);
      }, 1000);
    } else {
    }
  }
  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div className="App">
      <Header />
      <div className="body-div">
        <h1 style={{ color: "#FFFFFF", textAlign: "center", padding: "40px" }}>
          Submit Damage Assessment
        </h1>
        <AlertToast></AlertToast>
        {!isLoading ? (
          <div>
            <img src={file || image} width={500} height={400} />
            <div className="button-upload">
              {submit ? (
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
                      onClick={handleSubmit}
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

        {submit && <Result />}
      </div>
    </div>
  );
}

const AlertToast = () => {
  return (
    <div>
       <Alert variant="danger" dismissible>
      <Alert.Heading>Please add image!</Alert.Heading>
    </Alert>
    </div>
   
  );
};

export default App;
