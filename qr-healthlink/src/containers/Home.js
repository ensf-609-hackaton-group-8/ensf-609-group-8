import React from "react";
import "./Home.css";

export default function Home() {
  return (
    <div className="Home">
      <div className="lander">
        <h1>QR Health Link</h1>
        <p className="text-muted">
          By Ben, Bill, Garnet, Justin, Kevin, Laura, and Omar.
        </p>
        <br />
        <p>
          <p>Source Code:</p>
          <a href="https://github.com/ensf-609-hackaton-group-8/ensf-609-group-8">
            GitHub Repo
          </a>
        </p>
        <br />
        <p>
          <p>License:</p>
          <a href="https://spdx.org/licenses/AGPL-3.0-only.html">
            AGPL-3.0-only
          </a>
        </p>
      </div>
    </div>
  );
}
