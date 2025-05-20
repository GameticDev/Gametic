"use client";
import VenueList from "@/components/admin/venueList";
import { fetchAllVenues } from "@/redux/actions/admin/venuesAction";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";

const Page = () => {
  const dispatch = useAppDispatch();
  const { venues,totalVenues,totalActiveVenues } = useAppSelector((state) => state.adminVenues);

  useEffect(()=>{
    dispatch(fetchAllVenues({page:1,limit:5,search:""}))
  },[dispatch])

  console.log(venues)

  return (
    <div className="py-2 px-10 w-auto h-auto ml-[240px] mt-[72px]">
      <div className="flex flex-col gap-3 mb-10">
        <h1 className="text-[28px] font-semibold">Venues</h1>
        <div className="flex gap-5 items-center text-[14px] text-[#1c252e]">
          <h4>Dashboard</h4>
          <div className="w-1 h-1 bg-[#919EAB] mt-[1px] rounded-full"></div>
          <h4>Managment</h4>
          <div className="w-1 h-1 bg-[#919EAB] mt-[1px] rounded-full"></div>
          <h4>Venues</h4>
        </div>
      </div>
      <div className="w-full shadow-[rgba(0,0,0,0.02)_0px_1px_3px_0px,rgba(27,31,35,0.15)_0px_0px_0px_1px]">
        <div className="border-b-2 border-white/50 w-full flex gap-10 px-5 py-2">
          <button className="text-[14px] font-medium py-2.5 cursor-pointer">
            All{" "}
            <span className="px-1.5 py-[2px] rounded-md bg-black text-white ml-2">
              {totalVenues}
            </span>
          </button>
          <button className="text-[14px] font-medium py-2.5 cursor-pointer">
            Active{" "}
            <span className="px-1.5 py-[2px] rounded-md bg-[#DBF6E5] text-[#118D57] ml-2">
              {totalActiveVenues}
            </span>
          </button>
          <button className="text-[14px] font-medium py-2.5 cursor-pointer">
            Banned{" "}
            <span className="px-1.5 py-[2px] rounded-md bg-[#FFE4DE] text-[#B91D18] ml-2">
              0
            </span>
          </button>
        </div>
        {/* <div className="w-full">
          <SearchUser onSearch={getSearchInput} getRole={getRole} />
        </div>*/}
        <div className="w-full">
          <VenueList search=""/>
        </div> 
      </div>
    </div>
  );
};

export default Page;
