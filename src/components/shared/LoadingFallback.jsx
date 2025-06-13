import React from "react";
import { DNA } from "react-loader-spinner";

const LoadingFallback = () => {
  return (
    <>
      <p className="popins flex justify-center text-center mt-4 space-x-3 py-64">
        <DNA
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </p>
    </>
  );
};

export default LoadingFallback;
