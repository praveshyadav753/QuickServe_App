import React from 'react'
import SubcategoryCompo from './components/subcategorycom'
import useApi from '../../../../apihook'
import { useParams } from 'react-router-dom';
import Loader from '../loader/loader';


function Subcategory() {
  const {category_id}=useParams()
  console.log("id"+category_id)
  const {data,isError,error,loading}=useApi("core/subcategory/"+category_id+"/")
  // console.log(data)
  return (
    <div>
      {loading? <Loader/>:isError? <span className='text-center'>error</span>: 
      <SubcategoryCompo subcatagories={data} />}
    </div>
  )
}

export default Subcategory