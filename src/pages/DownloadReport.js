// src/pages/DownloadReport.js
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import logo from "../assets/images/logo.png";
import GaugeChart from "react-gauge-chart";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import Sidebar from "../components/Sidebar";

const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

const DownloadReport = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { riskScore, quizLength, allComments } = location.state || {};
  const chartRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

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

  useEffect(() => {
    const handleResize = () => setSidebarOpen(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const pageStyle = {
    width: `${A4_WIDTH}px`,
    height: `${A4_HEIGHT}px`,
    padding: "50px",
    backgroundColor: "#080029",
    color: "#ffffff",
  };

  const headingStyle = {
    color: "#00BFFF",
    fontSize: "24px",
    fontWeight: "bold",
    borderBottom: "2px solid #00BFFF",
    paddingBottom: "8px",
    marginBottom: "24px",
  };

  const paragraphStyle = {
    fontSize: "18px",
    lineHeight: "1.9",
    textAlign: "justify",
    marginBottom: "20px",
  };

  return (
    <div className="flex bg-[#0a0e1a] text-white min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-16"
        } px-6 py-4`}
      >
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            Back
          </button>
          <button
            onClick={generatePdf}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Download PDF
          </button>
        </div>

        <h1 className="text-xl font-bold mb-4">Download Report Preview</h1>

        {/* PDF Pages */}
        <div className="space-y-8 flex flex-col items-center">
          {/* -------- Cover Page -------- */}
<div className="pdf-page shadow-lg" style={pageStyle}>
  <div className="relative w-full h-full flex flex-col justify-center items-center">
    {/* Left cyan bar + logo */}
    <div className="absolute top-20 left-16 flex items-start gap-4">
      <div style={{ width: "70px", height: "250px", backgroundColor: "#33cae5" }}></div>
      <div style={{ width: "250px", marginTop: "20px" }}>
        <img src={logo} alt="Logo" className="w-full h-auto" />
      </div>
    </div>

    {/* Title Section */}
    <div className="text-center mt-40 w-full">
      <div
        style={{
          borderTop: "2px solid white",
          borderBottom: "2px solid white",
          padding: "40px 0",
          margin: "0 100px",
        }}
      >
        <h1
          style={{
            fontSize: "55px",
            fontWeight: "bold",
            color: "white",
            letterSpacing: "2px",
            lineHeight: "1.3",
          }}
        >
          COMPLIANCE RISK <br /> REPORT
        </h1>
      </div>

      {/* Date */}
      <p style={{ fontSize: "22px", color: "white", marginTop: "40px" }}>
        Generated on {new Date().toLocaleDateString()}
      </p>
    </div>
  </div>
</div>


          {/* Table of Contents */}
          <div className="pdf-page shadow-lg" style={pageStyle}>
            <h2 style={headingStyle}>TABLE OF CONTENTS</h2>
            <ul style={{ listStyleType: "none", padding: 0, fontSize: "20px" }}>
              {[
                "Executive Summary",
                "Overall EthiAI Risk Score",
                "Gaps & Recommendations",
                "Merits",
                "Conclusion",
              ].map((item, idx) => (
                <li
                  key={idx}
                  style={{
                    borderBottom: "1px solid #ccc",
                    padding: "12px 0",
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Executive Summary */}
          <div className="pdf-page shadow-lg" style={pageStyle}>
            <h2 style={headingStyle}>EXECUTIVE SUMMARY</h2>
            {[
              "The EU AI Act is the world’s first AI regulation, designed to ensure AI systems deployed within the European Union are ethical, safe, and compliant with fundamental rights.",
              "It categorizes AI systems into risk levels (prohibited, high-risk, limited risk, and minimal risk) and imposes obligations accordingly.",
              "The act applies to providers, deployers, and users of AI systems operating within the EU or impacting EU citizens.",
              "The EU AI Act classifies AI systems based on their risk levels, ranging from minimal risk to prohibited practices that pose severe threats to human rights and safety. The Act applies to organizations developing, deploying, or using AI systems within the EU.",
              "EthiAI, developed by RisKey, evaluates AI compliance risks under the EU AI Act. The platform provides organizations with tools to assess:",
            ].map((t, i) => (
              <p key={i} style={paragraphStyle}>{t}</p>
            ))}
            <ul style={{ ...paragraphStyle, listStyleType: "disc", paddingLeft: "35px" }}>
              <li>Compliance Standing Reports to help businesses understand their risk level and legal obligations.</li>
              <li>Actionable Recommendations to guide AI providers and deployers toward regulatory compliance.</li>
              <li>Comprehensive Compliance Dashboard offering real-time insights into AI risk levels.</li>
            </ul>
          </div>

          {/* Risk Score + Recommendations */}
          <div className="pdf-page shadow-lg" style={pageStyle}>
            <h2 style={headingStyle}>OVERALL ETHIAI RISK SCORE</h2>
            <div ref={chartRef} style={{ width: "340px", margin: "auto" }}>
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
            <p style={{ fontSize: "20px", marginTop: "20px", textAlign: "center", fontWeight: "bold" }}>
              Total Risk Score: {percentage}%
            </p>
            <p style={{ fontSize: "18px", textAlign: "center" }}>
              Risk Level: {getRiskLevel()}
            </p>

            <h2 style={{ ...headingStyle, marginTop: "50px" }}>
              GAPS & RECOMMENDATIONS
            </h2>
            <ul style={{ ...paragraphStyle, listStyleType: "disc", paddingLeft: "35px" }}>
              {allComments?.length > 0 ? (
                allComments.map((c, i) => <li key={i}>{c}</li>)
              ) : (
                <li>No high-risk issues identified in your responses.</li>
              )}
            </ul>
          </div>

          {/* Merits */}
          <div className="pdf-page shadow-lg" style={pageStyle}>
            <h2 style={headingStyle}>MERITS</h2>
            <ul style={{ ...paragraphStyle, listStyleType: "disc", paddingLeft: "35px" }}>
              <li>No merits were identified based on the selected responses.</li>
            </ul>
          </div>

          {/* Conclusion */}
          <div className="pdf-page shadow-lg" style={pageStyle}>
            <h2 style={headingStyle}>CONCLUSION</h2>
            <p style={paragraphStyle}>
              Thank you for completing the EthiAI Compliance Report. We’re here to support you in transforming
              your organization’s AI potential into actionable success. Our team of experts is ready to provide
              guidance tailored to your needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadReport;
