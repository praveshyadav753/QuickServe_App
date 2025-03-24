

// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// function ProtectRoute({ children, AuthenticationRequired = true, role }) {
//   const authState = useSelector(state => state.auth); // Get auth state
//   console.log(authState)
//   const { isAuthenticated: authStatus, user } = useSelector((state) => state.auth);
//   const userRole = user ? user.role : null; // Ensure user exists before accessing role
  
//   const navigate = useNavigate();
//   const [loader, setLoader] = useState(true);

//   useEffect(() => {
//     if (AuthenticationRequired && !authStatus) {
//       //       navigate('/login');
//     } else if (AuthenticationRequired && authStatus && role !== userRole) {
//       //       if (userRole === 'customer') navigate('/customer');
//       else if (userRole === 'Service Provider') navigate('/business');
//       else if (userRole === 'admin') navigate('/admin');
//     }

//     // Hide loader after redirection logic runs
//     setTimeout(() => setLoader(false), 500);
//   }, [authStatus, userRole, navigate, AuthenticationRequired, role]);

//   return loader ? <h1>Loading...</h1> : <>{children}</>;
// }

// export default ProtectRoute;

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

function ProtectRoute({ children, AuthenticationRequired = true, role }) {
  const { isAuthenticated, user } = useSelector(state => state.auth); 
  const userRole = user?.role;  // Ensure user exists before accessing role

  const navigate = useNavigate();
  const location = useLocation(); // To remember where user was before redirecting
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (AuthenticationRequired && !isAuthenticated) {
            navigate('/login', { state: { from: location.pathname } }); // Store last visited page
    } 
    else if (AuthenticationRequired && isAuthenticated && role && role !== userRole) {
            if (userRole === 'customer') navigate('/customer');
      else if (userRole === 'Service Provider') navigate('/business');
      else if (userRole === 'admin') navigate('/admin');
      else(navigate('/login'))
    }
    

    setLoading(false); // Hide loader after redirection logic runs
  }, [isAuthenticated, userRole, navigate, AuthenticationRequired, role, location]);

  return loading ? <h1>Loading...</h1> : <>{children}</>;
}

export default ProtectRoute;
