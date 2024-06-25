import React, { useState, useEffect } from 'react';
import PersonalForm from './components/PersonalForm';
import AddressForm from './components/AddressForm';
import Confirmation from './components/Confirmation';
import {Tab, Tabs } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

const App = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const saveData = (data) => {
    localStorage.setItem('formData', JSON.stringify(data));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    saveData(newFormData);
  };

  const validateStep = () => {
    let valid = true;
    let newErrors = {};

    if (step === 0) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
        valid = false;
      }
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Valid email is required';
        valid = false;
      }
      if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = 'Valid 10-digit phone number is required';
        valid = false;
      }
    } else if (step === 1) {
      if (!formData.address1) {
        newErrors.address1 = 'Address Line 1 is required';
        valid = false;
      }
      if (!formData.city) {
        newErrors.city = 'City is required';
        valid = false;
      }
      if (!formData.state) {
        newErrors.state = 'State is required';
        valid = false;
      }
      if (!formData.zip || !/^\d{6}$/.test(formData.zip)) {
        newErrors.zip = 'Valid 6-digit Zip Code is required';
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep((prevStep) => Math.min(prevStep + 1, 2));
    }
  };

  const prevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const handleSubmit = () => {
    alert('Data Submitted succesfully')
    console.log('Form submitted:', formData);
  };

  const handleSelect = (k) => {
    setStep(k);
  };

  return (
    <div className="container">
      <Tabs activeKey={step} onSelect={handleSelect} className="mb-3">
        <Tab eventKey={0} title="Personal Information">
          <PersonalForm formData={formData} handleChange={handleChange} errors={errors} />
        </Tab>
        <Tab eventKey={1} title="Address Information" disabled={step < 1}>
          <AddressForm formData={formData} handleChange={handleChange} errors={errors} />
        </Tab>
        <Tab eventKey={2} title="Confirmation" disabled={step < 2}>
          <Confirmation formData={formData} />
        </Tab>
      </Tabs>
      <div className="button-group">
        <button type="button" className="btn btn-secondary" onClick={prevStep} disabled={step === 0}>
          Back
        </button>
        {step < 2 ? (
          <button type="button" className="btn btn-primary" onClick={nextStep}>
            Next
          </button>
        ) : (
          <button type="submit" className="btn btn-success" onClick={handleSubmit}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
