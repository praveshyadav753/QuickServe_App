import { useState } from "react";
import { useRef } from "react";

const options = [
  { value: "", label: "Select Category" },
  { value: "marketing", label: "Marketing" },
  { value: "consulting", label: "Consulting" },
  { value: "transportation", label: "Transportation" },
  { value: "eventManagement", label: "Event Management" },
  { value: "personalServices", label: "Personal Services" },
  { value: "construction", label: "Construction" },
  { value: "domesticServices", label: "Domestic Services" },
  { value: "education", label: "Education" },
  { value: "healthcare", label: "Healthcare" },
  { value: "technology", label: "Technology" },
  { value: "finance", label: "Finance" },
  { value: "retail", label: "Retail" },
  { value: "foodAndBeverage", label: "Food & Beverage" },
  { value: "travel", label: "Travel" },
  { value: "realEstate", label: "Real Estate" },
  { value: "legal", label: "Legal" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "agriculture", label: "Agriculture" },
  { value: "other", label: "Other" },
];

export const Step3 = ({formData,onChange,error}) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const selectRef = useRef(null);

  

  const handleKeyDown = (event) => {
    const keyCode = event.keyCode;
    const listItems = selectRef.current.querySelectorAll("option");
    

    if (keyCode >= 48 && keyCode <= 57) {
      // Numbers 0-9
      const number = keyCode - 48; // Convert keycode to number (0-9)
      const firstLetter = String.fromCharCode(65 + number); // Convert number to corresponding letter (A-J)

      for (const item of listItems) {
        if (item.text.startsWith(firstLetter)) {
          item.selected = true;
          selectRef.current.value = item.value;
          break;
        }
      }
    }
  };



//   const handleSubmit = (e) => {
//     e.preventDefault();
//     //   };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="bg-white  rounded-lg max-w-3/2 w-full">
        <form  className="space-y-4">
          <fieldset className="border border-gray-300 p-7 rounded flex flex-col gap-4">
            <legend className="text-lg font-semibold text-gray-700">
              Business Details
            </legend>
            <div className="w-full text-normal text-red-600 "> 
            {error && <p>{error} </p>}
            </div>
            <div className="flex flex-row gap-4">
              <div className="w-1/2">
                <fieldset className="border border-gray-300 rounded">
                  <legend className="block text-gray-700 font-semibold">
                    Business Name *
                  </legend>
                  <input
                    type="text"
                    name="fullName"
                    className="w-full outline-0 p-1 pt-0"
                    required
                    onChange={(e) => onChange({ BusinessName: e.target.value })}                  />
                </fieldset>
              </div>
              <div className="w-1/2">
                <fieldset className="border border-gray-300 rounded">
                  <legend className="block text-gray-700 font-semibold">
                    Address *
                  </legend>
                  <input
                    type="email"
                    name="email"
                    className="w-full outline-none p-1 pt-0  "
                    placeholder="Building, street,Area "
                    required
                    onChange={(e) => onChange({ address: e.target.value })}                  />
                </fieldset>
              </div>
            </div>
            <div className="flex flex-row gap-10 ">
              <fieldset className=" border border-gray-300 rounded">
                <legend className="block text-gray-700 font-semibold">
                  Pincode *
                </legend>
                <div className="flex gap-4">
                  <input
                    type="text"
                    name="pincode"
                    maxLength={6}
                    onChange={(e) => onChange({ pincode: e.target.value })}                    required
                    className="outline-none p-1 pt-0"
                  />
                </div>
              </fieldset>
              <fieldset className="border border-gray-300 rounded w-3/4">
                <legend className="block text-gray-700 font-semibold">
                  Logourl 
                </legend>
                <input
                  type="text"
                  name="designation"
                  className="w-full outline-none p-1 pt-0"
                  placeholder="https://galaxy/logo.png"
                  required
                  onChange={(e) => onChange({ logoUrl: e.target.value })}                />
              </fieldset>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">
                Select Category *
              </label>
              <div className="flex ">
                <select
                  name="SelectCategory"
                  value={formData.selectedCategory.value} // Use selectedOption.value here
                  onChange={(e) => onChange({ selectedCategory: e.target.value })}                  onKeyDown={handleKeyDown}
                  ref={selectRef}
                  className="max-h-200  overflow-y-auto rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                >
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};
