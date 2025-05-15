import { ArrowUp, ChevronLeft, ChevronRight, EllipsisVertical, Pen } from "lucide-react";

const UserList = () => {
  const arr: number[] = [1, 2, 3, 4, 5];
  return (
    <div className="w-full">
      <table className="w-full">
        <thead>
          <tr className="font-medium text-[#637381] bg-[#f4f5f6] ">
            <td className="text-black p-4 flex items-center">Name <span><ArrowUp className="text-[#637381] ml-1" size={20}/></span></td>
            <td className="p-4">Email</td>
            <td className="p-4">Phone number</td>
            <td className="p-4">Role</td>
            <td className="p-4">Status</td>
            <td className="p-4"></td>
          </tr>
        </thead>
        <tbody>
          {arr.map((item) => {
            return (
              <tr className=" hover:bg-[#f4f5f6] " key={item}>
                <td className="text-black p-4 flex items-center">
                  <span className="mr-2">
                    <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">AG</span>
                    </div>
                  </span>
                  Aginas pk
                </td>
                <td className="p-4">aginaspk6@gmail.com</td>
                <td className="p-4">+91 0000000000</td>
                <td className="p-4">User</td>
                <td className="p-4">Active</td>
                <td className="p-4 flex text-[#637381] justify-evenly">
                  <Pen size={22} />
                  <EllipsisVertical size={25} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="w-full flex justify-end px-2">
        <div className="p-4 text-[15px]">1 - 5 of 20</div>
        <button className="p-4 cursor-pointer text-[#637381]"><ChevronLeft size={20}/></button>
        <button className="p-4 cursor-pointer"><ChevronRight size={20}/></button>
      </div>
    </div>
  );
};

export default UserList;
