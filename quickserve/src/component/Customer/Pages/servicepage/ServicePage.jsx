import React from 'react'
import Categories from './components/Category'
import useApi from "../../../../apihook.jsx"
import Loader from '../loader/loader.jsx'

function ServicePage() {
const {data, loading, isError, error} =useApi('/core/categories-get/')
// console.log(data)



  return (
    <div className='w-full'>
{loading ? <div className='w-full flex justify-center items-center h-screen=true'><Loader/></div>   :   
<Categories categories={data}/>}
      
    </div>
  )
}

export default ServicePage