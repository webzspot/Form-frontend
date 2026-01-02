import React, { useEffect, useState } from "react";
import axios from "axios";
import { Edit, Trash } from "lucide-react";
import toast from "react-hot-toast";



const Preview = ({ previewFields,  refreshFields }) => {
  const token=localStorage.getItem("token");
  const [fetchedFields, setFetchedFields] = useState([]);
  const [loading, setLoading] = useState(true);

  const [updatePop, setUpdatePop] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [updatedName, setUpdatedName] = useState("");



  // 🔹 Fetch master fields for logged-in user
  useEffect(() => {


    axios
      .get(
        "https://formbuilder-saas-backend.onrender.com/api/dashboard/master-fields",{
             headers:{
      Authorization:`Bearer ${token}`,
    }
        }
      )
      .then((res) => {
        setFetchedFields(res.data.data || []);
      })
      .catch((err) => {
        console.error("Error fetching fields:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  },[]);

  // 🔹 Delete field
  const handleDelete = (masterFieldId) => {
    axios
      .delete(
        `https://formbuilder-saas-backend.onrender.com/api/dashboard/master-fields/${masterFieldId}`,
        {
       headers:{
      Authorization:`Bearer ${token}`,
    }
        }
      )
      .then(() => {
        setFetchedFields((prev) =>
          prev.filter((f) => f.masterFieldId !== masterFieldId));
           toast.success("Deleted successful");
            
      })
    .catch((err) => {
    });
      
  };

  // 🔹 Open update popup
  const openUpdatePopup = (field) => {
    setSelectedField(field);
    setUpdatedName(field.name);
    setUpdatePop(true);
  };

  // 🔹 Update field name
  const handleUpdate = () => {
    if (!selectedField || !updatedName.trim()) return;

    axios
      .put(
        `https://formbuilder-saas-backend.onrender.com/api/dashboard/master-fields/${selectedField.masterFieldId}`,
        {
          label: updatedName,
          type: selectedField.type, // IMPORTANT for Prisma enum
        },{
        headers:{
      Authorization:`Bearer ${token}`,
    }
        }
      )
      .then(() => {
        setFetchedFields((prev) =>
          prev.map((f) =>
            f.masterFieldId === selectedField.masterFieldId
              ? { ...f, label: updatedName }
              : f
          )
        );

        setUpdatePop(false);
        setSelectedField(null);
        toast.success("Updated successful");
     
      })
      .catch((err) => console.error("Update failed", err));
  };

  return (
    <div className="flex flex-col items-center mt-10 gap-6">
      <h2 className="text-2xl font-bold text-[#6C3BFF]">
        Form Preview
      </h2>

      <div className="relative w-4/5 bg-white p-8 rounded-2xl shadow-xl space-y-6">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : previewFields.length === 0 ? (
          <p className="text-center text-gray-400">
            No fields found for this user
          </p>
        ) : (
          previewFields.map((field) => (
            <div key={field.masterFieldId} className="space-y-2">
              <label className="font-semibold">{field.label}</label>

              {/* INPUT TYPES */}
              {field.type === "TEXTAREA" && (
                <textarea className="w-full border border-black/30 rounded-xl py-1 mt-1" />
              )}

              {["TEXT", "EMAIL", "NUMBER", "DATE"].includes(field.type) && (
                <input
                  type={field.type.toLowerCase()}
                  className="w-full border border-black/30 rounded-xl py-1 mt-1"
                />
              )}

              {field.type === "CHECKBOX" &&
                field.options?.map((opt, i) => (
                  <label key={i} className="flex gap-2">
                    <input type="checkbox" />
                    {opt}
                  </label>
                ))}

              {field.type === "RADIO" &&
                field.options?.map((opt, i) => (
                  <label key={i} className="flex gap-2">
                    <input
                      type="radio"
                      name={field.masterFieldId}
                    />
                    {opt}
                  </label>
                ))}

              {field.type === "DROPDOWN" && (
                <select className="border rounded-xl p-2">
                  <option>Select {field.name}</option>
                  {field.options?.map((opt, i) => (
                    <option key={i}>{opt}</option>
                  ))}
                </select>
              )}

              {/* ACTIONS */}
              <div className="flex gap-4 mt-2">
                <Trash
                  className="cursor-pointer"
                  onClick={() =>
                    handleDelete(field.masterFieldId)
                  }
                />
                <Edit
                  className="cursor-pointer"
                  onClick={() => openUpdatePopup(field)}
                />
              </div>
            </div>
          ))
        )}

        {/* UPDATE POPUP */}
        {updatePop && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-xl w-96 space-y-4">
              <h3 className="font-bold text-lg text-center">
                Update Field Name
              </h3>

              <input
                value={updatedName}
                onChange={(e) =>
                  setUpdatedName(e.target.value)
                }
                className="w-full border rounded-xl p-2"
              />

              <div className="flex justify-between">
                <button
                  onClick={handleUpdate}
                  className="bg-[#6C3BFF] text-white px-4 py-1 rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => setUpdatePop(false)}
                  className="bg-gray-300 px-4 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Preview;
