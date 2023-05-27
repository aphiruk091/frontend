import React from "react";
import Navbar from "./Navbar";
const Layout = ({ children }) => {
    return (
      <>
        <Navbar />
        <div className="py-5">
        <main>
          {children}
        </main>
        </div>

      </>
    );
  };
  
  export default Layout;