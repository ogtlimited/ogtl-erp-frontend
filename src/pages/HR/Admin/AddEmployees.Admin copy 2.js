import React, { useState } from 'react';

const AddEmployeesAdmin = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    personalDetails: {
      firstName: '',
      lastName: '',
      email: '',
      gender: '',
    },
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const section = name.split('.')[0];
    const field = name.split('.')[1];
    setFormData((prevFormData) => ({
      ...prevFormData,
      [section]: {
        ...prevFormData[section],
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process form data
    console.log(formData);
    // Reset form data and step
    setFormData({
      personalDetails: {
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
      },
      password: '',
    });
    setStep(1);
  };

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2>Step 1</h2>
            <input
              type="text"
              name="personalDetails.firstName"
              value={formData.personalDetails.firstName}
              onChange={handleChange}
              placeholder="First Name"
            />
            <input
              type="text"
              name="personalDetails.lastName"
              value={formData.personalDetails.lastName}
              onChange={handleChange}
              placeholder="Last Name"
            />
            <button onClick={nextStep}>Next</button>
          </div>
        );
      case 2:
        return (
          <div>
            <h2>Step 2</h2>
            <input
              type="email"
              name="personalDetails.email"
              value={formData.personalDetails.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <select
              name="personalDetails.gender"
              value={formData.personalDetails.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <button onClick={prevStep}>Previous</button>
            <button onClick={nextStep}>Next</button>
          </div>
        );
      case 3:
        return (
          <div>
            <h2>Step 3</h2>
            <p>Review your information:</p>
            <p>First Name: {formData.personalDetails.firstName}</p>
            <p>Last Name: {formData.personalDetails.lastName}</p>
            <p>Email: {formData.personalDetails.email}</p>
            <p>Gender: {formData.personalDetails.gender}</p>
            <button onClick={prevStep}>Previous</button>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h1>Multi-Step Form</h1>
      {renderForm()}
    </div>
  );
};

export default AddEmployeesAdmin;
