import React from "react";

function Spinner() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="h-10 w-10 border border-solid border-4 border-t-transparent border-gray-50 rounded-full animate-spin"></div>
    </div>
  );
}

export default Spinner;
