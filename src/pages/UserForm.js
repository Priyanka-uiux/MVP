// src/pages/UserDetailsForm.js
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/images/logo.png";

export default function UserDetailsForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organisation: ""
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.organisation.trim())
      newErrors.organisation = "Organisation is required";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true); // Disable button while submitting

    try {
      const res = await fetch("https://formspree.io/f/xzzvyqwa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error("Formspree submission failed");
      }

      // Save data locally
      localStorage.setItem("userData", JSON.stringify(formData));
      localStorage.setItem("formCompleted", "true");

      // Navigate to disclaimer page
      navigate("/disclaimer");
    } catch (err) {
      console.error(err);
      alert("Error submitting form. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080029] flex flex-col items-center justify-start">
      <img src={logo} alt="Logo" className="w-[250px] p-5" />
      <div className="flex flex-col gap-[30px] items-center justify-center py-5 w-full md:w-[60%]">
        <div className="border-[#33cae5] border-[2px] p-8 shadow-lg rounded-[30px] bg-white w-full">
          <h1 className="text-[50px] font-bold text-[#33cae5] text-center mb-1">
            Welcome to EthiAI
          </h1>
          <h2 className="text-[22px] font-medium text-[#080029] text-center mb-8">
            Enter Your Details
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Name */}
            <div>
              <label className="block mb-1 font-semibold text-[#080029]">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full border border-gray-300 p-3 rounded bg-white text-black placeholder-gray-500 focus:outline-none focus:border-[#33cae5]"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 font-semibold text-[#080029]">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border border-gray-300 p-3 rounded bg-white text-black placeholder-gray-500 focus:outline-none focus:border-[#33cae5]"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            {/* Organisation */}
            <div>
              <label className="block mb-1 font-semibold text-[#080029]">Organisation</label>
              <input
                type="text"
                name="organisation"
                value={formData.organisation}
                onChange={handleChange}
                placeholder="Enter your organisation name"
                className="w-full border border-gray-300 p-3 rounded bg-white text-black placeholder-gray-500 focus:outline-none focus:border-[#33cae5]"
              />
              {errors.organisation && <p className="text-red-500 text-sm">{errors.organisation}</p>}
            </div>

            {/* Submit */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={submitting}
                className="border-2 border-[#33cae5] text-white bg-[#33cae5] py-3 px-6 rounded-lg hover:!text-[#080029] hover:!bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit & Continue"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
