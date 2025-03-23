import React from 'react';

function FormHeader({step}) {
  return (
    <section className="relative overflow-hidden max-w-5/4 self-center">
      <div className="mt-2 md:mt-0 py-2 pb-3 sm:py-2 lg:pb-2 overflow-hidden w-full">
        <div className="px-2 mx-auto w-full sm:px-2 lg:px-3 relative">
          <div className="relative mt-7 lg:mt-5">
            <div className="absolute inset-x-0  xl:px-7 xl:ml-12 top-2 lg:px-2">
              <svg className="w-full" xmlns="http://www.w3.org/2000/svg" width="875" height="48" viewBox="0 0 875 48" fill="none">
                <path d="M2 29C20.2154 33.6961 38.9915 35.1324 57.6111 37.5555C80.2065 40.496 102.791 43.3231 125.556 44.5555C163.184 46.5927 201.26 45 238.944 45C312.75 45 385.368 30.7371 458.278 20.6666C495.231 15.5627 532.399 11.6429 569.278 6.11109C589.515 3.07551 609.767 2.09927 630.222 1.99998C655.606 1.87676 681.208 1.11809 706.556 2.44442C739.552 4.17096 772.539 6.75565 805.222 11.5C828 14.8064 850.34 20.2233 873 24" stroke="#D4D4D8" strokeWidth="3" strokeLinecap="round" stroke-dasharray="1 12" />
              </svg>
            </div>
            <div className="relative flex flex-row grid-cols-1 text-center gap-y-8 sm:gap-y-10 md:gap-y-12 md:grid-cols-3 gap-x-12">
              <div>
              <div className={`flex items-center justify-center  w-16 h-16 mx-auto  border-2 border-gray-300  ${step >1 ? 'bg-green-200' : 'bg-white'} rounded-full shadow`}>
              <span className="text-xl font-semibold text-gray-700 ">1</span>
                </div>
                <h3 className="mt-2 sm:mt-3 text-xl font-semibold leading-tight text-gray-900 md:mt-4">
                  Personal details
                </h3>
                
              </div>
              {/* Other step components */}
              <div>
                <div className={`flex items-center justify-center w-16 h-16 mx-auto ${step >2 ? 'bg-green-200' : 'bg-white'}  border-2 border-gray-200 rounded-full shadow`}>
                  <span className="text-xl font-semibold text-gray-700 ">2</span>
                </div>
                <h3 className="mt-4 sm:mt-2 text-xl font-semibold leading-tight text-gray-900 md:mt-4">
                  Password
                </h3>
                
              </div>
              {/* third */}
              <div>
                <div className={`flex items-center justify-center w-16 h-16 mx-auto ${step >3 ? 'bg-green-200' : 'bg-white'}  border-2 border-gray-200 rounded-full shadow`}>
                  <span className="text-xl font-semibold text-gray-700 ">3</span>
                </div>
                <h3 className="mt-4 sm:mt-6 text-xl font-semibold leading-tight text-gray-900 md:mt-4">
                  Business Info
                </h3>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FormHeader;