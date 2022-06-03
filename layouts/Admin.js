import React from "react";
import SideBarAdmin from "../components/SideBarAdmin"
import HeaderAdmin from "../components/HeaderAdmin"


export default function Admin({ children}) {
  
  return (
    <div className="main-admin flex">
      <div className="main-admin--left">
        <SideBarAdmin />
      </div>
      <div className="main-admin--right">
        <HeaderAdmin />
        <div className="main-admin--right__body">
          {children}
        </div>
      </div>
    </div>
  );
}
