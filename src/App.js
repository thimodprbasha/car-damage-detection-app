import React, { useState } from "react";
import "./App.css";
import { Header } from "./containers";
import { Result } from "./components";
import image from "./assets/image-bg.png";
import Button from "@mui/material/Button";

function App() {
  const [file, setFile] = useState();
  const [submit, setSubmit] = useState(false);
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  function handleSubmit() {
    setSubmit(true);
  }
  return (
    <div className="App">
      <Header />
      <div className="body-div">
        <h1 style={{ color: "#FFFFFF", textAlign: "center", padding: "40px" }}>
          Submit Damage Assessment
        </h1>
        <img src={file || image} width={500} height={400} />
        <div className="button-upload">
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
        </div>
        {submit && <Result />}
      </div>
    </div>
  );
}

export default App;
