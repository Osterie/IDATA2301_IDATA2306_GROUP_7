import { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Contact Us</h2>
      {submitted ? (
        <p className="text-green-600">Thank you! Your message has been sent.</p>
      ) : (
        <form
            action="https://formsubmit.co/d4d53e49a9133e043ae554f42b38f3a1"
            method="POST"
            className="space-y-4"
            onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            required
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          ></textarea>
          <input type="hidden" name="_next" value="YOUR_THANK_YOU_PAGE_URL" />
          <input type="hidden" name="_captcha" value="false" />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
