
"use client";
import { blockUser, fetchAllUser } from "@/redux/actions/admin/userActions";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  ArrowUp,
  Ban,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import ListSkeleton from "./skelton/tableSkelton";




interface UserListProps {
  search: string;
  role: string;
}

const UserList:React.FC<UserListProps> = ({ search, role }) => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { users, totalUsers, loading } = useAppSelector(
    (state) => state.adminUsers
  );

  useEffect(() => {
    dispatch(fetchAllUser({ page: currentPage, limit: 5, search, role }));
  }, [dispatch, currentPage, search, role]);

  const blockUserById = async (id:string) => {
    try {
      await dispatch(blockUser({ id })).unwrap();
      dispatch(fetchAllUser({ page: currentPage, limit: 5, search, role }));
    } catch (error) {
      console.error("Failed to block user:", error);
    }
  };
  
  return (
    <div className="w-full bg-white rounded-lg">
      {/* Table */}
      <div className="overflow-x-auto w-full">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 bg-gray-50 border-b border-gray-200">
              <th className="p-4 font-medium">
                <div className="flex items-center">
                  Name
                  <ArrowUp className="ml-1 text-gray-400" size={16} />
                </div>
              </th>
              <th className="p-4 font-medium">Email</th>
              <th className="p-4 font-medium">Phone number</th>
              <th className="p-4 font-medium">Role</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          
          {loading ? (
            <ListSkeleton/>
          ) : (
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium`}>
                        {user.username.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="font-medium text-gray-800">{user.username}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">{user.email}</td>
                  <td className="p-4 text-gray-600">+91 0000000000</td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      user.isBlocked 
                        ? "bg-red-50 text-red-700" 
                        : "bg-green-50 text-green-700"
                    }`}>
                      {user.isBlocked ? "Banned" : "Active"}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      
                      <div className="dropdown dropdown-left">
                        <button className="p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700">
                          <MoreHorizontal size={18} />
                        </button>
                        <ul className="dropdown-content menu bg-white w-36 rounded-md shadow-lg py-1 border border-gray-100">
                          <li>
                            <button 
                              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                              onClick={() => blockUserById(user._id)}
                            >
                              <Ban size={16} className="text-red-500" />
                              <span>Ban</span>
                            </button>
                          </li>
                          <li>
                            <button className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                              <Trash2 size={16} className="text-red-500" />
                              <span>Delete</span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
        <div className="text-sm text-gray-500">
          Showing 1 - 5 of {totalUsers}
        </div>
        
        <div className="flex items-center">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage <= 1}
            className={`p-2 rounded ${
              currentPage <= 1 
                ? "text-gray-300 cursor-not-allowed" 
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <ChevronLeft size={16} />
          </button>
          
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="p-2 rounded text-gray-700 hover:bg-gray-100"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserList;