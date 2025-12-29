import axios from 'axios'
import {useState,useEffect} from 'react'
import {FaUser} from 'react-icons/fa'
const UserDetails = () => {
    const[userData,setUserData]=useState([])
    const[openMenuIndex,setOpenMenuIndex]=useState(null)
    const[editingUser, setEditingUser] = useState(null);
    const[searchedUser,setSearchedUser]=useState("")
    const[successMessage,setSuccessMessage]=useState(false)
    const[errorMessage,setErrorMessage]=useState(false)
    const[sortBy,setSortBy]=useState('')
    const[filterRole,setFilterRole]=useState('all')
    const[isAddMode, setIsAddMode] = useState(false);
    const[pendingAction,setPendingAction]=useState(null)
  

     //Get all users on component mount
    useEffect(()=>{
 getAllUsers()
    },[])
    //Function to get all users
    const getAllUsers= async ()=>{
      console.log("Fetching users...")
        try{
          const res= await axios.get('https://formbuilder-saas-backend.onrender.com/api/users') 
           console.log("Users fetched:", res.data); 
          setUserData(res.data) 
           }
      catch(err){
        console.log(err)
      }
    }
   //Handling the edit input changes
    const handleEdit=(e)=>{
       const { name, value } = e.target;
  setEditingUser({...editingUser, [name]: value});
} 
   
   const handleAddUser=async()=>{
    try{
         
        const res=await axios.post('https://formbuilder-saas-backend.onrender.com/api/users/register',editingUser)
        console.log("User added:", res.data);
     setUserData([...userData,res.data])
     localStorage.setItem('user',JSON.stringify(res.data))
     setSuccessMessage(true)
     
     setEditingUser(null)
    }
    catch(err){
      console.log(err)
      setErrorMessage(true)
    }
    
   }

   const handleUpdate=async()=>{
      try{
        
        const res=await axios.put(`https://formbuilder-saas-backend.onrender.com/api/users/${editingUser.userId}`,editingUser)
        console.log(res.data)
        setUserData(userData.map(user=>user.userId===editingUser.userId?res.data:user))
        setSuccessMessage(true)
        setEditingUser(null)
      }
      catch(err){
        console.log(err)
        setErrorMessage(true)
      }
   }

   // Function to handle "Continue" button
const handleContinue = async () => {
  if (!pendingAction) return;

  try {
   
  if (pendingAction.type === "delete") {
      await axios.delete(
        `https://formbuilder-saas-backend.onrender.com/api/users/${pendingAction.payload.userId}`
      );
      setUserData(userData.filter(user => user.userId !== pendingAction.payload.userId));
    }

    // Clear everything after success
    
    setSuccessMessage(true);
    setErrorMessage(false);
    setPendingAction(null);
   
  } catch (err) {
    console.log(err);
    setErrorMessage(true);
    setSuccessMessage(false);
    setPendingAction(null);
  }
};

// Function to handle "Dismiss" button
const handleDismiss = () => {
  

  setPendingAction(null);
  setSuccessMessage(false);
  setErrorMessage(false);
  setEditingUser(null);
};

       
       //Filtering users based on search input
      const searchedUserData=userData.filter((user)=>{
        return user.name.toLowerCase().includes(searchedUser.toLowerCase())||
               user.email.toLowerCase().includes(searchedUser.toLowerCase())
      })
      
      const filteredByRole=searchedUserData.filter((user)=>{
        if(filterRole==="all") return true
        return user.role===filterRole
      })
      //Sorting users based on selected criteria
      const sortUsers=[...filteredByRole].sort((a,b)=>{
        if(sortBy==='name-asc'){
          return a.name.localeCompare(b.name)
        }
        else if(sortBy==='name-desc'){
          return b.name.localeCompare(a.name)
        }
        else if(sortBy==='date-new'){
          return new Date(b.createdAt)-new Date(a.createdAt)
        }
        else if(sortBy==='date-old'){
          return new Date(a.createdAt)-new Date (b.createdAt)
        }
        return 0
      })

return (
    <div className='bg-gray-100 p-4 min-h-screen ' >
    <div className="flex w-full justify-end mb-4">
  <button
    onClick={() => {
      setIsAddMode(true);
      setEditingUser({
        name: "",
        email: "",
        password: "",
      });
    }}
    className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 cursor-pointer rounded-md"
  >
    ➕ Add New User
  </button>
</div>

     <div
  className={`fixed top-0 right-0 h-full w-96 bg-gray-100 shadow-2xl z-50 transform transition-transform duration-400
    ${editingUser ? "translate-x-0" : "translate-x-full"}
  `}
>
  {editingUser && (
    <div className="p-6 text-center ">
      <h2 className="text-2xl font-bold mb-4 text-purple-800">{isAddMode ? "Add New User" : "Edit User"}</h2>
       <form onSubmit={(e) => {
    e.preventDefault(); 
     isAddMode? handleAddUser():handleUpdate()
   

  
  }}>
      <input
        type="text"
        name="name"
        value={editingUser.name}
        onChange={handleEdit}
        required={isAddMode}
        className=" px-3 py-2 mb-3 w-full rounded-md border focus:ring-2 focus:ring-purple-600 outline-none  border-purple-500"
        placeholder="Name"
      />

      <input
        type="email"
        name="email"
        value={editingUser.email}
        onChange={handleEdit}
         required={isAddMode}
        className="border px-3 py-2 mb-3 w-full rounded-md focus:ring-2 focus:ring-purple-600 outline-none  border-purple-500"
        placeholder="Email"
      />

      <input
        type="password"
        name="password"
        value={editingUser.password}
        onChange={handleEdit}
         required={isAddMode}
        className="border px-3 py-2 mb-3 w-full rounded-md focus:ring-2 focus:ring-purple-600 outline-none  border-purple-500"
        placeholder="Password"
      />
    
      

      <div className="flex gap-3">
        <button className="flex-1 bg-violet-500 hover:bg-violet-900 hover:cursor-pointer  text-white py-2 rounded-md" type='submit' >
            {isAddMode ? "Create User" : "Update"}
        </button>

        <button className="flex-1 bg-red-500 hover:bg-red-800 hover:cursor-pointer text-white  py-2 rounded-md" type='button'
          onClick={() => setEditingUser(null)} >
          Cancel
        </button>
        
      </div>
      </form>
    </div>
  )}
</div>
  
    {(successMessage || errorMessage) && (
  <div className={`fixed top-1/2 left-1/2 z-50 w-96 bg-white p-4 border rounded-md shadow-lg
  transform -translate-x-1/2 -translate-y-1/2 
  transition-all duration-300  
  ${successMessage || errorMessage
    ? "opacity-100 scale-100"
    : "opacity-0 scale-95 pointer-events-none"
  }`}>
    <button className='cursor pointer text-lg font-semibold text-gray-600'    onClick={handleDismiss} >x</button>
    <div className="mb-2 text-center">
      {successMessage ? (
        <span className="text-green-600 text-3xl font-bold">✔</span>
      ) : (
        <span className="text-red-600 text-3xl font-bold">✖</span>
      )}
    </div>
    <h2 className="text-xl text-center font-bold mb-2">{successMessage ? "Success!" : "Something went wrong!"}</h2>
    <p className="mb-4 text-center">
      {successMessage
        ? "Your action has been completed successfully. All changes have been saved. And you're all set to continue."
        : "We encountered an error while processing your request. Please try again or contact support if the problem persists."}
    </p>
    <div className="flex justify-center gap-4">
      {/* Continue accepts the change */}
      {pendingAction?.type==='delete' && (
        <button
          className="bg-violet-600 text-white cursor-pointer px-4 py-2 rounded-md"
          onClick={handleContinue}
>
          Continue
        </button>
      )}
      {/* Dismiss reverts to previous state */}
      
      {(successMessage||errorMessage)&&(
         <button
        className="bg-red-600 cursor-pointer text-white px-4 py-2 rounded-md"
        onClick={handleDismiss}
      >
        Dismiss
      </button>)
      }
    
    </div>
  </div>
)}

<div className='bg-white rounded-lg p-6 w-full  max-w-7xl border border-gray-300 shadow-md shadow-gray-300 m-6  mx-auto'>
  <div className='flex gap-6 items-center'>
    <p className='text-base font-semibold'>User Details</p>
  <div className="flex  w-52 gap-3 border-l-2 border-gray-300 p-2 shadow-md shadow-gray-200">
    <div className="bg-violet-600 p-2 rounded-md">
      <FaUser className="text-white text-sm" />
    </div>
 <p className="text-sm">
      Total Employees
      <span className="font-bold text-xl ml-2">{userData.length}</span> </p>
</div>
  </div>
<div className="flex flex-col gap-2 m-6 md:flex-row md:items-center">

  <input
    className="border rounded-full px-4 py-2 w-full md:w-full"
    type="text"
    placeholder="Search by name or email"
    value={searchedUser}
    onChange={(e) => setSearchedUser(e.target.value)}/>
    <select
    value={filterRole}
    onChange={(e) => setFilterRole(e.target.value)}
    className="border rounded-full px-4 py-2 w-full md:w-auto">
    <option value="all">All</option>
    <option value="admin">Admin</option>
    <option value="USER">User</option>
  </select>

  <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
    className="border rounded-full px-4 py-2 w-full md:w-auto">
    <option value="" disabled>Sort By</option>
    <option value="name-asc">Name A-Z</option>
    <option value="name-desc">Name Z-A</option>
    <option value="date-new">Newest</option>
    <option value="date-old">Oldest</option>
  </select>
</div>
    {/* User Details Table */}
 <div className='overflow-x-auto md:overflow-x-auto sm:overflow-visible  '>
      <table className=' min-w-[800px] mx-auto   mb-6 text-center sm:w-full  max-w-7xl'>
        <thead ><tr>
          <th className= ' border border-gray-400   rounded-lg px-4 py-2 text-gray-600 text-xl'>Name</th>
          <th className='border border-gray-400  px-4 py-2 text-gray-600 text-xl'>Email</th>
           <th className='border border-gray-400  px-4 py-2 text-gray-600 text-xl'>Password</th>
            <th className='border border-gray-400 px-4 py-2 text-gray-600 text-xl '>Role</th>
             <th className='border border-gray-400  px-4 py-2 text-gray-600  text-xl'>Created At</th>
              <th className='border border-gray-400 px-4 py-2 text-gray-600 text-xl'>Actions</th>
          </tr></thead>
          <tbody>
           {sortUsers.length === 0 ? (
    <tr>
      <td
        colSpan="6"
        className="text-center border border-gray-400 text-gray-500 text-lg py-6"
      >
        🚫 No users found
      </td>
    </tr>
) : (sortUsers.map((user)=>{
                return(
                  <tr key={user.userId} className='text-sm md:text-base'>
                    <td className='border border-gray-400  px-4 py-2 sm:p-4'>{user.name}</td>
                    <td className='border border-gray-400   px-4 py-2 sm:p-4 '>{user.email}</td>
                      <td className='border border-gray-400  px-4 py-2 sm:p-4 '>{user.password}</td>
                        <td className='border border-gray-400  px-4 py-2 sm:p-4'>{user.role}</td>
                          <td className='border border-gray-400 px-4 py-2 sm:p-4'>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className=' border border-gray-400  relative mt-1'><button className='font-bold text-2xl px-2 cursor-pointer ' onClick={() => setOpenMenuIndex(openMenuIndex === user.userId ? null :user.userId)}>...</button>
                    
                     {openMenuIndex === user.userId && (
                  <div className=" absolute  px-4   py-1 bottom-2 md:bottom-4 lg:bottom-5 right-1  bg-white border rounded shadow-md shadow-gray-300   z-20">
                       <button
    className="absolute top-1 right-2 text-lg  cursor-pointer font-bold text-gray-600 hover:text-red-600"
    onClick={() => setOpenMenuIndex(null)}> × </button>
                    <button
                      className="block w-full px-2 py-1 text-left text-blue-600 cursor-pointer  text-sm lg:text-base"
                      onClick={() => {setIsAddMode(false);setEditingUser(user); setOpenMenuIndex(null)}}
                    >
                    🖉 Edit
                    </button>
                    <button
                      className="block w-full px-2 py-1 text-left text-red-600 cursor-pointer text-sm lg:text-base"
                      onClick={() =>{setPendingAction({type:"delete", payload:user});  setSuccessMessage(true);  setOpenMenuIndex(null)}}
                    >
                    🗑️ Delete
                    </button>
                  </div>
                )}
                 </td>
                  </tr>
                )
              })
            )}

          </tbody>
      </table>
   </div>
   </div>
    </div>
  )
}

export default UserDetails