import QR from "qrcode";
import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import styled from "styled-components";

const Form = styled.div`
  align-content: "center";
  display: "flex";
  flex-direction: "column";
  justify-content: "center";
  padding: 1rem;
`;

const Input = styled.input`
  border-radius: 0.25rem;
  padding: 0 1rem;
  width: "100%";
`;

export default function QRGenerator() {
  const [name, nameSet] = useState("");
  const [dateOfBirth, dateOfBirthSet] = useState("2000-01-01");
  const [albertaHealthNumber, albertaHealthNumberSet] = useState("");
  const [email, emailSet] = useState("");
  const [phone, phoneSet] = useState("");
  const [summary, summarySet] = useState("");

  const [qr, qrSet] = useState(null);
  const [key, keySet] = useState(null);

  const plaintext = JSON.stringify({
    name,
    dateOfBirth,
    albertaHealthNumber,
    email,
    phone,
    summary,
  });

  useEffect(() => {
    const key = Math.floor(100000 + Math.random() * 900000).toString();
    // const salt = CryptoJS.lib.WordArray.random(128 / 8);
    // const password = CryptoJS.PBKDF2(key, salt, {
    //   keySize: 512 / 32,
    //   iterations: 1000,
    // });
    const password = key;
    const encrypted = CryptoJS.AES.encrypt(plaintext, password).toString();

    keySet(key);
    QR.toDataURL(encrypted, (_, url) => {
      qrSet(url);
    });
  }, [plaintext]);

  const charCount = summary.length;

  return (
    <Form>
      <h1>QRGenerator</h1>
      <div>
        <label>
          <p></p>
          <input
            type={"text"}
            value={name}
            placeholder={"Patient Name"}
            maxLength={30}
            onChange={(event) => {
              nameSet(event.target.value);
            }}
          />
        </label>
        <label>
          <p></p>
          <input
            type={"text"}
            placeholder={"Date Of Birth"}
            maxLength={10}
            value={dateOfBirth}
            onChange={(event) => {
              dateOfBirthSet(event.target.value);
            }}
            style={{ width: "100%" }}
          />
        </label>
        <label>
          <p></p>
          <input
            type={"text"}
            value={albertaHealthNumber}
            placeholder={"Alberta Health Number"}
            maxLength={9}
            onChange={(event) => {
              albertaHealthNumberSet(event.target.value);
            }}
            style={{ width: "100%" }}
          />
        </label>
        <label>
          <p></p>
          <input
            type={"text"}
            value={email}
            placeholder={"Email"}
            maxLength={30}
            onChange={(event) => {
              emailSet(event.target.value);
            }}
            style={{ width: "100%" }}
          />
        </label>
        <label>
          <p></p>
          <input
            type={"text"}
            value={phone}
            placeholder={"Patient Phone Number"}
            maxLength={11}
            onChange={(event) => {
              phoneSet(event.target.value);
            }}
            style={{ width: "100%" }}
          />
        </label>
        <div>
          <label>
            Details of Call-In (Characters Left : {2910 - charCount})
          </label>
          <div>
            <textarea
              type={"text"}
              value={summary}
              placeholder={"Description of Patients Issues..."}
              maxLength={2910}
              onChange={(event) => {
                summarySet(event.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div>
        <p>Encryption code: {key}</p>
        <img alt="qr" src={qr} />
        <div>
          <a href={qr} download={`${key}.png`}>
            Download
          </a>
        </div>
      </div>
    </Form>
  );
}
