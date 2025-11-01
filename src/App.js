import React, { useState, useRef, useEffect } from "react";
// import "./XModal.css"; // optional CSS for styling modal

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });

  // Close modal if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
        resetForm();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const resetForm = () => {
    setFormData({
      username: "",
      email: "",
      phone: "",
      dob: "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, email, phone, dob } = formData;

    // Check empty fields
    if (!username.trim()) return alert("Please fill out the Username field.");
    if (!email.trim()) return alert("Please fill out the Email field.");
    if (!phone.trim()) return alert("Please fill out the Phone Number field.");
    if (!dob.trim()) return alert("Please fill out the Date of Birth field.");

    // Validate email
    if (!email.includes("@")) return alert("Invalid email. Please check your email address.");

    // Validate phone
    if (!/^\d{10}$/.test(phone))
      return alert("Invalid phone number. Please enter a 10-digit phone number.");

    // Validate DOB (not in the future)
    const selectedDate = new Date(dob);
    const today = new Date();
    if (selectedDate > today)
      return alert("Invalid date of birth. Please enter a valid DOB.");

    // If all validation passes
    alert("Form submitted successfully!");
    setIsOpen(false);
    resetForm();
  };

  return (
    <div className="app">
      <div  style={{display:"flex", alignItems:"center",justifyContent:"center"}}>
      <button onClick={() => setIsOpen(true)}>Open Form</button>
    </div>
      {isOpen && (
        <div className="modal" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
          <div className="modal-content" ref={modalRef}>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="text"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="dob">Date of Birth:</label>
                <input
                  type="date"
                  id="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
