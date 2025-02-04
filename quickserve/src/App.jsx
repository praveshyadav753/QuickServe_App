import { useState } from 'react'
import { Provider } from 'react-redux'
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from 'react-router-dom'
import  {Login, Desktop , RegistrationPage, RoleSelection} from './component/ExportComponent.js'
import store from './features/store/Store'
import './App.css'



const router = createBrowserRouter(
  createRoutesFromElements(
   <Route path='/'  >
     <Route index element={<Desktop />}/>
     <Route path='Login' element={<Login />} />
     <Route path='Register' >
          <Route index element={<RoleSelection />} />
          <Route path='business' element={< RegistrationPage />} />
          <Route path='individual' element={<RegistrationPage />} />
    </Route>
    </Route>
  )
);


function App() {
  

  return (
    <>
    <Provider store={store}>
       <RouterProvider router={router}/>  
    </Provider>
    </>
  )
}

export default App
