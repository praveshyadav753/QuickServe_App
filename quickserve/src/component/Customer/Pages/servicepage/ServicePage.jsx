import React from 'react'
import Categories from './components/Category'
import useApi from "../../../../apihook.jsx"
import Loader from '../loader/loader.jsx'
import ErrorBoundary from '../../../../networkErrorPage.jsx'

function ServicePage() {
const {data, loading, isError, error ,retry} =useApi('/core/categories-get/')
// console.log(data)
if(error) return <ErrorBoundary message={error} onRetry={retry}/>

 if(data?.length===0)
 {
  return <div className='w-full flex justify-center items-center h-screen=true'> <h1>No Categories Found</h1></div>
 }

  return (
    <div className='w-full'>
{loading ? <div className='w-full flex justify-center items-center h-screen=true'><Loader/></div>   :   
<Categories categories={data}/>}
      
    </div>
  )
}

export default ServicePage