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

const SideBar = () => {
  const menu: { icon: LucideIcon; label: string }[] = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
    },
    {
      icon: BriefcaseBusiness,
      label: "Clients",
    },
    {
      icon: FileText,
      label: "Courses",
    },
    {
      icon: BookOpenCheck,
      label: "Assessments",
    },
    {
      icon: FileBadge,
      label: "Certificates",
    },
    {
      icon: Users,
      label: "Users",
    },
  ];
  return (
    <aside className="relative flex flex-col bg-[#F4F7FC] min-w-[20rem]">
      <div className="flex p-[1.6rem] gap-[4.8rem] mb-[0.8rem]">
        <Image
          src={Logo}
          alt="Stairway Logo"
          width={96}
          height={24}
          className=""
        />
        <PanelRightOpen size={24} strokeWidth={1.75} />
        <PanelRightClose size={24} strokeWidth={1.75} className="hidden" />
      </div>
      <ul className="flex flex-col gap-[1.6rem] ">
        {menu.map((item) => (
          <li className="flex gap-[0.8rem] py-[0.9rem] pl-[1.6rem]">
            <item.icon size={24} color="#595959" />
            <span className="text-[1.6rem] text-[#303030]">{item.label}</span>
          </li>
        ))}
      </ul>

      <div className="absolute flex gap-[0.8rem] pl-[1.6rem] bottom-[1.6rem] py-[0.9rem]">
        <MessageSquareWarning size={24} color="#595959" />
        <span className="text-[1.6rem] text-[#303030]">Report</span>
      </div>
    </aside>
  );
};

export default SideBar;
