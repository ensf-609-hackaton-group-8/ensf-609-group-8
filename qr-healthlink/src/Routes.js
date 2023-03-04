import React from "react";
import { Route, Routes } from "react-router-dom";

import NotFound from "./containers/NotFound";
import Home from "./containers/Home";
import Login from "./containers/Login";
import QRGenerator from "./containers/QRGenerator";
import QRReader from "./containers/QRReader";

export default function Links() {
  return (
    <Routes>
      <Route path="/ensf-609-group-8" element={<Login />} />
      <Route path="/ensf-609-group-8/home" element={<Home />} />
      <Route path="/ensf-609-group-8/qr-generator" element={<QRGenerator />} />
      <Route path="/ensf-609-group-8/qr-reader" element={<QRReader />} />
      {/* Finally, catch all unmatched routes */}
      <Route path="*" element={<NotFound />} />;
    </Routes>
  );
}
