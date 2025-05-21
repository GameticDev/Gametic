


"use client";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchAllUser } from "@/redux/actions/admin/userActions";
import UserList from "@/components/admin/userList";
import UserFilter from "@/components/admin/ui/userFilter";

const Page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [role, setRole] = useState("");
  const dispatch = useAppDispatch();
  const { totalUsers, totalActiveUser, totalBannedUsers } = useAppSelector(
    (state) => state.adminUsers
  );


  useEffect(() => {
    dispatch(fetchAllUser({ page: 1, limit: 5, search: searchTerm, role }));
  }, [dispatch, searchTerm, role]);

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Main Content */}
      <div className="ml-60 pt-20 px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">User Management</h1>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <span>Dashboard</span>
            <svg className="h-4 w-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-700 font-medium">Users</span>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Users</p>
                <h3 className="text-2xl font-semibold text-gray-800 mt-1">{totalUsers}</h3>
              </div>
              <div className="bg-blue-50 p-3 rounded-full">
                <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Users</p>
                <h3 className="text-2xl font-semibold text-gray-800 mt-1">{totalActiveUser}</h3>
              </div>
              <div className="bg-green-50 p-3 rounded-full">
                <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Banned Users</p>
                <h3 className="text-2xl font-semibold text-gray-800 mt-1">{totalBannedUsers}</h3>
              </div>
              <div className="bg-red-50 p-3 rounded-full">
                <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button className="px-6 py-4 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
              All Users
              <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded-full">{totalUsers}</span>
            </button>
            <button className="px-6 py-4 text-sm font-medium text-gray-500 hover:text-gray-700">
              Active
              <span className="ml-2 px-2 py-0.5 text-xs bg-green-50 text-green-700 rounded-full">{totalActiveUser}</span>
            </button>
            <button className="px-6 py-4 text-sm font-medium text-gray-500 hover:text-gray-700">
              Banned
              <span className="ml-2 px-2 py-0.5 text-xs bg-red-50 text-red-700 rounded-full">{totalBannedUsers}</span>
            </button>
          </div>
          
          {/* Filters */}
          <UserFilter 
            onSearch={(term) => setSearchTerm(term)} 
            getRole={(selectedRole) => setRole(selectedRole)} 
          />
          
          {/* User List Table */}
          <UserList search={searchTerm} role={role} />
        </div>
      </div>
    </div>
  );
};

export default Page;