import React, { useState } from 'react';
import "./Form.css";

const Form = ({ addItem }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    profession: '',
    email: '', // Add email to formData
  });

  const [errors, setErrors] = useState({
    name: '',
    address: '',
    phone: '',
    profession: '',
    email: '', // Add email to errors
  });

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!formData.address.trim()) {
      errors.address = 'Address is required';
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = 'Phone number must be 10 digits';
    }
    if (!formData.profession.trim()) {
      errors.profession = 'Profession is required';
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '', // Clear error when user types
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addItem(formData);
      setFormData({
        name: '',
        address: '',
        phone: '',
        profession: '',
        email: '', // Clear email field on successful submission
      });
      setErrors({
        name: '',
        address: '',
        phone: '',
        profession: '',
        email: '', // Clear errors
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter Your Name"
        />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="address">Address: </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter Your Address"
        />
        {errors.address && <p className="error">{errors.address}</p>}
      </div>
      <div>
        <label htmlFor="phone">Phone Number: </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter Your Phone Number"
          maxLength="10"
        />
        {errors.phone && <p className="error">{errors.phone}</p>}
      </div>
      <div>
        <label htmlFor="profession">Profession: </label>
        <input
          type="text"
          id="profession"
          name="profession"
          value={formData.profession}
          onChange={handleChange}
          placeholder="Enter Your Profession"
        />
        {errors.profession && <p className="error">{errors.profession}</p>}
      </div>
      <div>
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter Your Email"
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <button className="submit">Add</button>
    </form>
  );
};

export default Form;
