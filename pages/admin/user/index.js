import React from 'react'
import AdminLayout from "../../../layouts/Admin";
const User = () => {
  return (
    <div>User</div>
  )
}

export default User

User.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
  };
  