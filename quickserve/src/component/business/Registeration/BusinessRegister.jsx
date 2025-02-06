import { useState } from "react";
import FormHeader from "./Component/header";
import Step2 from "./Component/Step2";
import { Step3 } from "./Component/Step3";
import Step1 from "./Component/Step1";

const BusinessRegistration = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    // Initialize with empty values for all fields
    fullName: "",
    email: "",
    gender: "",
    phoneNumber: "",
    countryCode: "",
    password: "",
    confirmPassword: "",
    BusinessName: "",
    address: "",
    pincode: "",
    logoUrl: "",
    selectedCategory: "",
    otp: "",
  });

  // ______________________________.........error handling in form..........___________________________________________________
  const phoneRegex = /^[6-9]\d{9}$/;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const [error, setErrors] = useState({});


  const handleNext = () => {
    
    let errorObj = { ...error };

    if (step === 1) {
      if (!formData.fullName || !formData.email || !formData.gender || !formData.phoneNumber) {
        errorObj.step1 = "All * fields are mandatory, please fill the required fields";
      } else if (!phoneRegex.test(formData.phoneNumber)) {
        errorObj.step1 = "Please enter a valid phone number";
      }else if(!emailRegex.test(formData.email)){
        errorObj.step1 = "Please enter a valid email address";
      }else if (!formData.countryCode){
        errorObj.step1 = "Please select a country code";
      }

       else {
        delete errorObj.step1;
        setStep(step + 1);
      }
    } else if (step === 2) {
      if (!formData.password) {
        errorObj.step2 = "Password field is required";
      } else if (formData.password !== formData.confirmPassword) {
        errorObj.step2 = "Passwords do not match";
      } else {
        delete errorObj.step2;
        setStep(step + 1);
      }
    } 

    setErrors(errorObj);
  };

  // ----------------------------------------------------------------

  const handleBack = () => {
    setStep(step - 1);
  };
  const updateFormData = (newData) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  };
  const pincodeRegex = /^[1-9]{1}[0-9]{5}$/;

  const validateform = () => {
     const errorObj = { ...error };
      if (!formData.BusinessName || !formData.address || !formData.pincode  || !formData.selectedCategory) {
        errorObj.step3 = "All * fields are mandatory, please fill the required fields";
        setErrors(errorObj);
        return false;
      }else if (!pincodeRegex.test(formData.pincode)) {
        errorObj.step3 = "Please enter a valid pincode";
        setErrors(errorObj);
      } 
      else {
        delete errorObj.step3;
        setErrors(errorObj);
        return true;

      }
     
    }


  const handleSubmit = (e) => {
    e.preventDefault();
   const  isvalidform=validateform();
    if(isvalidform){
    // Handle form submission (e.g., send data to server)
    console.log("Form Data:", formData);
    }
  };

  return (
    <div className="main-div flex items-center justify-center gap-5">
      <div className="main-inner-div flex flex-col p-2 rounded-lg shadow-md w-3/4 gap-5">
        <FormHeader step={step} />
        <hr />

        {step === 1 && (
          <Step1
            formData={formData}
            onChange={updateFormData}
            error={error.step1}
          />
        )}
        {step === 2 && (
          <Step2
            formData={formData}
            onChange={updateFormData}
            error={error.step2}
          />
        )}
        {step === 3 && (
          <Step3
            formData={formData}
            onChange={updateFormData}
            error={error.step3}
          />
        )}

        <div className="flex justify-between mt-2 p-2">
          {step > 1 && (
            <button
              className="bg-gray-300 px-6 py-1.5 rounded-lg text-gray-700 hover:bg-gray-400"
              onClick={handleBack}
            >
              Back
            </button>
          )}
          {step < 3 && (
            <button
              className="bg-blue-500 px-6 py-1.5 rounded-lg text-white hover:bg-blue-600"
              onClick={handleNext}
            >
              Next
            </button>
          )}
          {step === 3 && (
            <button
              className="bg-blue-500 px-6 py-1.5 rounded-lg text-white hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Register
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessRegistration;
