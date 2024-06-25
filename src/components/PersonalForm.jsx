import React from 'react';

const PersonalForm = ({ formData, handleChange, errors }) => {
  return (
    <div>
      <div className="form-group">
        <label className="form-label">Name</label>
        <input
          type="text"
          name="name"
          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>
      <div className="form-group">
        <label className="form-label">Email</label>
        <input
          type="email"
          name="email"
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>
      <div className="form-group">
        <label className="form-label">Phone</label>
        <input
          type="tel"
          name="phone"
          className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
      </div>
    </div>
  );
};

export default PersonalForm;