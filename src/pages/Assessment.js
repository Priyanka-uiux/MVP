import { useEffect, useState } from "react";
import logo from "../assets/images/logo.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Risk scoring added to each option
const quizData = [
  {
    id: 1,
    section: "Prohibited Practices",
    question:
      "Does your AI system carry out any of these activities?(Select the one that applies, even if it happens occasionally.)",
    options: [
      { number: 1, label: "Influences what someone thinks or does without their awareness", comment: "According to the EU AI Act, your AI system may fall under prohibited practices. To further assess your system’s compliance risks, subscribe to EthiAI today and ensure you stay aligned with EU regulations.", riskScore: 1},
      { number: 2, label: "Provides tailored content or interactions to people based on personal situations (such as age, health, or financial condition)", comment: "According to the EU AI Act, your AI system may fall under prohibited practices. To further assess your system’s compliance risks, subscribe to EthiAI today and ensure you stay aligned with EU regulations.", riskScore: 0},
      { number: 3, label: "Assesses or rates people based on their behavior, actions, or characteristics over time.", comment: "According to the EU AI Act, your AI system may fall under prohibited practices. To further assess your system’s compliance risks, subscribe to EthiAI today and ensure you stay aligned with EU regulations.", riskScore: 1},
      { number: 4, label: "Predicts possible future actions based on a person’s traits or behavior.",comment:"According to the EU AI Act, your AI system may fall under prohibited practices. To further assess your system’s compliance risks, subscribe to EthiAI today and ensure you stay aligned with EU regulations.", riskScore: 1 },
      { number: 5, label: "Collects facial images from public places or online sources without direct consent", comment: "According to the EU AI Act, your AI system may fall under prohibited practices. To further assess your system’s compliance risks, subscribe to EthiAI today and ensure you stay aligned with EU regulations.", riskScore: 1 },
      { number: 6, label: "Detects or interprets emotions in workplaces, schools, or other settings (not for health or safety purposes)", comment:"According to the EU AI Act, your AI system may fall under prohibited practices. To further assess your system’s compliance risks, subscribe to EthiAI today and ensure you stay aligned with EU regulations.",riskScore: 1 },
      { number: 7, label: "Estimates personal details like background, beliefs, or preferences using facial or physical data. ",comment:"According to the EU AI Act, your AI system may fall under prohibited practices. To further assess your system’s compliance risks, subscribe to EthiAI today and ensure you stay aligned with EU regulations." ,riskScore: 1},
      { number: 8, label: "Uses technology in public spaces to identify or track individuals in real time", comment:"According to the EU AI Act, your AI system may fall under prohibited practices. To further assess your system’s compliance risks, subscribe to EthiAI today and ensure you stay aligned with EU regulations.",riskScore: 1 },
      { number: 9, label: "None of these apply", comment: "According to the EU AI Act, your AI system does not fall under prohibited practices. Proceed now to further assess compliance risks under the High-Risk category with EthiAI.", riskScore: 0}
    ]
  },
  {
    id: 2,
    section: "High-Risk Classification",
    question: "Is your AI system primarily used within any of the following domains?",
    options: [
      { number: 1, label: "Civil aviation safety or security", comment: "Based on your selection, your AI system may be considered high-risk under the EU AI Act as it relates to a product or system covered by Union harmonisation legislation listed in Annex I Section B.", riskScore: 1 },
      { number: 2, label: "Surveillance of motorcycles, mopeds, or quadricycles",comment:"Based on your selection, your AI system may be considered high-risk under the EU AI Act as it relates to a product or system covered by Union harmonisation legislation listed in Annex I Section B.", riskScore: 1 },
      { number: 3, label: "Surveillance of agricultural or forestry machinery",comment:"Based on your selection, your AI system may be considered high-risk under the EU AI Act as it relates to a product or system covered by Union harmonisation legislation listed in Annex I Section B.", riskScore: 1 },
      { number: 4, label: "Marine equipment monitoring",comment:"Based on your selection, your AI system may be considered high-risk under the EU AI Act as it relates to a product or system covered by Union harmonisation legislation listed in Annex I Section B.", riskScore: 1},
      { number: 5, label: "Railway system interoperability or safety",comment:"Based on your selection, your AI system may be considered high-risk under the EU AI Act as it relates to a product or system covered by Union harmonisation legislation listed in Annex I Section B.", riskScore: 1 },
      { number: 6, label: "Surveillance of motorcycles, mopeds, or quadricycles",comment:"Based on your selection, your AI system may be considered high-risk under the EU AI Act as it relates to a product or system covered by Union harmonisation legislation listed in Annex I Section B.", riskScore: 1},
      { number: 7, label: "Civil aviation equipment or systems",comment:"Based on your selection, your AI system may be considered high-risk under the EU AI Act as it relates to a product or system covered by Union harmonisation legislation listed in Annex I Section B.", riskScore: 1},
      { number: 8, label: "None of the above ", riskScore: 0 },
 
    ]
  },
  {
    id: 3,
    section: "High-Risk Classification",
    question: "Is the product or system incorporating your AI subject to any of the following EU product safety frameworks?",
    options: [
      { number: 1, label: "A. Machinery", comment: "Based on your selection, your AI system may be considered high-risk under the EU AI Act as it relates to a product or system covered by Union harmonisation legislation listed in Annex I Section A.", riskScore: 1},
      { number: 2, label: "B. Safety of toys", comment: "Based on your selection, your AI system may be considered high-risk under the EU AI Act as it relates to a product or system covered by Union harmonisation legislation listed in Annex I Section A.", riskScore: 1 },
      { number: 3, label: "C. Recreational craft and personal watercraft", comment: "Based on your selection, your AI system may be considered high-risk under the EU AI Act as it relates to a product or system covered by Union harmonisation legislation listed in Annex I Section A.", riskScore: 1},
      { number: 4, label: "D. Lifts and safety components for lifts", comment: "Based on your selection, your AI system may be considered high-risk under the EU AI Act as it relates to a product or system covered by Union harmonisation legislation listed in Annex I Section A.", riskScore: 1},
      { number: 5, label: "E. Equipment/protective systems for potentially explosive environments", comment: "Based on your selection, your AI system may be considered high-risk under the EU AI Act as it relates to a product or system covered by Union harmonisation legislation listed in Annex I Section A.", riskScore: 1},
      { number: 6, label: "F. Market of radio equipment", comment: "Based on your selection, your AI system may be considered high-risk under the EU AI Act as it relates to a product or system covered by Union harmonisation legislation listed in Annex I Section A.", riskScore: 1},
      { number: 7, label: "G. Market of pressure equipment", comment: "Based on your selection, your AI system may be considered high-risk under the EU AI Act as it relates to a product or system covered by Union harmonisation legislation listed in Annex I Section A.", riskScore: 1},
      { number: 8, label: "H. Cableway installations", comment: "Based on your selection, your AI system may be considered high-risk under the EU AI Act as it relates to a product or system covered by Union harmonisation legislation listed in Annex I Section A.", riskScore: 1},
      { number: 9, label: "I. Personal protective equipment", comment: "Based on your selection, your AI system may be considered high-risk under the EU AI Act as it relates to a product or system covered by Union harmonisation legislation listed in Annex I Section A.", riskScore: 1},
      { number: 10, label: "J. Appliances burning gaseous fuels", comment: "Based on your selection, your AI system may be considered high-risk under the EU AI Act as it relates to a product or system covered by Union harmonisation legislation listed in Annex I Section A.", riskScore: 1},
      { number: 11, label: "K. Medical devices", comment: "Based on your selection, your AI system may be considered high-risk under the EU AI Act as it relates to a product or system covered by Union harmonisation legislation listed in Annex I Section A.", riskScore: 1},
      { number: 12, label: "L. In vitro diagnostic medical devices", comment: "Based on your selection, your AI system may be considered high-risk under the EU AI Act as it relates to a product or system covered by Union harmonisation legislation listed in Annex I Section A.", riskScore: 1},
      { number: 13, label: "M. None of the above", riskScore: 0,jumpToId:5 },
    ]
  },
  {
    id: 4,
    section: "High-Risk Classification",
    question: "Did your AI system or its hosting undergo an evaluation or certification by an external conformity body before it is placed on the market?",
    options: [
      { number: 1, label: "Yes", riskScore: 0 },
      { number: 2, label: "No", comment: "If your AI system or its hosting has not undergone third-party conformity assessment when required, it may be deemed non-compliant with the EU AI Act. This could prevent it from being legally placed on the EU market, and regulatory bodies may block or withdraw its deployment. Ensure compliance to avoid legal and market risks.", riskScore: 1 },
    ]
  },
  {
    id: 5,
    section: "High-Risk Classification",
    question: "Which of the following use cases best describes where your AI system operates or is intended to operate?",
    options: [
      { number: 1, label: "A. Detect or match individuals based on facial images, voice recordings, or physical/behavioural traits",comment: "According to Annex III, your AI system is classified as high-risk under Article 6(2) of the EU AI Act.", riskScore: 1 },
      { number: 2, label: "B. Classify individuals into groups based on biometric data (e.g., facial features, voice)", comment: "According to Annex III, your AI system is classified as high-risk under Article 6(2) of the EU AI Act. ", riskScore: 1},
      { number: 3, label: "C. Analyse facial expressions, tone, or gestures to interpret emotional states",comment: "According to Annex III, your AI system is classified as high-risk under Article 6(2) of the EU AI Act. ", riskScore: 1},
      { number: 4, label: "D. Assist in monitoring or managing infrastructure such as public transport, energy grids, or water systems", comment: "According to Annex III, your AI system is classified as high-risk under Article 6(2) of the EU AI Act. ", riskScore: 1},
      { number: 5, label: "E. Evaluate or influence decisions in school admissions, student assessment, or test monitoring",comment: "According to Annex III, your AI system is classified as high-risk under Article 6(2) of the EU AI Act. ", riskScore: 1},
      { number: 6, label: "F. Assist with employee screening, promotion eligibility, or assigning work-related tasks", comment: "According to Annex III, your AI system is classified as high-risk under Article 6(2) of the EU AI Act. ", riskScore: 1},
      { number: 7, label: "G. Contribute to assessments that determine eligibility for public benefits, loans, insurance, or emergency services",comment: "According to Annex III, your AI system is classified as high-risk under Article 6(2) of the EU AI Act. ", riskScore: 1 },
      { number: 8, label: "H. Support public security, investigations, or crime-related assessments (e.g., risk prediction, evidence analysis)", comment: "According to Annex III, your AI system is classified as high-risk under Article 6(2) of the EU AI Act. ", riskScore: 1 },
      { number: 9, label: "I. Aid in immigration or border-related processes such as interviews, document checking, or detection tasks",comment: "According to Annex III, your AI system is classified as high-risk under Article 6(2) of the EU AI Act. ", riskScore: 1 },
      { number: 10, label: "J. Support legal decision-making or procedures in courts, hearings, or democratic processes", comment: "According to Annex III, your AI system is classified as high-risk under Article 6(2) of the EU AI Act. ", riskScore: 1 },
      { number: 11, label: "K. None of the above", comment: "Your AI system is not classified as high-risk under Article 6(2) of the EU AI Act.", riskScore: 0,jumpToId:"END" },
    ]
  },
  {
    id: 6,
    section: "High-Risk Classification",
    question: "How would you describe the tasks your AI system performs in its workflow?",
    options: [
      { number: 1, label: "A. Assists in procedural or repetitive tasks (e.g., sorting, extracting, tagging)",comment:"Your AI system is not considered high-risk according to Article 6(3) of the EU AI Act, as it does not pose a significant risk of harm to health, safety, or fundamental rights, including by not materially influencing decision-making. ", riskScore: 0},
      { number: 2, label: "B. Prepares or filters data before decision-making", comment: "Your AI system is not considered high-risk according to Article 6(3) of the EU AI Act, as it does not pose a significant risk of harm to health, safety, or fundamental rights, including by not materially influencing decision-making. ", riskScore: 0 },
      { number: 3, label: "C. Detects anomalies or patterns in datasets",comment:"Your AI system is not considered high-risk according to Article 6(3) of the EU AI Act, as it does not pose a significant risk of harm to health, safety, or fundamental rights, including by not materially influencing decision-making. ", riskScore: 0 },
      { number: 4, label: "D. Supports a human decision-maker without making final decisions",comment:"Your AI system is not considered high-risk according to Article 6(3) of the EU AI Act, as it does not pose a significant risk of harm to health, safety, or fundamental rights, including by not materially influencing decision-making.", riskScore: 0},
      { number: 5, label: "E. Makes autonomous or final decisions in critical use cases",comment:"Your AI system remains classified as high-risk under Article 6(2) of the EU AI Act, as it makes autonomous or final decisions, which do not qualify for exemption under Article 6(3).", riskScore: 1 },
      { number: 6, label: "F. None of the above",comment:"Your AI system remains classified as high-risk under Article 6(2) of the EU AI Act, as it does not meet any of the exemption conditions in Article 6(3).", riskScore: 1,jumpToId:"END" }
    ]
  },
  {
    id: 7,
    section: "High-Risk Classification",
    question: "What does your AI system do with information about individual people?",
    options: [
      { number: 1, label: "A. It studies personal details or behavior to give each person a score, label, or result that helps someone make a decision about them",comment:"Your AI system is considered high-risk under Article 6(3) of the EU AI Act, as it performs profiling of natural persons.", riskScore: 1},
      { number: 2, label: "B. It groups people’s information, but no decisions are made based on that grouping",comment:"Your AI system is not considered high-risk under Article 6(3) of the EU AI Act, as it does not perform profiling. If you wish to claim an exemption then according to Article 6(4), you must document a justification, register it in the EU public database, and provide documentation upon request from national authorities.", riskScore: 0,jumpToId:"END" },
      { number: 3, label: "C. It works with general or anonymous data, not linked to any specific person",comment:"Your AI system is not considered high-risk under Article 6(3) of the EU AI Act, as it does not perform profiling. If you wish to claim an exemption then according to Article 6(4), you must document a justification, register it in the EU public database, and provide documentation upon request from national authorities.", riskScore: 0,jumpToId:"END"}
     
    ]
  },
  {
    id: 8,
    section: "Requirements for High-Risk AI Systems",
    question: "Which of the following best describes how your team tracks design decisions, updates, and issues for the AI system from development to deployment?",
    options: [
      { number: 1, label: "A. We use a documented process integrated with our AI development workflow, covering each stage from design to post-deployment.", riskScore: 0 },
      { number: 2, label: "B. We maintain informal records across teams, but no structured documentation across the full lifecycle.",comment:"According to Article 9(1) of the EU AI Act, your answer is not compliant. High-risk AI  systems need a documented risk management system for all stages, from design to post-deployment. Setting up a clear, documented  process integrated with your AI development workflow that covers all stages, including post-deployment is recommended.", riskScore: 1 },
      { number: 3, label: "C. We mostly document only during major milestones or regulatory audits.",comment:"According to Article 9(1) of the EU AI Act, your answer is not compliant. High-risk AI  systems need a documented risk management system for all stages, from design to post-deployment. Setting up a clear, documented  process integrated with your AI development workflow that covers all stages, including post-deployment is recommended.", riskScore: 1 },
      { number: 4, label: "D. We focus primarily on development-stage documentation; post-deployment processes are handled separately.",comment:"According to Article 9(1) of the EU AI Act, your answer is not compliant. High-risk AI  systems need a documented risk management system for all stages, from design to post-deployment. Setting up a clear, documented  process integrated with your AI development workflow that covers all stages, including post-deployment is recommended.", riskScore: 1 }
     
    ]
  },
  {
    id: 9,
    section: "Requirements for High-Risk AI Systems",
    question: "How does the AI system handle event recording during its operation? (Select the option that best describes your current implementation.)",
    options: [
      { number: 1, label: "The system records operational events automatically throughout its entire lifecycle.", riskScore: 0 },
      { number: 2, label: "The system records events automatically but only during specific modes or activities.",comment:"According to Article 12(1) of the EU AI Act, your answer is not compliant. High-risk AI systems must automatically record events (logs) throughout their entire lifecycle to help trace problems or risks. It is recommended to implement continuous and automatic event logging.", riskScore: 1 },
      { number: 3, label: "Event recording requires manual initiation or occurs intermittently.",comment:"According to Article 12(1) of the EU AI Act, your answer is not compliant. High-risk AI systems must automatically record events (logs) throughout their entire lifecycle to help trace problems or risks. It is recommended to implement continuous and automatic event logging. ", riskScore: 1 },
      { number: 4, label: "The system does not currently include an event recording capability.",comment:"According to Article 12(1) of the EU AI Act, your answer is not compliant. High-risk AI systems must automatically record events (logs) throughout their entire lifecycle to help trace problems or risks. It is recommended to implement continuous and automatic event logging.", riskScore: 1 }
     
    ]
  },
  {
    id: 10,
    section: "Requirements for High-Risk AI Systems",
    question: "Which of the following are formally documented and available in your organisation related to the AI system’s management? (Select all that apply)",
    isMultiSelect:true,
    options: [
      { number: 1, label: "A written plan for meeting legal rules and managing changes made to the AI system.", riskScore: 0},
      { number: 2, label: "A record of who is responsible for important tasks and decisions about the AI system.", riskScore: 0 },
      { number: 3, label: "A system for speaking with government bodies, partners, and users about the AI system.", riskScore: 0 },
      { number: 4, label: "A plan to handle staffing, resources, and supply needs for running and supporting the AI system.", riskScore: 0 },
      { number: 5, label: "None of the above",comment:"According to Article 17(1) of the EU AI Act, this answer is not compliant. The organization must have written plans that show it follows the AI law, name who is responsible for key tasks, include communication with users and authorities, and cover staffing and resources. It is recommended to create and keep these documents to meet the law and keep the AI system safe.", riskScore: 1 }
    ]
  },
  {
    id: 11,
    section: "Requirements for High-Risk AI Systems",
    question: "How does your company store the documents that explain how your AI system works?",
    options: [
      { number: 1, label: "We store the AI system documents together with our financial compliance records, as part of our regular reporting and oversight processes.", riskScore: 0 },
      { number: 2, label: "We keep the AI system documents in a internal folder, managed by our AI or IT team separately from our financial reporting files.",comment:"According to Article 18(3) of the EU AI Act, your answer is not compliant. If your company is a financial institution, AI documents must be stored within your main financial compliance system. It is recommended to include them in your internal governance records to meet legal requirements.", riskScore: 1 },
      { number: 3, label: "The AI system documents are maintained by the external vendor or developer that built the system, with access available to us when needed.",comment:"According to Article 18(3) of the EU AI Act, your answer is not compliant. If your company is a financial institution, AI documents must be stored within your main financial compliance system. It is recommended to include them in your internal governance records to meet legal requirements.", riskScore: 1 },
      { number: 4, label: "We are currently reviewing options and have not yet formalised a specific approach for storing AI-related documents.",comment:"According to Article 18(3) of the EU AI Act, your answer is not compliant. If your company is a financial institution, AI documents must be stored within your main financial compliance system. It is recommended to include them in your internal governance records to meet legal requirements.", riskScore: 1 }
     
    ]
  },
  {
    id: 12,
    section: "Requirements for High-Risk AI Systems",
    question: "Does your AI system primarily support activities carried out by any of the following groups?1. Public security or law enforcement agencies2. Authorities handling immigration or asylum matters3. Institutions or bodies of the European Union ",
    options: [
      { number: 1, label: "Yes",comment:"According to Article 43(1)(b) of the EU AI Act, when an AI system is intended for use by these authorities, the Market Surveillance Authority, as outlined in Article 74(8) or (9), serves as the Notified Body for the conformity assessment, replacing the option for a provider-selected Notified Body.", riskScore: 0 },
      { number: 2, label: "No",riskScore: 1 }
    ]
  },
 
 
 
];
 

export default function GeneralQuizFullFlow() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [comment, setComment] = useState("");
  const [totalRiskScore, setTotalRiskScore] = useState(0);
  const [answers, setAnswers] = useState([]);

  const currentQuiz = quizData[currentIndex];
  const isMultiSelect = currentQuiz.id === 10;

  const handleOptionChange = (option) => {
    if (isMultiSelect) {
      let updatedOptions;

      if (option.label.toLowerCase().includes("none")) {
        updatedOptions = [option];
      } else {
        const noneOption = selectedOptions.find((opt) => opt.label.toLowerCase().includes("none"));
        updatedOptions = noneOption
          ? [option]
          : selectedOptions.includes(option)
          ? selectedOptions.filter((opt) => opt !== option)
          : [...selectedOptions, option];
      }

      setSelectedOptions(updatedOptions);
      if (option.comment) {
        setComment(option.comment);
        setShowPopup(true);
      }
    } else {
      setSelectedOption(option);
      setSelectedOptions([]);
      if (option.comment) {
        setComment(option.comment);
        setShowPopup(true);
      } else {
        setComment("");
        setShowPopup(false);
      }
    }
  };

  const handleNext = () => {
    if (isMultiSelect) {
      const score = selectedOptions.reduce((acc, opt) => acc + (opt.riskScore || 0), 0);
      setTotalRiskScore((prev) => prev + score);
      setAnswers((prev) => [...prev, { questionId: currentQuiz.id, selected: selectedOptions }]);
    } else if (selectedOption) {
      setTotalRiskScore((prev) => prev + (selectedOption.riskScore || 0));
      setAnswers((prev) => [...prev, { questionId: currentQuiz.id, selected: selectedOption }]);
    }

    setShowPopup(false);
    setComment("");
    setSelectedOption(null);
    setSelectedOptions([]);

    let nextIndex;
    const jump = isMultiSelect ? null : selectedOption?.jumpToId;

    if (jump) {
      if (jump === "END") return handleSubmit();
      const targetIndex = quizData.findIndex(q => q.id === jump);
      nextIndex = targetIndex !== -1 ? targetIndex : currentIndex + 1;
    } else {
      nextIndex = currentIndex + 1;
    }

    if (nextIndex < quizData.length) setCurrentIndex(nextIndex);
    else handleSubmit();
  };

  const handleSubmit = () => {
    let finalScore = totalRiskScore;
    let finalAnswers = [...answers];

    if (isMultiSelect && selectedOptions.length > 0) {
      const score = selectedOptions.reduce((acc, opt) => acc + (opt.riskScore || 0), 0);
      finalScore += score;
      finalAnswers.push({ questionId: currentQuiz.id, selected: selectedOptions });
    } else if (selectedOption) {
      finalScore += selectedOption.riskScore || 0;
      finalAnswers.push({ questionId: currentQuiz.id, selected: selectedOption });
    }

    localStorage.setItem("riskScore", finalScore);
    localStorage.setItem("quizAnswers", JSON.stringify(finalAnswers));

    navigate("/evaluation");
  };

  const isOptionSelected = (option) => {
    if (isMultiSelect) return selectedOptions.includes(option);
    return selectedOption?.number === option.number;
  };

  return (
    <div className="min-h-screen bg-[#080029] text-white">
      <img src={logo} alt="logo" className="w-[250px] p-5" />
      <div className="flex items-center justify-center">
        <div className="w-full md:w-[80vw] p-8 my-[5vh]">

          {/* Progress Bar */}
          <div className="w-full h-4 mb-4 rounded-full bg-[#1a1a3f] overflow-hidden">
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${Math.round(((currentIndex + 1) / quizData.length) * 100)}%`,
                background: "linear-gradient(to right, #33cae5, #0c7fbf, #050f2e)",
              }}
            ></div>
          </div>

          <div className="border-[#14035f] p-5 shadow-lg rounded-lg">
            <motion.h3
              key={`section-${currentQuiz.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-[#33cae5] text-[18px] font-semibold pb-2"
            >
              {currentQuiz.section}
            </motion.h3>

            <motion.h2
              key={currentQuiz.id}
              initial={{ y: "-100px", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-[25px] pb-3 font-bold"
            >
              {currentQuiz.question}
            </motion.h2>

            <ul className="flex flex-wrap gap-4">
              {currentQuiz.options.map((opt, idx) => (
                <motion.li
                  key={idx}
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className={`w-full md:w-[48%] p-4 rounded-md border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                    isOptionSelected(opt)
                      ? "border-[#33cae5] bg-[#1a1a3f]"
                      : "border-gray-600"
                  }`}
                  onClick={() => handleOptionChange(opt)}
                >
                  <input
                    type={isMultiSelect ? "checkbox" : "radio"}
                    checked={isOptionSelected(opt)}
                    readOnly
                    className="mr-2"
                  />
                  {opt.label}
                </motion.li>
              ))}
            </ul>

            <div className="flex justify-center mt-6">
              {currentIndex === quizData.length - 1 ? (
                <button
                  onClick={() => (comment ? setShowPopup(true) : handleSubmit())}
                  disabled={isMultiSelect ? selectedOptions.length === 0 : !selectedOption}
                  className={`px-6 py-3 rounded-lg font-semibold border-2 transition-all duration-300 ${
                    isMultiSelect
                      ? selectedOptions.length > 0
                        ? "bg-green-500 border-green-500 hover:bg-green-600"
                        : "bg-gray-500 border-gray-500 cursor-not-allowed"
                      : selectedOption
                      ? "bg-green-500 border-green-500 hover:bg-green-600"
                      : "bg-gray-500 border-gray-500 cursor-not-allowed"
                  }`}
                >
                  Submit
                </button>
              ) : (
                <button
                  onClick={() => (comment ? setShowPopup(true) : handleNext())}
                  disabled={isMultiSelect ? selectedOptions.length === 0 : !selectedOption}
                  className={`px-6 py-3 rounded-lg font-semibold border-2 transition-all duration-300 ${
                    isMultiSelect
                      ? selectedOptions.length > 0
                        ? "bg-[#33cae5] border-[#33cae5] hover:bg-[#3a2d83]"
                        : "bg-gray-500 border-gray-500 cursor-not-allowed"
                      : selectedOption
                      ? "bg-[#33cae5] border-[#33cae5] hover:bg-[#3a2d83]"
                      : "bg-gray-500 border-gray-500 cursor-not-allowed"
                  }`}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* POPUP COMMENT MODAL */}
      {showPopup && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-white text-black p-6 rounded-lg max-w-lg shadow-xl relative">
            <button
              className="absolute top-2 right-3 text-2xl font-bold text-gray-700 hover:text-gray-900"
              onClick={() => setShowPopup(false)}
            >
              &times;
            </button>
            <p className="text-lg">{comment}</p>
            <div className="mt-6 flex justify-end">
              <button
                className={`px-4 py-2 rounded text-white ${
                  currentIndex === quizData.length - 1
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-[#33cae5] hover:bg-[#3a2d83]"
                }`}
                onClick={() =>
                  currentIndex === quizData.length - 1
                    ? handleSubmit()
                    : handleNext()
                }
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
