// import { useState } from "react";
import { ScaleLoader } from "react-spinners";

const Loader = () => {
  return (
    <div
      className="sweet-loading"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div>
        <ScaleLoader color="#36d7b7" />
      </div>
    </div>
  );
};

export default Loader;
