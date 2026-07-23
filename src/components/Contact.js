import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-150 mx-auto px-5 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#1c1c1c] mb-2">Contact Us</h1>
        <h2 className="text-base text-gray-500">Reach out to us anytime!</h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-md border border-[#e9e9eb] p-8 flex flex-col gap-5"
      >
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-semibold text-gray-700">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your full name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none transition-colors duration-200 focus:border-[#e8760a] focus:ring-2 focus:ring-[#e8760a]/20"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-semibold text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none transition-colors duration-200 focus:border-[#e8760a] focus:ring-2 focus:ring-[#e8760a]/20"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="message" className="text-sm font-semibold text-gray-700">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="How can we help you?"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none resize-none transition-colors duration-200 focus:border-[#e8760a] focus:ring-2 focus:ring-[#e8760a]/20"
          />
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 rounded-full bg-[#e8760a] text-white text-sm font-semibold cursor-pointer transition-colors duration-200 hover:bg-[#c9620a]"
        >
          Submit
        </button>

        {submitted && (
          <p className="text-sm text-green-700 font-medium text-center">
            Thanks for reaching out! We'll get back to you soon.
          </p>
        )}
      </form>
    </div>
  );
};

export default Contact;