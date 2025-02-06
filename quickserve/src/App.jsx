import { useState } from "react";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import {
  Login,
  Desktop,
  RegistrationPage,
  RoleSelection,
  UserRegistrationPage,
  Layout,
  BusinessDashboard,
  Services
} from "./component/ExportComponent.js";
import store from "./features/store/Store";

import ProtectRoute from "./Protected/ProtectRoute.jsx";
import "./App.css";

// const router = createBrowserRouter(
//   createRoutesFromElements(

//   < ProtectRoute AuthenticationRequired={false}>
//    <Route path='/'  >
//      <Route index element={<Desktop />}/>
//      <Route path='Login' element={<Login />} />
//      <Route path='Register' >
//           <Route index element={<RoleSelection />} />
//           <Route path='business' element={< RegistrationPage />} />
//           <Route path='customer' element={<UserRegistrationPage />} />
//     </Route>
//     </Route>
//     </ProtectRoute>
//   )
// );

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public Route */}
      <Route path="/" element={<Desktop />} />
      <Route path="/Login" element={<Login />} />

      {/* Protected Routes */}

      {/* <Route
        path="/Dashboard"
        element={
          <ProtectRoute AuthenticationRequired={true}>
            {" "}
            <Dashboard />{" "}
          </ProtectRoute>
        }
      /> */}

      {/* Registration Routes */}
      <Route path="/Register">
        <Route index element={<RoleSelection />} />
        <Route path="business" element={<RegistrationPage />} />
        <Route path="customer" element={<UserRegistrationPage />} />
      </Route>
 
      <Route path="/business" element={<Layout />}>
        {/* Index Route - loads Dashboard when /business is accessed */}
        <Route index element={<ProtectRoute AuthenticationRequired={false}> <BusinessDashboard /> </ProtectRoute>} />
        <Route path="services" element={<ProtectRoute AuthenticationRequired={false}> <Services /> </ProtectRoute>} />
      </Route>
    </>
  )
);

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
