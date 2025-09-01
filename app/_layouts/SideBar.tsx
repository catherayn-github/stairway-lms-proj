"use client";
import {
  BookOpenCheck,
  BriefcaseBusiness,
  FileBadge,
  FileText,
  LayoutDashboard,
  LucideIcon,
  MessageSquareWarning,
  PanelRightClose,
  PanelRightOpen,
  Users,
} from "lucide-react";
import Image from "next/image";
import Logo from "@public/assets/stairway-logo.png";
import { useState } from "react";
import { usePathname } from "next/navigation";
import path from "path";

const SideBar = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const menu: { icon: LucideIcon; label: string, path?: string }[] = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path : "/dashboard"
    },
    {
      icon: BriefcaseBusiness,
      label: "Clients",
      path : "/clients"
    },
    {
      icon: FileText,
      label: "Courses",
      path : "/courses"
    },
    {
      icon: BookOpenCheck,
      label: "Assessments",
      path : "/assessments"
    },
    {
      icon: FileBadge,
      label: "Certificates",
      path : "/certificates"
    },
    {
      icon: Users,
      label: "Users",
      path : "/users"
    },
  ];
  return (
    <aside className={`relative flex flex-col bg-[#F4F7FC] transition-all duration-300 ease-in-out ${isCollapsed ? "min-w-[5.6rem]" : "min-w-[20rem]"}`}>
      <div className="flex p-[1.6rem] gap-[4.8rem] mb-[0.8rem]">
        <Image
          src={Logo}
          alt="Stairway Logo"
          width={96}
          height={24}
          className={isCollapsed ? "hidden" : ""}

        />
        <PanelRightOpen size={24} strokeWidth={1.75} onClick={() => setIsCollapsed(!isCollapsed)} className={isCollapsed ? "hidden" : ""}/>
        <PanelRightClose size={24} strokeWidth={1.75} className={isCollapsed ? "" :"hidden" } onClick={() => setIsCollapsed(!isCollapsed)} />
      </div>
      <ul className="flex flex-col gap-[1.6rem] ">
        {menu.map((item) => (
          <li className={`group ${pathname === item.path ? "bg-[#E7F5FF] border-r-[0.2rem] border-r-[#1E76EC]" : ""} flex gap-[0.8rem] py-[0.9rem] pl-[1.6rem] hover:bg-[#E7F5FF] hover:border-r-[0.2rem] hover:border-r-[#1E76EC]`}>
            <item.icon size={24} color="#595959" className={`group-hover:fill-[#1E76EC] group-hover:stroke-[#1E76EC] ${pathname === item.path ? "fill-[#1E76EC] stroke-[#1E76EC]" : ""}`} />
            <span className={`text-[1.6rem] text-[#303030] transition-all duration-200 ${isCollapsed ? "hidden" : ""} group-hover:text-[#1E76EC] ${pathname === item.path ? "text-[#1E76EC]" : ""}`}>{item.label}</span>
          </li>
        ))}
      </ul>

      <div className="group absolute flex gap-[0.8rem] pl-[1.6rem] bottom-[1.6rem] py-[0.9rem] min-w-full  hover:bg-[#E7F5FF] hover:border-r-[0.2rem] hover:border-r-[#1E76EC]">
        <MessageSquareWarning size={24} color="#595959" className="group-hover:fill-[#1E76EC] group-hover:stroke-[#1E76EC]" />
        <span className={`text-[1.6rem] text-[#303030] ${isCollapsed ? "hidden" : ""} group-hover:text-[#1E76EC]`}>Report</span>
      </div>
    </aside>
  );
};

export default SideBar;
