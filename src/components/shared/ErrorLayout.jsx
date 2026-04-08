import React, { useState } from 'react';
import { 
  AlertCircle, 
  RefreshCcw, 
  LogOut, 
  ShieldAlert, 
  Loader2, 
  Ban, 
  WifiOff 
} from 'lucide-react';

const ErrorLayout = ({ status, message }) => {
 
 

  const getDisplayContent = (code) => {
    switch (code) {
      case 400:
        return {
          title: "Invalid Request",
          description: message || "The system couldn't process the request. Please check your inputs.",
          buttonText: "Try Again",
          icon: <Ban size={40} />
        };
      case 401: 
      case 403:
        return {
          title: "Session Expired",
          description: "Your security token has expired. Please log in again.",
          buttonText: "Go to Login",
          icon: <LogOut size={40} />
        };
      case 404:
        return {
          title: "Oops! Not Found",
          description: "We couldn't find the data. This might be a temporary path issue.",
          buttonText: "Refresh Page",
          icon: <ShieldAlert size={40} />
        };
      case 429:
        return {
          title: "Too Many Requests",
          description: "You're moving a bit too fast! Please wait a moment before retrying.",
          buttonText: "Retry Now",
          icon: <WifiOff size={40} />
        };
      case 500:
      default:
        return {
          title: "Oops! Server Error",
          description: message || "Our server is having some trouble. We're looking into it.",
          buttonText: "Try Again",
          icon: <AlertCircle size={40} />
        };
    }
  };

  const content = getDisplayContent(status);

  




  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#F5F6F8] backdrop-blur-md p-6">
      {/* THE BOX (The Card) */}
      <div className="bg-white border border-gray-100 shadow-sm rounded-md p-10 max-w-sm w-full text-center animate-in fade-in zoom-in duration-300">
        
        {/* ICON CONTAINER - Always Blue */}
        <div className="inline-flex p-5 bg-blue-50 rounded-2xl mb-6 text-[#2B4BAB]">
          {content.icon}
        </div>
        
        {/* TEXT CONTENT */}
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          {content.title}
        </h2>
        
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          {content.description}
        </p>

       
      
      </div>
    </div>
  );
};

export default ErrorLayout;