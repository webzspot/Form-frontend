import React from 'react'
import { useState, useEffect } from 'react';
import {motion} from 'framer-motion'
import axios from 'axios' 
const AllReports = () => {
   const[fetchReports,setFetchReports]=useState([])
   const [statusFilter, setStatusFilter] = useState("ALL");

   useEffect(()=>{
     fetchAllReports()
   },[])
   
     //Fetching all Reports
   const fetchAllReports=async ()=>{
    try{
            const res=await axios.get(`https://formbuilder-saas-backend.onrender.com/api/dashboard/admin/user-reports`,
                  {
          params: {
            userId: "21b2364c-9933-4a0b-8ee8-9917f7c2bc39"
          }
        }
            )
    setFetchReports(res.data.data)
    }
    catch(err){
        console.log("Error",err)
    }
 
   }
    
     const STATUS_OPTIONS = ["RISED", "INPROGRESS", "RESOLVED", "CLOSED", "REJECTED"];

     //Updating the Report Status
    const handleStatusChange=(reportId,newStatus)=>{
      try{
           axios.patch(`https://formbuilder-saas-backend.onrender.com/api/dashboard/admin/user-report/${reportId}/status`,{status:newStatus})
            setFetchReports(prev =>
      prev.map(report =>
        report.reportId === reportId ? { ...report, status: newStatus } : report
      )
    );
      }
      catch(err){
         console.log("Error",err)
      }
      
    }
      
    //Changing the color based on Status
 const getStatusColor = (status) => {
  switch (status) {
    case "RESOLVED":
      return "bg-green-500 text-white";
    case "INPROGRESS":
      return "bg-blue-500 text-white";
    case "RISED":
      return "bg-yellow-500 text-white";
    case "CLOSED":
      return "bg-gray-600 text-white";
    case "REJECTED":
      return "bg-red-500 text-white";
    default:
      return "bg-gray-400 text-white";
  }
};
    
   //Filtering the Reports by its Status
const filteredReports =
  statusFilter === "ALL"
    ? fetchReports
    : fetchReports.filter(
        report => report.status === statusFilter
      );


  return (
    <div className='bg-gray-200 min-h-screen p-2  md:p-10'>
       
     
        
        <div className=' border border-gray-500 mx-0 mt-6  w-full md:mx-auto    md:max-w-7xl p-3 md:p-6 bg-white rounded-lg shadow-md shadow-gray-500   '>


          <div className="flex items-center gap-6 justify-between mb-6">
  <h1 className="text-base md:text-lg lg:text-2xl font-bold text-violet-800">
    User Reports
  </h1>

  {/*Filter By Status */}
     <select
  className="px-3 py-1 border rounded-md text-sm bg-white"
  value={statusFilter}
  onChange={(e) => setStatusFilter(e.target.value)}
>
  <option value="ALL">All Status</option>
  {STATUS_OPTIONS.map(status => (
    <option key={status} value={status}>
      {status}
    </option>
  ))}
</select>
 
    {/*Total Reports  */}
          <div className='px-4 py-1 w-44 mt-4 mb-4 rounded-md bg-gray-200 shadow-md shadow-gray-700'>
   
 
<p className='text-gray-700 text-center text-sm font-bold'>
  Total Reports <span className='text-purple-900'>{filteredReports.length}</span>
  {" / "}
  {fetchReports.length} 
</p>


  
</div>
  </div>
  <div className="overflow-x-auto">
                {/*Report Table */}
  <table className='min-w-[800px] md:min-w-[900px] w-full
 mx-auto mb-6 text-center  border border-gray-400 '>
          <thead className=''>
            <tr className=' sticky top-0 z-10 bg-gray-200 text-xs md:text-base lg:test-base'>
                    <th className='border border-gray-400 px-2 py-1 md:px-4 md:py-2 text-gray-600 '>Report ID</th>
   
              <th className='border border-gray-400 px-2 py-1 md:px-4 md:py-2 text-gray-600 '>Issue Type</th>
              <th className='border border-gray-400 px-2 py-1 md:px-4 md:py-2 text-gray-600 '>Description</th>
              <th className='border border-gray-400 px-2 py-1 md:px-4 md:py-2  text-gray-600 '>Status</th>
              <th className='border border-gray-400 px-2 py-1 md:px-4 md:py-2 text-gray-600 '>Created At</th>
            </tr>
          </thead>

          <tbody>
            {filteredReports.length === 0  ? (
              <tr>
                <td colSpan="5" className="border border-gray-400 px-4 py-2">
                  No reports found
                </td>
              </tr>
            ) : (
              filteredReports.map((report) => (
                <tr key={report.reportId} className="text-xs md:text-base ">
                      <td className="  border border-gray-400
    px-2 py-1 md:px-4 md:py-2
    text-gray-600
    max-w-[160px] md:max-w-[220px] lg:max-w-[280px]
    truncate
    cursor-pointer "   title={report.reportId}>
                    {report.reportId}

                  </td>
                
                  <td className="border border-gray-400 px-2 py-1 md:px-4 md:py-2  text-gray-600">
                    {report.reportData.issueType|| report.reportData.sub}
                  </td>
                  <td className="border border-gray-400 px-2 py-1 md:px-4 md:py-2  text-left text-gray-600 max-w-[180px] m md:max-w-[260px] lg:max-w-[320px]
    truncate
    cursor-pointer" title={report.reportData.description || report.reportData.Issue}>
                    {report.reportData.description||report.reportData.Issue }
                  </td>
                 <td className="border border-gray-400 px-2 py-1 md:px-4 md:py-2">
                   <motion.span
    key={report.status} 
    className={`px-2 py-1 rounded-md ${getStatusColor(report.status)}`}
    initial={{ scale: 0.9, opacity: 0.5 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.6 }}
  >
 <select
  className={`text-xs md:text-sm px-1 py-0.5 md:px-2 md:py-1 rounded-md ${getStatusColor(report.status)}`}
  value={report.status} 
  onChange={(e) => handleStatusChange(report.reportId, e.target.value)} 
>
  {STATUS_OPTIONS.map((status) => (
    <option key={status} value={status}>
      {status}
    </option>
  ))}
</select>
</motion.span>

</td>
                  <td className="border border-gray-400 px-4 py-2 text-gray-600">
                    {new Date(report.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
</div>
</div>


      
      </div>
  
  )
}

export default AllReports