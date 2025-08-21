import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import logo from "../assets/images/logo.png";
import GaugeChart from "react-gauge-chart";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

const DownloadReport = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { riskScore, quizLength, allComments } = location.state || {};
  const chartRef = useRef(null);

  const percentage = Math.round((riskScore / Math.max(quizLength, 1)) * 100);

  const getRiskLevel = () => {
    if (percentage >= 70) return "High Risk Score";
    if (percentage >= 40) return "Moderate Risk Score";
    return "Low Risk Score";
  };

  const generatePdf = async () => {
    const doc = new jsPDF("p", "pt", "a4");
    const pages = document.querySelectorAll(".pdf-page");

    for (let i = 0; i < pages.length; i++) {
      const canvas = await html2canvas(pages[i], { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      if (i > 0) doc.addPage();
      doc.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    }

    doc.save("EthiAI_Report.pdf");
  };

  // If you want to keep PDF preview in future, you can implement here.
  useEffect(() => {
    // Placeholder effect (currently does nothing)
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white px-6 py-4">
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-200 text-black px-4 py-2 rounded mb-4"
      >
        Back
      </button>
      <h1 className="text-xl font-bold mb-4">Download Report Preview</h1>

      {/* PDF Pages */}
      <div className="space-y-8 flex flex-col items-center">
        {/* Cover Page */}
        <div
          className="pdf-page shadow-lg border border-gray-700"
          style={{
            width: `${A4_WIDTH}px`,
            height: `${A4_HEIGHT}px`,
            padding: "40px",
            backgroundColor: "#0a0e1a",
            color: "#ffffff"
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: "6px",
                height: "40px",
                backgroundColor: "#00BFFF",
                marginRight: "10px"
              }}
            ></div>
            <img src={logo} alt="Logo" style={{ height: "40px" }} />
          </div>
          <hr style={{ margin: "30px 0", borderColor: "#555" }} />
          <h1
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              textAlign: "center",
              marginTop: "200px"
            }}
          >
            ETHI_AI RISK REPORT
          </h1>
        </div>

        {/* Combined Risk Score + Gaps & Recommendations */}
        <div
          className="pdf-page shadow-lg border border-gray-700"
          style={{
            width: `${A4_WIDTH}px`,
            height: `${A4_HEIGHT}px`,
            padding: "40px",
            backgroundColor: "#0a0e1a",
            color: "#ffffff"
          }}
        >
          {/* Risk Score Section */}
          <h2
            style={{
              color: "#00BFFF",
              fontSize: "20px",
              fontWeight: "bold",
              borderBottom: "2px solid #00BFFF",
              paddingBottom: "6px",
              marginBottom: "20px"
            }}
          >
            OVERALL ETHI_AI RISK SCORE
          </h2>
          <div ref={chartRef} style={{ width: "300px", margin: "auto" }}>
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
          <p
            style={{
              marginTop: "20px",
              textAlign: "center",
              fontWeight: "bold"
            }}
          >
            Total Risk Score: {percentage}%
          </p>
          <p style={{ textAlign: "center" }}>Risk Level: {getRiskLevel()}</p>

          {/* Gaps & Recommendations Section */}
          <h2
            style={{
              color: "#00BFFF",
              fontSize: "20px",
              fontWeight: "bold",
              borderBottom: "2px solid #00BFFF",
              paddingBottom: "6px",
              marginTop: "40px",
              marginBottom: "20px"
            }}
          >
            GAPS AND RECOMMENDATIONS
          </h2>
          <ul
            style={{
              paddingLeft: "20px",
              fontSize: "14px",
              lineHeight: "1.6",
              listStyleType: "disc"
            }}
          >
            {allComments?.length > 0 ? (
              allComments.map((c, i) => <li key={i}>{c}</li>)
            ) : (
              <li>No high-risk issues identified in your responses.</li>
            )}
          </ul>
        </div>

        {/* Merits Page */}
        <div
          className="pdf-page shadow-lg border border-gray-700"
          style={{
            width: `${A4_WIDTH}px`,
            height: `${A4_HEIGHT}px`,
            padding: "40px",
            backgroundColor: "#0a0e1a",
            color: "#ffffff"
          }}
        >
          <h2
            style={{
              color: "#00BFFF",
              fontSize: "20px",
              fontWeight: "bold",
              borderBottom: "2px solid #00BFFF",
              paddingBottom: "6px",
              marginBottom: "20px"
            }}
          >
            MERITS
          </h2>
          <ul
            style={{
              paddingLeft: "20px",
              fontSize: "14px",
              lineHeight: "1.6",
              listStyleType: "disc"
            }}
          >
            <li>No merits were identified based on the selected responses.</li>
          </ul>
        </div>
      </div>

      {/* Download Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={generatePdf}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default DownloadReport;
