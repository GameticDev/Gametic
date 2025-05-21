"use client";
import { blockUser, fetchAllUser } from "@/redux/actions/admin/userActions";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { User } from "@/redux/slices/admin/userSlice";
import {
  ArrowUp,
  Ban,
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  Pen,
  Search,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import ListSkelton from "./skelton/listSkelton";

interface UserListProps {
  search: string;
  role: string;
}

const UserList: React.FC<UserListProps> = ({ search, role }) => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { users, totalUsers, loading } = useAppSelector(
    (state) => state.adminUsers
  );

  useEffect(() => {
    dispatch(fetchAllUser({ page: currentPage, limit: 5, search, role }));
  }, [dispatch, currentPage, search]);

  const blockUserById = async (id: string): Promise<User | undefined> => {
    try {
      const response = await dispatch(blockUser({ id })).unwrap();
      dispatch(fetchAllUser({ page: currentPage, limit: 5, search, role }));
    } catch (error: unknown) {
      console.error("Failed to block user:", error);
      return undefined;
    }
  };

  return (
    <div className="w-full">
      <table className="w-full">
        <thead>
          <tr className="font-medium text-[#637381] bg-[#f4f5f6]">
            <td className="text-black p-4 flex items-center">
              Name{" "}
              <span>
                <ArrowUp className="text-[#637381] ml-1" size={20} />
              </span>
            </td>
            <td className="p-4">Email</td>
            <td className="p-4">Phone number</td>
            <td className="p-4">Role</td>
            <td className="p-4">Status</td>
            <td className="p-4"></td>
          </tr>
        </thead>
        {loading ? (
          <ListSkelton />
        ) : (
          <tbody>
            {users.map((item) => (
              <tr className="hover:bg-[#f4f5f6]" key={item._id}>
                <td className="text-black p-4 flex items-center">
                  <span className="mr-2">
                    <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {item.username.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                  </span>
                  {item.username}
                </td>
                <td className="p-4">{item.email}</td>
                <td className="p-4">+91 0000000000</td>
                <td className="p-4">{item.role}</td>
                <td className="p-4">
                  <span
                    className={`${
                      item.isBlocked
                        ? "text-[#B91D18] bg-[#FFE4DE]"
                        : "text-[#118D57] bg-[#DBF6E5]"
                    } py-1 px-2 rounded-lg`}
                  >
                    {item.isBlocked ? "Banned" : "Active"}
                  </span>
                </td>
                <td className="p-4 flex text-[#637381] justify-evenly">
                  <Pen size={22} />
                  <div className="dropdown dropdown-left">
                    <div tabIndex={0} role="button">
                      <EllipsisVertical size={25} />
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-gray-50 w-[100px] rounded-2xl p-1"
                    >
                      <li
                        className="p-1 w-full flex hover:bg-[#f4f5f6] rounded-xl"
                        onClick={() => blockUserById(item._id)}
                      >
                        <h1 className="flex justify-between">
                          <span>Ban</span>
                          <Ban size={20} className="text-[#B91D18]" />
                        </h1>
                      </li>
                      <li className="p-1 w-full flex hover:bg-[#f4f5f6] rounded-xl">
                        <h1 className="flex justify-between">
                          <span>Delete</span>
                          <Trash2 size={20} className="text-[#B91D18]" />
                        </h1>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      <div className="w-full flex justify-end px-2">
        <div className="p-4 text-[15px]">1 - 5 of {totalUsers}</div>
        <button
          disabled={currentPage <= 1}
          className={`p-4 ${
            currentPage <= 1 ? "text-[#637381]" : "cursor-pointer"
          }`}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          className="p-4 cursor-pointer"
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default UserList;
