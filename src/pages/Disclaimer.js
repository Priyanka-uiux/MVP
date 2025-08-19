// src/pages/Disclaimer.js
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/images/logo.png";

export default function Disclaimer() {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  // Prevent skipping Disclaimer by checking if user filled details
  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userData")); // session-based
    if (!userData) {
      navigate("/UserDetailsForm");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleProceed = () => {
    navigate("/assessment");
  };

  return (
    <div className="min-h-screen bg-[#080029]">
      <img src={logo} alt="Logo" className="w-[250px] p-5" />
      <div className="flex flex-col gap-[30px] items-center justify-center py-5">
        <div className="border-[#33cae5] border-[2px] w-[100%] md:w-[60%] p-8 shadow-lg rounded-[30px]">
          <h2 className="text-[40px] font-bold text-[#33cae5] mb-4">Disclaimer</h2>
          <p className="mb-4 text-white text-[20px]">
            Before starting the assessment, it is important to understand the following points. These ensure transparency, fairness, and alignment with the intended purpose of this evaluation.
          </p>
          <ul className="list-disc pl-5 mb-4 text-[20px] text-white space-y-2">
            <li>
              This assessment focuses on the first phase of the EU AI Act implementation, specifically covering Rules on Subject Matter, Scope, Definitions, AI literacy, and Prohibited AI Practices, which come into effect on 2nd February 2025.
            </li>
            <li>
              These assessments evaluate only Prohibited AI System practices based on your selection.
            </li>
            <li>
              Examples provided in the assessment are for general understanding only and do not reference any specific person, organization, or brand.
            </li>
            <li>
              EthiAI is an ethical assessment platform designed to evaluate your AI system's compliance with the EU AI Act. It is not an AI governance tool, but rather focuses on identifying ethical and legal concerns associated with your AI system.
            </li>
            <li>
              This assessment helps determine whether the EU AI Act applies to an AI system, aiming to highlight ethical risks early — before member states introduce specific regulations, fines, or penalties.
            </li>
            <li>
              The feedback you provide may be used internally to improve EthiAI and for marketing insights. No personal information will be shared without your consent.
            </li>
          </ul>

          <div className="flex pb-3 items-center gap-3">
            <input
              type="checkbox"
              id="discheckbox"
              checked={isChecked}
              onChange={handleChange}
              className="accent-[#33cae5] w-5 h-5"
            />
            <label htmlFor="discheckbox" className="text-white text-[20px]">
              I agree to the terms and conditions and confirm to start the assessment.
            </label>
          </div>
        </div>

        <div className="flex items-start justify-start w-[100%] md:w-[60%]">
          <button
            className="border-2 border-[#33cae5] text-white bg-[#33cae5] py-3 px-5 rounded-lg hover:!text-[#080029] hover:!bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!isChecked}
            onClick={handleProceed}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}
