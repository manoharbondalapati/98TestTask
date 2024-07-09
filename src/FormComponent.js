import React, { useState } from 'react';
import './FormComponent.css';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    age: '',
    city: '',
    address: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    degree: '',
    file: null,
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let formErrors = {};

    if (!formData.fname) formErrors.fname = "First name is required.";
    if (!formData.lname) formErrors.lname = "Last name is required.";
    if (!formData.age) formErrors.age = "Age is required.";
    else if (isNaN(formData.age)) formErrors.age = "Age must be a number.";
    if (!formData.city) formErrors.city = "City is required.";
    if (!formData.address) formErrors.address = "Address is required.";
    if (!formData.email) formErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) formErrors.email = "Email is invalid.";
    if (! /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/.text(formData.password))formErrors.password = "Password is required.";
    if (!formData.confirmPassword) formErrors.confirmPassword = "Confirm Password is required.";
    else if (formData.password !== formData.confirmPassword) formErrors.confirmPassword = "Passwords do not match.";
    if (!formData.gender) formErrors.gender = "Gender is required.";
    if (!formData.degree) formErrors.degree = "Degree is required.";
    if (!formData.file) formErrors.file = "PDF file is required.";
    else if (formData.file.type !== "application/pdf") formErrors.file = "File must be a PDF.";
    if (!formData.termsAccepted) formErrors.termsAccepted = "You must accept the terms and conditions.";

    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log(formData);
      // Reset form data
      setFormData({
        fname: '',
        lname: '',
        age: '',
        city: '',
        address: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: '',
        degree: '',
        file: null,
        termsAccepted: false,
      });
      // Optionally, you can also reset file input value manually since it doesn't reset with state change
      e.target.reset();
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name:</label>
        <input type="text" name="fname" value={formData.fname} onChange={handleChange} />
        {errors.fname && <span>{errors.fname}</span>}
      </div>
      <div>
        <label>Last Name:</label>
        <input type="text" name="lname" value={formData.lname} onChange={handleChange} />
        {errors.lname && <span>{errors.lname}</span>}
      </div>
      <div>
        <label>Age:</label>
        <input type="text" name="age" value={formData.age} onChange={handleChange} />
        {errors.age && <span>{errors.age}</span>}
      </div>
      <div>
        <label>City:</label>
        <input type="text" name="city" value={formData.city} onChange={handleChange} />
        {errors.city && <span>{errors.city}</span>}
      </div>
      <div>
        <label>Address:</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} />
        {errors.address && <span>{errors.address}</span>}
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
        {errors.email && <span>{errors.email}</span>}
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
        {errors.password && <span>{errors.password}</span>}
      </div>
      <div>
        <label>Confirm Password:</label>
        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
        {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
      </div>
      <div>
        <label>Gender:</label>
        <input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} /> Male
        <input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} /> Female
        {errors.gender && <span>{errors.gender}</span>}
      </div>
      <div>
        <label>Degree:</label>
        <select name="degree" value={formData.degree} onChange={handleChange}>
          <option value="">Select degree</option>
          <option value="mba">MBA</option>
          <option value="btech">B.Tech</option>
          <option value="mtech">M.Tech</option>
        </select>
        {errors.degree && <span>{errors.degree}</span>}
      </div>
      <div>
        <label>Upload PDF:</label>
        <input type="file" name="file" onChange={handleChange} />
        {errors.file && <span>{errors.file}</span>}
      </div>
      <div>
        <label>
          <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} />
          Accept Terms and Conditions
        </label>
        {errors.termsAccepted && <span>{errors.termsAccepted}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormComponent;
