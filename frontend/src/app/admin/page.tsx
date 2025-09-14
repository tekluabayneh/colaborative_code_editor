"use client";
import { useEffect, useState } from "react";
import {
  MoreVertical,
  Users,
  Shield,
  Search,
  Crown,
  Eye,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  AlertTriangle,
  Home,
  User,
} from "lucide-react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";

const roleConfig: any = {
  admin: {
    color: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
    icon: Crown,
  },
  editor: {
    color: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
    icon: Edit,
  },
  viewer: {
    color: "bg-slate-500/10 text-slate-400 border border-slate-500/20",
    icon: Eye,
  },
};

const statusColor: any = {
  online: "bg-emerald-500",
  offline: "bg-slate-600",
  suspended: "bg-red-500",
};

export default function Dashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const e = localStorage.getItem("email");
    if (e) setEmail(e);
  }, []);

  useEffect(() => {
    if (!email) return;
    const fetchUsers = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/User/GetOwnerUsers",
          { email },
          { withCredentials: true }
        );
        const data = res.data || [];
        setUsers(
          data.map((u: any, i: number) => ({
            _id: u.__id || i + 1,
            name: u.userName || `User ${i + 1}`,
            email: u.email || "N/A",
            role: u.role || "viewer",
            status: "online",
            initials:
              u.userName
                ?.split(" ")
                .map((n: string) => n[0])
                .join("") || "UK",
            isLead: u.role === "Admin",
            lastActive: "Active now",
            projects: Math.floor(Math.random() * 10),
          }))
        );
      } catch (err: any) {
        toast.error(err.response?.data?.message || err.message);
      }
    };
    fetchUsers();
  }, [email]);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const updateUser = async (id: number, changes: any) => {
    try {
      await axios.put(
        `http://localhost:5000/api/User/updateUserRoleOrStatus/${id}`,
        changes,
        { withCredentials: true }
      );

      // Update local state after successful API call
      setUsers(users.map((u) => (u._id === id ? { ...u, ...changes } : u)));
      setActiveDropdown(null);
      toast.success("User updated successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 text-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-12 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="p-4 rounded-2xl bg-black/20 backdrop-blur-md shadow-lg border border-white/10">
              <Shield className="h-10 w-10 text-purple-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-50 mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-400 text-lg font-medium">
                Manage users, roles, and permissions
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {[
              { href: "/dashboard", icon: Home },
              { href: "/profile", icon: User },
              { href: "/admin", icon: Users },
            ].map((link, _idx) => (
              <Link
                key={_idx}
                href={link.href}
                className="flex items-center gap-3 text-gray-700 hover:text-white hover:bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-lg transition-all duration-300"
              >
                <link.icon className="w-5 h-5" />
              </Link>
            ))}
          </div>
        </header>

        {/* User Management Table */}
        <main className="bg-black/20 backdrop-blur-md rounded-2xl shadow-lg border border-white/10">
          <header className="border-b border-white/10 p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-500/10">
                <Users className="h-7 w-7 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-50">
                User Management
              </h2>
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 pr-4 py-3 w-80 border border-white/10 rounded-xl bg-black/20 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
              />
            </div>
          </header>

          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                {[
                  "User",
                  "Role",
                  "Status",
                  "Projects",
                  "Last Active",
                  "Actions",
                ].map((h, i) => (
                  <th
                    key={i}
                    className={`text-left font-semibold text-gray-400 p-6 ${
                      i === 5 ? "text-right" : ""
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Users.length !== 0 ? (
                filteredUsers.map((user) => {
                  const role =
                    roleConfig[user.role.toLowerCase()] || roleConfig.viewer;
                  return (
                    <tr
                      key={user._id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200 group"
                    >
                      <td className="p-6 flex items-center gap-4">
                        <div className="relative">
                          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center text-purple-400 font-semibold text-lg shadow-lg border border-white/10">
                            {user.initials}
                          </div>
                          <div
                            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-800 ${
                              statusColor[user.status]
                            }`}
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-100 text-base">
                            {user.name}
                          </div>
                          <div className="text-gray-400 text-sm">
                            {user.email}
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <div
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${role.color}`}
                        >
                          <role.icon className="h-3 w-3" /> {user.role}
                        </div>
                      </td>
                      <td className="p-6 flex items-center gap-3">
                        <div
                          className={`w-2.5 h-2.5 rounded-full ${
                            statusColor[user.status]
                          }`}
                        />
                        <span className="capitalize font-medium text-gray-300">
                          {user.status}
                        </span>
                        {user.status === "suspended" && (
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                        )}
                      </td>
                      <td className="p-6 font-semibold text-gray-200">
                        {user.projects}
                      </td>
                      <td className="p-6 text-gray-400">{user.lastActive}</td>
                      <td className="text-right p-6 relative">
                        <button
                          onClick={() =>
                            setActiveDropdown(
                              activeDropdown === user._id ? null : user._id
                            )
                          }
                          className="h-10 w-10 cursor-pointer rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors duration-200 opacity-0 group-hover:opacity-100"
                        >
                          <MoreVertical className="h-5 w-5 text-gray-400" />
                        </button>
                        {activeDropdown === user._id && (
                          <div className="absolute right-0  mt-2 w-56 bg-black/50 backdrop-blur-xl rounded-xl shadow-2xl border border-white/10 py-2 z-10">
                            {["admin", "editor", "viewer"].map((r) => (
                              <button
                                key={r}
                                onClick={() =>
                                  updateUser(user._id, { role: r })
                                }
                                className="w-full cursor-pointer flex  items-center gap-3 px-4 py-3 text-left hover:bg-white/10 transition-colors duration-200"
                              >
                                <span className="text-gray-300 cursor-pointer">
                                  Make {r.charAt(0).toUpperCase() + r.slice(1)}
                                </span>
                              </button>
                            ))}
                            <div className="border-t border-white/10 my-2" />
                            <button
                              onClick={() =>
                                updateUser(user._id, {
                                  status:
                                    user.status === "suspended"
                                      ? "online"
                                      : "suspended",
                                })
                              }
                              className="w-full cursor-pointer flex items-center gap-3 px-4 py-3 text-left hover:bg-white/10 transition-colors duration-200"
                            >
                              {user.status === "suspended" ? (
                                <UserCheck className="h-4 w-4 text-emerald-400" />
                              ) : (
                                <UserX className="h-4 w-4 text-amber-400" />
                              )}
                              <span
                                className={
                                  user.status === "suspended"
                                    ? "text-emerald-400"
                                    : "text-amber-400"
                                }
                              >
                                {user.status === "suspended"
                                  ? "Activate User"
                                  : "Suspend User"}
                              </span>
                            </button>
                            <button
                              onClick={() =>
                                updateUser(user._id, { status: "deleted" })
                              }
                              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/10 transition-colors duration-200"
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                              <span className="text-red-500">Delete User</span>
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <div className="w-full flex flex-col items-center justify-center py-16 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m4 4v-4h-1m4 4v-4h-1M3 7h18M3 12h18M3 17h18"
                    />
                  </svg>
                  <p className="text-center text-gray-500 text-lg">
                    No users found would you like to invite?
                    <Link
                      href={"/invite"}
                      className="cursor-pointer text-blue-300"
                    >
                      {" "}
                      invite
                    </Link>
                  </p>
                </div>
              )}
            </tbody>
          </table>
        </main>
      </div>
      {activeDropdown && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setActiveDropdown(null)}
        />
      )}
    </div>
  );
}
