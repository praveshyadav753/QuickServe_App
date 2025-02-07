import { useState } from "react";
import { Provider } from "react-redux";
// import Servicesetting from "./component/ExportComponent.js";
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
  Services,
  Servicesetting,
  NewService,
} from "./component/ExportComponent.js";
import store from "./features/store/Store";
import ProtectRoute from "./Protected/ProtectRoute.jsx";
import "./App.css";
import Serviceinfo from "./component/business/Pages/Services/settings/component/Serviceinfo.jsx";
import Category from "./component/business/Pages/Services/settings/component/Category.jsx";
import DeleteService from "./component/business/Pages/Services/settings/component/Deleteservice.jsx";

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

      {/* Registration Routes */}
      <Route path="/Register">
        <Route index element={<RoleSelection />} />
        <Route path="business" element={<RegistrationPage />} />
        <Route path="customer" element={<UserRegistrationPage />} />
      </Route>

      <Route path="/business" element={<Layout />}>
        {/* Index Route - loads Dashboard when /business is accessed */}
        <Route
          index
          element={
            <ProtectRoute AuthenticationRequired={false}>
              <BusinessDashboard />
            </ProtectRoute>
          }
        />

        {/* Services Route */}
        <Route
          path="services"
          element={
            <ProtectRoute AuthenticationRequired={false}>
              <Services />
            </ProtectRoute>
          }
        />

        {/* Service Settings Route (Nested) */}
        <Route path="services/service-setting/:id" element={<Servicesetting />}>
          <Route
            index
            element={
              <ProtectRoute AuthenticationRequired={false}>
                <Serviceinfo />
              </ProtectRoute>
            }
          />
          <Route
            path="general"
            element={
              // Route for the /general path
              <ProtectRoute AuthenticationRequired={false}>
                <Serviceinfo /> {/* Same component here */}
              </ProtectRoute>
            }
          />
          <Route
            path="category"
            element={
              <ProtectRoute AuthenticationRequired={false}>
                <Category />
              </ProtectRoute>
            }
          />
          <Route
            path="delete"
            element={
              <ProtectRoute AuthenticationRequired={false}>
                <DeleteService />
              </ProtectRoute>
            }
          />
        </Route>
        {/* Add new service */}
        <Route
          path="services/newservice"
          element={
            <ProtectRoute AuthenticationRequired={false}>
              <NewService />
            </ProtectRoute>
          }
        />
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
