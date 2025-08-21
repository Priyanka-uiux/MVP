import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
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
  const [previewUrl, setPreviewUrl] = useState(null);

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
      const page = pages[i];
      const canvas = await html2canvas(page, {
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      if (i > 0) doc.addPage();
      doc.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    }

    doc.save("EthiAI_Report.pdf");
  };

  useEffect(() => {
    const generatePreview = async () => {
      const firstPage = document.querySelector(".pdf-page");
      if (!firstPage) return;
      const canvas = await html2canvas(firstPage, { scale: 2 });
      setPreviewUrl(canvas.toDataURL("image/png"));
    };
    generatePreview();
  }, []);

  const paragraphStyle = {
    fontSize: "16px",
    lineHeight: "1.8",
    textAlign: "justify",
  };

  // Measure text height dynamically
  const measureTextHeight = (text, fontSize = 16, maxWidth = 700) => {
    const temp = document.createElement("div");
    temp.style.position = "absolute";
    temp.style.visibility = "hidden";
    temp.style.width = `${maxWidth}px`;
    temp.style.fontSize = `${fontSize}px`;
    temp.style.lineHeight = "1.8";
    temp.style.whiteSpace = "normal";
    temp.innerText = text;
    document.body.appendChild(temp);
    const height = temp.clientHeight;
    document.body.removeChild(temp);
    return height;
  };

  // Render comments with dynamic pagination
  const renderCommentPages = (comments) => {
    if (!comments || comments.length === 0) {
      return (
        <div
          className="pdf-page"
          style={{
            width: `${A4_WIDTH}px`,
            minHeight: `${A4_HEIGHT}px`,
            padding: "40px",
            backgroundColor: "#080029",
            color: "#ffffff",
          }}
        >
          <h2
            style={{
              color: "#00BFFF",
              fontSize: "20px",
              fontWeight: "bold",
              borderBottom: "2px solid #00BFFF",
              paddingBottom: "6px",
              marginBottom: "20px",
            }}
          >
            GAPS AND RECOMMENDATIONS
          </h2>
          <p>No high-risk issues identified in your responses.</p>
        </div>
      );
    }

    const pages = [];
    let pageIndex = 0;
    let remainingComments = [...comments];

    while (remainingComments.length > 0) {
      let pageComments = [];
      let usedHeight = 0;
      const MAX_PAGE_HEIGHT = 1000;

      // First page reserves extra space for chart
      if (pageIndex === 0) usedHeight += 400;

      for (let i = 0; i < remainingComments.length; i++) {
        const comment = remainingComments[i];
        const commentHeight = measureTextHeight(comment);

        if (usedHeight + commentHeight > MAX_PAGE_HEIGHT) break;

        pageComments.push(comment);
        usedHeight += commentHeight;
      }

      // Remove used comments
      remainingComments = remainingComments.slice(pageComments.length);

      pages.push(
        <div
          key={`comments-page-${pageIndex}`}
          className="pdf-page"
          style={{
            width: `${A4_WIDTH}px`,
            minHeight: `${A4_HEIGHT}px`,
            padding: "40px",
            backgroundColor: "#080029",
            color: "#ffffff",
          }}
        >
          {pageIndex === 0 ? (
            <>
              <h2
                style={{
                  color: "#00BFFF",
                  fontSize: "20px",
                  fontWeight: "bold",
                  borderBottom: "2px solid #00BFFF",
                  paddingBottom: "6px",
                  marginBottom: "20px",
                }}
              >
                OVERALL ETHIAI RISK SCORE
              </h2>
              <div style={{ width: "300px", margin: "auto" }}>
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
                  fontWeight: "bold",
                }}
              >
                Total Risk Score: {percentage}%
              </p>
              <p style={{ textAlign: "center" }}>
                Risk Level: {getRiskLevel()}
              </p>

              <h2
                style={{
                  color: "#00BFFF",
                  fontSize: "20px",
                  fontWeight: "bold",
                  borderBottom: "2px solid #00BFFF",
                  paddingBottom: "6px",
                  margin: "30px 0 20px",
                }}
              >
                GAPS AND RECOMMENDATIONS
              </h2>
            </>
          ) : (
            <h2
              style={{
                color: "#00BFFF",
                fontSize: "20px",
                fontWeight: "bold",
                borderBottom: "2px solid #00BFFF",
                paddingBottom: "6px",
                marginBottom: "20px",
              }}
            >
              GAPS AND RECOMMENDATIONS (Continued)
            </h2>
          )}

          <ul
            style={{
              paddingLeft: "20px",
              paddingRight: "20px",
              listStyleType: "none",
              lineHeight: "1.8",
              textAlign: "justify",
              fontSize: "16px",
            }}
          >
            {pageComments.map((comment, index) => (
              <li
                key={index}
                style={{ marginBottom: "10px", display: "flex", gap: "10px" }}
              >
                <span style={{ flexShrink: 0 }}>•</span>
                <span>{comment}</span>
              </li>
            ))}
          </ul>
        </div>
      );

      pageIndex++;
    }

    return pages;
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white flex">
      <Sidebar />
      <div className="flex-1 pl-16 md:pl-64 pr-4 pt-6 pb-10">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="bg-white text-black px-5 py-2 rounded shadow hover:bg-gray-200 transition"
          >
            Back
          </button>
          <button
            onClick={generatePdf}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded shadow transition"
          >
            Download PDF
          </button>
        </div>
        <h1 className="text-xl font-bold mb-4">Download Report Preview</h1>

        <div className="space-y-8 flex flex-col items-center">
          {/* Cover Page */}
          <table className="w-[210mm] h-[297mm] bg-[#080029] border-collapse text-content pdf-page">
            <tbody>
              <tr>
                <td className="relative p-10" colSpan={2}>
                  <div className="absolute top-0 left-[50px] flex items-start gap-4">
                    <div className="w-[70px] h-[250px] bg-[#33cae5]" />
                    <div className="w-[250px] mt-5">
                      <img className="w-full h-full" src={logo} alt="logo" />
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan={2} className="h-full text-center align-middle">
                  <div className="border-t-2 border-b-2 border-white py-5">
                    <h1 className="text-[75px] text-white font-light leading-snug">
                      COMPLIANCE RISK <br /> REPORT
                    </h1>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Table of Contents */}
          <div
            className="pdf-page"
            style={{
              width: `${A4_WIDTH}px`,
              height: `${A4_HEIGHT}px`,
              padding: "40px",
              backgroundColor: "#080029",
              color: "#ffffff",
            }}
          >
            <h2
              style={{
                color: "#00BFFF",
                fontSize: "24px",
                fontWeight: "bold",
                borderBottom: "2px solid #00BFFF",
                paddingBottom: "6px",
                marginBottom: "20px",
              }}
            >
              TABLE OF CONTENTS
            </h2>
            <ul
              style={{
                listStyleType: "none",
                paddingLeft: "20px",
                paddingRight: "30px",
                fontSize: "18px",
                lineHeight: "2",
                margin: 0,
              }}
            >
              {[
                "Executive Summary",
                "Overall EthiAI Risk Score",
                "Gaps & Recommendations",
                "Merits",
                "Conclusion",
              ].map((item, index) => (
                <li
                  key={index}
                  style={{
                    borderBottom: "1px solid #ccc",
                    padding: "5px 0",
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Executive Summary */}
          <div
            className="pdf-page"
            style={{
              width: `${A4_WIDTH}px`,
              height: `${A4_HEIGHT}px`,
              padding: "40px",
              backgroundColor: "#080029",
              color: "#ffffff",
            }}
          >
            <h2
              style={{
                color: "#00BFFF",
                fontSize: "24px",
                fontWeight: "bold",
                borderBottom: "2px solid #00BFFF",
                paddingBottom: "6px",
                marginBottom: "20px",
              }}
            >
              EXECUTIVE SUMMARY
            </h2>
            {[
              "The EU AI Act is the world’s first AI regulation, designed to ensure AI systems deployed within the European Union are ethical, safe, and compliant with fundamental rights.",
              "It categorizes AI systems into risk levels (prohibited, high-risk, limited risk, and minimal risk) and imposes obligations accordingly.",
              "The act applies to providers, deployers, and users of AI systems operating within the EU or impacting EU citizens.",
              "The EU AI Act classifies AI systems based on their risk levels, ranging from minimal risk to prohibited practices that pose severe threats to human rights and safety. The Act applies to organizations developing, deploying, or using AI systems within the EU.",
              "EthiAI, developed by RisKey, evaluates AI compliance risks under the EU AI Act. The platform provides organizations with tools to assess:",
            ].map((text, i) => (
              <p
                key={i}
                style={{
                  fontSize: "16px",
                  lineHeight: "1.8",
                  textAlign: "justify",
                  marginBottom: "16px",
                  paddingLeft: "20px",
                  paddingRight: "10px",
                }}
              >
                {text}
              </p>
            ))}
            <ul
              style={{
                paddingLeft: "30px",
                paddingRight: "10px",
                fontSize: "16px",
                lineHeight: "1.8",
                listStyleType: "none",
                textAlign: "justify",
              }}
            >
              {[
                "Compliance Standing Reports to help businesses understand their risk level and legal obligations.",
                "Actionable Recommendations to guide AI providers and deployers toward regulatory compliance.",
                "Comprehensive Compliance Dashboard offering real-time insights into AI risk levels.",
              ].map((text, i) => (
                <li
                  key={i}
                  style={{
                    marginBottom: "10px",
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <span style={{ flexShrink: 0 }}>•</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Gaps & Recommendations */}
          {renderCommentPages(allComments)}

          {/* Merits */}
          <div
            className="pdf-page"
            style={{
              width: `${A4_WIDTH}px`,
              height: `${A4_HEIGHT}px`,
              padding: "40px",
              backgroundColor: "#080029",
              color: "#ffffff",
            }}
          >
            <h2
              style={{
                color: "#00BFFF",
                fontSize: "20px",
                fontWeight: "bold",
                borderBottom: "2px solid #00BFFF",
                paddingBottom: "6px",
                marginBottom: "20px",
              }}
            >
              MERITS
            </h2>
            <ul
              style={{
                ...paragraphStyle,
                paddingLeft: "20px",
                paddingRight: "20px",
                fontSize: "16px",
                lineHeight: "1.8",
                listStyleType: "none",
                textAlign: "justify",
              }}
            >
              <li
                style={{ marginBottom: "10px", display: "flex", gap: "10px" }}
              >
                <span style={{ flexShrink: 0 }}>•</span>
                <span>
                  No merits were identified based on the selected responses.
                </span>
              </li>
            </ul>
          </div>

          {/* Conclusion */}
          <div
            className="pdf-page"
            style={{
              width: `${A4_WIDTH}px`,
              height: `${A4_HEIGHT}px`,
              padding: "40px",
              backgroundColor: "#080029",
              color: "#ffffff",
            }}
          >
            <h2
              style={{
                color: "#00BFFF",
                fontSize: "20px",
                fontWeight: "bold",
                borderBottom: "2px solid #00BFFF",
                paddingBottom: "6px",
                marginBottom: "20px",
              }}
            >
              CONCLUSION
            </h2>
            <p style={paragraphStyle}>
              Thank you for completing the EthiAI Compliance Report. We’re here
              to support you in transforming your organization’s AI potential
              into actionable success. Our team of experts is ready to provide
              guidance tailored to your needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadReport;
