import React from "react";

const LoaderRing = ({ size = 48 }: { size: number }) => {
  return (
    <div
      className="inline-block border-4 rounded-full border-y-white/90 border-x-transparent animate-rotate"
      style={{
        width: size,
        height: size,
      }}
    />
  );
};

export default LoaderRing;

// .loader {
//     width: 48px;
//     height: 48px;
//     border: 5px solid;
//     border-color: #FF3D00 transparent;
//     border-radius: 50%;
//     display: inline-block;
//     box-sizing: border-box;
//     animation: rotation 1s linear infinite;
//   }
