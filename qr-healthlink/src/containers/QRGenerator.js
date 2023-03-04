import QR from "qrcode";
import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";

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

  return (
    <div>
      <h1>QRGenerator</h1>
      {[
        {
          label: "Name",
          value: name,
          set: nameSet,
          placeholder: "e.g. Jane Doe",
        },
        {
          label: "Date of Birth",
          value: dateOfBirth,
          set: dateOfBirthSet,
          type: "date",
        },
        {
          label: "Alberta Health Number",
          value: albertaHealthNumber,
          set: albertaHealthNumberSet,
          placeholder: "e.g. 123",
        },
        {
          label: "Email",
          value: email,
          set: emailSet,
          placeholder: "e.g. someone@gmail.com",
        },
        {
          label: "Phone",
          value: phone,
          set: phoneSet,
          placeholder: "e.g. +1 123 456 7890",
        },
        {
          label: "Summary",
          value: summary,
          set: summarySet,
          placeholder: "e.g. Leg fracture",
        },
      ].map(({ label, value, set, placeholder, type }) => (
        <div>
          <label>
            <p>{label}</p>
            <input
              type={type || "text"}
              value={value}
              placeholder={placeholder}
              onChange={(event) => {
                set(event.target.value);
              }}
            />
          </label>
        </div>
      ))}
      <div>
        <p>Encryption code: {key}</p>
        <p>QR:</p>
        <img alt="qr" src={qr} />
        <div>
          <a href={qr} download={`${key}.png`}>
            Download
          </a>
        </div>
      </div>
    </div>
  );
}
