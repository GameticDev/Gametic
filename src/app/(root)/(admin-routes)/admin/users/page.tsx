const page = () => {
  return (
    <div className="py-2 px-10 w-full h-auto">
      <div className="flex flex-col gap-3">
        <h1 className="text-[28px] font-semibold">List</h1>
        <div className="flex gap-5 items-center text-[14px] text-[#1c252e]">
          <h4>Dashbord</h4>
          <div className="w-1 h-1 bg-[#919EAB] mt-[1px] rounded-full"></div>
          <h4>Users</h4>
        </div>
      </div>
      <div className="w-full shadow-[rgba(0,0,0,0.02)_0px_1px_3px_0px,rgba(27,31,35,0.15)_0px_0px_0px_1px]
} border border-white/5 ">
        <div className="border-b-2 w-full flex gap-10">
          <button className="text-[14px] font-medium py-2.5">
            All{" "}
            <span className="px-1.5 py-[2px] rounded-md bg-black text-white ml-2">
              20
            </span>
          </button>
          <button className="text-[14px] font-medium py-2.5 ">
            Active{" "}
            <span className="px-1.5 py-[2px] rounded-md bg-[#DBF6E5] text-[#118D57] ml-2">
              2
            </span>
          </button>
          <button className="text-[14px] font-medium py-2.5">
            Pending{" "}
            <span className="px-1.5 py-[2px] rounded-md bg-[#FFF1D6] text-[#B76E00] ml-2">
              10
            </span>
          </button>
          <button className="text-[14px] font-medium py-2.5">
            Banned{" "}
            <span className="px-1.5 py-[2px] rounded-md bg-[#FFE4DE] text-[#B91D18] ml-2">
              6
            </span>
          </button>
          <button className="text-[14px] font-medium py-2.5">
            Rejected{" "}
            <span className="px-1.5 py-[2px] rounded-md bg-[#EDEFF1] text-[#637381] ml-2">
              2
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
