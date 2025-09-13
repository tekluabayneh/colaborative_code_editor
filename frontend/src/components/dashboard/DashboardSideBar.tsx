import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  User,
  Users,
  UserPlus,
  FileText,
  Activity,
  Code2,
  Home,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", icon: Home, current: true, link: "/dashboard" },
  { name: "Profile", icon: User, current: false, link: "/profile" },
  { name: "Code Editor", icon: Code2, current: false, link: "/editor" },
  { name: "Team", icon: Users, current: false, link: "/admin" },
  { name: "Activity", icon: Activity, current: false, link: "/activity" },
  { name: "Files", icon: FileText, current: false, link: "/files" },
  { name: "Invite", icon: UserPlus , current: false, link: "/invite" },
];

export const DashboardSidebar = () => {
  return (
    <div className="w-13 md:hover:w-40 transition-all  delay-200  bg-neutral-900 border-r border-gray-700 flex flex-col overflow-hidden">
      <div className="p-4 pl-1">
        <nav className="space-y-3 ">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.name}
                variant={item.current ? "secondary" : "ghost"}
                className={cn(
                  " cursor-pointer h-11",
                  item.current && "bg-purple-400 border border-gray-700"
                )}
              >
                <Link
                  href={item.link}
                  className="flex items-center justify-center gap-4"
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden md:block">{item.name}</span>
                </Link>
              </Button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
