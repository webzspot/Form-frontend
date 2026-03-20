// import React from 'react'
// import { Navigate } from 'react-router-dom'
// const ProtectedRoute = ({children,allowedRoles}) => {

//     const token=localStorage.getItem("token")
//     const role=localStorage.getItem("role")
    
//     if(!token){
//         return <Navigate to='/login' replace/>
//     }

//      if (allowedRoles && !allowedRoles.includes(role)) {
//     // Redirect based on role
//     if (role === "ADMIN") {
//       return <Navigate to="/admindashboard" replace />;
//     }
//     return <Navigate to="/home" replace />;
//   }

  
//     return children
// }

// export default ProtectedRoute




import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  // ✅ Changed to sessionStorage
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");

  if (!token) {
    return <Navigate to='/login' replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return role === "ADMIN" 
      ? <Navigate to="/admindashboard" replace /> 
      : <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;