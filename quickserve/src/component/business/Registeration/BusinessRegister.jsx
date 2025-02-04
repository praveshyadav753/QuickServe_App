import { useState } from "react";
import FormHeader from "./Component/header";
import { Step2 } from "./Component/Step2";
// import { Step3 } from "./Component/Step3";
import { Step1 } from "./Component/Step1";

const BusinessRegistration = () => {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <div className="main-div flex items-center justify-center  gap-5" >
      <div className="main-inner-div flex flex-col  p-2 rounded-lg shadow-md w-3/4 gap-5">
       <FormHeader step={step}/>
       <hr></hr>
        
        
        {step === 1 ? <Step1 /> : <Step2 />}
        <div className="flex justify-between mt-6 p-10">
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
        </div>
      </div>
    </div>
  );
};
export default BusinessRegistration;