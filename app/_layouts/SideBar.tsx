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

const SideBar = () => {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const menu: { icon: LucideIcon; label: string; path?: string }[] = [
        {
            icon: LayoutDashboard,
            label: "Dashboard",
            path: "/dashboard",
        },
        {
            icon: BriefcaseBusiness,
            label: "Clients",
            path: "/clients",
        },
        {
            icon: FileText,
            label: "Courses",
            path: "/courses",
        },
        {
            icon: BookOpenCheck,
            label: "Assessments",
            path: "/assessments",
        },
        {
            icon: FileBadge,
            label: "Certificates",
            path: "/certificates",
        },
        {
            icon: Users,
            label: "Users",
            path: "/users",
        },
    ];
    return (
        <aside
            className={`relative flex flex-col bg-fill-secondary-white transition-all duration-300 ease-in-out ${
                isCollapsed ? "min-w-[5.6rem]" : "min-w-[20rem]"
            }`}
        >
            <div className="flex p-[1.6rem] gap-[4.8rem] mb-[0.8rem]">
                <Image
                    src={Logo}
                    alt="Stairway Logo"
                    width={96}
                    height={24}
                    className={isCollapsed ? "hidden" : ""}
                />
                <PanelRightOpen
                    size={24}
                    strokeWidth={1.75}
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className={isCollapsed ? "hidden" : ""}
                />
                <PanelRightClose
                    size={24}
                    strokeWidth={1.75}
                    className={isCollapsed ? "" : "hidden"}
                    onClick={() => setIsCollapsed(!isCollapsed)}
                />
            </div>
            <ul className="flex flex-col gap-[1.6rem] ">
                {menu.map((item) => (
                    <li
                        className={`group cursor-pointer ${
                            pathname === item.path
                                ? "bg-fill-highlight-lightest border-r-[0.2rem] border-r-fill-primary"
                                : ""
                        } flex gap-[0.8rem] py-[0.9rem] pl-[1.6rem] hover:bg-fill-highlight-lightest hover:border-r-[0.2rem] hover:border-r-fill-primary`}
                    >
                        <item.icon
                            size={24}
                            className={`group-hover:fill-fill-primary stroke-icon-default-black group-hover:stroke-fill-primary ${
                                pathname === item.path
                                    ? "fill-fill-primary !stroke-fill-primary"
                                    : ""
                            }`}
                        />
                        <span
                            className={`text-[1.6rem] transition-all duration-200 ${
                                isCollapsed ? "hidden" : ""
                            } text-text-primary-black group-hover:text-fill-primary ${
                                pathname === item.path
                                    ? "!text-fill-primary"
                                    : ""
                            }`}
                        >
                            {item.label}
                        </span>
                    </li>
                ))}
            </ul>

            <div className="group absolute flex gap-[0.8rem] cursor-pointer pl-[1.6rem] bottom-[1.6rem] py-[0.9rem] min-w-full  hover:bg-fill-highlight-lightest hover:border-r-[0.2rem] hover:border-r-fill-primary">
                <MessageSquareWarning
                    size={24}
                    className="group-hover:fill-fill-primary group-hover:stroke-fill-primary stroke-icon-default-black"
                />
                <span
                    className={`text-[1.6rem] text-text-primary-black ${
                        isCollapsed ? "hidden" : ""
                    } group-hover:text-fill-primary`}
                >
                    Report
                </span>
            </div>
        </aside>
    );
};

export default SideBar;
