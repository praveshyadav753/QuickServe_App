import React from 'react'
import ServicePackages from './components/cards/Servicecard'
import useApi from '../../../../apihook'
import Loader from '../loader/loader'
import { useParams } from 'react-router'

function CategoryDetail() {
  const {subcategory_id}=useParams()
  const {data,loading,error,isError}=useApi(`service/services/?subcategory_id=${subcategory_id}`)
  
  return (
    <div>
        {loading? <div className='w-full flex justify-center items-center h-screen=true'><Loader/></div> :
        <ServicePackages services={data}/>}
    </div>
  )
}

export default CategoryDetail