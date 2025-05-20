// "use client";
// import { blockUser, fetchAllUser } from "@/redux/actions/admin/userActions";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { User } from "@/redux/slices/admin/userSlice";
// import {
//   ArrowUp,
//   Ban,
//   ChevronLeft,
//   ChevronRight,
//   EllipsisVertical,
//   Pen,
//   Trash2,
// } from "lucide-react";
// import { useEffect, useState } from "react";
// import ListSkelton from "./skelton/listSkelton";

// interface UserListProps {
//   search: string;
//   role: string;
// }

// const UserList: React.FC<UserListProps> = ({ search, role }) => {
//   const dispatch = useAppDispatch();
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const { users, totalUsers, loading } = useAppSelector(
//     (state) => state.adminUsers
//   );

//   useEffect(() => {
//     dispatch(fetchAllUser({ page: currentPage, limit: 5, search, role }));
//   }, [dispatch, currentPage, search]);

//   const blockUserById = async (id: string): Promise<User | undefined> => {
//     try {
//       const response = await dispatch(blockUser({ id })).unwrap();
//       dispatch(fetchAllUser({ page: currentPage, limit: 5, search, role }));
//     } catch (error: unknown) {
//       console.error("Failed to block user:", error);
//       return undefined;
//     }
//   };

//   return (
//     <div className="w-full">
//       <table className="w-full">
//         <thead>
//           <tr className="font-medium text-[#637381] bg-[#f4f5f6]">
//             <td className="text-black p-4 flex items-center">
//               Name{" "}
//               <span>
//                 <ArrowUp className="text-[#637381] ml-1" size={20} />
//               </span>
//             </td>
//             <td className="p-4">Email</td>
//             <td className="p-4">Phone number</td>
//             <td className="p-4">Role</td>
//             <td className="p-4">Status</td>
//             <td className="p-4"></td>
//           </tr>
//         </thead>
//         {loading ? (
//           <ListSkelton />
//         ) : (
//           <tbody>
//             {users.map((item) => (
//               <tr className="hover:bg-[#f4f5f6]" key={item._id}>
//                 <td className="text-black p-4 flex items-center">
//                   <span className="mr-2">
//                     <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
//                       <span className="text-white text-sm font-medium">
//                         {item.username.slice(0, 2).toUpperCase()}
//                       </span>
//                     </div>
//                   </span>
//                   {item.username}
//                 </td>
//                 <td className="p-4">{item.email}</td>
//                 <td className="p-4">+91 0000000000</td>
//                 <td className="p-4">{item.role}</td>
//                 <td className="p-4">
//                   <span
//                     className={`${
//                       item.isBlocked
//                         ? "text-[#B91D18] bg-[#FFE4DE]"
//                         : "text-[#118D57] bg-[#DBF6E5]"
//                     } py-1 px-2 rounded-lg`}
//                   >
//                     {item.isBlocked ? "Banned" : "Active"}
//                   </span>
//                 </td>
//                 <td className="p-4 flex text-[#637381] justify-evenly">
//                   <Pen size={22} />
//                   <div className="dropdown dropdown-left">
//                     <div tabIndex={0} role="button">
//                       <EllipsisVertical size={25} />
//                     </div>
//                     <ul
//                       tabIndex={0}
//                       className="dropdown-content menu bg-gray-50 w-[100px] rounded-2xl p-1"
//                     >
//                       <li
//                         className="p-1 w-full flex hover:bg-[#f4f5f6] rounded-xl"
//                         onClick={() => blockUserById(item._id)}
//                       >
//                         <h1 className="flex justify-between">
//                           <span>Ban</span>
//                           <Ban size={20} className="text-[#B91D18]" />
//                         </h1>
//                       </li>
//                       <li className="p-1 w-full flex hover:bg-[#f4f5f6] rounded-xl">
//                         <h1 className="flex justify-between">
//                           <span>Delete</span>
//                           <Trash2 size={20} className="text-[#B91D18]" />
//                         </h1>
//                       </li>
//                     </ul>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         )}
//       </table>
//       <div className="w-full flex justify-end px-2">
//         <div className="p-4 text-[15px]">1 - 5 of {totalUsers}</div>
//         <button
//           disabled={currentPage <= 1}
//           className={`p-4 ${
//             currentPage <= 1 ? "text-[#637381]" : "cursor-pointer"
//           }`}
//           onClick={() => setCurrentPage(currentPage - 1)}
//         >
//           <ChevronLeft size={20} />
//         </button>
//         <button
//           className="p-4 cursor-pointer"
//           onClick={() => setCurrentPage(currentPage + 1)}
//         >
//           <ChevronRight size={20} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UserList;


"use client";
import { blockUser, fetchAllUser } from "@/redux/actions/admin/userActions";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { User } from "@/redux/slices/admin/userSlice";
import {
  ArrowUp,
  Ban,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Pen,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";

// Skeleton loader for the table
const ListSkeleton = () => {
  return (
    <tbody className="animate-pulse">
      {[...Array(5)].map((_, index) => (
        <tr key={index} className="border-b border-gray-100">
          <td className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
          </td>
          <td className="p-4"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
          <td className="p-4"><div className="h-4 bg-gray-200 rounded w-28"></div></td>
          <td className="p-4"><div className="h-4 bg-gray-200 rounded w-16"></div></td>
          <td className="p-4"><div className="h-6 bg-gray-200 rounded w-16"></div></td>
          <td className="p-4"><div className="h-6 bg-gray-200 rounded w-20"></div></td>
        </tr>
      ))}
    </tbody>
  );
};


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
            <ListSkeleton />
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