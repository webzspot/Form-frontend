import React from "react";
import AdminLayout from "./AdminLayout";
import UserDetails from "./UserDetails";
import AllReports from "./AllReports";

const AdminPage = () => {
  return (
    <AdminLayout>
      {(activeTab) => (
        <>
          {activeTab === "users" && <UserDetails />}
          {activeTab === "reports" && <AllReports />}
        </>
      )}
    </AdminLayout>
  );
};

export default AdminPage;
