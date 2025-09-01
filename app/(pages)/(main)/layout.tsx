/* REACT */
import Header from "@app/_layouts/Header";
import SideBar from "@app/_layouts/SideBar";
import React, { PropsWithChildren } from "react";
/* COMPONENTS */

const Layout = ({ children }: PropsWithChildren) => {
  
  return (
    <div className="flex h-screen ">
      <SideBar />

      <div className="flex-1 flex flex-col ">
        <Header />

        <main className="flex-1 overflow-auto p-[2.4rem]">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
