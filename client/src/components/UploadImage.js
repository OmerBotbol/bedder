import axios from "axios";
import React, { useState } from "react";

function UploadImage() {
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const UploadImage = () => {
    const imageInForm = new FormData();
    imageInForm.append("file", image);
    axios.post(`/upload/${imageName}`, imageInForm).then((data) => {
      axios.get(`/image/${data.data}`).then((myImage) => {
        setImageUrl(myImage.data);
      });
    });
  };
  return (
    <div>
      <h1>upload file</h1>
      <input
        onChange={(e) => {
          setImageName(e.target.value);
        }}
      />
      <input
        type="file"
        onChange={(e) => {
          setImage(e.target.files[0]);
        }}
      />
      <button onClick={() => UploadImage()}>Upload</button>
      <img src={imageUrl} width="200px" />
    </div>
  );
}

export default UploadImage;
