import React from 'react'

import CardDataStats from '../../components/cards/Cardstats';
import ChartOne from '../../components/cards/chartone';
import PageTitle from '../../../../pagetitle/pagetitle';


const BusinessDashboard = () => {
  return (
    <>
    <div className='flex flex-col gap-10'>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <CardDataStats title="Total appointment" total="4" rate="0.43%" levelUp />
      <CardDataStats title="Total Profit" total="$45.2K" rate="4.35%" levelUp />
      <CardDataStats title="Service pending" total="2,450" rate="2.59%" levelUp />
      <CardDataStats title="Total Revenue" total="$10.5M" rate="3.12%" levelUp />
    </div>
    
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      <ChartOne/>
    </div>
    
    {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      
    </div> */}
    </div>
    </>
  );
};




export default BusinessDashboard