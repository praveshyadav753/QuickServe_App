// import React ,{ useState,useEffect }from 'react';
// import {useSelector} from 'react-redux'
// import { useNavigate } from 'react-router-dom';
// import { loginSuccess } from '../features/reducers/Slice';



// function ProtectRoute({children, AuthenticationRequired = true,role}) {
//     // const [AuthenticationRequired, setIsAuthenticationRequired] = useState(True);

//     const { isauthenticated: authStatus, role:userrole } = useSelector((state) => state.auth);

//     const [loader, setLoader] = useState(true)

//     const navigate = useNavigate();

//     useEffect(() => {
     
//       if(AuthenticationRequired && authStatus!=AuthenticationRequired)  //authentication required but is not authenticated 
//        {
//         navigate('/')
//         console.log('Authentication required')
//        }
//        else if(AuthenticationRequired && authStatus==AuthenticationRequired)
//        {
//         if(role=='customer' && role==userrole)
//         navigate('/customer')
//         else if(role=='business' && role==userrole)
//           navigate('/business')
//         else if(role=='admin' && role==userrole)
//           navigate('/admin')
      
//        }
//        setLoader(false)
  
// },[authStatus, role,navigate, AuthenticationRequired])

// return loader ? <h1>Loading...</h1> : <>{children}</>
// }

// export default ProtectRoute;



import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ProtectRoute({ children, AuthenticationRequired = true, role }) {
  const authState = useSelector(state => state.auth); // Get auth state
  console.log(authState)
  const { isAuthenticated: authStatus, user } = useSelector((state) => state.auth);
  const userRole = user ? user.role : null; // Ensure user exists before accessing role
  
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (AuthenticationRequired && !authStatus) {
      console.log('Redirecting: Authentication required');
      navigate('/');
    } else if (AuthenticationRequired && authStatus && role !== userRole) {
      console.log(`Redirecting: Incorrect role. Expected ${role}, but got ${userRole}`);
      if (userRole === 'customer') navigate('/customer');
      else if (userRole === 'business') navigate('/business');
      else if (userRole === 'admin') navigate('/admin');
    }

    // Hide loader after redirection logic runs
    setTimeout(() => setLoader(false), 500);
  }, [authStatus, userRole, navigate, AuthenticationRequired, role]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}

export default ProtectRoute;
