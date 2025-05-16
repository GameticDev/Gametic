"use client";
import UserList from "@/components/admin/userList";
import { fetchAllUser } from "@/redux/actions/admin/userActions";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";

const page = () => {
  const dispatch = useAppDispatch();
  const { totalUsers, totalActiveUser, totalBannedUsers } = useAppSelector(
    (state) => state.adminUsers
  );
  console.log(totalUsers)
  useEffect(() => {
    dispatch(fetchAllUser({ page: 1, limit: 5 }));
  }, [dispatch]);

  return (
    <div className="py-2 px-10 w-full h-auto">
      <div className="flex flex-col gap-3 mb-10">
        <h1 className="text-[28px] font-semibold">List</h1>
        <div className="flex gap-5 items-center text-[14px] text-[#1c252e]">
          <h4>Dashbord</h4>
          <div className="w-1 h-1 bg-[#919EAB] mt-[1px] rounded-full"></div>
          <h4>Users</h4>
        </div>
      </div>
      <div className="w-full shadow-[rgba(0,0,0,0.02)_0px_1px_3px_0px,rgba(27,31,35,0.15)_0px_0px_0px_1px] ">
        <div className="border-b-2 border-white/50 w-full flex gap-10 px-5 py-2">
          <button className="text-[14px] font-medium py-2.5 cursor-pointer">
            All{" "}
            <span className="px-1.5 py-[2px] rounded-md bg-black text-white ml-2">
              {totalUsers}
            </span>
          </button>
          <button className="text-[14px] font-medium py-2.5  cursor-pointer">
            Active{" "}
            <span className="px-1.5 py-[2px] rounded-md bg-[#DBF6E5] text-[#118D57] ml-2">
              {totalActiveUser}
            </span>
          </button>
          {/* <button className="text-[14px] font-medium py-2.5 cursor-pointer">
            Pending{" "}
            <span className="px-1.5 py-[2px] rounded-md bg-[#FFF1D6] text-[#B76E00] ml-2">
              10
            </span>
          </button> */}
          <button className="text-[14px] font-medium py-2.5 cursor-pointer">
            Banned{" "}
            <span className="px-1.5 py-[2px] rounded-md bg-[#FFE4DE] text-[#B91D18] ml-2">
              {totalBannedUsers}
            </span>
          </button>
          {/* <button className="text-[14px] font-medium py-2.5 cursor-pointer">
            Rejected{" "}
            <span className="px-1.5 py-[2px] rounded-md bg-[#EDEFF1] text-[#637381] ml-2">
              2
            </span>
          </button> */}
        </div>
        <div className="w-full">
          <UserList />
        </div>
      </div>
    </div>
  );
};

export default page;
