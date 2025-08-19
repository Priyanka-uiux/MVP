import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";

const ThankYou = () => {
  const navigate = useNavigate();

  const handleExit = () => {
    navigate("/"); // Update to assessment route if needed
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white flex flex-col px-6 py-8 relative">
      {/* Logo Top-Left */}
      <div className="absolute top-6 left-6">
        <img src={logo} alt="EthiAI Logo" className="w-[160px]" />
      </div>

      {/* Centered Box */}
      <div className="flex-grow flex flex-col justify-center items-center">
        <div className="border border-[#33cae5] rounded-2xl p-8 max-w-2xl w-full text-center shadow-lg">
          <h1 className="text-3xl font-bold text-white mb-4">
            Thank you for completing the MVP Assessment.
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            Your responses contribute to improving AI risk profiling and compliance monitoring through EthiAI.
            To explore more on ethical AI practices and solutions, visit EthiAI or reach out to us.
            <br /><br />
            Stay informed. Stay ethical. Stay ahead with EthiAI.
          </p>
        </div>

        {/* Retake Assessment Button */}
        <div className="mt-6">
          <button
            onClick={handleExit}
            className="px-6 py-2 bg-[#6dabfc] text-white font-semibold rounded-md border border-[#33cae5] hover:bg-[#4b3e9a] transition-all duration-300"
>

            Retake Assessment
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
