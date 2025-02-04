import React ,{ useState,useEffect }from 'react';
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';



function ProtectRoute({children, AuthenticationRequired = true}) {
    const [AuthenticationRequired, setIsAuthenticationRequired] = useState(True);

    const authStatus = useSelector(state => state.auth.status)

    const [loader, setLoader] = useState(true)

    const navigate = useNavigate();

    useEffect(() => {
     
      if(AuthenticationRequired && authStatus!=isAuthenticated)  //authentication required but is not authenticated 
       {
        navigate('/login')
       }
       else if(AuthenticationRequired && authStatus==isAuthenticated)
       {
        navigate('/Dashboard')
       }
       setLoader(false)
  
},[authStatus, navigate, authentication])

return loader ? <h1>Loading...</h1> : <>{children}</>
}

export default ProtectRoute