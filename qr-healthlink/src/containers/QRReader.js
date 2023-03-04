import { React, useState, useEffect } from "react";
import jsQR from "jsqr";
import CryptoJS from "crypto-js";

export default function QRReader() {
  const [imgDataLink, setimgDataLink] = useState(null);
  const [imgData, setimgData] = useState(null);
  const [data, setData] = useState({});
  const [encryptKey, encryptKeySet] = useState("");

  const handleImgUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setimgDataLink(reader.result);
      loadDataFromImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const loadDataFromImage = (file) => {
    const image = new Image();

    image.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;

      const context = canvas.getContext("2d");
      context.drawImage(image, 0, 0);

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

      setimgData({
        data: imageData.data,
        width: image.naturalWidth,
        height: image.naturalHeight,
      });
    };

    image.src = file;
  };

  useEffect(() => {
    if (!imgData) return;
    const code = jsQR(imgData.data, imgData.width, imgData.height);
    if (code) {
      try {
        const info = CryptoJS.AES.decrypt(code.data, encryptKey).toString(
          CryptoJS.enc.Utf8
        );
        setData(JSON.parse(info));
      } catch (error) {
        setData({ error: "invalid key" });
        console.error(error);
      }
    }
  }, [encryptKey, imgData]);

  return (
    <div className="Home">
      <div className="lander">
        <h1>QR Code Reader</h1>
        <input type="file" onChange={handleImgUpload} />
        {imgDataLink && (
          <a href={imgDataLink} target="_blank" rel="noopener noreferrer">
            <img src={imgDataLink} alt="QR uploaded" />
          </a>
        )}
      </div>

      <div className="input-container">
        <div className="input-field-container">
          <label>
            <p>Your Code</p>
            <input
              type="text"
              className="input-field"
              onChange={(event) => {
                encryptKeySet(event.target.value);
              }}
            />
          </label>
        </div>
        {data.error ? (
          <p>Error: {data.error}</p>
        ) : (
          <>
            <label>
              <p>Name</p>
              <input
                id="name"
                className="input-field summary"
                value={data.name}
                readOnly
              />
            </label>
            <label>
              <p>Date of Birth</p>
              <input
                id="dateOfBirth"
                className="input-field summary"
                value={data.dateOfBirth}
                readOnly
              />
            </label>
            <label>
              <p>Alberta Health Number</p>
              <input
                id="albertaHealthNumber"
                className="input-field summary"
                value={data.albertaHealthNumber}
                readOnly
              />
            </label>
            <label>
              <p>Email</p>
              <input
                id="email"
                className="input-field summary"
                value={data.email}
                readOnly
              />
            </label>
            <label>
              <p>Phone</p>
              <input
                id="phone"
                className="input-field summary"
                value={data.phone}
                readOnly
              />
            </label>
            <label>
              <p>Summary</p>
              <input
                id="summary"
                className="input-field summary"
                value={data.summary}
                readOnly
              />
            </label>
          </>
        )}
      </div>
    </div>
  );
}
