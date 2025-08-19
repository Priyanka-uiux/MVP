import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GaugeChart from "react-gauge-chart";
import logo from "../assets/images/logo.png";

const Evaluation = () => {
  const [riskScore, setRiskScore] = useState(0);
  const [quizLength, setQuizLength] = useState(1);
  const [showReport, setShowReport] = useState(false);
  const [allComments, setAllComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedScore = parseInt(localStorage.getItem("riskScore"), 10);
    const storedAnswers = JSON.parse(localStorage.getItem("quizAnswers")) || [];

    setRiskScore(storedScore || 0);
    setQuizLength(storedAnswers.length || 1);

    const comments = storedAnswers
      .map((a) => a.selected.comment)
      .filter((comment) => comment && comment.trim() !== "");
    setAllComments(comments);
  }, []);

  const percentage = Math.round((riskScore / quizLength) * 100);

  const getRiskLevel = () => {
    if (percentage >= 70) return "High Risk Score";
    if (percentage >= 40) return "Moderate Risk Score";
    return "Low Risk Score";
  };

  const getRiskColor = () => {
    if (percentage >= 70) return "text-red-400";
    if (percentage >= 40) return "text-yellow-400";
    return "text-green-400";
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white px-6 py-4">
      <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
        <img src={logo} alt="EthiAI Logo" className="w-[180px]" />
        {showReport && (
          <button
            onClick={() =>
              navigate("/download-report", {
                state: { riskScore, quizLength, allComments }
              })
            }
            className="bg-white text-blue-900 font-bold px-5 py-2 rounded-full hover:bg-blue-100"
          >
            Download Report
          </button>
        )}
      </div>

      {!showReport ? (
        <div className="max-w-3xl mx-auto bg-[#1e2533] rounded-lg p-6 flex justify-between items-center shadow-md border border-[#2b3e5a]">
          <p className="text-white font-semibold text-lg">
            Assessment - Minimum Viable Product
          </p>
          <button
            onClick={() => setShowReport(true)}
            className="bg-white text-blue-900 font-semibold px-4 py-2 rounded-md hover:bg-blue-100"
          >
            View Report
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center mt-10 mb-6">
            <h2 className={`text-lg font-bold ${getRiskColor()}`}>
              {getRiskLevel()}
            </h2>
            <div className="w-[150px]">
              <GaugeChart
                id="gauge-chart"
                nrOfLevels={20}
                percent={percentage / 100}
                textColor="#fff"
                colors={["#47a747", "#FF8C00", "#cb3e3e"]}
                arcWidth={0.3}
                arcPadding={0.02}
              />
            </div>
            <p className="text-white text-sm mt-2 font-semibold">
              MVP-Assessment
            </p>
            <p className="text-white text-sm">Total Score: {riskScore}</p>
            <p className="text-white text-sm mb-2">Out of: {quizLength}</p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Gaps and Recommendations */}
            <div className="bg-[#1b2232] p-6 rounded-xl border border-white relative">
              <div className="absolute -top-4 left-4 bg-white text-black font-semibold px-3 py-1 rounded-full text-sm shadow">
                Gaps and Recommendations
              </div>
              <ul className="list-disc pl-5 mt-6 text-sm space-y-2 text-gray-200 max-h-[300px] overflow-y-auto">
                {allComments.length > 0 ? (
                  allComments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                  ))
                ) : (
                  <li>No high-risk issues identified in your responses.</li>
                )}
              </ul>
            </div>

            {/* Merits */}
            <div className="bg-[#1b2232] p-6 rounded-xl border border-white relative">
              <div className="absolute -top-4 left-4 bg-white text-black font-semibold px-3 py-1 rounded-full text-sm shadow">
                Merits
              </div>
              <ul className="list-disc pl-5 mt-6 text-sm space-y-2 text-gray-200">
                <li>No merits were identified based on the selected responses.</li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Evaluation;
